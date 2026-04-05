import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types";

const MAX_STORED_MESSAGES = 100;

function getStorageKey(endpoint: string) {
  return `chatbot-rag-history-${btoa(endpoint).slice(0, 16)}`;
}

function loadMessages(endpoint: string): Message[] {
  try {
    const raw = localStorage.getItem(getStorageKey(endpoint));
    if (!raw) return [];
    return JSON.parse(raw).map((m: Message) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch (err) {
    console.warn("[useChat] Failed to load messages from localStorage", {
      endpoint,
      error: err,
    });
    return [];
  }
}

function saveMessages(endpoint: string, messages: Message[]) {
  try {
    localStorage.setItem(
      getStorageKey(endpoint),
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
    );
  } catch (err) {
    console.warn("[useChat] Failed to save messages to localStorage", {
      endpoint,
      messageCount: messages.length,
      error: err,
    });
  }
}

function clearStorage(endpoint: string) {
  try {
    localStorage.removeItem(getStorageKey(endpoint));
  } catch (err) {
    console.warn("[useChat] Failed to clear chat history from localStorage", {
      endpoint,
      error: err,
    });
  }
}

export function useChat(
  apiEndpoint: string | undefined,
  systemPrompt?: string,
  persistHistory = true,
  knowledgeBaseEnabled = false,
  collectionId = "default",
  apiKey?: string,
) {
  // const storageKey = apiEndpoint ?? apiKey ?? "default";

  const [messages, setMessages] = useState<Message[]>(() => {
    // Only load from storage if persistHistory is true at mount time
    if (persistHistory && apiEndpoint) {
      return loadMessages(apiEndpoint);
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // When persistHistory switches to false, immediately wipe stored history
  useEffect(() => {
    if (!persistHistory && apiEndpoint) {
      clearStorage(apiEndpoint);
    }
  }, [persistHistory, apiEndpoint]);

  // Save on every message change — only if persistHistory is true
  useEffect(() => {
    if (!persistHistory || !apiEndpoint) return;
    // Don't save empty array — avoids wiping storage on initial render
    if (messages.length === 0) return;
    saveMessages(apiEndpoint, messages);
  }, [messages, apiEndpoint, persistHistory]);

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      const botMsgId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: botMsgId, role: "bot", content: "", timestamp: new Date() },
      ]);
      setIsLoading(true);

      if (!apiKey && !apiEndpoint) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  content:
                    "⚠️ Configuration error: provide either `apiKey` or `apiEndpoint`.",
                }
              : m,
          ),
        );
        setIsLoading(false);
        return;
      }

      abortRef.current = new AbortController();

      try {
        // ── Path 1: Direct Groq ──────────────────────────────────────
        if (apiKey) {
          const res = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              signal: abortRef.current.signal,
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                stream: true,
                messages: [
                  {
                    role: "system",
                    content: systemPrompt || "You are a helpful assistant.",
                  },
                  ...messages.slice(-10).map((m) => ({
                    role: m.role === "bot" ? "assistant" : "user",
                    content: m.content,
                  })),
                  { role: "user", content },
                ],
              }),
            },
          );

          if (!res.ok) throw new Error(`Groq responded with ${res.status}`);

          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const text = decoder.decode(value, { stream: true });
              for (const line of text.split("\n")) {
                if (!line.startsWith("data: ") || line === "data: [DONE]")
                  continue;
                try {
                  const token = JSON.parse(line.replace("data: ", ""))
                    .choices?.[0]?.delta?.content;
                  if (token) {
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMsgId
                          ? { ...m, content: m.content + token }
                          : m,
                      ),
                    );
                  }
                } catch (err) {
                  if ((err as Error).name === "AbortError") {
                    console.debug("[useChat] Request aborted by user", {
                      apiEndpoint,
                      hasApiKey: !!apiKey,
                    });
                    return;
                  }

                  const errorMessage =
                    err instanceof Error ? err.message : "Unknown error";

                  console.error("[useChat] sendMessage failed", {
                    error: err,
                    message: content,
                    apiEndpoint,
                    hasApiKey: !!apiKey,
                    knowledgeBaseEnabled,
                    collectionId,
                  });

                  setError(errorMessage);

                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === botMsgId
                        ? { ...m, content: `⚠️ ${errorMessage}` }
                        : m,
                    ),
                  );
                }
              }
            }
          }
          return;
        }

        // ── Path 2: RAG server ───────────────────────────────────────
        const res = await fetch(`${apiEndpoint}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            message: content,
            system_prompt: systemPrompt || "",
            history: messages.slice(-10).map((m) => ({
              role: m.role === "bot" ? "assistant" : "user",
              content: m.content,
            })),
            use_knowledge_base: knowledgeBaseEnabled,
            collection_id: collectionId,
          }),
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId ? { ...m, content: m.content + chunk } : m,
              ),
            );
          }
        } else {
          const data = await res.json();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId ? { ...m, content: data.response } : m,
            ),
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Connection failed";
        setError(msg);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId ? { ...m, content: `⚠️ ${msg}` } : m,
          ),
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [
      apiEndpoint,
      apiKey,
      messages,
      systemPrompt,
      knowledgeBaseEnabled,
      collectionId,
    ],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    if (apiEndpoint) clearStorage(apiEndpoint);
  }, [apiEndpoint]);

  const stopGeneration = () => abortRef.current?.abort();

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}

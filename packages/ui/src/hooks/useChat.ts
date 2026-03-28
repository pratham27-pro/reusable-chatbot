import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types";

const MAX_STORED_MESSAGES = 100; // don't let localStorage grow forever

function getStorageKey(apiEndpoint: string) {
  // unique key per chatbot instance (in case user has multiple bots)
  return `chatbot-rag-history-${btoa(apiEndpoint).slice(0, 16)}`;
}

function loadMessages(apiEndpoint: string): Message[] {
  try {
    const raw = localStorage.getItem(getStorageKey(apiEndpoint));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Restore Date objects — JSON.parse gives strings
    return parsed.map((m: Message) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch {
    return [];
  }
}

function saveMessages(apiEndpoint: string, messages: Message[]) {
  try {
    // Only keep last N messages to avoid storage bloat
    const toStore = messages.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(getStorageKey(apiEndpoint), JSON.stringify(toStore));
  } catch {
    // localStorage can throw if storage is full — fail silently
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
  const [messages, setMessages] = useState<Message[]>(() =>
    persistHistory && apiEndpoint ? loadMessages(apiEndpoint) : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist to localStorage whenever messages change
  useEffect(() => {
    if (persistHistory && apiEndpoint) saveMessages(apiEndpoint, messages);
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
      // ── Guard: must have one or the other ──
      if (!apiKey && !apiEndpoint) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  content:
                    "⚠️ Configuration error: please provide either `apiKey` or `apiEndpoint` to use this chatbot.",
                }
              : m,
          ),
        );
        setIsLoading(false);
        return;
      }

      abortRef.current = new AbortController();

      try {
        // ── Path 1: Direct Groq (apiKey provided, no backend needed) ──
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
                stream: true,
              }),
            },
          );

          if (!res.ok) throw new Error(`Groq responded with ${res.status}`);

          // Parse SSE stream from Groq
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const text = decoder.decode(value, { stream: true });
              // Groq SSE lines: "data: {...}\n"
              for (const line of text.split("\n")) {
                if (!line.startsWith("data: ") || line === "data: [DONE]")
                  continue;
                try {
                  const json = JSON.parse(line.replace("data: ", ""));
                  const token = json.choices?.[0]?.delta?.content;
                  if (token) {
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMsgId
                          ? { ...m, content: m.content + token }
                          : m,
                      ),
                    );
                  }
                } catch {
                  /* skip malformed chunks */
                }
              }
            }
          }

          return; // don't fall through to apiEndpoint path
        }

        // ── Path 2: RAG server (existing logic) ──
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
    if (apiEndpoint) localStorage.removeItem(getStorageKey(apiEndpoint)); // also wipe from storage
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

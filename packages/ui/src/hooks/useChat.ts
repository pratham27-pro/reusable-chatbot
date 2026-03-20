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
  apiEndpoint: string,
  systemPrompt?: string,
  persistHistory = true,
) {
  const [messages, setMessages] = useState<Message[]>(() =>
    persistHistory ? loadMessages(apiEndpoint) : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist to localStorage whenever messages change
  useEffect(() => {
    if (persistHistory) saveMessages(apiEndpoint, messages);
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

      abortRef.current = new AbortController();

      try {
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
    [apiEndpoint, messages, systemPrompt],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(getStorageKey(apiEndpoint)); // also wipe from storage
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

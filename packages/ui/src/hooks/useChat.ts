import { useCallback, useRef, useState } from "react";
import type { Message } from "../types";

export function useChat(apiEndpoint: string, systemPrompt?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null);

      // Add user message immediately
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      // Prepare bot message slot for streaming
      const botMsgId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "bot", content: "", timestamp: new Date() },
      ]);

      abortRef.current = new AbortController();

      try {
        const res = await fetch(`${apiEndpoint}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            message: content,
            system_prompt: systemPrompt || "",
            // pass last 10 messages as history (exclude the empty bot slot we just added)
            history: messages.slice(-10).map((m) => ({
              role: m.role === "bot" ? "assistant" : "user",
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        // Handle streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // Append each chunk to the bot message
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId ? { ...m, content: m.content + chunk } : m,
              ),
            );
          }
        } else {
          // Fallback: non-streaming JSON response
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

  const stopGeneration = () => abortRef.current?.abort();
  const clearMessages = () => setMessages([]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}

import { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { cn } from "../lib/cn";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { DocUploader } from "./DocUploader";

interface ChatWindowProps {
  apiEndpoint?: string;
  apiKey?: string;
  botName: string;
  botAvatar?: string;
  buttonColor: string;
  theme: "light" | "dark";
  welcomeMessage: string;
  placeholder: string;
  systemPrompt: string;
  knowledgeBaseEnabled: boolean;
  collectionId?: string;
  onClose: () => void;
  persistHistory?: boolean;
  enableVoice?: boolean;
}

export function ChatWindow({
  apiEndpoint,
  apiKey,
  botName,
  botAvatar,
  buttonColor,
  theme,
  welcomeMessage,
  placeholder,
  systemPrompt,
  knowledgeBaseEnabled,
  collectionId = "default",
  onClose,
  persistHistory = true,
  enableVoice = false,
}: ChatWindowProps) {
  const { messages, isLoading, sendMessage, clearMessages } = useChat(
    apiEndpoint,
    systemPrompt,
    persistHistory,
    knowledgeBaseEnabled,
    collectionId,
    apiKey,
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const dark = theme === "dark";

  const lastBotMessage =
    [...messages].reverse().find((m) => m.role === "bot")?.content ?? "";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className={cn(
        "w-90 h-125 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2",
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
      )}
    >
      <ChatHeader
        botName={botName}
        botAvatar={botAvatar}
        buttonColor={buttonColor}
        onClose={onClose}
        onClear={clearMessages}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.length === 0 && (
          <div
            className={cn(
              "text-center text-xs py-3 px-4 rounded-xl mx-auto max-w-[80%]",
              dark
                ? "bg-gray-700 text-gray-300"
                : "bg-indigo-50 text-indigo-600",
            )}
          >
            {welcomeMessage}
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            botAvatar={botAvatar}
            botName={botName}
            theme={theme}
          />
        ))}

        {isLoading && (
          <div
            className={cn(
              "flex gap-1 px-3 py-2.5 rounded-2xl rounded-tl-sm w-fit",
              dark ? "bg-gray-700" : "bg-gray-100",
            )}
          >
            {[0, 0.15, 0.3].map((delay, i) => (
              <span
                key={i}
                style={{ animationDelay: `${delay}s` }}
                className={cn(
                  "w-2 h-2 rounded-full inline-block animate-bounce",
                  dark ? "bg-gray-400" : "bg-gray-400",
                )}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {knowledgeBaseEnabled && (
        <DocUploader
          apiEndpoint={apiEndpoint}
          theme={theme}
          collectionId={collectionId}
        />
      )}
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        placeholder={placeholder}
        buttonColor={buttonColor}
        theme={theme}
        enableVoice={enableVoice}
        lastBotMessage={lastBotMessage}
      />
    </div>
  );
}

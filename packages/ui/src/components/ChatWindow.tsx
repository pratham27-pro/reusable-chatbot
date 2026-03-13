import { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { cn } from "../lib/cn";
import type { ChatBotProps } from "../types";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { DocUploader } from "./DocUploader";

interface Props extends ChatBotProps {
  onClose: () => void;
}

export function ChatWindow({
  apiEndpoint,
  botName = "Assistant",
  botAvatar,
  buttonColor,
  systemPrompt,
  welcomeMessage,
  placeholder,
  theme = "light",
  knowledgeBaseEnabled = false,
  width = 360,
  height = 500,
  onClose,
}: Props) {
  const { messages, isLoading, sendMessage } = useChat(
    apiEndpoint,
    systemPrompt,
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className={cn(
        "crb-rounded-2xl crb-shadow-2xl crb-flex crb-flex-col crb-overflow-hidden crb-animate-fade-in",
        theme === "dark"
          ? "crb-bg-gray-800 crb-text-gray-100"
          : "crb-bg-white crb-text-gray-900",
      )}
      style={{ width, height }}
    >
      <ChatHeader
        botName={botName}
        botAvatar={botAvatar}
        onClose={onClose}
        buttonColor={buttonColor}
      />

      {/* Messages area */}
      <div className="crb-flex-1 crb-overflow-y-auto crb-px-4 crb-py-3 crb-flex crb-flex-col crb-gap-3 crb-scroll-smooth">
        {welcomeMessage && messages.length === 0 && (
          <div
            className={cn(
              "crb-text-center crb-text-xs crb-py-3 crb-px-4 crb-rounded-xl crb-mx-auto crb-max-w-[80%]",
              theme === "dark"
                ? "crb-bg-gray-700 crb-text-gray-300"
                : "crb-bg-indigo-50 crb-text-indigo-600",
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

        {/* Typing indicator */}
        {isLoading && (
          <div className="crb-flex crb-gap-1 crb-px-3 crb-py-2 crb-bg-gray-100 crb-rounded-2xl crb-rounded-tl-sm crb-w-fit">
            {[0, 0.2, 0.4].map((delay, i) => (
              <span
                key={i}
                className="crb-w-2 crb-h-2 crb-rounded-full crb-bg-gray-400 crb-animate-dot-bounce crb-inline-block"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {knowledgeBaseEnabled && (
        <DocUploader apiEndpoint={apiEndpoint} theme={theme} />
      )}
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        placeholder={placeholder}
        buttonColor={buttonColor}
        theme={theme}
      />
    </div>
  );
}

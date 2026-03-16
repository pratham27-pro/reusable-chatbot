import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import type { ChatBotProps } from "../types";
import { ChatWindow } from "./ChatWindow";

export function ChatBot({
  apiEndpoint,
  botName = "Assistant",
  botAvatar,
  buttonColor = "#6366f1",
  theme = "light",
  welcomeMessage = "Hi! How can I help you today? 👋",
  placeholder = "Type a message...",
  systemPrompt = "You are a helpful assistant.",
  knowledgeBaseEnabled = false,
  floatPosition = "bottom-right",
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionStyle =
    floatPosition === "bottom-right"
      ? { bottom: "24px", right: "24px" }
      : { bottom: "24px", left: "24px" };

  return (
    // chatbot-rag-root scopes all Tailwind CSS — no prefix needed
    <div
      className="chatbot-rag-root"
      style={{ position: "fixed", zIndex: 9999, ...positionStyle }}
    >
      <div className={cn("flex flex-col items-end gap-3")}>
        {isOpen && (
          <ChatWindow
            apiEndpoint={apiEndpoint}
            botName={botName}
            botAvatar={botAvatar}
            buttonColor={buttonColor}
            theme={theme}
            welcomeMessage={welcomeMessage}
            placeholder={placeholder}
            systemPrompt={systemPrompt}
            knowledgeBaseEnabled={knowledgeBaseEnabled}
            onClose={() => setIsOpen(false)}
          />
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          style={{ backgroundColor: buttonColor }}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg",
            "flex items-center justify-center",
            "border-0 cursor-pointer",
            "transition-all duration-300 hover:scale-110 hover:shadow-xl",
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {botAvatar && !isOpen ? (
            <img
              src={botAvatar}
              alt={botName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : isOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageCircle size={24} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

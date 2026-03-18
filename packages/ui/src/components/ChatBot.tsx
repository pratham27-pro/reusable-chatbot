import { MessageCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDraggable } from "../hooks/useDraggable";
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
  const clickedRef = useRef(false);

  // Initial position based on floatPosition prop
  const initialPosition =
    floatPosition === "bottom-right"
      ? { x: window.innerWidth - 80, y: window.innerHeight - 80 }
      : { x: 24, y: window.innerHeight - 80 };

  const { position, isDragging, onPointerDown, onPointerMove, onPointerUp } =
    useDraggable(initialPosition);

  // Distinguish drag vs click — don't toggle window if user was dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    clickedRef.current = true;
    onPointerDown(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) clickedRef.current = false;
    onPointerMove(e);
  };

  const handlePointerUp = () => {
    onPointerUp();
    if (clickedRef.current) setIsOpen((o) => !o);
    clickedRef.current = false;
  };

  // Chat window appears above the button, aligned to whichever side it's on
  const windowStyle =
    position.x > window.innerWidth / 2
      ? { bottom: "70px", right: "0" }
      : { bottom: "70px", left: "0" };

  return (
    <div
      className="chatbot-rag-root"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className="flex flex-col items-end gap-3"
        style={{ position: "relative" }}
      >
        {isOpen && (
          <div style={{ position: "absolute", ...windowStyle }}>
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
          </div>
        )}

        <button
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            backgroundColor: buttonColor,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg",
            "flex items-center justify-center",
            "border-0 select-none",
            "transition-shadow duration-300 hover:shadow-xl",
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

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
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
  collectionId = "default",
  floatPosition = "bottom-right",
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    dragPosition,
    isDragging,
    hasMoved,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useDraggable();

  const handlePointerDown = (e: React.PointerEvent) => {
    onPointerDown(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    onPointerMove(e);
  };

  const handlePointerUp = () => {
    onPointerUp();
    // Only toggle chat window if user didn't drag
    if (!hasMoved.current) setIsOpen((o) => !o);
  };

  // ─── Position Logic ───────────────────────────────────────────────
  // dragPosition === null  →  user hasn't dragged yet
  //                         use bottom/right CSS so it's always
  //                         glued to the viewport corner (real chatbot behavior)
  //
  // dragPosition !== null  →  user dragged it somewhere this session
  //                         use fixed top/left coordinates
  //                         resets to null on page refresh automatically
  //                         (no localStorage — intentional)

  const containerStyle: React.CSSProperties =
    dragPosition === null
      ? {
          position: "fixed",
          zIndex: 9999,
          bottom: "24px",
          ...(floatPosition === "bottom-right"
            ? { right: "24px" }
            : { left: "24px" }),
          pointerEvents: "none",
        }
      : {
          position: "fixed",
          zIndex: 9999,
          left: dragPosition.x,
          top: dragPosition.y,
        };

  // Chat window flips side based on which half of screen the button is on
  // When not dragged — use floatPosition prop to decide
  // When dragged — calculate from actual position
  const isOnRightHalf =
    dragPosition === null
      ? floatPosition === "bottom-right"
      : dragPosition.x > window.innerWidth / 2;

  const windowStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "70px",
    ...(isOnRightHalf ? { right: "0" } : { left: "0" }),
  };

  return (
    <div className="chatbot-rag-root" style={containerStyle}>
      <div style={{ position: "relative", pointerEvents: "auto" }}>
        {isOpen && (
          <div style={windowStyle}>
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
              collectionId={collectionId}
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
            cursor: isDragging ? "grabbing" : "pointer",
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

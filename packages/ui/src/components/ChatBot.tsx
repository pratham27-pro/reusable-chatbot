import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import "../index.css";
import { cn } from "../lib/cn";
import type { ChatBotProps } from "../types";
import { ChatWindow } from "./ChatWindow";

export function ChatBot(props: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    buttonColor = "#6366f1",
    floatPosition = "bottom-right",
    botAvatar,
    botName,
  } = props;

  const positionClasses =
    floatPosition === "bottom-right"
      ? "crb-bottom-6 crb-right-6"
      : "crb-bottom-6 crb-left-6";

  return (
    <div
      className={cn(
        "crb-fixed crb-z-[9999] crb-flex crb-flex-col crb-items-end crb-gap-3",
        positionClasses,
      )}
    >
      {/* Chat window */}
      {isOpen && <ChatWindow {...props} onClose={() => setIsOpen(false)} />}

      {/* FAB button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{ backgroundColor: buttonColor }}
        className={cn(
          "crb-w-14 crb-h-14 crb-rounded-full crb-shadow-lg crb-flex crb-items-center crb-justify-center",
          "crb-transition-all crb-duration-300 hover:crb-scale-110 hover:crb-shadow-xl",
          "crb-border-0 crb-cursor-pointer",
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {botAvatar && !isOpen ? (
          <img
            src={botAvatar}
            alt={botName || "Chat"}
            className="crb-w-10 crb-h-10 crb-rounded-full crb-object-cover"
          />
        ) : isOpen ? (
          <X
            size={22}
            className="crb-text-white crb-transition-transform crb-duration-200"
          />
        ) : (
          <MessageCircle size={24} className="crb-text-white" />
        )}
      </button>
    </div>
  );
}

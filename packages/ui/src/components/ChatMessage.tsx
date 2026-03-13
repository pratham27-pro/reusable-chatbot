import { Bot } from "lucide-react";
import { cn } from "../lib/cn";
import type { Message } from "../types";

interface Props {
  message: Message;
  botAvatar?: string;
  botName?: string;
  theme: "light" | "dark";
}

export function ChatMessage({ message, botAvatar, botName, theme }: Props) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "crb-flex crb-gap-2 crb-animate-fade-in",
        isBot ? "crb-flex-row" : "crb-flex-row-reverse",
      )}
    >
      {/* Avatar */}
      {isBot && (
        <div className="crb-w-7 crb-h-7 crb-rounded-full crb-overflow-hidden crb-shrink-0 crb-bg-indigo-100 crb-flex crb-items-center crb-justify-center crb-mt-1">
          {botAvatar ? (
            <img
              src={botAvatar}
              alt={botName}
              className="crb-w-full crb-h-full crb-object-cover"
            />
          ) : (
            <Bot size={14} className="crb-text-indigo-500" />
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "crb-max-w-[75%] crb-px-3 crb-py-2 crb-rounded-2xl crb-text-sm crb-leading-relaxed",
          isBot
            ? theme === "dark"
              ? "crb-bg-gray-700 crb-text-gray-100 crb-rounded-tl-sm"
              : "crb-bg-gray-100 crb-text-gray-800 crb-rounded-tl-sm"
            : "crb-bg-indigo-500 crb-text-white crb-rounded-tr-sm",
        )}
      >
        <p className="crb-whitespace-pre-wrap crb-break-words">
          {message.content}
        </p>
        <span
          className={cn(
            "crb-text-[10px] crb-mt-1 crb-block",
            isBot
              ? theme === "dark"
                ? "crb-text-gray-400"
                : "crb-text-gray-400"
              : "crb-text-indigo-200",
            isBot ? "crb-text-left" : "crb-text-right",
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

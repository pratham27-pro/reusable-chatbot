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
  const dark = theme === "dark";

  return (
    <div className={cn("flex gap-2", isBot ? "flex-row" : "flex-row-reverse")}>
      {isBot && (
        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-indigo-100 flex items-center justify-center mt-1">
          {botAvatar ? (
            <img
              src={botAvatar}
              alt={botName}
              className="w-full h-full object-cover"
            />
          ) : (
            <Bot size={14} className="text-indigo-500" />
          )}
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed",
          isBot
            ? dark
              ? "bg-gray-700 text-gray-100 rounded-tl-sm"
              : "bg-gray-100 text-gray-800 rounded-tl-sm"
            : "bg-indigo-500 text-white rounded-tr-sm",
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-words">
          {message.content}
        </p>
        <span
          className={cn(
            "text-[10px] mt-1 block",
            isBot ? "text-left" : "text-right",
            isBot
              ? dark
                ? "text-gray-400"
                : "text-gray-400"
              : "text-indigo-200",
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

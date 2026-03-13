import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";

interface Props {
  onSend: (msg: string) => void;
  isLoading: boolean;
  placeholder?: string;
  buttonColor?: string;
  theme: "light" | "dark";
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder = "Type a message...",
  buttonColor,
  theme,
}: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div
      className={cn(
        "crb-px-3 crb-py-3 crb-border-t crb-flex crb-items-end crb-gap-2",
        theme === "dark"
          ? "crb-border-gray-700 crb-bg-gray-800"
          : "crb-border-gray-200 crb-bg-white",
      )}
    >
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        className={cn(
          "crb-flex-1 crb-resize-none crb-rounded-xl crb-border crb-px-3 crb-py-2 crb-text-sm crb-outline-none crb-max-h-28 crb-overflow-y-auto crb-leading-relaxed crb-transition-colors",
          theme === "dark"
            ? "crb-bg-gray-700 crb-border-gray-600 crb-text-gray-100 placeholder:crb-text-gray-400 focus:crb-border-indigo-400"
            : "crb-bg-gray-50 crb-border-gray-300 crb-text-gray-800 placeholder:crb-text-gray-400 focus:crb-border-indigo-400",
        )}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        style={{
          backgroundColor:
            value.trim() && !isLoading ? buttonColor || "#6366f1" : undefined,
        }}
        className={cn(
          "crb-p-2.5 crb-rounded-xl crb-transition-all crb-shrink-0",
          value.trim() && !isLoading
            ? "crb-text-white hover:crb-opacity-90"
            : "crb-bg-gray-200 crb-text-gray-400 crb-cursor-not-allowed",
        )}
        aria-label="Send"
      >
        <SendHorizonal size={16} />
      </button>
    </div>
  );
}

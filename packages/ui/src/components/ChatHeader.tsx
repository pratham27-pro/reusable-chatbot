import { Bot, X } from "lucide-react";
import { cn } from "../lib/cn";

interface Props {
  botName: string;
  botAvatar?: string;
  onClose: () => void;
  buttonColor?: string;
}

export function ChatHeader({
  botName,
  botAvatar,
  onClose,
  buttonColor,
}: Props) {
  return (
    <div
      className={cn(
        "crb-flex crb-items-center crb-gap-3 crb-px-4 crb-py-3 crb-text-white",
      )}
      style={{ backgroundColor: buttonColor || "#6366f1" }}
    >
      <div className="crb-w-9 crb-h-9 crb-rounded-full crb-overflow-hidden crb-bg-white/20 crb-flex crb-items-center crb-justify-center crb-shrink-0">
        {botAvatar ? (
          <img
            src={botAvatar}
            alt={botName}
            className="crb-w-full crb-h-full crb-object-cover"
          />
        ) : (
          <Bot size={20} className="crb-text-white" />
        )}
      </div>

      <div className="crb-flex crb-flex-col crb-flex-1 crb-min-w-0">
        <span className="crb-font-semibold crb-text-sm crb-truncate">
          {botName}
        </span>
        <span className="crb-text-xs crb-text-white/70 crb-flex crb-items-center crb-gap-1">
          <span className="crb-w-1.5 crb-h-1.5 crb-rounded-full crb-bg-green-400 crb-inline-block" />
          Online
        </span>
      </div>

      <button
        onClick={onClose}
        className="crb-p-1 crb-rounded-full hover:crb-bg-white/20 crb-transition-colors"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
}

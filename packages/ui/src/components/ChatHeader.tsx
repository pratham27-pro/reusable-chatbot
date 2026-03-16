import { Bot, X } from "lucide-react";

interface Props {
  botName: string;
  botAvatar?: string;
  buttonColor: string;
  onClose: () => void;
}

export function ChatHeader({
  botName,
  botAvatar,
  buttonColor,
  onClose,
}: Props) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 text-white shrink-0"
      style={{ backgroundColor: buttonColor }}
    >
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
        {botAvatar ? (
          <img
            src={botAvatar}
            alt={botName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Bot size={18} className="text-white" />
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-semibold text-sm">{botName}</span>
        <span className="text-xs text-white/70 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Online
        </span>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors border-0 cursor-pointer text-white bg-transparent"
      >
        <X size={18} />
      </button>
    </div>
  );
}

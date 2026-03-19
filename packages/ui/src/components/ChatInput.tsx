import { Mic, MicOff, SendHorizonal, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useVoice } from "../hooks/useVoice";
import { cn } from "../lib/cn";

interface Props {
  onSend: (msg: string) => void;
  isLoading: boolean;
  placeholder: string;
  buttonColor: string;
  theme: "light" | "dark";
  enableVoice?: boolean;
  lastBotMessage?: string; // to speak the latest bot response
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder,
  buttonColor,
  theme,
  enableVoice = false,
  lastBotMessage,
}: Props) {
  const [value, setValue] = useState("");
  const dark = theme === "dark";

  const {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useVoice((transcript) => {
    setValue(transcript); // fills input with spoken text
  });

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div
      className={cn(
        "px-3 py-3 border-t flex items-end gap-2 shrink-0",
        dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white",
      )}
    >
      {/* Voice output button */}
      {enableVoice && lastBotMessage && (
        <button
          onClick={() => (isSpeaking ? stopSpeaking() : speak(lastBotMessage))}
          className={cn(
            "p-2.5 rounded-xl border-0 cursor-pointer transition-all shrink-0",
            dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600",
          )}
          title={isSpeaking ? "Stop speaking" : "Read aloud"}
        >
          {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}

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
        placeholder={isListening ? "Listening..." : placeholder}
        className={cn(
          "flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none",
          "max-h-28 overflow-y-auto leading-relaxed transition-colors",
          dark
            ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-indigo-400 placeholder:text-gray-500"
            : "bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-400 placeholder:text-gray-400",
          isListening && "border-red-400 animate-pulse",
        )}
      />

      {/* Voice input button */}
      {enableVoice && (
        <button
          onClick={() => (isListening ? stopListening() : startListening())}
          className={cn(
            "p-2.5 rounded-xl border-0 cursor-pointer transition-all shrink-0",
            isListening
              ? "bg-red-500 text-white"
              : dark
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600",
          )}
          title={isListening ? "Stop listening" : "Speak"}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      )}

      <button
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        style={{
          backgroundColor: value.trim() && !isLoading ? buttonColor : undefined,
        }}
        className={cn(
          "p-2.5 rounded-xl transition-all shrink-0 border-0 cursor-pointer",
          value.trim() && !isLoading
            ? "text-white hover:opacity-90"
            : "bg-gray-200 text-gray-400 cursor-not-allowed",
        )}
      >
        <SendHorizonal size={16} />
      </button>
    </div>
  );
}

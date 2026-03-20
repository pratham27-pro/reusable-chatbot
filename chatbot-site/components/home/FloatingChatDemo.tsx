"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, Send, X, MessageCircle, Minimize2 } from "lucide-react";

const conversation = [
  {
    role: "user" as const,
    text: "What does the PDF say about onboarding?",
    delay: 0,
  },
  {
    role: "bot" as const,
    text: "Based on the uploaded doc, onboarding takes 3 steps: account setup, team invite, and API key generation. Need details on any of those?",
    delay: 1400,
  },
  {
    role: "user" as const,
    text: "How do I generate an API key?",
    delay: 3000,
  },
  {
    role: "bot" as const,
    text: "Go to Settings → API → Generate Key. Keys are scoped per project and rotate every 90 days.",
    delay: 4500,
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function FloatingChatDemo({ standalone = false }: { standalone?: boolean }) {
  const [messages, setMessages] = useState<typeof conversation>([]);
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    if (msgIndex >= conversation.length) return;

    const msg = conversation[msgIndex];
    const timer = setTimeout(
      () => {
        if (msg.role === "bot") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, msg]);
            setMsgIndex((i) => i + 1);
          }, 1000);
        } else {
          setMessages((prev) => [...prev, msg]);
          setMsgIndex((i) => i + 1);
        }
      },
      msgIndex === 0 ? 600 : msg.delay - (conversation[msgIndex - 1]?.delay ?? 0),
    );
    return () => clearTimeout(timer);
  }, [msgIndex, open]);

  const reset = () => {
    setMessages([]);
    setMsgIndex(0);
    setTyping(false);
  };

  if (!open) {
    return (
      <motion.button
        onClick={() => { setOpen(true); reset(); }}
        className="float-anim w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #00e5a0, #00b37d)",
          boxShadow: "0 0 30px rgba(0,229,160,0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <MessageCircle size={26} className="text-[#070b14]" />
      </motion.button>
    );
  }

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: standalone ? "100%" : 340,
        height: standalone ? "100%" : 460,
        maxHeight: 460,
        boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,160,0.08)",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#070b14] font-bold text-xs"
            style={{ background: "linear-gradient(135deg, #00e5a0, #00b37d)" }}
          >
            AI
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Assistant</p>
            <p className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: "#00e5a0" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] inline-block animate-pulse" />
              Online · PDF loaded
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#7a8aaa] hover:text-white"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={() => { setOpen(false); reset(); }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#7a8aaa] hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed max-w-[85%]"
                style={
                  msg.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                        color: "#070b14",
                        fontWeight: 500,
                        borderRadius: "18px 18px 4px 18px",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        color: "#d0daf0",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "18px 18px 18px 4px",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div
              className="rounded-2xl text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px 18px 18px 4px",
              }}
            >
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="flex-1 text-sm" style={{ color: "#3d4f6b" }}>
            Ask anything...
          </span>
          <button className="p-1 rounded-lg text-[#7a8aaa] hover:text-[#00e5a0] transition-colors">
            <Mic size={14} />
          </button>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "rgba(0,229,160,0.15)", color: "#00e5a0" }}
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

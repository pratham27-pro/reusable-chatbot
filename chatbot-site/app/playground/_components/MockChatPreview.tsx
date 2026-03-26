"use client";
import { motion } from "framer-motion";
import type { Config } from "./types";
import { makeAccent } from "./types";

export function MockChatPreview({ config }: { config: Config }) {
  const isDark = config.theme === "dark";
  const accent = makeAccent(config.buttonColor);
  const isLeft = config.floatPosition === "bottom-left";

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0d0d1a 0%, #111827 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      {/* Ambient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${accent(0.15)}, transparent)`,
        }}
      />

      {/* Mock page content lines */}
      <div className="absolute top-6 left-6 right-6 space-y-2 opacity-30">
        {[80, 60, 90, 45].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{
              width: `${w}%`,
              background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
            }}
          />
        ))}
      </div>

      {/* Chat window */}
      <motion.div
        key={config.theme + config.buttonColor}
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-14 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          left: isLeft ? 12 : undefined,
          right: isLeft ? undefined : 12,
          width: "calc(100% - 24px)",
          backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent(0.2)}`,
        }}
      >
        {/* Header */}
        <div
          className="px-3 py-2.5 flex items-center gap-2"
          style={{ backgroundColor: config.buttonColor }}
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
            🤖
          </div>
          <span className="text-white text-xs font-semibold">
            {config.botName || "Assistant"}
          </span>
          <span className="ml-auto text-white/60 text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Online
          </span>
        </div>

        {/* Messages */}
        <div className="p-3 space-y-2">
          <motion.div
            key={config.welcomeMessage}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="flex items-start gap-2"
          >
            <div
              className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px]"
              style={{ backgroundColor: config.buttonColor }}
            >
              🤖
            </div>
            <div
              className="text-[10px] px-2.5 py-1.5 rounded-xl rounded-tl-sm max-w-[85%] leading-relaxed"
              style={{
                backgroundColor: isDark ? "#313244" : "#f3f4f6",
                color: isDark ? "#e2e8f0" : "#1f2937",
              }}
            >
              {config.welcomeMessage || "Hi! How can I help?"}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.25 }}
            className="flex justify-end"
          >
            <div
              className="text-[10px] px-2.5 py-1.5 rounded-xl rounded-tr-sm max-w-[75%] leading-relaxed text-white"
              style={{ backgroundColor: config.buttonColor }}
            >
              How do I install this?
            </div>
          </motion.div>

          {/* Typing indicator */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px]"
              style={{ backgroundColor: config.buttonColor }}
            >
              🤖
            </div>
            <div
              className="px-3 py-2 rounded-xl rounded-tl-sm flex items-center gap-1"
              style={{ backgroundColor: isDark ? "#313244" : "#f3f4f6" }}
            >
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: isDark ? "#94a3b8" : "#9ca3af" }}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.8, delay, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div
          className="px-3 py-2 border-t flex items-center gap-2"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          }}
        >
          <div
            className="flex-1 text-[10px] px-2.5 py-1.5 rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
              color: isDark ? "#475569" : "#9ca3af",
            }}
          >
            {config.placeholder || "Type a message..."}
          </div>
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] shrink-0"
            style={{ backgroundColor: config.buttonColor }}
          >
            ↑
          </div>
        </div>
      </motion.div>

      {/* FAB */}
      <motion.div
        key={config.floatPosition + config.buttonColor}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-base shadow-lg"
        style={{
          left: isLeft ? 12 : undefined,
          right: isLeft ? undefined : 12,
          backgroundColor: config.buttonColor,
          boxShadow: `0 4px 20px ${accent(0.5)}`,
        }}
      >
        💬
      </motion.div>
    </div>
  );
}

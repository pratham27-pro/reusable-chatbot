"use client";

import { ChatBot } from "@pratham_jain/chatkit";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, Copy, Eye, Sliders, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { codeToHtml } from "shiki";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Config {
  botName: string;
  buttonColor: string;
  theme: "light" | "dark";
  welcomeMessage: string;
  systemPrompt: string;
  floatPosition: "bottom-right" | "bottom-left";
  placeholder: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT: Config = {
  botName: "Assistant",
  buttonColor: "#6366f1",
  theme: "dark",
  welcomeMessage: "Hi! How can I help you today?",
  systemPrompt: "You are a helpful assistant.",
  floatPosition: "bottom-right",
  placeholder: "Type a message...",
};

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: { label: string; emoji: string; config: Partial<Config> }[] = [
  {
    label: "Minimal",
    emoji: "◻️",
    config: {
      botName: "Ash",
      buttonColor: "#18181b",
      theme: "light",
      welcomeMessage: "Hello. How can I assist you?",
      systemPrompt:
        "You are a concise, precise assistant. Answer directly, skip filler phrases.",
      placeholder: "Ask me anything...",
    },
  },
  {
    label: "Dev Tool",
    emoji: "⚡",
    config: {
      botName: "Volt",
      buttonColor: "#8b5cf6",
      theme: "dark",
      welcomeMessage: "Hey dev 👋 What are you building?",
      systemPrompt:
        "You are an expert coding assistant. Prefer code examples. Ask clarifying questions if the problem is ambiguous.",
      placeholder: "Ask about code, bugs, or architecture...",
    },
  },
  {
    label: "Support",
    emoji: "💬",
    config: {
      botName: "Nexus",
      buttonColor: "#0ea5e9",
      theme: "light",
      welcomeMessage: "Hi! How can our support team help you today?",
      systemPrompt:
        "You are a professional customer support assistant. Be polite, solution-focused, and escalate if needed.",
      placeholder: "Describe your issue...",
    },
  },
  {
    label: "Wellness",
    emoji: "🌿",
    config: {
      botName: "Sage",
      buttonColor: "#10b981",
      theme: "light",
      welcomeMessage: "Welcome! I'm here to support you 🌿",
      systemPrompt:
        "You are a warm wellness assistant. Speak gently. Always recommend a healthcare provider for serious concerns.",
      placeholder: "How are you feeling today?",
    },
  },
  {
    label: "Playful",
    emoji: "✨",
    config: {
      botName: "Luna",
      buttonColor: "#ec4899",
      theme: "light",
      welcomeMessage: "Heyy! ✨ I'm Luna — what can I do for you?",
      systemPrompt:
        "You are Luna, a fun shopping assistant. Help find products, answer shipping questions, use light emojis.",
      placeholder: "What are you looking for?",
    },
  },
];

// ─── Shiki hook ───────────────────────────────────────────────────────────────

function useShiki(code: string) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    codeToHtml(code, { lang: "tsx", theme: "github-dark" }).then(setHtml);
  }, [code]);
  return html;
}

// ─── Mock Chat Preview ────────────────────────────────────────────────────────

function MockChatPreview({ config }: { config: Config }) {
  const isDark = config.theme === "dark";
  const hex = config.buttonColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const accent = (a: number) => `rgba(${r},${g},${b},${a})`;

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

      {/* Chat window — open state */}
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
          {/* Bot message */}
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

          {/* User message */}
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

// ─── Control Row ──────────────────────────────────────────────────────────────

function ControlLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1.5">
      <span className="text-xs font-medium text-gray-300">{label}</span>
      {hint && <span className="text-[10px] text-gray-600 ml-2">{hint}</span>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#00e5a0]/40 focus:bg-white/6 transition-all font-['Geist',sans-serif]"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#00e5a0]/40 focus:bg-white/6 transition-all resize-none font-['Geist',sans-serif] leading-relaxed"
    />
  );
}

function SegmentControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/10 w-full">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex-1 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer"
          style={{
            background:
              value === opt.value
                ? "rgba(0,229,160,0.12)"
                : "rgba(255,255,255,0.03)",
            color: value === opt.value ? "#00e5a0" : "#6b7280",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [config, setConfig] = useState<Config>({ ...DEFAULT });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const applyPreset = (preset: Partial<Config>) =>
    setConfig((c) => ({ ...c, ...preset }));

  // Generated code string
  const code = useMemo(
    () =>
      `import { ChatBot } from '@pratham_jain/chatkit';

<ChatBot
  apiEndpoint="https://your-rag-server.com"
  botName="${config.botName}"
  buttonColor="${config.buttonColor}"
  theme="${config.theme}"
  welcomeMessage="${config.welcomeMessage}"
  systemPrompt="${config.systemPrompt}"
  floatPosition="${config.floatPosition}"
  placeholder="${config.placeholder}"
/>`,
    [config],
  );

  const shikiHtml = useShiki(code);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // hex → rgba
  const hex = config.buttonColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const accent = (a: number) => `rgba(${r},${g},${b},${a})`;

  return (
    <div className="relative pt-24 max-w-7xl mx-auto px-6 py-16">
      {/* ── Dot-grid background ───────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00e5a0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "dotsScroll 18s linear infinite",
          }}
        />
      </div>

      {/* ── Dynamic accent bloom that follows buttonColor ─────────────── */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        animate={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${accent(0.06)}, transparent 70%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      <style>{`
        @keyframes dotsScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 28px; }
        }
        .shiki-pg .shiki, .shiki-pg .shiki code {
          background: transparent !important;
          font-family: 'Geist Mono', 'Fira Code', monospace;
          font-size: 12px;
          line-height: 1.7;
        }
        .shiki-pg .shiki { padding: 20px; margin: 0; }
      `}</style>

      {/* ── Page heading ─────────────────────────────────────────────── */}
      <div className="relative text-center mb-14">
        <span
          aria-hidden
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(72px,16vw,160px)] font-black leading-none text-white/2.5 blur-[3px] tracking-tight whitespace-nowrap"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Play
        </span>
        <div className="relative inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/5">
          <Sparkles size={12} className="text-[#00e5a0]" />
          <span className="text-[11px] font-mono text-[#00e5a0]/70 tracking-widest uppercase">
            live configurator
          </span>
        </div>
        <h1 className="relative text-4xl font-bold text-white mb-4 block">
          Playground
        </h1>
        <div className="mx-auto mb-5 h-px w-24 bg-linear-to-r from-transparent via-[#00e5a0]/60 to-transparent" />
        <p className="relative text-gray-400 max-w-lg mx-auto leading-relaxed text-sm">
          Dial in your config visually. The preview updates live — when you're
          happy, copy the generated code and paste it in.
        </p>
      </div>

      {/* ── Presets ───────────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap justify-center mb-10">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p.config)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 cursor-pointer"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "#7a8aaa",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent(0.4);
              e.currentTarget.style.color = "#f0f4ff";
              e.currentTarget.style.background = accent(0.08);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#7a8aaa";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            <span>{p.emoji}</span>
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setConfig({ ...DEFAULT })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 cursor-pointer border-white/10 bg-white/3 text-gray-600 hover:text-gray-400"
        >
          ↺ Reset
        </button>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        {/* ── LEFT: Controls panel ──────────────────────────────────── */}
        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(13,20,32,0.7)",
            backdropFilter: "blur(20px)",
            boxShadow: `0 0 0 1px ${accent(0.08)}, 0 8px 40px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-white/6"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Sliders size={13} className="text-[#00e5a0]" />
            <span className="text-xs font-mono text-gray-400 tracking-wide">
              configuration
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* Bot Name */}
            <div>
              <ControlLabel label="Bot Name" />
              <TextInput
                value={config.botName}
                onChange={(v) => set("botName", v)}
                placeholder="Assistant"
              />
            </div>

            {/* Button Color */}
            <div>
              <ControlLabel label="Button Color" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => set("buttonColor", e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent"
                    style={{ outline: `2px solid ${accent(0.4)}` }}
                  />
                </div>
                <TextInput
                  value={config.buttonColor}
                  onChange={(v) => set("buttonColor", v)}
                  placeholder="#6366f1"
                />
              </div>
            </div>

            {/* Theme */}
            <div>
              <ControlLabel label="Theme" />
              <SegmentControl
                value={config.theme}
                onChange={(v) => set("theme", v)}
                options={[
                  { label: "☀️  Light", value: "light" },
                  { label: "🌙  Dark", value: "dark" },
                ]}
              />
            </div>

            {/* Float Position */}
            <div>
              <ControlLabel label="Float Position" />
              <SegmentControl
                value={config.floatPosition}
                onChange={(v) => set("floatPosition", v)}
                options={[
                  { label: "↙ Bottom Left", value: "bottom-left" },
                  { label: "↘ Bottom Right", value: "bottom-right" },
                ]}
              />
            </div>

            {/* Welcome Message */}
            <div>
              <ControlLabel
                label="Welcome Message"
                hint="first message shown"
              />
              <TextInput
                value={config.welcomeMessage}
                onChange={(v) => set("welcomeMessage", v)}
                placeholder="Hi! How can I help?"
              />
            </div>

            {/* Placeholder */}
            <div>
              <ControlLabel label="Input Placeholder" />
              <TextInput
                value={config.placeholder}
                onChange={(v) => set("placeholder", v)}
                placeholder="Type a message..."
              />
            </div>

            {/* System Prompt */}
            <div>
              <ControlLabel
                label="System Prompt"
                hint="sent to LLM on every request"
              />
              <TextArea
                value={config.systemPrompt}
                onChange={(v) => set("systemPrompt", v)}
                placeholder="You are a helpful assistant."
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Preview + Code ──────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Tab switcher */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl border border-white/10 w-fit"
            style={{ background: "rgba(13,20,32,0.6)" }}
          >
            {(["preview", "code"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
                style={{
                  background:
                    activeTab === tab ? "rgba(0,229,160,0.1)" : "transparent",
                  color: activeTab === tab ? "#00e5a0" : "#6b7280",
                  border:
                    activeTab === tab
                      ? "1px solid rgba(0,229,160,0.2)"
                      : "1px solid transparent",
                }}
              >
                {tab === "preview" ? <Eye size={12} /> : <Code2 size={12} />}
                {tab === "preview" ? "Preview" : "Code"}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            {activeTab === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  height: 520,
                  borderColor: accent(0.2),
                  background: "rgba(7,11,20,0.6)",
                  boxShadow: `0 0 0 1px ${accent(0.06)}, 0 16px 60px ${accent(0.08)}`,
                }}
              >
                {/* Preview chrome bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border-b"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
                  </div>
                  <div
                    className="flex-1 h-5 rounded-md text-[10px] font-mono flex items-center px-2"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      color: "#4a5568",
                    }}
                  >
                    your-site.com
                  </div>
                </div>
                <div className="h-[calc(100%-41px)] p-4">
                  <MockChatPreview config={config} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  height: 520,
                  borderColor: accent(0.2),
                  background: "rgba(7,11,20,0.95)",
                  boxShadow: `0 0 0 1px ${accent(0.06)}`,
                }}
              >
                {/* Code chrome bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
                    </div>
                    <span className="text-[11px] font-mono text-gray-500">
                      App.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
                      style={{
                        color: accent(0.7),
                        borderColor: accent(0.2),
                        background: accent(0.06),
                      }}
                    >
                      tsx
                    </span>
                    <button
                      onClick={copyCode}
                      className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer"
                      style={
                        copied
                          ? {
                              color: "#00e5a0",
                              borderColor: "rgba(0,229,160,0.4)",
                              background: "rgba(0,229,160,0.1)",
                            }
                          : {
                              color: "#6b7280",
                              borderColor: "rgba(255,255,255,0.1)",
                              background: "rgba(255,255,255,0.04)",
                            }
                      }
                    >
                      {copied ? <Check size={10} /> : <Copy size={10} />}
                      {copied ? "copied" : "copy"}
                    </button>
                  </div>
                </div>

                {/* Code */}
                <div className="h-[calc(100%-41px)] overflow-auto">
                  {shikiHtml ? (
                    <div
                      className="shiki-pg"
                      dangerouslySetInnerHTML={{ __html: shikiHtml }}
                    />
                  ) : (
                    <pre className="p-5 text-xs font-mono text-indigo-300 leading-relaxed">
                      {code}
                    </pre>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse"
              style={{ boxShadow: "0 0 6px #00e5a0" }}
            />
            <span className="text-[11px] font-mono text-gray-600">
              preview updates live as you type
            </span>
          </div>
        </div>
      </div>

      {/* ── Live demo section ─────────────────────────────────────────── */}
      <div className="relative mt-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase">
            live demo
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div
          className="rounded-2xl border border-white/10 p-8 text-center"
          style={{
            background: "rgba(13,20,32,0.5)",
            backdropFilter: "blur(20px)",
          }}
        >
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            The bot below is powered by your own RAG server, trained on your
            README and docs.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00e5a0]/5 border border-[#00e5a0]/15 rounded-lg text-[#00e5a0]/60 text-xs font-mono">
            👇 Deploy your RAG server to enable the live bot
          </div>

          {/* ChatBot goes here once RAG server is deployed */}

          <ChatBot
            apiEndpoint="https://reusable-chatbot.onrender.com"
            botName="Chatbot Docs Bot"
            buttonColor="#6366f1"
            theme="dark"
            welcomeMessage="Ask me anything about @pratham_jain/chatkit!"
            systemPrompt="You are a helpful assistant for the @pratham_jain/chatkit npm package."
            floatPosition="bottom-right"
          />
        </div>
      </div>
    </div>
  );
}

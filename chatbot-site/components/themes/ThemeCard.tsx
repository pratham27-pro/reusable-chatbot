"use client";

import type { Theme } from "@/lib/themes";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";

// ─── Shiki hook ───────────────────────────────────────────────────────────────

function useShiki(code: string) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    codeToHtml(code, { lang: "tsx", theme: "github-dark" }).then(setHtml);
  }, [code]);
  return html;
}

// ─── Code generator (unchanged logic) ────────────────────────────────────────

function generateCode(theme: Theme): string {
  const { props } = theme;
  return `<ChatBot
  apiEndpoint="https://your-rag-server.com"
  botName="${props.botName}"
  buttonColor="${props.buttonColor}"
  theme="${props.theme}"
  welcomeMessage="${props.welcomeMessage}"
  systemPrompt="${props.systemPrompt}"
/>`;
}

// ─── ThemeCard ────────────────────────────────────────────────────────────────

export function ThemeCard({ theme }: { theme: Theme }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const code = generateCode(theme);
  const shikiHtml = useShiki(code);

  // ── Motion values for tilt ──────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  // ── Spotlight position ──────────────────────────────────────────────────
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotX.set((x + 0.5) * 100);
    spotY.set((y + 0.5) * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // hex → rgba helper for spotlight tint
  const hex = theme.props.buttonColor;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const accentRgba = (a: number) => `rgba(${r},${g},${b},${a})`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped((f) => !f)}
      style={{
        perspective: 900,
        rotateX: flipped ? 0 : rotateX,
        rotateY: flipped ? 0 : rotateY,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
      whileHover={{ scale: flipped ? 1 : 1.015 }}
      transition={{ scale: { duration: 0.2 } }}
      className="relative h-105 select-none"
    >
      {/* ── FRONT ────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Animated border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 0 1px ${accentRgba(0.25)}, 0 8px 40px ${accentRgba(0.08)}`,
          }}
        />

        {/* Card base */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "rgba(13,20,32,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        {/* Cursor spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-1"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(280px circle at ${x}% ${y}%, ${accentRgba(0.12)}, transparent 70%)`,
            ),
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentRgba(0.7)}, transparent)`,
          }}
        />

        {/* Preview area */}
        <div
          className="relative h-48 shrink-0 z-2"
          style={{ backgroundColor: theme.previewBg }}
        >
          {/* Bloom behind preview using buttonColor */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 50% 100%, ${accentRgba(0.18)}, transparent)`,
            }}
          />

          {/* Mock chat window */}
          <div
            className="absolute left-4 top-4 right-4 rounded-xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor:
                theme.props.theme === "dark" ? "#1e1e2e" : "#ffffff",
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
          >
            {/* Mock header */}
            <div
              className="px-3 py-2 flex items-center gap-2"
              style={{ backgroundColor: theme.props.buttonColor }}
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px]">
                🤖
              </div>
              <span className="text-white text-xs font-semibold">
                {theme.props.botName}
              </span>
              <span className="ml-auto text-white/60 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />{" "}
                Online
              </span>
            </div>
            {/* Mock message */}
            <div className="p-3">
              <div
                className="text-[10px] px-2 py-1.5 rounded-xl rounded-tl-sm max-w-[85%] leading-relaxed"
                style={{
                  backgroundColor:
                    theme.props.theme === "dark" ? "#313244" : "#f3f4f6",
                  color: theme.props.theme === "dark" ? "#e2e8f0" : "#1f2937",
                }}
              >
                {theme.props.welcomeMessage}
              </div>
            </div>
          </div>

          {/* Mock FAB */}
          <div
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg text-white text-base"
            style={{
              backgroundColor: theme.props.buttonColor,
              boxShadow: `0 4px 20px ${accentRgba(0.5)}`,
            }}
          >
            💬
          </div>
        </div>

        {/* Info area */}
        <div className="relative z-2 p-4 flex flex-col gap-2 flex-1">
          <div>
            <h3 className="font-semibold text-white text-[15px]">
              {theme.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              {theme.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {theme.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide"
                style={{
                  background: accentRgba(0.08),
                  color: accentRgba(0.7),
                  border: `1px solid ${accentRgba(0.18)}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Flip hint */}
          <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
            <RotateCcw size={9} className="opacity-60" /> click to view code
          </p>
        </div>
      </motion.div>

      {/* ── BACK ─────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          rotateY: -180,
        }}
        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Base */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "rgba(7,11,20,0.97)",
            border: `1px solid ${accentRgba(0.25)}`,
            boxShadow: `0 0 0 1px ${accentRgba(0.1)}, 0 8px 40px rgba(0,0,0,0.6)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentRgba(0.8)}, transparent)`,
          }}
        />

        {/* Header bar */}
        <div
          className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
            </div>
            <span className="text-[11px] text-gray-500 font-mono">
              {theme.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
              style={{
                color: accentRgba(0.6),
                borderColor: accentRgba(0.2),
                background: accentRgba(0.06),
              }}
            >
              tsx
            </span>
            <button
              onClick={copy}
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

        {/* Shiki code */}
        <div className="relative z-10 flex-1 overflow-auto">
          {shikiHtml ? (
            <>
              <div
                className="shiki-card-wrap text-[12px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: shikiHtml }}
              />
              <style>{`
                .shiki-card-wrap .shiki,
                .shiki-card-wrap .shiki code {
                  background: transparent !important;
                  font-family: 'Geist Mono', 'Fira Code', monospace;
                }
                .shiki-card-wrap .shiki {
                  padding: 16px 20px;
                  margin: 0;
                }
              `}</style>
            </>
          ) : (
            <pre className="p-5 text-[12px] font-mono text-indigo-300 leading-relaxed">
              {code}
            </pre>
          )}
        </div>

        {/* Footer — flip back hint */}
        <div
          className="relative z-10 px-4 py-2.5 border-t flex items-center justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <p className="text-[10px] text-gray-600 flex items-center gap-1">
            <RotateCcw size={9} className="opacity-50" /> click card to flip
            back
          </p>
          <button
            onClick={() => setFlipped(false)}
            className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors font-mono cursor-pointer"
          >
            ← back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { ChatBot } from "@pratham_jain/chatkit";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { ConfigPanel } from "./_components/ConfigPanel";
import { PlaygroundBackground } from "./_components/PlaygroundBackground";
import { PreviewPanel } from "./_components/PreviewPanel";
import { DEFAULT, PRESETS, type Config } from "./_components/types";

export default function PlaygroundPage() {
  const [config, setConfig] = useState<Config>({ ...DEFAULT });

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const applyPreset = (preset: Partial<Config>) =>
    setConfig((c) => ({ ...c, ...preset }));

  return (
    <>
      {/* ChatBot outside everything — avoids backdrop-filter stacking context trap */}
      <ChatBot
        apiEndpoint="https://reusable-chatbot.onrender.com"
        botName="Chatbot Docs Bot"
        buttonColor="#6366f1"
        theme="dark"
        welcomeMessage="Ask me anything about @pratham_jain/chatkit!"
        systemPrompt="You are a helpful assistant for the @pratham_jain/chatkit npm package."
        floatPosition="bottom-right"
        knowledgeBaseEnabled={true}
        collectionId="my-chatkit-docs"
        persistHistory={false}
        enableVoice={true}
      />

      {/* Background layers — z-index 0, never fights navbar z-50 */}
      <PlaygroundBackground accentColor={config.buttonColor} />

      {/* Page content — z-index 1 so it sits above background but below navbar */}
      <div
        className="relative pt-24 max-w-7xl mx-auto px-6 py-16"
        style={{ zIndex: 1 }}
      >
        {/* Heading */}
        <div className="relative text-center mb-14 overflow-hidden isolate">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(72px,16vw,160px)] font-black leading-none text-white/2.5 blur-[3px] tracking-tight whitespace-nowrap"
            style={{ fontFamily: "Geist, sans-serif", top: "50%", zIndex: -1 }}
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

        {/* Presets */}
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
                const h = config.buttonColor.replace("#", "");
                const r = parseInt(h.slice(0, 2), 16),
                  g = parseInt(h.slice(2, 4), 16),
                  b = parseInt(h.slice(4, 6), 16);
                e.currentTarget.style.borderColor = `rgba(${r},${g},${b},0.4)`;
                e.currentTarget.style.color = "#f0f4ff";
                e.currentTarget.style.background = `rgba(${r},${g},${b},0.08)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#7a8aaa";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <span>{p.emoji}</span> {p.label}
            </button>
          ))}
          <button
            onClick={() => setConfig({ ...DEFAULT })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 cursor-pointer border-white/10 bg-white/3 text-gray-600 hover:text-gray-400"
          >
            ↺ Reset
          </button>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start pt-4 mt-2">
          <ConfigPanel config={config} set={set} />
          <PreviewPanel config={config} />
        </div>

        {/* Live demo divider */}
        <div className="relative mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase">
              live demo
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div
            className="rounded-2xl border border-white/10 p-8 text-center"
            style={{ background: "rgba(13,20,32,0.5)" }}
          >
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              The bot at the bottom right is powered by Pratham's RAG server,
              trained on his own README and docs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

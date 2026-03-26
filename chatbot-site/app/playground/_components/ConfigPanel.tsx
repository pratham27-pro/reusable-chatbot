"use client";
import { Sliders } from "lucide-react";
import type { Config } from "./types";
import { makeAccent } from "./types";
import { ControlLabel } from "./ui/ControlLabel";
import { SegmentControl } from "./ui/SegmentControl";
import { TextArea } from "./ui/TextArea";
import { TextInput } from "./ui/TextInput";

interface Props {
  config: Config;
  set: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

export function ConfigPanel({ config, set }: Props) {
  const accent = makeAccent(config.buttonColor);

  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{
        background: "rgba(13,20,32,0.7)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 0 0 1px ${accent(0.08)}, 0 8px 40px rgba(0,0,0,0.3)`,
        position: "relative",
        zIndex: 1,
        isolation: "isolate",
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
        <div>
          <ControlLabel label="Bot Name" />
          <TextInput
            value={config.botName}
            onChange={(v) => set("botName", v)}
            placeholder="Assistant"
          />
        </div>

        <div>
          <ControlLabel label="Button Color" />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.buttonColor}
              onChange={(e) => set("buttonColor", e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent"
              style={{ outline: `2px solid ${accent(0.4)}` }}
            />
            <TextInput
              value={config.buttonColor}
              onChange={(v) => set("buttonColor", v)}
              placeholder="#6366f1"
            />
          </div>
        </div>

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

        <div>
          <ControlLabel label="Welcome Message" hint="first message shown" />
          <TextInput
            value={config.welcomeMessage}
            onChange={(v) => set("welcomeMessage", v)}
            placeholder="Hi! How can I help?"
          />
        </div>

        <div>
          <ControlLabel label="Input Placeholder" />
          <TextInput
            value={config.placeholder}
            onChange={(v) => set("placeholder", v)}
            placeholder="Type a message..."
          />
        </div>

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
  );
}

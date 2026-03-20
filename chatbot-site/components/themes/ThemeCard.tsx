"use client";
import type { Theme } from "@/lib/themes";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

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

export function ThemeCard({ theme }: { theme: Theme }) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const code = generateCode(theme);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-gray-900 flex flex-col">
      {/* Preview area */}
      <div
        className="h-48 relative flex items-end justify-end p-4"
        style={{ backgroundColor: theme.previewBg }}
      >
        {/* Mock chat window snippet */}
        <div
          className="absolute left-4 top-4 right-4 rounded-xl overflow-hidden shadow-xl"
          style={{
            backgroundColor:
              theme.props.theme === "dark" ? "#1e1e2e" : "#ffffff",
          }}
        >
          {/* Mock header */}
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{ backgroundColor: theme.props.buttonColor }}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
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
              className="text-[10px] px-2 py-1.5 rounded-xl rounded-tl-sm max-w-[85%]"
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
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white text-lg"
          style={{ backgroundColor: theme.props.buttonColor }}
        >
          💬
        </div>
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-semibold text-white">{theme.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{theme.description}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code block */}
        {showCode && (
          <pre className="text-[11px] bg-gray-950 rounded-lg p-3 overflow-x-auto text-indigo-300 font-mono leading-relaxed">
            {code}
          </pre>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => setShowCode((s) => !s)}
            className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-colors"
          >
            {showCode ? "Hide Code" : "View Code"}
          </button>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

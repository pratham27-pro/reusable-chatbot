"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, Copy, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { codeToHtml } from "shiki";
import { MockChatPreview } from "./MockChatPreview";
import type { Config } from "./types";
import { makeAccent } from "./types";

interface Props {
  config: Config;
}

export function PreviewPanel({ config }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [shikiHtml, setShikiHtml] = useState<string | null>(null);
  const accent = makeAccent(config.buttonColor);

  const code = useMemo(
    () => `import { ChatBot } from '@pratham_jain/chatkit';

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

  useEffect(() => {
    codeToHtml(code, { lang: "tsx", theme: "github-dark" }).then(setShikiHtml);
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chromeDots = (
    <div className="flex gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
    </div>
  );

  return (
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
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {chromeDots}
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
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-3">
                {chromeDots}
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
  );
}

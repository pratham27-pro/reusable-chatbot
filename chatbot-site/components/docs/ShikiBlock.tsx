"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface ShikiBlockProps {
  children: string;
  lang?: string;
  label?: string;
  className?: string;
}

export function ShikiBlock({
  children,
  lang = "tsx",
  label,
  className = "",
}: ShikiBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    codeToHtml(children.trim(), {
      lang,
      theme: "github-dark",
    }).then(setHtml);
  }, [children, lang]);

  const copy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 overflow-hidden ${className}`}
      style={{
        background: "rgba(7,11,20,0.85)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 0 0 1px rgba(0,229,160,0.07), 0 1px 32px rgba(0,229,160,0.04)",
      }}
    >
      {/* Top accent glow line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#00e5a0]/50 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/3">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-80" />
          </div>
          {label && (
            <span className="text-xs text-gray-500 font-mono tracking-wide">
              {label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Language badge pill */}
          <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border border-[#00e5a0]/20 text-[#00e5a0]/60 bg-[#00e5a0]/5">
            {lang}
          </span>

          {/* Copy button */}
          <button
            onClick={copy}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer ${
              copied
                ? "text-[#00e5a0] border-[#00e5a0]/40 bg-[#00e5a0]/10"
                : "text-gray-500 border-white/10 bg-white/5 hover:text-gray-300 hover:border-white/20"
            }`}
          >
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        {html ? (
          <div
            className="shiki-wrap text-[13px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-5 text-sm font-mono text-indigo-300 overflow-x-auto leading-relaxed">
            {children}
          </pre>
        )}
      </div>

      {/* Shiki override — make its background transparent */}
      <style>{`
        .shiki-wrap .shiki,
        .shiki-wrap .shiki code {
          background: transparent !important;
          font-family: 'Geist Mono', 'Fira Code', monospace;
        }
        .shiki-wrap .shiki {
          padding: 20px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

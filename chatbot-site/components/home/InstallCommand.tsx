"use client";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

const commands = [
  { label: "npm", cmd: "npm install @pratham/chatbot" },
  { label: "pnpm", cmd: "pnpm add @pratham/chatbot" },
  { label: "yarn", cmd: "yarn add @pratham/chatbot" },
];

export function InstallCommand() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(commands[active].cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Package manager tabs */}
      <div className="flex gap-1 mb-2">
        {commands.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setActive(i)}
            className="px-3 py-1 rounded-md text-xs font-mono transition-all"
            style={
              active === i
                ? { background: "rgba(0,229,160,0.15)", color: "#00e5a0", border: "1px solid rgba(0,229,160,0.25)" }
                : { background: "rgba(255,255,255,0.04)", color: "#7a8aaa", border: "1px solid rgba(255,255,255,0.06)" }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Command box */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Terminal size={15} style={{ color: "#00e5a0" }} className="shrink-0" />
        <code className="flex-1 text-sm font-mono" style={{ color: "#d0daf0" }}>
          {commands[active].cmd}
        </code>
        <button
          onClick={copy}
          className="transition-all shrink-0 p-1 rounded-md hover:bg-white/10"
          style={{ color: copied ? "#00e5a0" : "#7a8aaa" }}
          aria-label="Copy command"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
    </div>
  );
}

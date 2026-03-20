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
    <div className="w-full max-w-lg mx-auto">
      {/* Tab switcher */}
      <div className="flex gap-1 mb-2">
        {commands.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setActive(i)}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              active === i
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Command box */}
      <div className="flex items-center gap-3 bg-gray-900 border border-white/10 rounded-xl px-4 py-3">
        <Terminal size={16} className="text-indigo-400 shrink-0" />
        <code className="flex-1 text-sm font-mono text-gray-100">
          {commands[active].cmd}
        </code>
        <button
          onClick={copy}
          className="text-gray-400 hover:text-white transition-colors shrink-0"
          aria-label="Copy command"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

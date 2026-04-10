"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const props = [
  {
    name: "apiEndpoint",
    type: "string",
    required: false,
    default: "—",
    desc: "URL of your backend server. Required if apiKey is not provided.",
  },
  {
    name: "apiKey",
    type: "string",
    required: false,
    default: "—",
    desc: "Groq API key for direct browser-to-Groq calls. Use only for demos — key is visible in bundle. Not needed if apiEndpoint is provided.",
  },
  {
    name: "botName",
    type: "string",
    required: false,
    default: '"Assistant"',
    desc: "Name shown in chat header",
  },
  {
    name: "botAvatar",
    type: "string",
    required: false,
    default: "Robot icon",
    desc: "URL to custom avatar image",
  },
  {
    name: "buttonColor",
    type: "string",
    required: false,
    default: '"#6366f1"',
    desc: "FAB button and header color (any CSS color)",
  },
  {
    name: "theme",
    type: '"light" | "dark"',
    required: false,
    default: '"light"',
    desc: "Color scheme of the chat window",
  },
  {
    name: "welcomeMessage",
    type: "string",
    required: false,
    default: '"Hi! How can I help?"',
    desc: "First message shown before any chat",
  },
  {
    name: "systemPrompt",
    type: "string",
    required: false,
    default: '"You are a helpful assistant."',
    desc: "Instructions sent to the LLM on every request",
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    default: '"Type a message..."',
    desc: "Input field placeholder text",
  },
  {
    name: "floatPosition",
    type: '"bottom-right" | "bottom-left"',
    required: false,
    default: '"bottom-right"',
    desc: "Initial position of the FAB button",
  },
  {
    name: "knowledgeBaseEnabled",
    type: "boolean",
    required: false,
    default: "false",
    desc: "Show a 📎 upload button in the chat window for runtime document uploads",
  },
  {
    name: "knowledgeBaseUrl",
    type: "string",
    required: false,
    default: "—",
    desc: "Public URL to a markdown/text file (e.g. raw GitHub URL). Server fetches and ingests it automatically on first use. Coming soon.",
  },
  {
    name: "collectionId",
    type: "string",
    required: false,
    default: '"default"',
    desc: "Unique namespace for your knowledge base in Pinecone. Use a different ID per app to keep documents isolated from other users.",
  },
  {
    name: "enableVoice",
    type: "boolean",
    required: false,
    default: "false",
    desc: "Enable microphone input and text-to-speech output",
  },
  {
    name: "persistHistory",
    type: "boolean",
    required: false,
    default: "true",
    desc: "Save chat history to localStorage across sessions",
  },
];

export function PropsTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 overflow-hidden"
    >
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#00e5a0]/40 to-transparent" />

      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10">
          <tr
            className="border-b border-white/10"
            style={{
              background: "rgba(7,11,20,0.85)",
              backdropFilter: "blur(16px)",
            }}
          >
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Prop
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Type
            </th>
            {/* ← fixed: table-cell max-md:hidden instead of hidden md:table-cell */}
            <th className="text-left px-4 py-3 text-gray-400 font-medium table-cell max-md:hidden">
              Default
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium table-cell max-lg:hidden">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <motion.tr
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`border-b border-white/5 transition-colors duration-150 relative ${
                hoveredRow === i
                  ? "bg-[#00e5a0]/4"
                  : i % 2 === 0
                    ? "bg-transparent"
                    : "bg-white/2"
              }`}
            >
              <td className="px-4 py-3 relative">
                <span
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-all duration-200"
                  style={{
                    background: hoveredRow === i ? "#00e5a0" : "transparent",
                    boxShadow: hoveredRow === i ? "0 0 8px #00e5a0" : "none",
                  }}
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <code
                    className={`font-mono text-[13px] px-2 py-0.5 rounded-md transition-colors duration-150 ${
                      hoveredRow === i
                        ? "text-[#00e5a0] bg-[#00e5a0]/10"
                        : "text-indigo-400 bg-indigo-400/10"
                    }`}
                  >
                    {p.name}
                  </code>
                  {p.required && (
                    <span className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/20 px-1.5 py-0.5 rounded-full leading-none">
                      required
                    </span>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">
                <code className="text-emerald-400 font-mono text-xs bg-emerald-400/8 px-2 py-0.5 rounded-md border border-emerald-400/15">
                  {p.type}
                </code>
              </td>

              {/* ← fixed */}
              <td className="px-4 py-3 table-cell max-md:hidden">
                <code className="text-[#7a8aaa] font-mono text-xs">
                  {p.default}
                </code>
              </td>

              <td className="px-4 py-3 text-gray-400 text-xs table-cell max-lg:hidden leading-relaxed">
                {p.desc}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

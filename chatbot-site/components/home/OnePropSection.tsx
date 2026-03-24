"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const codeLines = [
  {
    text: 'import { ChatBot } from "@pratham_jain/chatkit";',
    color: "#7a8aaa",
  },
  { text: "", color: "transparent" },
  { text: "export default function App() {", color: "#d0daf0" },
  { text: "  return (", color: "#d0daf0" },
  { text: "    <div>", color: "#7a8aaa" },
  { text: "      <YourApp />", color: "#7a8aaa" },
  { text: "", color: "transparent" },
  {
    text: '      <ChatBot apiEndpoint="https://your-server.com" />',
    color: "#00e5a0",
    highlight: true,
  },
  { text: "    </div>", color: "#7a8aaa" },
  { text: "  );", color: "#d0daf0" },
  { text: "}", color: "#d0daf0" },
];

function CodeLine({
  line,
  index,
  isVisible,
}: {
  line: (typeof codeLines)[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={`flex items-center gap-3 py-0.5 rounded-md px-1 ${line.highlight ? "shimmer-line" : ""}`}
    >
      <span
        className="w-6 text-right text-xs select-none"
        style={{ color: "#3d4f6b" }}
      >
        {index + 1}
      </span>
      <pre
        className="text-sm font-mono leading-relaxed"
        style={{ color: line.color }}
      >
        {line.text || " "}
      </pre>
    </motion.div>
  );
}

export function OnePropSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(
        () => setShowWidget(true),
        codeLines.length * 60 + 800,
      );
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-100 h-100 -right-20 top-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              color: "#00e5a0",
              background: "rgba(0,229,160,0.08)",
              border: "1px solid rgba(0,229,160,0.15)",
            }}
          >
            Integration
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mt-4 mb-4"
            style={{ color: "#f0f4ff" }}
          >
            One prop.{" "}
            <span
              style={{
                color: "#00e5a0",
                textShadow: "0 0 30px rgba(0,229,160,0.3)",
              }}
            >
              Done.
            </span>
          </h2>
          <p className="text-lg max-w-md mx-auto" style={{ color: "#7a8aaa" }}>
            No config files. No wrappers. No 47 npm installs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Code editor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Editor header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "#7a8aaa" }}
              >
                App.tsx
              </span>
            </div>
            <div className="p-5 space-y-0.5">
              {codeLines.map((line, i) => (
                <CodeLine key={i} line={line} index={i} isVisible={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Result */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <div
                className="h-px flex-1"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
              <span
                className="text-sm font-mono px-3 py-1 rounded-full"
                style={{
                  color: "#7a8aaa",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                instant result
              </span>
              <div
                className="h-px flex-1"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
            </motion.div>

            {/* Mini chat preview with appear animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={showWidget ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass rounded-2xl p-4 w-full max-w-xs"
              style={{
                boxShadow:
                  "0 0 40px rgba(0,229,160,0.1), 0 0 0 1px rgba(0,229,160,0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                    color: "#070b14",
                  }}
                >
                  AI
                </div>
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#f0f4ff" }}
                  >
                    Assistant
                  </p>
                  <p className="text-[10px]" style={{ color: "#00e5a0" }}>
                    ● Online
                  </p>
                </div>
                <motion.span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: "rgba(0,229,160,0.1)",
                    color: "#00e5a0",
                    border: "1px solid rgba(0,229,160,0.2)",
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Live
                </motion.span>
              </div>

              <div className="space-y-2">
                <div
                  className="rounded-2xl px-3 py-2 text-xs leading-relaxed w-fit max-w-[85%]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#d0daf0",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Hi! I&apos;m ready to answer questions from your docs. 👋
                </div>
              </div>

              <div
                className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-xs flex-1" style={{ color: "#3d4f6b" }}>
                  Ask anything...
                </span>
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(0,229,160,0.15)",
                    color: "#00e5a0",
                  }}
                >
                  →
                </div>
              </div>
            </motion.div>

            {showWidget && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-center font-mono"
                style={{ color: "#00e5a0" }}
              >
                ✓ Chatbot mounted in ~60s
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

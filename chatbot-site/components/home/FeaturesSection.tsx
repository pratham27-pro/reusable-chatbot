"use client";
import { motion, useInView } from "framer-motion";
import { FileText, Github, Mic, Moon, Move, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Zap,
    title: "60-second setup",
    desc: "One prop. No config files. No wrappers. Ship faster.",
    accent: "#00e5a0",
    bg: "rgba(0,229,160,0.08)",
    border: "rgba(0,229,160,0.15)",
    size: "lg",
  },
  {
    icon: FileText,
    title: "Text file knowledge base",
    desc: "Upload text files. Bot answers from them. Powered by ChromaDB + embeddings.",
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.15)",
    size: "sm",
  },
  {
    icon: Mic,
    title: "Voice support",
    desc: "Speak. Hear back. Web Speech API, zero config.",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.15)",
    size: "sm",
  },
  {
    icon: Moon,
    title: "Light & dark themes",
    desc: "One prop to match your app. Works with system preference.",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.15)",
    size: "sm",
  },
  {
    icon: Move,
    title: "Fully draggable",
    desc: "Users drag the widget wherever they want.",
    accent: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.15)",
    size: "sm",
  },
  {
    icon: Github,
    title: "100% free & open source",
    desc: "No credit card. No paid tier. Fork it. Customize it. Own it.",
    accent: "#00e5a0",
    bg: "rgba(0,229,160,0.06)",
    border: "rgba(0,229,160,0.12)",
    size: "lg",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              color: "#8b5cf6",
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            Features
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mt-4"
            style={{ color: "#f0f4ff" }}
          >
            Everything included.{" "}
            <span style={{ color: "#7a8aaa" }}>Nothing extra.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass rounded-2xl p-6 cursor-default group transition-all"
                style={{
                  border: `1px solid ${feature.border}`,
                  background: feature.bg,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    background: `${feature.accent}15`,
                    border: `1px solid ${feature.accent}25`,
                  }}
                >
                  <Icon size={20} style={{ color: feature.accent }} />
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "#f0f4ff" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7a8aaa" }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {[
            "React",
            "FastAPI",
            "Groq",
            "ChromaDB",
            "TypeScript",
            "Web Speech API",
          ].map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                color: "#7a8aaa",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Cpu, FileText, MessageSquare } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: FileText,
    label: "Your Text File",
    description: "Upload any text file — docs, manuals, FAQs",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    icon: Cpu,
    label: "RAG Processing",
    description: "Chunked, embedded, stored in ChromaDB",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    icon: MessageSquare,
    label: "Smart Answers",
    description: "Groq LLM returns grounded, relevant responses",
    color: "#00e5a0",
    bg: "rgba(0,229,160,0.1)",
    border: "rgba(0,229,160,0.2)",
  },
];

const chatPreview = [
  {
    q: "What is the return policy?",
    a: "According to your uploaded document, returns are accepted within 30 days of purchase with original receipt.",
  },
  {
    q: "How do I contact support?",
    a: "Your docs mention support@company.com and live chat (Mon–Fri, 9am–5pm EST).",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[500px] h-[500px] -left-40 top-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              color: "#f59e0b",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            How It Works
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mt-4 mb-4"
            style={{ color: "#f0f4ff" }}
          >
            Text File → Answer.{" "}
            <span style={{ color: "#7a8aaa" }}>That simple.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Flow diagram */}
          <div>
            <div className="space-y-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: step.bg,
                          border: `1px solid ${step.border}`,
                        }}
                      >
                        <Icon size={22} style={{ color: step.color }} />
                      </div>
                      {i < steps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                          className="w-px h-8 mt-2 origin-top"
                          style={{
                            background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
                          }}
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <p
                        className="font-semibold text-base"
                        style={{ color: "#f0f4ff" }}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm mt-1" style={{ color: "#7a8aaa" }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-8 p-4 rounded-2xl"
              style={{
                background: "rgba(0,229,160,0.05)",
                border: "1px solid rgba(0,229,160,0.15)",
              }}
            >
              <p className="text-sm font-mono" style={{ color: "#7a8aaa" }}>
                <span style={{ color: "#00e5a0" }}>Stack:</span> Groq LLM +
                ChromaDB + FastAPI
              </p>
            </motion.div>
          </div>

          {/* Chat examples */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
          >
            {/* PDF indicator */}
            <div
              className="flex items-center gap-3 px-5 py-3 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(99,102,241,0.05)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(99,102,241,0.2)",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <FileText size={15} style={{ color: "#6366f1" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#f0f4ff" }}
                >
                  company_handbook.txt
                </p>
                <p className="text-[10px]" style={{ color: "#7a8aaa" }}>
                  24 pages · loaded ✓
                </p>
              </div>
              <ArrowRight
                size={14}
                className="ml-auto"
                style={{ color: "#7a8aaa" }}
              />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                  color: "#070b14",
                }}
              >
                AI
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-5 space-y-4">
              {chatPreview.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl px-3.5 py-2 text-sm max-w-[85%]"
                      style={{
                        background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                        color: "#070b14",
                        fontWeight: 500,
                        borderRadius: "14px 14px 4px 14px",
                      }}
                    >
                      {item.q}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div
                      className="rounded-2xl px-3.5 py-2 text-sm max-w-[92%] leading-relaxed"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "#d0daf0",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "14px 14px 14px 4px",
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

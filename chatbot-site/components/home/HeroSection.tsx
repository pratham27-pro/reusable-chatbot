"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingChatDemo } from "./FloatingChatDemo";
import { InstallCommand } from "./InstallCommand";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div
        className="orb w-[600px] h-[600px] -top-32 -left-48"
        style={{ background: "radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="orb w-[500px] h-[500px] top-20 -right-32"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="orb w-[300px] h-[300px] bottom-0 left-1/2 -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div style={{ y, opacity }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(0,229,160,0.08)",
                border: "1px solid rgba(0,229,160,0.2)",
              }}
            >
              <Star size={12} fill="#00e5a0" className="text-[#00e5a0]" />
              <span className="text-xs font-medium" style={{ color: "#00e5a0" }}>
                Open source · Free forever · No credit card
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: "#f0f4ff" }}
            >
              Add a chatbot
              <br />
              to your app in{" "}
              <span
                className="relative"
                style={{
                  color: "#00e5a0",
                  textShadow: "0 0 40px rgba(0,229,160,0.4)",
                }}
              >
                60 seconds.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-10 leading-relaxed max-w-md"
              style={{ color: "#7a8aaa" }}
            >
              RAG-powered. PDF knowledge base. Voice support. One prop.
              <br />
              Drop it in. It just works.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <InstallCommand />

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                    color: "#070b14",
                    boxShadow: "0 0 24px rgba(0,229,160,0.3)",
                  }}
                >
                  Get Started <ArrowRight size={15} />
                </Link>
                <Link
                  href="/themes"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#f0f4ff",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Browse Themes
                </Link>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 pt-8"
            >
              <div className="flex -space-x-2">
                {["#2563eb", "#7c3aed", "#db2777", "#ea580c"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#070b14] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: color, zIndex: 4 - i }}
                  >
                    {["J", "M", "A", "R"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: "#7a8aaa" }}>
                Loved by developers building fast
              </p>
            </motion.div>
          </motion.div>

          {/* Right — live chat demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Glow behind chat */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,229,160,0.12) 0%, transparent 60%)",
                filter: "blur(20px)",
              }}
            />
            <div className="float-anim">
              <FloatingChatDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

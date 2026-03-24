"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Center glow */}
      <div
        className="orb w-175 h-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,229,160,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 md:p-16"
          style={{
            boxShadow:
              "0 0 80px rgba(0,229,160,0.06), 0 40px 100px rgba(0,0,0,0.4)",
            border: "1px solid rgba(0,229,160,0.1)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(0,229,160,0.08)",
              border: "1px solid rgba(0,229,160,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
            <span className="text-xs font-medium" style={{ color: "#00e5a0" }}>
              Ready to ship
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: "#f0f4ff" }}
          >
            Your app is one{" "}
            <span
              style={{
                color: "#00e5a0",
                textShadow: "0 0 30px rgba(0,229,160,0.3)",
              }}
            >
              &lt;ChatBot /&gt;
            </span>{" "}
            away.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg mb-10 max-w-md mx-auto"
            style={{ color: "#7a8aaa" }}
          >
            Free forever. No account needed. Open source.
            <br />
            Start in 60 seconds or don&apos;t — it&apos;s that easy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/docs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #00e5a0, #00b37d)",
                color: "#070b14",
                boxShadow: "0 0 30px rgba(0,229,160,0.3)",
              }}
            >
              Read the Docs <ArrowRight size={15} />
            </Link>

            <Link
              href="/playground"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#f0f4ff",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Terminal size={15} />
              Try the Playground
            </Link>
          </motion.div>

          {/* Quick install reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl font-mono text-sm"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#d0daf0",
            }}
          >
            <span style={{ color: "#7a8aaa" }}>$</span>
            <span>npm install @pratham_jain/chatkit</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

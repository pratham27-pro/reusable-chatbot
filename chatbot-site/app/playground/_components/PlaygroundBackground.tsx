"use client";
import { useEffect, useRef } from "react";

interface Props {
  accentColor: string;
}

export function PlaygroundBackground({ accentColor }: Props) {
  const bloomRef = useRef<HTMLDivElement>(null);

  // Use a plain div with CSS transition instead of motion.div
  // motion.div applies transform internally → creates stacking context → breaks navbar z-index
  useEffect(() => {
    if (!bloomRef.current) return;
    const h = accentColor.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    bloomRef.current.style.background = `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(${r},${g},${b},0.06), transparent 70%)`;
  }, [accentColor]);

  return (
    <>
      {/* Dot grid — z-index explicitly below navbar's z-50 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{
          zIndex: 0, // ← explicit, never fights navbar
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00e5a0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "dotsScroll 18s linear infinite",
          }}
        />
      </div>

      {/* Accent bloom — plain div, CSS transition, NO framer motion transform */}
      <div
        ref={bloomRef}
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0, // ← explicit
          transition: "background 0.6s ease", // replaces motion.div animate
        }}
      />

      <style>{`
        @keyframes dotsScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 28px; }
        }
        .shiki-pg .shiki,
        .shiki-pg .shiki code {
          background: transparent !important;
          font-family: 'Geist Mono', 'Fira Code', monospace;
          font-size: 12px;
          line-height: 1.7;
        }
        .shiki-pg .shiki { padding: 20px; margin: 0; }
      `}</style>
    </>
  );
}

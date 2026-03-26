"use client";
import { useEffect, useRef } from "react";

interface Props {
  accentColor: string;
}

export function PlaygroundBackground({ accentColor }: Props) {
  const bloomRef = useRef<HTMLDivElement>(null);

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
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      >
        <div
          className="dots-scroll-bg absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00e5a0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div
        ref={bloomRef}
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          transition: "background 0.6s ease",
        }}
      />
    </>
  );
}

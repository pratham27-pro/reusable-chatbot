import { ThemeCard } from "@/components/themes/ThemeCard";
import { themes } from "@/lib/themes";

export default function ThemesPage() {
  return (
    <div className="relative pt-24 max-w-6xl mx-auto px-6 py-16">
      {/* ── Dot-grid background (matches docs page) ───────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
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

      <style>{`
        @keyframes dotsScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 28px; }
        }
      `}</style>

      {/* ── Page heading ─────────────────────────────────────────────── */}
      <div className="relative text-center mb-16">
        {/* Ghost watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(72px,16vw,160px)] font-black leading-none text-white/2.5 blur-[3px] tracking-tight whitespace-nowrap"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Themes
        </span>

        <h1 className="relative text-4xl font-bold text-white mb-4">
          Theme Gallery
        </h1>

        {/* Emerald underline */}
        <div className="mx-auto mb-5 h-px w-24 bg-linear-to-r from-transparent via-[#00e5a0]/60 to-transparent" />

        <p className="relative text-gray-400 max-w-xl mx-auto leading-relaxed">
          Pick a theme, copy the config, paste it in. Done. All themes work with{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/8 border border-[#00e5a0]/15 px-1.5 py-0.5 rounded text-[13px] font-mono">
            apiEndpoint
          </code>{" "}
          as the only required prop.
        </p>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, i) => (
          <div
            key={theme.id}
            style={{
              animation: `fadeUp 0.4s ease both`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            <ThemeCard theme={theme} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

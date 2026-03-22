"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function NpmIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/themes", label: "Themes" },
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(7, 11, 20, 0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black"
            style={{
              background: "linear-gradient(135deg, #00e5a0, #00b37d)",
              color: "#070b14",
            }}
          >
            C
          </div>
          <span style={{ color: "#f0f4ff" }}>
            Chat<span style={{ color: "#00e5a0" }}>kit</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                pathname === link.href ? "text-white" : "hover:text-white",
              )}
              style={{
                color: pathname === link.href ? "#f0f4ff" : "#7a8aaa",
                background:
                  pathname === link.href
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://www.npmjs.com/package/@pratham/chatbot"
            target="_blank"
            className="transition-colors"
            title="View on npm"
            style={{ color: "#7a8aaa" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8aaa")}
          >
            <NpmIcon size={22} />
          </Link>
          <Link
            href="https://github.com/pratham/chatbot"
            target="_blank"
            className="transition-colors"
            title="View on GitHub"
            style={{ color: "#7a8aaa" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8aaa")}
          >
            <GithubIcon size={20} />
          </Link>

          <Link
            href="/docs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
            style={{
              background: "rgba(0,229,160,0.1)",
              color: "#00e5a0",
              border: "1px solid rgba(0,229,160,0.2)",
            }}
          >
            Get Started →
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

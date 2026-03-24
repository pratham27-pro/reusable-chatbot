import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt="icon"
            className="w-8 h-8 rounded-lg object-contain"
          />
          <p className="text-sm" style={{ color: "#7a8aaa" }}>
            Built by{" "}
            <Link
              href="https://github.com/pratham27-pro"
              className="transition-colors hover:text-[#00e5a0]"
              style={{ color: "#d0daf0" }}
            >
              Pratham
            </Link>{" "}
            · Open source · Free forever
          </p>
        </div>

        <div
          className="flex items-center gap-6 text-sm"
          style={{ color: "#7a8aaa" }}
        >
          {[
            { href: "/docs", label: "Docs" },
            { href: "/themes", label: "Themes" },
            { href: "/playground", label: "Playground" },
            {
              href: "https://github.com/pratham27-pro/reusable-chatbot",
              label: "GitHub",
            },
            {
              href: "https://npmjs.com/package/@pratham_jain/chatkit",
              label: "npm",
            },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#f0f4ff]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

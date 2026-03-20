import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          Built by{" "}
          <Link
            href="https://github.com/pratham"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Pratham
          </Link>
          . Open source. Free forever.
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="/docs" className="hover:text-gray-300 transition-colors">
            Docs
          </Link>
          <Link
            href="/themes"
            className="hover:text-gray-300 transition-colors"
          >
            Themes
          </Link>
          <Link
            href="https://github.com/pratham/chatbot"
            className="hover:text-gray-300 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://npmjs.com/package/@pratham/chatbot"
            className="hover:text-gray-300 transition-colors"
          >
            npm
          </Link>
        </div>
      </div>
    </footer>
  );
}

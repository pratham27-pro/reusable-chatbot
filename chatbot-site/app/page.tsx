import { FeatureList } from "@/components/home/FeatureList";
import { InstallCommand } from "@/components/home/InstallCommand";
import Link from "next/link";

const minimalUsage = `import { ChatBot } from '@pratham/chatbot';

// That's it. No CSS import. No setup.
<ChatBot apiEndpoint="https://your-server.com" />`;

export default function HomePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Open Source · Free Forever · No Credit Card
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Add a RAG chatbot to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
            any React app
          </span>{" "}
          in 60 seconds
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Floating widget. PDF knowledge base. Voice support. Draggable. Light &
          dark themes. One prop required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <InstallCommand />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-colors"
          >
            Get Started →
          </Link>
          <Link
            href="/themes"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold transition-colors border border-white/10"
          >
            Browse Themes
          </Link>
        </div>
      </section>

      {/* Code preview */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-400 font-mono">
              App.tsx
            </span>
          </div>
          <pre className="p-6 text-sm font-mono text-indigo-300 leading-relaxed overflow-x-auto">
            {minimalUsage}
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Everything you need. Nothing you don't.
        </h2>
        <FeatureList />
      </section>
    </div>
  );
}

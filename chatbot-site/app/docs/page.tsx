import { PropsTable } from "@/components/docs/PropsTable";
import { ShikiBlock } from "@/components/docs/ShikiBlock";

export default function DocsPage() {
  return (
    <div className="relative pt-24 max-w-4xl mx-auto px-6 py-16">
      {/* ── Animated dot-grid background ─────────────────────────────── */}
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
      <div className="relative mb-12">
        {/* Ghost watermark behind the heading */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute -top-6 -left-2 text-[clamp(72px,14vw,140px)] font-black leading-none text-white/3 blur-[2px] tracking-tight"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Docs
        </span>
        <h1 className="relative text-4xl font-bold text-white mb-4">
          Documentation
        </h1>
        <p className="relative text-gray-400">
          Everything you need to configure your chatbot.
        </p>
      </div>

      {/* ── Quick Start ──────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Quick Start
        </h2>

        <ShikiBlock lang="bash" label="Install">
          {`npm install @pratham_jain/chatkit`}
        </ShikiBlock>

        <ShikiBlock lang="tsx" label="Usage" className="mt-4">
          {`import { ChatBot } from '@pratham_jain/chatkit';

// Minimum — just one prop
<ChatBot apiEndpoint="https://reusable-chatbot.onrender.com" />

// Full config
<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  botName="Support Bot"
  buttonColor="#6366f1"
  theme="dark"
  welcomeMessage="Hi! How can I help?"
  systemPrompt="You are a helpful assistant."
  knowledgeBaseEnabled={true}
  collectionId="my-unique-app-name"
  floatPosition="bottom-right"
  persistHistory={true}
/>`}
        </ShikiBlock>
      </section>

      {/* ── Section divider ──────────────────────────────────────────── */}
      <div className="relative my-12 flex items-center gap-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#00e5a0]/40 uppercase">
          props
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
      </div>
      {/* ── Section divider ──────────────────────────────────────────── */}
      <div className="relative my-12 flex items-center gap-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#00e5a0]/40 uppercase">
          knowledge base
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
      </div>

      {/* ── Knowledge Base section ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Knowledge Base
        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          Enable{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            knowledgeBaseEnabled
          </code>{" "}
          to upload PDF or DOCX files directly inside the chat window. The
          chatbot will answer questions from those documents automatically. Use
          a unique{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            collectionId
          </code>{" "}
          per app so documents stay isolated from other users on the shared
          server.
        </p>

        <ShikiBlock lang="tsx" label="Knowledge Base Setup">
          {`// 1. Enable the upload UI + set a unique collection ID
<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  knowledgeBaseEnabled={true}
  collectionId="acme-corp-docs"
  systemPrompt="Answer only from the uploaded documents."
/>

// 2. User clicks 📎 inside the chat, uploads their PDF/DOCX
// 3. Chatbot immediately answers from that document — done!`}
        </ShikiBlock>

        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-s text-yellow-300/80 leading-relaxed">
          ⚠️ Documents uploaded to the shared server are stored in-memory and
          will be cleared on server restart. For persistent storage, self-host
          the RAG server with a volume-mounted Chroma DB.
        </div>
      </section>

      {/* ── Props table ───────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 pl-3 border-l-2 border-[#00e5a0]">
          Props
        </h2>
        <PropsTable />
      </section>
    </div>
  );
}

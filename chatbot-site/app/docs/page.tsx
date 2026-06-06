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

        <ShikiBlock
          lang="tsx"
          label="Option 1 — No backend (apiKey)"
          className="mt-4"
        >
          {`import { ChatBot } from '@pratham_jain/chatkit';

// Quickest setup — calls Groq directly from the browser
// ⚠️ Use only for demos/internal tools, not production
<ChatBot apiKey={import.meta.env.VITE_GROQ_API_KEY} />`}
        </ShikiBlock>

        <ShikiBlock
          lang="tsx"
          label="Option 2 — RAG server with knowledge base (apiEndpoint)"
          className="mt-4"
        >
          {`import { ChatBot } from '@pratham_jain/chatkit';

// Use the hosted server — no setup needed
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

      {/* ── Divider: props ────────────────────────────────────────────── */}
      <Divider label="props" />

      {/* ── Props table ───────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 pl-3 border-l-2 border-[#00e5a0]">
          Props
        </h2>
        <PropsTable />
      </section>

      {/* ── Divider: server setup ────────────────────────────────────── */}
      <Divider label="server setup" />

      {/* ── Server Setup ──────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Server Setup
        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          When you pass{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            apiEndpoint
          </code>
          , ChatKit talks to a FastAPI RAG server (Groq + Pinecone). You can use
          the hosted instance or run your own — both work identically.
        </p>

        {/* Option A */}
        <h3 className="text-base font-semibold text-white mb-3">
          Option A — Hosted server (zero setup)
        </h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          Point{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            apiEndpoint
          </code>{" "}
          at the shared server. No accounts, no keys, no infra. The widget
          automatically sends a warmup ping when it loads so the server is
          ready before your user types.
        </p>

        <ShikiBlock lang="tsx" label="Use the hosted server">
          {`<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  knowledgeBaseEnabled={true}
  collectionId="your-unique-project-name"
/>`}
        </ShikiBlock>

        <div className="mt-3 mb-8 rounded-xl border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-xs text-blue-300/80 leading-relaxed">
          💡 <strong className="text-blue-300">Always set a unique{" "}
          <code className="bg-blue-400/10 px-1 rounded">collectionId</code>.</strong>{" "}
          Documents are stored in Pinecone under that namespace — a unique ID
          keeps your knowledge base isolated from other projects on the shared
          server.
        </div>

        {/* Option B */}
        <h3 className="text-base font-semibold text-white mb-3">
          Option B — Self-hosted (localhost or your own server)
        </h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          Clone the repo, drop in your own Groq and Pinecone keys, and run the
          server locally or deploy it anywhere. Fastest option for development.
        </p>

        <ShikiBlock lang="bash" label="1. Clone and install">
          {`git clone https://github.com/pratham27-pro/reusable-chatbot
cd reusable-chatbot/rag-server
pip install -r requirements.txt`}
        </ShikiBlock>

        <ShikiBlock lang="bash" label="2. Configure .env" className="mt-4">
          {`cp .env.sample .env

# Fill in your keys:
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
PINECONE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
PINECONE_INDEX_NAME=your-index-name
PINECONE_HOST=https://your-index-host.pinecone.io`}
        </ShikiBlock>

        <ShikiBlock lang="bash" label="3. Start the server" className="mt-4">
          {`uvicorn app.main:app --reload --port 8000`}
        </ShikiBlock>

        <ShikiBlock lang="tsx" label="4. Point your chatbot at it" className="mt-4">
          {`// localhost (during development)
<ChatBot
  apiEndpoint="http://localhost:8000"
  knowledgeBaseEnabled={true}
  collectionId="my-project"
/>

// your own production domain
<ChatBot
  apiEndpoint="https://your-server.com"
  knowledgeBaseEnabled={true}
  collectionId="my-project"
/>`}
        </ShikiBlock>

        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-xs text-yellow-300/80 leading-relaxed">
          ⚠️ You need a free{" "}
          <strong className="text-yellow-300">Pinecone</strong> account and a{" "}
          <strong className="text-yellow-300">Groq</strong> API key for the
          self-hosted path. Both have free tiers.
        </div>
      </section>

      {/* ── Divider: apiKey ───────────────────────────────────────────── */}
      <Divider label="direct groq (no backend)" />

      {/* ── apiKey section ────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Direct Groq (No Backend)
        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          Pass{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            apiKey
          </code>{" "}
          to skip the backend entirely. ChatKit calls Groq directly from the
          browser. Read the key from your environment — never hardcode it.
        </p>

        <ShikiBlock lang="tsx" label="Vite / React">
          {`<ChatBot apiKey={import.meta.env.VITE_GROQ_API_KEY} />`}
        </ShikiBlock>

        <ShikiBlock lang="tsx" label="Next.js" className="mt-4">
          {`<ChatBot apiKey={process.env.NEXT_PUBLIC_GROQ_API_KEY} />`}
        </ShikiBlock>

        <ShikiBlock lang="bash" label=".env" className="mt-4">
          {`# Vite
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx

# Next.js
NEXT_PUBLIC_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx`}
        </ShikiBlock>

        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-xs text-yellow-300/80 leading-relaxed">
          ⚠️ <code className="bg-yellow-400/10 px-1 rounded">VITE_</code> and{" "}
          <code className="bg-yellow-400/10 px-1 rounded">NEXT_PUBLIC_</code>{" "}
          variables are visible in the browser bundle. Use{" "}
          <code className="bg-yellow-400/10 px-1 rounded">apiKey</code> only for
          demos and internal tools. For public production apps, use{" "}
          <code className="bg-yellow-400/10 px-1 rounded">apiEndpoint</code>{" "}
          with your own backend so the key stays server-side.
        </div>
      </section>

      {/* ── Divider: knowledge base ───────────────────────────────────── */}
      <Divider label="knowledge base" />

      {/* ── Knowledge Base section ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Knowledge Base
        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          ChatKit supports two ways to give your chatbot a knowledge base —
          runtime uploads via the chat UI, or pre-ingesting a document at deploy
          time so it's always available without any user action.
        </p>

        {/* Method 1 */}
        <h3 className="text-base font-semibold text-white mb-3">
          Method 1 — Upload via Chat UI
        </h3>
        {/* ── CHANGED: PDF/DOCX → .txt ── */}
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          Enable{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            knowledgeBaseEnabled
          </code>{" "}
          to show a 📄 upload button inside the chat window. Users upload a{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            .txt
          </code>{" "}
          file and the bot answers from it immediately. Use a unique{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            collectionId
          </code>{" "}
          per app so documents stay isolated from other users on the shared
          server.
        </p>

        <ShikiBlock lang="tsx" label="Runtime Upload">
          {`<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  knowledgeBaseEnabled={true}
  collectionId="acme-corp-docs"
  systemPrompt="Answer only from the uploaded documents."
/>`}
        </ShikiBlock>

        {/* ── CHANGED: updated tip to mention .txt ── */}
        <div className="mt-3 mb-8 rounded-xl border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-xs text-blue-300/80 leading-relaxed">
          💡 <strong className="text-blue-300">Demo tip:</strong> Export your
          content as a <code className="bg-blue-400/10 px-1 rounded">.txt</code>{" "}
          file, upload it, then click the clear button in the chat header to
          wipe the conversation history. The document stays ingested in Pinecone
          — users get a clean chat that already knows your content.
        </div>

        {/* Method 2 */}
        <h3 className="text-base font-semibold text-white mb-3">
          Method 2 — Pre-ingest via curl (silent knowledge base)
        </h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          Upload your document once to the server before your users ever open
          the chat. Keep{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            knowledgeBaseEnabled={"{true}"}
          </code>{" "}
          so the bot queries Pinecone on every message. The upload UI will show
          but users don't need to use it — the knowledge base is already loaded.
          Since the document is stored in Pinecone it persists forever and
          survives server restarts.
        </p>

        {/* ── CHANGED: .pdf → .txt in curl example ── */}
        <ShikiBlock
          lang="bash"
          label="One-time upload (run this once from your terminal)"
        >
          {`curl -X POST https://reusable-chatbot.onrender.com/upload-doc \\
  -F "file=@./docs/your-knowledge.txt" \\
  -F "collection_id=acme-corp-docs"`}
        </ShikiBlock>

        <ShikiBlock
          lang="tsx"
          label="Chatbot config after pre-ingesting"
          className="mt-4"
        >
          {`// knowledgeBaseEnabled={true} — the bot uses the pre-ingested knowledge base
// The upload UI is shown but users don't need to upload anything
<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  knowledgeBaseEnabled={true}
  collectionId="acme-corp-docs"
  systemPrompt="You are a support assistant for Acme Corp. Answer only from the provided documentation."
/>`}
        </ShikiBlock>

        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-xs text-yellow-300/80 leading-relaxed">
          ⚠️ The shared server stores documents in{" "}
          <strong className="text-yellow-300">Pinecone</strong> — they persist
          across server restarts. Always use a unique{" "}
          <code className="bg-yellow-400/10 px-1 rounded">collectionId</code> so
          your documents stay isolated from other users. Only{" "}
          <code className="bg-yellow-400/10 px-1 rounded">.txt</code> files are
          supported. Max file size is 2MB.
        </div>
      </section>
    </div>
  );
}

// ── Reusable divider ──────────────────────────────────────────────────────────
function Divider({ label }: { label: string }) {
  return (
    <div className="relative my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
      <span className="text-[10px] font-mono tracking-[0.2em] text-[#00e5a0]/40 uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00e5a0]/20 to-transparent" />
    </div>
  );
}

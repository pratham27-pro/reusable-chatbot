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
          label="Option 2 — Your own backend (apiEndpoint)"
          className="mt-4"
        >
          {`import { ChatBot } from '@pratham_jain/chatkit';

// Recommended for production — API key stays on your server
<ChatBot apiEndpoint="https://your-backend.com" />

// Full config
<ChatBot
  apiEndpoint="https://your-backend.com"
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

      {/* ── Divider: backend ─────────────────────────────────────────── */}
      <Divider label="backend setup" />

      {/* ── Backend Setup ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4 pl-3 border-l-2 border-[#00e5a0]">
          Backend Setup
        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          If you use{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            apiEndpoint
          </code>
          , your server must implement two routes that ChatKit calls internally.
          It can be any framework — Node.js, FastAPI, Django, anything.
        </p>

        {/* Route contract */}
        <h3 className="text-base font-semibold text-white mb-3">
          Required Routes
        </h3>

        <ShikiBlock
          lang="ts"
          label="POST /chat — Node.js / Express example"
          className="mb-4"
        >
          {`// ChatKit sends this body on every message:
// {
//   message: string,
//   system_prompt: string,
//   history: [{ role: "user" | "assistant", content: string }],
//   use_knowledge_base: boolean,
//   collection_id: string
// }

import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/chat", async (req, res) => {
  const { message, system_prompt, history } = req.body;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    stream: true,
    messages: [
      { role: "system", content: system_prompt || "You are a helpful assistant." },
      ...history.slice(-10),
      { role: "user", content: message },
    ],
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) res.write(token);
  }
  res.end();
});`}
        </ShikiBlock>

        <ShikiBlock
          lang="ts"
          label="POST /upload-doc — only needed if knowledgeBaseEnabled={true}"
          className="mb-4"
        >
          {`// ChatKit sends: multipart/form-data
// Fields: file (PDF or DOCX), collection_id (string)
// Expected response: { message: string, collection_id: string }

app.post("/upload-doc", upload.single("file"), async (req, res) => {
  const { collection_id } = req.body;
  const file = req.file;
  // → process and store in your vector DB
  res.json({ message: "Ingested successfully", collection_id });
});`}
        </ShikiBlock>

        {/* .env */}
        <h3 className="text-base font-semibold text-white mb-3 mt-8">
          Environment Variables
        </h3>
        <ShikiBlock lang="bash" label=".env">
          {`# Your backend .env — never expose this to the frontend
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx`}
        </ShikiBlock>

        {/* Info box */}
        <div className="mt-4 rounded-xl border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-xs text-blue-300/80 leading-relaxed">
          💡 The <code className="bg-blue-400/10 px-1 rounded">upload-doc</code>{" "}
          route is only required if you use{" "}
          <code className="bg-blue-400/10 px-1 rounded">
            knowledgeBaseEnabled={"{true}"}
          </code>
          . If you only need chat, implement{" "}
          <code className="bg-blue-400/10 px-1 rounded">/chat</code> only.
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
          Enable{" "}
          <code className="text-[#00e5a0] bg-[#00e5a0]/10 px-1.5 py-0.5 rounded text-xs">
            knowledgeBaseEnabled
          </code>{" "}
          to show a 📎 upload button inside the chat window. Users can upload
          PDF or DOCX files and the chatbot will answer questions from them
          automatically. Use a unique{" "}
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

// 2. User clicks 📎 inside the chat and uploads their PDF/DOCX
// 3. Chatbot immediately answers from that document — done!`}
        </ShikiBlock>

        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-xs text-yellow-300/80 leading-relaxed">
          ⚠️ Documents uploaded to the shared server are stored in-memory and
          will be cleared on server restart. For persistent storage, self-host
          the RAG server with a volume-mounted Chroma DB.
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

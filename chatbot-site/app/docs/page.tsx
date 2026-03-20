import { PropsTable } from "@/components/docs/PropsTable";

export default function DocsPage() {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
      <p className="text-gray-400 mb-12">
        Everything you need to configure your chatbot.
      </p>

      {/* Quick start */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
        <div className="rounded-2xl border border-white/10 bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="text-xs text-gray-400 font-mono">Install</span>
          </div>
          <pre className="p-5 text-sm font-mono text-indigo-300 overflow-x-auto">
            {`npm install @pratham/chatbot`}
          </pre>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gray-900 overflow-hidden mt-4">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="text-xs text-gray-400 font-mono">Usage</span>
          </div>
          <pre className="p-5 text-sm font-mono text-indigo-300 overflow-x-auto leading-relaxed">
            {`import { ChatBot } from '@pratham/chatbot';

// Minimum — just one prop
<ChatBot apiEndpoint="https://your-rag-server.com" />

// Full config
<ChatBot
  apiEndpoint="https://your-rag-server.com"
  botName="Support Bot"
  buttonColor="#6366f1"
  theme="dark"
  welcomeMessage="Hi! How can I help?"
  systemPrompt="You are a helpful assistant."
  knowledgeBaseEnabled={true}
  enableVoice={true}
  floatPosition="bottom-right"
  persistHistory={true}
/>`}
          </pre>
        </div>
      </section>

      {/* Props table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Props</h2>
        <PropsTable />
      </section>
    </div>
  );
}

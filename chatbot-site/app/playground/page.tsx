"use client";

export default function PlaygroundPage() {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Playground</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Talk to the bot trained on this package's documentation. Ask it
          anything — how to configure props, set up the server, or style themes.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gray-900 p-8 text-center">
        <p className="text-gray-400 text-sm mb-4">
          The bot below is powered by your own RAG server, trained on your
          README and docs.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-sm">
          👇 See the floating button at the bottom right
        </div>
      </div>

      {/* The actual chatbot — trained on your own README */}
      {/* Uncomment when your RAG server is deployed */}
      {/*
      <ChatBot
        apiEndpoint="https://reusable-chatbot.onrender.com"
        botName="Chatbot Docs Bot"
        buttonColor="#6366f1"
        theme="dark"
        welcomeMessage="Ask me anything about @pratham/chatbot!"
        systemPrompt="You are a helpful assistant for the @pratham/chatbot npm package. Answer questions about installation, configuration, props, and usage."
        knowledgeBaseEnabled={false}
        floatPosition="bottom-right"
      />
      */}
    </div>
  );
}

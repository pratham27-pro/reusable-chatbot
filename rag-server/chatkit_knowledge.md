# ChatKit — AI Chatbot Package

## What is ChatKit?

ChatKit (`@pratham_jain/chatkit`) is a free, open-source npm package that lets developers add a fully customizable AI-powered floating chatbot to any React application in under 2 minutes. It is built with Vite, TypeScript, and Tailwind CSS v4. The LLM is powered by Groq (Llama 3.3 70B). It supports RAG (Retrieval-Augmented Generation) via a Python FastAPI + Pinecone backend, enabling the chatbot to answer questions from your own documents.

## Installation

```bash
npm install @pratham_jain/chatkit
```

No stylesheet imports needed. CSS is auto-injected.

## Usage

### Option 1 — No backend (direct Groq, quickest setup)

```tsx
import { ChatBot } from '@pratham_jain/chatkit';

<ChatBot apiKey={import.meta.env.VITE_GROQ_API_KEY} />
```

Use only for demos or internal tools — the API key is visible in the browser bundle.

For Next.js:
```tsx
<ChatBot apiKey={process.env.NEXT_PUBLIC_GROQ_API_KEY} />
```

### Option 2 — Hosted RAG server (knowledge base, zero setup)

```tsx
import { ChatBot } from '@pratham_jain/chatkit';

<ChatBot
  apiEndpoint="https://reusable-chatbot.onrender.com"
  knowledgeBaseEnabled={true}
  collectionId="your-unique-project-name"
/>
```

The widget automatically pings the server when it loads so it is warm before the user types. Always set a unique `collectionId` — documents are stored in separate Pinecone namespaces per ID.

### Option 3 — Self-hosted server

Clone the repo, set your own Groq + Pinecone keys, and point the widget at your server:

```bash
git clone https://github.com/pratham27-pro/reusable-chatbot
cd reusable-chatbot/rag-server
pip install -r requirements.txt
cp .env.sample .env
uvicorn app.main:app --reload --port 8000
```

```tsx
<ChatBot apiEndpoint="http://localhost:8000" knowledgeBaseEnabled={true} collectionId="my-project" />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiEndpoint` | `string` | — | URL of your RAG backend server |
| `apiKey` | `string` | — | Groq API key for direct browser-to-Groq calls |
| `botName` | `string` | `"Assistant"` | Name shown in the chat header |
| `botAvatar` | `string` | Robot icon | URL to a custom avatar image |
| `buttonColor` | `string` | `"#6366f1"` | FAB button and header color |
| `theme` | `"light" \| "dark"` | `"light"` | Color scheme of the chat window |
| `welcomeMessage` | `string` | `"Hi! How can I help?"` | First message shown before any chat |
| `systemPrompt` | `string` | `"You are a helpful assistant."` | Instructions sent to the LLM on every request |
| `placeholder` | `string` | `"Type a message..."` | Input field placeholder text |
| `floatPosition` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Initial position of the FAB button |
| `knowledgeBaseEnabled` | `boolean` | `false` | Show a document upload button in the chat window |
| `collectionId` | `string` | `"default"` | Unique namespace for your knowledge base in Pinecone |
| `enableVoice` | `boolean` | `false` | Enable mic input and text-to-speech output |
| `persistHistory` | `boolean` | `true` | Save and restore chat history via localStorage |

## Knowledge Base

When `knowledgeBaseEnabled={true}`, a 📄 button appears inside the chat window. Users can upload a `.txt` file (max 2MB) which gets chunked, embedded, and stored in Pinecone. The bot answers questions from that document automatically.

Use a unique `collectionId` per app so documents stay isolated from other users on the shared server.

### Pre-ingesting documents (silent knowledge base)

Upload your document once before users open the chat:

```bash
curl -X POST https://reusable-chatbot.onrender.com/upload-doc \
  -F "file=@./docs/your-knowledge.txt" \
  -F "collection_id=acme-corp-docs"
```

Then configure the chatbot with `knowledgeBaseEnabled={true}` and the same `collectionId`. The bot queries Pinecone on every message. Documents persist in Pinecone across server restarts.

## Voice Support

When `enableVoice={true}`:
- A mic button appears — click to speak, click again to stop
- A speaker button appears — click to hear the bot's last response read aloud
- Uses the browser's built-in Web Speech API — no external service or API key needed
- Works in Chrome, Edge, and Safari

## Chat History

Chat history is saved to localStorage by default (`persistHistory={true}`). Works with both `apiEndpoint` and `apiKey`. Set `persistHistory={false}` to disable.

## Next.js Setup

Wrap in a client component since ChatKit uses browser APIs:

```tsx
// components/ChatBotWrapper.tsx
"use client";
export { ChatBot } from "@pratham_jain/chatkit";
```

```tsx
// app/page.tsx
import ChatBotWrapper from "@/components/ChatBotWrapper";
<ChatBotWrapper apiEndpoint="https://reusable-chatbot.onrender.com" />
```

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Widget | React + TypeScript + Tailwind v4 | Free |
| LLM | Groq (Llama 3.3 70B) | Free |
| Embeddings | FastEmbed (BAAI/bge-small-en-v1.5, runs locally on server) | Free |
| Vector DB | Pinecone | Free tier |
| Voice | Web Speech API | Free (browser built-in) |

## Common Questions

**Q: Do I need a backend?**
No backend needed for basic chat. Pass your Groq API key as `apiKey`. The RAG server is only needed for the knowledge base feature.

**Q: Does it work with Next.js?**
Yes. Wrap in a client component with `"use client"` since ChatKit uses browser APIs.

**Q: Is the API key exposed when using apiKey?**
Yes — `VITE_` and `NEXT_PUBLIC_` variables are visible in the browser bundle. Use `apiKey` only for demos and internal tools. For public production apps, use `apiEndpoint` so the key stays server-side.

**Q: What file types can I upload for the knowledge base?**
Only `.txt` files are supported. Max file size is 2MB.

**Q: How do I keep my knowledge base isolated from other users?**
Set a unique `collectionId` prop. Each collection ID maps to a separate Pinecone namespace, so your documents are completely isolated.

**Q: What is collectionId?**
A string that namespaces your documents in Pinecone. Use your app name or domain (e.g. `"acme-corp"`, `"my-hackathon-project"`). Different apps with different collectionIds cannot access each other's documents.

**Q: Can I use React Native?**
No, ChatKit is for React web apps only. It uses browser APIs (Web Speech, localStorage, fetch streams).

**Q: How do I change the chatbot's language or tone?**
Use the `systemPrompt` prop. Example: `systemPrompt="You are a friendly assistant. Always respond in Spanish."`

**Q: Why does the chatbot take a few seconds to respond the first time?**
The hosted server at reusable-chatbot.onrender.com runs on Render's free tier which can sleep after inactivity. The widget sends a warmup ping when it loads to minimize this delay.

**Q: Where is the source code?**
GitHub: https://github.com/pratham27-pro/reusable-chatbot

**Q: Where is the npm package?**
https://www.npmjs.com/package/@pratham_jain/chatkit

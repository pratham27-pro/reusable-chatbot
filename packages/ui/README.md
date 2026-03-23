# @pratham/chatbot

A plug-and-play floating RAG chatbot widget for React. Drop it into any React, Next.js, or Vite app in under a minute — no credit card, no paid services, no CSS imports required.

[![npm version](https://img.shields.io/npm/v/@pratham/chatbot.svg?style=flat)](https://www.npmjs.com/package/@pratham/chatbot)
[![npm downloads](https://img.shields.io/npm/dm/@pratham/chatbot.svg?style=flat)](https://www.npmjs.com/package/@pratham/chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- 💬 **Floating draggable chat button** — users can move it anywhere on screen
- 📄 **RAG knowledge base** — upload PDFs and Word docs, bot answers from them
- 🎙️ **Voice support** — speak to the bot and hear it speak back (Web Speech API)
- 🌙 **Light & dark themes** — one prop switch
- 💾 **Persistent chat history** — localStorage, survives page refresh
- 🎨 **Fully customizable** — colors, avatar, name, position, prompts
- ⚡ **Streaming responses** — tokens appear as they're generated (Groq)
- 📦 **CSS auto-injected** — no stylesheet import needed
- ✅ **Next.js App Router ready** — `"use client"` baked in

---

## Quick Start

```bash
npm install @pratham/chatbot
```

```tsx
import { ChatBot } from "@pratham/chatbot";

// Minimum — one prop required
<ChatBot apiEndpoint="https://your-rag-server.com" />;
```

That's it. The widget appears as a floating button at the bottom right.

---

## Full Example

```tsx
import { ChatBot } from "@pratham/chatbot";

function App() {
  return (
    <>
      <YourApp />

      <ChatBot
        apiEndpoint="https://your-rag-server.com"
        botName="Support Bot"
        buttonColor="#6366f1"
        theme="dark"
        welcomeMessage="Hi! How can I help you today? 👋"
        systemPrompt="You are a helpful support assistant."
        knowledgeBaseEnabled={true}
        enableVoice={true}
        floatPosition="bottom-right"
        persistHistory={true}
      />
    </>
  );
}
```

---

## Props

| Prop                   | Type                              | Default                          | Description                                    |
| ---------------------- | --------------------------------- | -------------------------------- | ---------------------------------------------- |
| `apiEndpoint`          | `string`                          | **required**                     | URL of your RAG backend server                 |
| `botName`              | `string`                          | `"Assistant"`                    | Name shown in the chat header                  |
| `botAvatar`            | `string`                          | Robot icon                       | URL to a custom avatar image                   |
| `buttonColor`          | `string`                          | `"#6366f1"`                      | FAB button and header color (any CSS color)    |
| `theme`                | `"light" \| "dark"`               | `"light"`                        | Color scheme of the chat window                |
| `welcomeMessage`       | `string`                          | `"Hi! How can I help?"`          | First message shown before any chat            |
| `systemPrompt`         | `string`                          | `"You are a helpful assistant."` | Instructions sent to the LLM on every request  |
| `placeholder`          | `string`                          | `"Type a message..."`            | Input field placeholder text                   |
| `floatPosition`        | `"bottom-right" \| "bottom-left"` | `"bottom-right"`                 | Initial position of the FAB button             |
| `knowledgeBaseEnabled` | `boolean`                         | `false`                          | Show PDF/DOCX upload button inside the chat    |
| `enableVoice`          | `boolean`                         | `false`                          | Enable mic input and text-to-speech output     |
| `persistHistory`       | `boolean`                         | `true`                           | Save and restore chat history via localStorage |

---

## Backend Setup (RAG Server)

The chatbot widget is a pure frontend package. You need to run the companion RAG server which handles LLM calls and document ingestion.

### Prerequisites

- Python 3.11+
- A free [Groq API key](https://console.groq.com) — no credit card required

### Run Locally

```bash
git clone https://github.com/pratham27-pro/chatbot
cd rag-server

pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your GROQ_API_KEY to .env

uvicorn app.main:app --reload --port 8000
```

### `.env` Reference

```env
GROQ_API_KEY=your_groq_key_here
CHROMA_PERSIST_DIR=./chroma_db
CHROMA_IN_MEMORY=false
```

### API Endpoints

| Method | Endpoint      | Description                                |
| ------ | ------------- | ------------------------------------------ |
| `POST` | `/chat`       | Send a message, get a streaming response   |
| `POST` | `/upload-doc` | Upload a PDF or DOCX to the knowledge base |
| `GET`  | `/health`     | Health check                               |

### Deploy to Render (Free)

1. Push `rag-server/` to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, select **Docker** as runtime
4. Add environment variables in the Render dashboard
5. Deploy — your server URL is your `apiEndpoint`

---

## Next.js App Router

Because this package uses `useState` and browser APIs, wrap it in a client component:

```tsx
// components/ChatBotWrapper.tsx
"use client";
export { ChatBot } from "@pratham/chatbot";
```

```tsx
// app/page.tsx
import ChatBotWrapper from "@/components/ChatBotWrapper";

<ChatBotWrapper apiEndpoint="https://your-server.com" />;
```

---

## Knowledge Base

When `knowledgeBaseEnabled={true}`, a paperclip button appears in the chat input. Users can attach a PDF or DOCX file which gets uploaded to your RAG server, chunked, embedded, and stored in ChromaDB. The bot will then answer questions based on the document content.

For **pre-ingesting documents** (so users don't need to upload manually):

```bash
curl -X POST https://your-server.com/upload-doc \
  -F "file=@your-document.pdf" \
  -F "collection_id=my-kb"
```

Then set `knowledgeBaseEnabled={false}` — the bot answers from the pre-loaded knowledge base automatically.

---

## Voice Support

When `enableVoice={true}`:

- A **mic button** appears — click to speak, click again to stop
- A **speaker button** appears — click to hear the bot's last response read aloud
- Uses the browser's built-in Web Speech API — no external service or API key needed
- Works in Chrome, Edge, and Safari. Firefox has limited support.

---

## Themes

Visit the [Themes Gallery](https://your-chatbot-site.vercel.app/themes) for ready-to-use prebuilt themes with one-click copy.

```tsx
// Corporate Blue
<ChatBot apiEndpoint="..." buttonColor="#0ea5e9" botName="Support" theme="light" />

// Dark Pro
<ChatBot apiEndpoint="..." buttonColor="#8b5cf6" botName="AI" theme="dark" />

// Green Nature
<ChatBot apiEndpoint="..." buttonColor="#10b981" botName="Helper" theme="light" />
```

---

## Tech Stack

| Layer      | Technology                       | Cost                    |
| ---------- | -------------------------------- | ----------------------- |
| Widget     | React + TypeScript + Tailwind v4 | Free                    |
| LLM        | Groq (Llama 3.3 70B)             | Free                    |
| Embeddings | sentence-transformers (local)    | Free                    |
| Vector DB  | ChromaDB                         | Free                    |
| Voice      | Web Speech API                   | Free (browser built-in) |

---

## License

MIT © [Pratham Jain](https://github.com/pratham27-pro)

# @pratham_jain/chatkit

A plug-and-play floating RAG chatbot widget for React. Drop it into any React, Next.js, or Vite app in under a minute — no credit card, no paid services, no CSS imports required.

[![npm version](https://img.shields.io/npm/v/@pratham_jain/chatkit.svg?style=flat)](https://www.npmjs.com/package/@pratham_jain/chatkit)
[![npm downloads](https://img.shields.io/npm/dm/@pratham_jain/chatkit.svg?style=flat)](https://www.npmjs.com/package/@pratham_jain/chatkit)
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
npm install @pratham_jain/chatkit
```

### Option 1 — No backend (quickest)

Pass your Groq API key directly. ChatKit calls Groq from the browser — no server needed.

```tsx
import { ChatBot } from "@pratham_jain/chatkit";

<ChatBot apiKey={import.meta.env.VITE_GROQ_API_KEY} />;
```

> ⚠️ `VITE_` and `NEXT_PUBLIC_` variables are visible in the browser bundle.
> Use `apiKey` only for demos and internal tools. For public production apps,
> use `apiEndpoint` so the key stays on your server.

### Option 2 — Your own backend (recommended for production)

```tsx
import { ChatBot } from "@pratham_jain/chatkit";

<ChatBot apiEndpoint="https://your-backend.com" />;
```

> ❌ If neither `apiKey` nor `apiEndpoint` is provided, the chatbot will show
> a configuration error message and log a warning to the console.

---

## Full Example

```tsx
import { ChatBot } from "@pratham_jain/chatkit";

function App() {
  return (
    <>
      <YourApp />

      <ChatBot
        apiEndpoint="https://your-backend.com"
        botName="Support Bot"
        buttonColor="#6366f1"
        theme="dark"
        welcomeMessage="Hi! How can I help you today? 👋"
        systemPrompt="You are a helpful support assistant."
        knowledgeBaseEnabled={true}
        collectionId="my-app-docs"
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

| Prop                   | Type                              | Default                          | Description                                                                              |
| ---------------------- | --------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `apiEndpoint`          | `string`                          | —                                | URL of your backend server. Required if `apiKey` is not provided                         |
| `apiKey`               | `string`                          | —                                | Groq API key for direct browser-to-Groq calls. Required if `apiEndpoint` is not provided |
| `botName`              | `string`                          | `"Assistant"`                    | Name shown in the chat header                                                            |
| `botAvatar`            | `string`                          | Robot icon                       | URL to a custom avatar image                                                             |
| `buttonColor`          | `string`                          | `"#6366f1"`                      | FAB button and header color (any CSS color)                                              |
| `theme`                | `"light" \| "dark"`               | `"light"`                        | Color scheme of the chat window                                                          |
| `welcomeMessage`       | `string`                          | `"Hi! How can I help?"`          | First message shown before any chat                                                      |
| `systemPrompt`         | `string`                          | `"You are a helpful assistant."` | Instructions sent to the LLM on every request                                            |
| `placeholder`          | `string`                          | `"Type a message..."`            | Input field placeholder text                                                             |
| `floatPosition`        | `"bottom-right" \| "bottom-left"` | `"bottom-right"`                 | Initial position of the FAB button                                                       |
| `knowledgeBaseEnabled` | `boolean`                         | `false`                          | Show PDF/DOCX upload button inside the chat                                              |
| `collectionId`         | `string`                          | `"default"`                      | Unique ID for your knowledge base. Use a different ID per app to keep documents isolated |
| `enableVoice`          | `boolean`                         | `false`                          | Enable mic input and text-to-speech output                                               |
| `persistHistory`       | `boolean`                         | `true`                           | Save and restore chat history via localStorage                                           |

---

## Backend Setup

### Using the Hosted Server (zero setup)

Point `apiEndpoint` to the shared RAG server and you're done:

```tsx
<ChatBot apiEndpoint="https://reusable-chatbot.onrender.com" />
```

The shared server runs Groq + Pinecone and is free to use. Set a unique `collectionId` so your documents stay isolated from other users.

> ⚠️ The shared server uses ephemeral storage — uploaded documents are cleared
> on server restart. For persistent storage, self-host the RAG server (see below).

---

### Bringing Your Own Backend

Your server can be Node.js, FastAPI, Django, or anything else. It must implement these two routes:

#### `POST /chat`

ChatKit sends this body on every message:

```json
{
  "message": "string",
  "system_prompt": "string",
  "history": [{ "role": "user | assistant", "content": "string" }],
  "use_knowledge_base": true,
  "collection_id": "string"
}
```

Expected response: a **plain text stream** (chunked transfer encoding). Here's a minimal Node.js + Express example:

```ts
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
      {
        role: "system",
        content: system_prompt || "You are a helpful assistant.",
      },
      ...history.slice(-10),
      { role: "user", content: message },
    ],
  });

  for await (const chunk of stream) {
    const token = chunk.choices?.delta?.content;
    if (token) res.write(token);
  }
  res.end();
});
```

#### `POST /upload-doc`

Only required if `knowledgeBaseEnabled={true}`. ChatKit sends `multipart/form-data` with:

- `file` — the PDF or DOCX file
- `collection_id` — string identifying the knowledge base bucket

Expected response:

```json
{ "message": "Ingested 42 chunks", "collection_id": "my-app-docs" }
```

#### `.env`

```env
# Your backend .env — never expose this to the frontend
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

### Self-Hosting the RAG Server

The companion RAG server is a FastAPI + Pinecone + LangChain.js Python server included in this repo.

**Prerequisites**

- Python 3.11+
- A free [Groq API key](https://console.groq.com) — no credit card required

**Run Locally**

```bash
git clone https://github.com/pratham27-pro/reusable-chatbot
cd rag-server

pip install -r requirements.txt

cp .env.example .env
# Add your GROQ_API_KEY to .env

uvicorn app.main:app --reload --port 8000
```

**`.env` Reference**

```env
GROQ_API_KEY=

PINECONE_API_KEY=
PINECONE_INDEX_NAME=
PINECONE_HOST=
```

**API Endpoints**

| Method | Endpoint      | Description                                |
| ------ | ------------- | ------------------------------------------ |
| `POST` | `/chat`       | Send a message, get a streaming response   |
| `POST` | `/upload-doc` | Upload a PDF or DOCX to the knowledge base |
| `GET`  | `/health`     | Health check                               |

**Deploy to Render (Free)**

1. Push `rag-server/` to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, select **Docker** as runtime
4. Add `GROQ_API_KEY` in the Render dashboard environment variables
5. Deploy — your server URL is your `apiEndpoint`

---

## Next.js App Router

Because this package uses `useState` and browser APIs, wrap it in a client component:

```tsx
// components/ChatBotWrapper.tsx
"use client";
export { ChatBot } from "@pratham_jain/chatkit";
```

```tsx
// app/page.tsx
import ChatBotWrapper from "@/components/ChatBotWrapper";

<ChatBotWrapper apiEndpoint="https://your-server.com" />
// or
<ChatBotWrapper apiKey={process.env.NEXT_PUBLIC_GROQ_API_KEY} />
```

---

## Knowledge Base

When `knowledgeBaseEnabled={true}`, a 📎 button appears in the chat window. Users can upload a PDF or DOCX which gets chunked, embedded, and stored in Pinecone. The bot answers questions from that document automatically.

Use a unique `collectionId` per app so documents stay isolated:

```tsx
<ChatBot
  apiEndpoint="https://your-backend.com"
  knowledgeBaseEnabled={true}
  collectionId="acme-corp-docs"
  systemPrompt="Answer only from the uploaded documents."
/>
```

**Pre-ingesting documents** (so users don't need to upload manually):

```bash
curl -X POST https://your-server.com/upload-doc \
  -F "file=@your-document.pdf" \
  -F "collection_id=acme-corp-docs"
```

Then set `knowledgeBaseEnabled={false}` — the bot answers from the pre-loaded knowledge base silently.

---

## Voice Support

When `enableVoice={true}`:

- A **mic button** appears — click to speak, click again to stop
- A **speaker button** appears — click to hear the bot's last response read aloud
- Uses the browser's built-in Web Speech API — no external service or API key needed
- Works in Chrome, Edge, and Safari. Firefox has limited support.

---

## Themes

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
| Vector DB  | Pinecone                         | Free                    |
| Voice      | Web Speech API                   | Free (browser built-in) |

---

## License

MIT © [Pratham Jain](https://github.com/pratham27-pro)

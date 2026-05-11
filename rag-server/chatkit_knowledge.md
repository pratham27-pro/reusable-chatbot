# ChatKit — AI Chatbot Package

## What is ChatKit?

ChatKit (`@pratham_jain/chatkit`) is a free, open-source npm package that lets developers add a fully customizable AI-powered floating chatbot to any React application in minutes. It is built with Vite, TypeScript, and Tailwind CSS. The LLM is powered by Groq. It supports RAG (Retrieval-Augmented Generation) via a Node.js + LangChain.js + Chroma backend, enabling the chatbot to answer questions from your own document.

## Site Pages

- **Home** (`/`) — Overview of ChatKit, key features, and a live demo
- **Docs** (`/docs`) — Full installation and usage documentation
- **Playground** (`/playground`) — Interactive demo to try the chatbot live

## Installation

```bash
npm install @pratham_jain/chatkit
```

No manual stylesheet imports needed. Just install, import, and configure via props.

## Basic Usage

```tsx
import { ChatKit } from "@pratham_jain/chatkit";

function App() {
  return (
    <ChatKit
      apiKey="your-groq-api-key"
      systemPrompt="You are a helpful assistant for my app."
    />
  );
}
```

## Props Reference

### Core Props

| Prop           | Type     | Default                          | Description                    |
| -------------- | -------- | -------------------------------- | ------------------------------ |
| `apiKey`       | `string` | required                         | Your Groq API key              |
| `systemPrompt` | `string` | `"You are a helpful assistant."` | Custom instructions for the AI |
| `model`        | `string` | `"llama3-8b-8192"`               | Groq model to use              |
| `placeholder`  | `string` | `"Ask me anything..."`           | Input placeholder text         |

### Styling Props

| Prop              | Type                              | Default          | Description                                       |
| ----------------- | --------------------------------- | ---------------- | ------------------------------------------------- |
| `primaryColor`    | `string`                          | `"#00e5a0"`      | Main accent color (button, send icon, highlights) |
| `backgroundColor` | `string`                          | `"#0a0f1e"`      | Chat window background color                      |
| `textColor`       | `string`                          | `"#f0f4ff"`      | Message text color                                |
| `fontFamily`      | `string`                          | `"inherit"`      | Font used inside the chat window                  |
| `borderRadius`    | `string`                          | `"16px"`         | Border radius of the chat window                  |
| `position`        | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Position of the floating button                   |
| `buttonSize`      | `number`                          | `56`             | Size of the floating trigger button in px         |
| `width`           | `string`                          | `"380px"`        | Width of the chat window                          |
| `height`          | `string`                          | `"520px"`        | Height of the chat window                         |
| `zIndex`          | `number`                          | `9999`           | z-index of the chat widget                        |

### Behavior Props

| Prop             | Type      | Default                     | Description                                   |
| ---------------- | --------- | --------------------------- | --------------------------------------------- |
| `initialMessage` | `string`  | `"Hi! How can I help you?"` | First message shown by the bot                |
| `maxMessages`    | `number`  | `50`                        | Max messages stored in history                |
| `streamResponse` | `boolean` | `true`                      | Whether to stream AI responses token by token |
| `showTimestamps` | `boolean` | `false`                     | Show message timestamps                       |

## Styling Examples

### Green + Dark (Default)

```tsx
<ChatKit
  apiKey="..."
  primaryColor="#00e5a0"
  backgroundColor="#0a0f1e"
  textColor="#f0f4ff"
/>
```

### Blue + White (Light Mode)

```tsx
<ChatKit
  apiKey="..."
  primaryColor="#2563eb"
  backgroundColor="#ffffff"
  textColor="#1e293b"
  borderRadius="12px"
/>
```

### Purple + Dark

```tsx
<ChatKit
  apiKey="..."
  primaryColor="#a855f7"
  backgroundColor="#0f0a1a"
  textColor="#f8f4ff"
  buttonSize={60}
/>
```

### Position Bottom-Left

```tsx
<ChatKit apiKey="..." position="bottom-left" />
```

## RAG Support (Custom Knowledge Base)

ChatKit supports RAG via a companion Node.js server using LangChain.js and Chroma. This lets the chatbot answer questions from your own document.

Setup steps:

1. Run the RAG server locally or deploy it
2. Upload your documents to the server
3. Pass the server URL to ChatKit via the `ragServerUrl` prop

```tsx
<ChatKit
  apiKey="..."
  ragServerUrl="http://localhost:3001"
  systemPrompt="Answer only from the provided documents."
/>
```

## Getting a Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys → Create API Key
4. Copy the key and pass it to the `apiKey` prop

Groq is free to use with generous rate limits.

## Supported Groq Models

- `llama3-8b-8192` (default, fast)
- `llama3-70b-8192` (more capable)
- `mixtral-8x7b-32768` (large context)
- `gemma-7b-it`

## GitHub Repository

[https://github.com/pratham27-pro/reusable-chatbot](https://github.com/pratham27-pro/reusable-chatbot)

## npm Package

[https://www.npmjs.com/package/@pratham_jain/chatkit](https://www.npmjs.com/package/@pratham_jain/chatkit)

## Common Questions

**Q: Does it work with Next.js?**
A: Yes. Add `"use client"` at the top of the component where you use ChatKit since it uses browser APIs.

**Q: Do I need a backend?**
A: No backend needed for basic usage. Just pass your Groq API key as a prop. The RAG server is only needed if you want document-based Q&A.

**Q: Is the API key exposed?**
A: For production apps, proxy your Groq API calls through your own backend. For demos and internal tools it's fine to use directly.

**Q: Can I use it with React Native?**
A: Not currently. ChatKit is for React web apps only.

**Q: How do I change the chatbot's language or tone?**
A: Use the `systemPrompt` prop. Example: `systemPrompt="You are a friendly assistant. Always respond in Spanish."`

**Q: Can I remove the ChatKit branding?**
A: Yes, this is planned in the roadmap. Currently the footer shows 'Powered by ChatKit'.

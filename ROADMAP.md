# @pratham/chatbot — Roadmap to Awesome

## ✅ Done

- Floating draggable chat button
- Light/dark theme
- Streaming responses (Groq)
- PDF/DOCX knowledge base (ChromaDB)
- Voice input + output (Web Speech API)
- CSS auto-injected (no stylesheet import)
- Next.js App Router compatible

---

## 🚀 Phase 2 — DX & Features

### Markdown Rendering in Bot Messages

- Render **bold**, `code`, lists, and links in bot replies
- Library: `react-markdown` + `remark-gfm` (free, lightweight)
- Why: Groq responses are often markdown — currently renders as raw text

### Code Syntax Highlighting

- For developer-facing bots, highlight code blocks in responses
- Library: `react-syntax-highlighter` (free)

### Conversation Memory Across Sessions

- Save chat history to `localStorage` so conversations persist on refresh
- Zero backend cost — fully client-side

### Message Reactions

- Thumbs up/down on bot messages
- POST feedback to `/feedback` endpoint
- Use this data to improve your prompts over time

### Typing Indicator Improvement

- Show "Assistant is typing..." with animated dots
- Already partially done — make it smarter (hide immediately on response)

### Chat Export

- Download conversation as `.txt` or `.pdf`
- Fully client-side using `jsPDF` (free)

---

## 🎨 Phase 3 — UI Library Website (Your Idea #4)

### Pages:

1. **Homepage** — hero, install command (copyable), minimal demo, feature list
2. **Themes Gallery** — prebuilt themes (minimal, corporate, dark, playful)
   each with a live preview and one-click copy of the config props
3. **Docs** — all props, types, examples
4. **Your Own Bot** — chatbot trained on your own docs/README to help users

### Tech Stack (all free):

- **Next.js** hosted on **Vercel** (free tier)
- **Tailwind** for styling
- **Shiki** for code highlighting in docs
- **Framer Motion** for animations on theme cards

### Prebuilt Themes to Include:

```tsx
// Minimal
<ChatBot buttonColor="#000000" theme="light" botName="Assistant" />

// Corporate Blue
<ChatBot buttonColor="#0ea5e9" theme="light" botName="Support" />

// Dark Pro
<ChatBot buttonColor="#8b5cf6" theme="dark" botName="AI" />

// Green Nature
<ChatBot buttonColor="#10b981" theme="light" botName="Helper" />

// Warm Sunset
<ChatBot buttonColor="#f97316" theme="dark" botName="Bot" />
```

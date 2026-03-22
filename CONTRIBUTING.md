# Contributing to @pratham_jain/chatkit

Thanks for your interest in contributing! This document covers everything you need to get started.

---

## Project Structure

```
chatbot-rag/
├── packages/ui/          ← React widget (the npm package)
│   ├── src/
│   │   ├── components/   ← UI components
│   │   ├── hooks/        ← useChat, useDraggable, useVoice
│   │   ├── types/        ← TypeScript interfaces
│   │   └── lib/          ← utilities (cn, etc.)
│   └── vite.config.ts
│
├── rag-server/           ← FastAPI RAG backend
│   ├── app/
│   │   ├── api/          ← route handlers
│   │   ├── services/     ← RAG, embeddings, LLM logic
│   │   └── core/         ← config, settings
│   └── requirements.txt
│
└── chatbot-site/         ← Documentation website (Next.js)
    ├── app/
    └── components/
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- pnpm (`npm install -g pnpm`)
- A free [Groq API key](https://console.groq.com)

### Local Setup

```bash
# Clone the repo
git clone https://github.com/pratham27-pro/reusable-chatbot
cd chatbot

# Install UI package dependencies
cd packages/ui
npm install

# Build the package
npm run build

# Set up RAG server
cd ../../rag-server
pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env

# Run the RAG server
uvicorn app.main:app --reload --port 8000

# Set up a test app (separate terminal)
cd ../
npm create vite@latest chatbot-test -- --template react-ts
cd chatbot-test
npm install

# Link local package for testing
cd ../packages/ui
npm install -g yalc
yalc publish
cd ../chatbot-test
yalc add @pratham_jain/chatkit
npm install
npm run dev
```

---

## Development Workflow

### Making Changes to the Widget

```bash
# Terminal 1 — watch mode, auto-rebuilds on save
cd packages/ui
npm run dev

# Terminal 2 — push updates to test app after each build
npm run push   # runs: npm run build && yalc push

# Terminal 3 — test app
cd chatbot-test
npm run dev
```

### Making Changes to the RAG Server

```bash
cd rag-server
uvicorn app.main:app --reload --port 8000
# FastAPI auto-reloads on every file save
```

### Making Changes to the Docs Site

```bash
cd chatbot-site
npm run dev
# Next.js dev server with HMR
```

---

## What to Contribute

### Good First Issues

These are well-scoped and beginner-friendly:

- [ ] Add `width` and `height` props to control chat window size
- [ ] Add a `zIndex` prop for positioning control
- [ ] Add `onOpen` and `onClose` callback props
- [ ] Add a loading skeleton for the initial message fetch
- [ ] Add more prebuilt themes to the gallery
- [ ] Improve mobile responsiveness of the chat window
- [ ] Add Hindi / regional language support for voice (`voiceLanguage` prop)
- [ ] Write tests using Vitest + React Testing Library

### Bigger Contributions

- Markdown rendering in bot messages (`react-markdown`)
- Code syntax highlighting in responses (`react-syntax-highlighter`)
- Multi-language i18n support for the UI text
- `onMessage` callback prop for analytics integration
- Export conversation as `.txt` or `.pdf`
- Multi-LLM support (`llmProvider` prop: `"groq" | "gemini" | "openrouter"`)

---

## Pull Request Guidelines

1. **Fork** the repo and create a branch from `main`

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **One PR per feature** — keep changes focused and reviewable

3. **Follow the existing code style**
   - TypeScript strict mode — no `any` types
   - Functional components only
   - Use `cn()` from `lib/cn.ts` for conditional classNames
   - Props must be documented in `types/index.ts`

4. **Test your changes** before submitting

   ```bash
   # In packages/ui
   npm run lint     # TypeScript type check
   npm run build    # Must build without errors
   ```

5. **Update the docs** if you add or change a prop — update both `README.md` and `components/docs/PropsTable.tsx` in the site

6. **Write a clear PR description** — what changed, why, and how to test it

### Branch Naming

| Type    | Format             | Example                   |
| ------- | ------------------ | ------------------------- |
| Feature | `feat/description` | `feat/markdown-rendering` |
| Bug fix | `fix/description`  | `fix/voice-safari-crash`  |
| Docs    | `docs/description` | `docs/add-nextjs-example` |
| Theme   | `theme/name`       | `theme/ocean-blue`        |

---

## Adding a New Theme

Themes are defined in `chatbot-site/lib/themes.ts`. To add one:

```ts
// Add to the themes array in lib/themes.ts
{
  id: "your-theme-id",
  name: "Your Theme Name",
  description: "One sentence about who this is for.",
  props: {
    botName: "Bot",
    buttonColor: "#hexcode",
    theme: "light",   // or "dark"
    welcomeMessage: "Your welcome message",
    systemPrompt: "You are a helpful assistant.",
  },
  tags: ["tag1", "tag2"],
  previewBg: "#background-hex-for-preview-card",
},
```

Then open a PR with title `theme: add Your Theme Name`.

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/pratham27-pro/reusable-chatbot/issues/new) with:

- **What happened** — what you saw
- **What you expected** — what should have happened
- **Reproduction steps** — minimal code to reproduce
- **Environment** — OS, browser, React version, package version

---

## Code of Conduct

- Be respectful and constructive in all interactions
- No spam, self-promotion, or off-topic content in issues
- Credit others' work appropriately

---

## Questions?

Open a [GitHub Discussion](https://github.com/pratham27-pro/reusable-chatbot/discussions) or talk to the docs bot on the [Playground](https://your-chatbot-site.vercel.app/playground) page.

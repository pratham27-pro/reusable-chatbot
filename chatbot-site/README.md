# chatbot-site

Marketing and documentation website for the `@pratham_jain/chatkit` npm package.

Built with Next.js App Router. Uses the published npm package — not a local symlink.

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage — features, live demo, install snippet |
| `/docs` | Full documentation — props, server setup, knowledge base |
| `/playground` | Interactive configurator — live preview + generated code |

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Testing unreleased widget changes

Build `packages/ui` first, then point `package.json` at the local dist:

```bash
cd ../packages/ui && npm run build
# In chatbot-site/package.json, change:
# "@pratham_jain/chatkit": "^x.x.x"  →  "file:../packages/ui"
npm install
```

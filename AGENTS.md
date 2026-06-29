# Integration docs — agent instructions

Partner-facing technical documentation for casino operators integrating SparkSports. This site is built with [Fumadocs](https://fumadocs.dev) and Next.js.

## Project layout

```
integration-docs/
├── app/                    # Next.js App Router (layouts, docs routes, search)
├── content/docs/           # MDX documentation source (edit here)
├── components/mdx.tsx      # Shared MDX component map
├── lib/
│   ├── source.ts           # Fumadocs content loader
│   ├── layout.shared.tsx   # Docs shell options (nav title, etc.)
│   └── shared.ts           # App name, routes, git config
├── source.config.ts        # Fumadocs MDX config (content dir)
├── proxy.ts                # Markdown content negotiation
└── render.yaml             # Render deployment blueprint
```

## Commands

```bash
npm install          # install dependencies (run manually)
npm run dev          # local preview at http://localhost:3000
npm run build        # production build
npm start            # serve production build (binds 0.0.0.0)
npm run types:check  # fumadocs-mdx + next typegen + tsc
```

Do not run `npm install` on behalf of the user unless they ask — tell them what to install.

## Editing documentation

- Add or edit pages under `content/docs/` as `.mdx` files.
- Every page needs YAML frontmatter with `title` and `description`.
- Update `content/docs/meta.json` (and folder-level `meta.json` files) to control sidebar order.
- Use Fumadocs MDX components where helpful: `<Cards>`, `<Card>`, `<Callout>`, etc.
- Internal links use paths like `/docs/direct-integration/launch`.

After content changes, verify locally with `npm run dev` before pushing.

## Audience

Casino operator backend teams implementing the SparkSports integration. Write for engineers who will build launch and wallet callback endpoints — not for end players.

## Terminology

| Term | Usage |
| --- | --- |
| **SparkSports** | Product name |
| **Operator / casino** | The integrating partner |
| **Launch API** | SparkSports endpoint that returns an iframe URL |
| **Callback / wallet API** | Endpoints the operator exposes for session validation and transactions |
| **Pincode** | Operator's stable player identifier (returned from authenticate) |
| **SessionId** | Operator's active player session token |
| **RoundId** | UUID identifying one game round |

## Writing style

- Active voice, second person ("you")
- Sentence case for headings
- Concise sentences — one idea each
- Code blocks for HTTP requests, responses, and JSON bodies
- Tables for field reference and error codes
- Bold for UI labels; inline code for paths, headers, and field names

## Content boundaries

**Include**

- Direct operator integration: launch, session validation, wallet API, transaction lifecycle
- Environments (staging vs production URLs)
- Security requirements and testing checklist
- Onboarding deliverables (credentials, limits) described generically

**Do not include**

- Aggregator or third-party platform integration paths
- Names of specific partners, resellers, or routing platforms
- Internal SparkSports architecture (NATS, game-engine, edge-api player APIs)
- Credentials, secrets, bearer tokens, or real staging/production keys
- `.env` values or admin API keys

This site may be shared with external casino partners. Treat every page as partner-safe.

## Deployment

- Render web service — see `render.yaml`
- Bind HTTP to `0.0.0.0:$PORT`
- Deploy behind **Cloudflare Zero Trust Access** (or equivalent) — do not expose publicly

## Git

- Remote: `SparkSports-ai/integration-docs` (or `PulseBet/integration-docs` if transferred)
- Content-only changes: edit MDX + `meta.json`, commit, push
- Do not commit `node_modules/`, `.next/`, or `.source/`

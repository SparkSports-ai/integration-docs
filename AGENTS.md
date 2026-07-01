# Integration docs: agent instructions

The **Spark Partner Portal** (`partners.sparksports.ai`): partner-facing site for casino operators integrating the Spark game with SparkSports. Built with [Fumadocs](https://fumadocs.dev) and Next.js, gated behind Cloudflare Access.

Today the portal is the integration **Documentation** section. **Changelog** and **Support** sections are planned; add them only when they have real content (see Portal sections below). The repo and Render service stay named `integration-docs`; the portal name lives in the UI (`lib/shared.ts` `appName`, `app/layout.tsx` metadata).

## Portal sections

The site currently has one section, the docs tree under `content/docs/`. To add a section (e.g. Changelog, Support) as a switchable sidebar tab, give it its own root folder under `content/docs/` with a `meta.json` containing `"root": true` plus a `title` and `icon`, then move the existing docs into a sibling `documentation/` root folder so they become peers. Do this when there is content to put in the new section, not before.

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
bun install          # install dependencies (run manually)
bun run dev          # local preview at http://localhost:3000
bun run build        # production build
bun start            # serve production build (binds 0.0.0.0)
bun run types:check  # fumadocs-mdx + next typegen + tsc
```

Do not run `bun install` on behalf of the user unless they ask.

Use **bun** (not npm) for this project. `tsconfig.json` must keep `jsx: "react-jsx"` and include `.next/dev/types/**/*.ts`. Next.js 16 requires both; do not revert to `jsx: "preserve"`.

The `[MDX] generated files` line during `dev` / `build` is normal Fumadocs output, not an error.

## Editing documentation

- Add or edit pages under `content/docs/` as `.mdx` files.
- Every page needs YAML frontmatter with `title` and `description`.
- Update `content/docs/meta.json` (and folder-level `meta.json` files) to control sidebar order.
- Use Fumadocs MDX components where helpful: `<Cards>`, `<Card>`, `<Callout>`, etc.
- Internal links use paths like `/docs/direct-integration/launch`.

After content changes, verify locally with `bun run dev` before pushing.

## Humanizer (writing quality)

When editing or adding prose, follow the [humanizer](https://github.com/blader/humanizer) skill. This is technical reference text: keep it plain and direct, not salesy or chatbot-polished.

Apply these rules to partner-facing copy:

- No em dashes or en dashes. Use commas, periods, or colons instead.
- No filler openers ("This guide explains...", "Let's dive in...", "Here's what you need to know").
- No significance inflation ("pivotal", "crucial", "landscape", "underscores").
- No rule-of-three padding or synonym cycling ("robust, seamless, intuitive").
- Minimal bold in body prose. Tables and inline code carry the structure.
- Prefer "is" / "are" over "serves as" / "functions as".
- Say who does what ("We call your API", "Your backend sends...") instead of passive vagueness.
- Vary sentence length a little. Short sentences are fine in API docs.
- Do not add opinions, humor, or first-person editorializing. Neutral engineer voice is correct here.

Run a quick self-check before finishing: read the paragraph aloud. If it sounds like marketing copy or a ChatGPT tutorial, rewrite it.

## Audience

Casino operator backend teams implementing the Spark integration with SparkSports. Write for engineers building launch and wallet callback endpoints, not for end players.

## Terminology

| Term | Usage |
| --- | --- |
| **SparkSports** | The company (us, the provider) |
| **Spark** | The game product, a live sports streak game |
| **Operator / casino** | The integrating partner |
| **Launch API** | SparkSports endpoint that returns a Spark iframe URL |
| **Callback / wallet API** | Endpoints the operator exposes for session validation and transactions |
| **playerId** | Operator's stable player identifier (returned from authenticate) |
| **sessionId** | Operator's active player session token |
| **roundId** | UUID identifying one game round |

## Writing style

- Second person ("you") where it fits; "we" for SparkSports actions
- Sentence case for headings
- One idea per sentence when you can
- Code blocks for HTTP, JSON, and HTML examples
- Tables for fields and error codes
- Inline code for paths, headers, and field names

## Content boundaries

**Include**

- Direct operator integration: launch, session validation, wallet API, transaction lifecycle
- Environments (staging vs production URLs)
- Security requirements and testing checklist
- Onboarding deliverables (credentials, limits) described generically

Use **Spark** for the game. Use **SparkSports** for the company, our APIs, or our services.

**Do not include**

- Aggregator or third-party platform integration paths
- Names of specific partners, resellers, or routing platforms
- Internal SparkSports architecture (NATS, game-engine, edge-api player APIs)
- Credentials, secrets, bearer tokens, or real staging/production keys
- `.env` values or admin API keys

This site may be shared with external casino partners. Treat every page as partner-safe.

## Deployment

- Render web service. See `render.yaml`.
- Bind HTTP to `0.0.0.0:$PORT`.
- Deploy behind Cloudflare Zero Trust Access (or equivalent). Do not expose publicly.
- Access setup is in `ACCESS.md`. `proxy.ts` verifies the Cloudflare Access JWT
  when `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` are set, so the origin cannot
  be used to bypass Access. Both unset means enforcement is off (local dev).

## Git

- Remote: `SparkSports-ai/integration-docs` (or `PulseBet/integration-docs` if transferred)
- Content-only changes: edit MDX + `meta.json`, commit, push
- Do not commit `node_modules/`, `.next/`, or `.source/`

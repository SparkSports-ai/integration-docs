# SparkSports Integration Docs

Partner-facing technical documentation for casino operators integrating SparkSports streak games.

Built with [Fumadocs](https://fumadocs.dev) and Next.js.

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Render)

This is a Next.js web service. Bind to `0.0.0.0:$PORT`:

```bash
npm run build && npm start
```

Recommended: place the site behind **Cloudflare Zero Trust Access** on a subdomain such as `partners.sparksports.ai` and invite partner emails — do not expose integration details publicly.

## Repository

GitHub: [Pulsebet/integration-docs](https://github.com/Pulsebet/integration-docs)

## Content

Documentation source lives in `content/docs/`. Edit MDX files and push to update the site.

# neo — Portfolio

Modern, self-updating developer portfolio. Pulls live data from the GitHub API
(profile, repositories, stars, languages) and renders it with a polished,
animated UI. Always current — no manual edits needed.

## Stack

- **Next.js 15** (App Router, React 19, `standalone` output)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** primitives
- **lucide-react** icons
- Server-side GitHub fetch, revalidated hourly

## Run with Docker Compose

```bash
cp .env.example .env        # optional: add a GITHUB_TOKEN
docker compose up --build
```

Open http://localhost:3000

## Local dev

```bash
npm install
npm run dev
```

## Configuration

| Variable       | Default        | Purpose                                  |
| -------------- | -------------- | ---------------------------------------- |
| `GITHUB_USER`  | `Neotoxic-off` | Account the portfolio is generated from  |
| `GITHUB_TOKEN` | _(empty)_      | Optional PAT — lifts API rate limit      |

## Architecture

```
app/            Next.js routes, layout, global styles
components/      Hero, stats, language bar, project explorer, footer
components/ui/   shadcn-style primitives (button, card, badge)
lib/             GitHub fetch layer, types, language colors
```

One file per concern — every route, component and config is isolated.

# NPF – Nordic Powerlifting Federation Website

A modern rebuild of [npfpower.wordpress.com](https://npfpower.wordpress.com/) using the **BETH stack** — server-rendered HTML with minimal client-side JavaScript.

## Tech Stack

| Layer      | Technology                |
|------------|--------------------------|
| Runtime    | [Bun](https://bun.sh/)   |
| Framework  | [Elysia](https://elysiajs.com/) |
| Database   | [Turso](https://turso.tech/) / libSQL (SQLite) |
| Frontend   | [HTMX](https://htmx.org/) |
| Templating | [JSX via @kitajs/html](https://github.com/kitajs/html) (server-side only) |
| Styling    | Custom CSS with NPF brand palette |

## Project Structure

```
src/
├── index.ts                # Elysia server entry point
├── db/
│   ├── client.ts           # libSQL database connection
│   ├── migrate.ts          # Schema migrations
│   └── seed.ts             # Seed data from NPF WordPress site
├── routes/
│   ├── home.tsx            # News / post routes
│   ├── npf.tsx             # About, board, bylaws
│   └── competitions.tsx    # Results & records
├── services/
│   ├── posts.ts            # Post queries
│   ├── board.ts            # Board member queries
│   └── competitions.ts     # Competition & record queries
├── views/
│   ├── layouts/base.tsx    # HTML layout shell (header, nav, footer)
│   └── pages/              # Page-level JSX components
│       ├── home.tsx
│       ├── about.tsx
│       ├── board.tsx
│       ├── bylaws.tsx
│       ├── results.tsx
│       └── records.tsx
└── public/
    ├── css/style.css       # Brand-themed stylesheet
    └── images/             # NPF logo and assets
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.1+

### Install & Run

```bash
# Install dependencies
bun install

# Seed the database with NPF data
bun run db:seed

# Start dev server (with hot reload)
bun run dev
```

The site will be available at **http://localhost:3000**.

### Available Scripts

| Script          | Command                        | Description                  |
|-----------------|--------------------------------|------------------------------|
| `bun run dev`   | `bun run --watch src/index.ts` | Dev server with hot reload   |
| `bun run start` | `bun run src/index.ts`         | Production server            |
| `bun run db:seed` | `bun run src/db/seed.ts`     | Seed database with NPF data |
| `bun run db:migrate` | `bun run src/db/migrate.ts` | Run schema migrations      |

### Production with Turso

```bash
# Set in .env:
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your-token

bun run start
```

## Pages

| Route           | Description                              |
|-----------------|------------------------------------------|
| `/`             | News feed                                |
| `/post/:slug`   | Individual news post                     |
| `/npf`          | About NPF                               |
| `/npf/board`    | Board members                            |
| `/npf/bylaws`   | Federation bylaws                        |
| `/results`      | Competition results archive (HTMX search)|
| `/records`      | Nordic records & standards               |

## Architecture

- **Server-rendered JSX** — All HTML is rendered on the server using `@kitajs/html`. No React runtime, no hydration — just fast string output.
- **HTMX for interactivity** — Dynamic updates (search, filtering) use HTMX partial HTML responses instead of client-side JavaScript frameworks.
- **SQLite-first** — Local development uses a SQLite file; production can swap to Turso with zero code changes.
- **Brand theming** — Custom CSS palette derived from the NPF logo: Nordic red, Scandinavian blue, Swedish gold, and black.

## Environment Variables

See `.env.example`:

| Variable             | Description                          | Default        |
|---------------------|--------------------------------------|----------------|
| `DATABASE_URL`      | SQLite file path or Turso URL        | `file:local.db`|
| `DATABASE_AUTH_TOKEN`| Turso auth token (production only)   | —              |
| `PORT`              | Server port                          | `3000`         |

## License

ISC

# NPF – Nordic Powerlifting Federation Website

A modern rebuild of [npfpower.wordpress.com](https://npfpower.wordpress.com/) using the **BETH stack**.

## Tech Stack

| Layer     | Technology       |
|-----------|-----------------|
| Runtime   | Bun             |
| Framework | Elysia          |
| Database  | Turso / libSQL   |
| Frontend  | HTMX            |
| Styling   | Vanilla CSS      |

## Project Structure

```
src/
├── index.ts              # Entry point
├── db/
│   ├── client.ts         # Database connection
│   ├── migrate.ts        # Schema migrations
│   └── seed.ts           # Seed data
├── routes/
│   ├── home.ts           # News / post routes
│   ├── npf.ts            # About, board, bylaws
│   └── competitions.ts   # Results & records
├── services/
│   ├── posts.ts          # Post queries
│   ├── board.ts          # Board member queries
│   └── competitions.ts   # Competition & record queries
├── views/
│   ├── layouts/base.ts   # HTML layout shell
│   └── pages/            # Page templates
└── public/
    └── css/style.css     # Styles
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

### Production

```bash
# Using Turso (optional)
# Set in .env:
# DATABASE_URL=libsql://your-db.turso.io
# DATABASE_AUTH_TOKEN=your-token

bun run start
```

## Pages

- `/` — News feed
- `/post/:slug` — Individual news post
- `/npf` — About NPF
- `/npf/board` — Board members
- `/npf/bylaws` — Federation bylaws
- `/results` — Competition results archive (with HTMX search)
- `/records` — Nordic records & standards

## Environment Variables

See `.env.example`:

| Variable             | Description                          |
|---------------------|--------------------------------------|
| `DATABASE_URL`      | SQLite file path or Turso URL        |
| `DATABASE_AUTH_TOKEN`| Turso auth token (production only)   |
| `PORT`              | Server port (default: 3000)          |

## License

ISC

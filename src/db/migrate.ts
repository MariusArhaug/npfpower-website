import db from "./client";

const migrations = [
  // News/posts table
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'news',
    published_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )`,

  // Board members
  `CREATE TABLE IF NOT EXISTS board_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT,
    country TEXT NOT NULL,
    email TEXT,
    sort_order INTEGER DEFAULT 0
  )`,

  // Competition results
  `CREATE TABLE IF NOT EXISTS competitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    country TEXT
  )`,

  `CREATE TABLE IF NOT EXISTS competition_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    competition_id INTEGER NOT NULL REFERENCES competitions(id),
    category TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT,
    sort_order INTEGER DEFAULT 0
  )`,

  // Records categories
  `CREATE TABLE IF NOT EXISTS record_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discipline TEXT NOT NULL,
    gender TEXT NOT NULL,
    equipment TEXT NOT NULL,
    age_class TEXT NOT NULL,
    label TEXT NOT NULL,
    pdf_url TEXT,
    sort_order INTEGER DEFAULT 0
  )`,
];

export async function migrate() {
  console.log("Running migrations...");
  for (const sql of migrations) {
    await db.execute(sql);
  }
  console.log("Migrations complete.");
}

if (import.meta.main) {
  await migrate();
}

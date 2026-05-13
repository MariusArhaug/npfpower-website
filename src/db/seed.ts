import db from "./client";
import { migrate } from "./migrate";

async function seed() {
  await migrate();

  console.log("Seeding database...");

  // --- Posts ---
  const posts = [
    {
      title: "NPF Congress",
      slug: "npf-congress-2025",
      content: `<p>NPF's biennial congress was held in Iceland in conjunction with the Nordic Championships.</p>
<p><a href="/npf/board">A new board was elected</a>. Sofia Kamlund, Sweden, was elected President.</p>
<p><a href="/npf/bylaws">Two changes were made to the NPF bylaws</a>.</p>`,
      category: "news",
      published_at: "2025-09-22",
    },
    {
      title: "Nordic Championships – Results",
      slug: "nordic-championships-results-2025",
      content: `<p>Results from the Nordic Championships 2025 in Iceland have been published.</p>
<h3>Best Lifters – Powerlifting Classic</h3>
<ul>
<li><strong>Sub-junior men:</strong> Mikkel Vork – Denmark</li>
<li><strong>Sub-junior women:</strong> Carin Isacson – Sweden</li>
<li><strong>Junior men:</strong> Emil Svensson – Sweden</li>
<li><strong>Junior women:</strong> Laura Sorsa – Finland</li>
</ul>
<h3>Best Lifters – Powerlifting Equipped</h3>
<ul>
<li><strong>Sub-junior women:</strong> Ada Sofie Helsteh Berge – Norway</li>
<li><strong>Sub-junior men:</strong> Ragnar Kristoffersen – Norway</li>
<li><strong>Junior women:</strong> Ida Grieg-Falkeid – Norway</li>
<li><strong>Junior men:</strong> Mathias Rindom Vestergaard – Denmark</li>
</ul>
<h3>Best Lifters – Bench Press Classic</h3>
<ul>
<li><strong>Sub-junior women:</strong> Tara Sklenár – Iceland</li>
<li><strong>Sub-junior men:</strong> Ragnar Ingi Ragnarsson – Iceland</li>
<li><strong>Junior men:</strong> Holjer Nilson – Sweden</li>
</ul>`,
      category: "news",
      published_at: "2025-09-17",
    },
    {
      title: "Nordic – Streaming",
      slug: "nordic-streaming-2025",
      content: `<p>Watch the Nordic Championships 2025 live:</p>
<ul>
<li><strong>Friday 12.09:</strong> <a href="https://www.youtube.com/live/hUw5_f8Lxqo" target="_blank">Livestream Friday</a></li>
<li><strong>Saturday 13.09:</strong> <a href="https://www.youtube.com/live/79ybw9ZKVyw" target="_blank">Livestream Saturday</a></li>
<li><strong>Sunday 14.09:</strong> <a href="https://www.youtube.com/live/6VVe5UFfxn8" target="_blank">Livestream Sunday</a></li>
</ul>`,
      category: "news",
      published_at: "2025-09-12",
    },
    {
      title: "Nordic Championships – Invitation",
      slug: "nordic-championships-invitation-2025",
      content: `<p>Nordic Championships for juniors and sub-juniors will be arranged in Garðabæ, Iceland September 12–14th.</p>
<p>Preliminary nominations by July 14th. Final nominations by August 22nd.</p>
<p>Time schedule is preliminary and might be updated when the nominations are in.</p>`,
      category: "news",
      published_at: "2025-05-12",
    },
  ];

  for (const post of posts) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO posts (title, slug, content, category, published_at) VALUES (?, ?, ?, ?, ?)`,
      args: [post.title, post.slug, post.content, post.category, post.published_at],
    });
  }

  // --- Board Members ---
  const members = [
    { name: "Sofia Kamlund", role: "President", country: "Sweden", email: "sofia.kamlund@styrkelyft.se", sort_order: 1 },
    { name: "Ann Jordebo", role: "General Secretary", country: "Sweden", email: null, sort_order: 2 },
    { name: "Jørgen Rasmussen", role: "Board Member", country: "Denmark", email: "jmbr@live.dk", sort_order: 3 },
    { name: "Laufey Agnarsdóttir", role: "Board Member", country: "Iceland", email: "laufey@kraft.is", sort_order: 4 },
    { name: "Tero Hyttinen", role: "Board Member", country: "Finland", email: "Tero.hyttinen@svnl.fi", sort_order: 5 },
    { name: "Ralf Andre Male", role: "Board Member", country: "Norway", email: "ralfandre.male@idrettsmail.no", sort_order: 6 },
    { name: "TBD", role: "Board Member", country: "Faroe Islands", email: null, sort_order: 7 },
  ];

  for (const m of members) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO board_members (name, role, country, email, sort_order) VALUES (?, ?, ?, ?, ?)`,
      args: [m.name, m.role, m.country, m.email, m.sort_order],
    });
  }

  // --- Competitions ---
  const competitions = [
    { year: 2025, name: "Nordic Championships – Jr/Subjr", location: "Garðabæ", country: "Iceland" },
    { year: 2023, name: "Nordic Championships – Jr/Subjr", location: "Lillestrøm", country: "Norway" },
    { year: 2022, name: "Nordic Championships – Jr/Subjr", location: "Jönköping", country: "Sweden" },
    { year: 2021, name: "Nordic Championships – Jr/Subjr", location: "Pornainen", country: "Finland" },
    { year: 2019, name: "Nordic Championships – Jr/Subjr", location: "Videbæk", country: "Denmark" },
    { year: 2018, name: "Nordic Championships – Jr/Subjr", location: "Akureyri", country: "Iceland" },
  ];

  for (const c of competitions) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO competitions (year, name, location, country) VALUES (?, ?, ?, ?)`,
      args: [c.year, c.name, c.location, c.country],
    });
  }

  // --- Record categories ---
  const records = [
    // Powerlifting - Men Classic
    { discipline: "Powerlifting", gender: "Men", equipment: "Classic", age_class: "Open", label: "Men Open", sort_order: 1 },
    { discipline: "Powerlifting", gender: "Men", equipment: "Classic", age_class: "Sub-Junior", label: "Men U18", sort_order: 2 },
    { discipline: "Powerlifting", gender: "Men", equipment: "Classic", age_class: "Junior", label: "Men U23", sort_order: 3 },
    // Powerlifting - Men Equipped
    { discipline: "Powerlifting", gender: "Men", equipment: "Equipped", age_class: "Open", label: "Men Open", sort_order: 4 },
    { discipline: "Powerlifting", gender: "Men", equipment: "Equipped", age_class: "Junior", label: "Men U23", sort_order: 5 },
    { discipline: "Powerlifting", gender: "Men", equipment: "Equipped", age_class: "Sub-Junior", label: "Men U18", sort_order: 6 },
    // Powerlifting - Women Classic
    { discipline: "Powerlifting", gender: "Women", equipment: "Classic", age_class: "Open", label: "Women Open", sort_order: 10 },
    { discipline: "Powerlifting", gender: "Women", equipment: "Classic", age_class: "Sub-Junior", label: "Women U18", sort_order: 11 },
    { discipline: "Powerlifting", gender: "Women", equipment: "Classic", age_class: "Junior", label: "Women U23", sort_order: 12 },
    // Powerlifting - Women Equipped
    { discipline: "Powerlifting", gender: "Women", equipment: "Equipped", age_class: "Open", label: "Women Open", sort_order: 13 },
    { discipline: "Powerlifting", gender: "Women", equipment: "Equipped", age_class: "Sub-Junior", label: "Women U18", sort_order: 14 },
    { discipline: "Powerlifting", gender: "Women", equipment: "Equipped", age_class: "Junior", label: "Women U23", sort_order: 15 },
    // Bench Press - Men Classic
    { discipline: "Bench Press", gender: "Men", equipment: "Classic", age_class: "Open", label: "Men Open", sort_order: 20 },
    { discipline: "Bench Press", gender: "Men", equipment: "Classic", age_class: "Sub-Junior", label: "Men U18", sort_order: 21 },
    { discipline: "Bench Press", gender: "Men", equipment: "Classic", age_class: "Junior", label: "Men U23", sort_order: 22 },
    // Bench Press - Women Classic
    { discipline: "Bench Press", gender: "Women", equipment: "Classic", age_class: "Open", label: "Women Open", sort_order: 30 },
    { discipline: "Bench Press", gender: "Women", equipment: "Classic", age_class: "Sub-Junior", label: "Women U18", sort_order: 31 },
    { discipline: "Bench Press", gender: "Women", equipment: "Classic", age_class: "Junior", label: "Women U23", sort_order: 32 },
  ];

  for (const r of records) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO record_categories (discipline, gender, equipment, age_class, label, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [r.discipline, r.gender, r.equipment, r.age_class, r.label, r.sort_order],
    });
  }

  console.log("Seeding complete.");
}

seed().catch(console.error);

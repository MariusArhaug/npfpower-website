import { Elysia } from "elysia";
import { Layout } from "../views/layouts/base.tsx";
import { ResultsPage, CompetitionsList } from "../views/pages/results.tsx";
import { RecordsPage } from "../views/pages/records.tsx";
import { getAllCompetitions, getRecordCategories } from "../services/competitions";
import db from "../db/client";

export const competitionRoutes = new Elysia()
  .get("/results", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const competitions = await getAllCompetitions();
    const content = <ResultsPage competitions={competitions} />;
    if (request.headers.get("hx-request")) return content;
    return <Layout title="Results" activePage="results">{content}</Layout>;
  })
  .get("/results/search", async ({ query, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const q = (query.q as string) ?? "";
    if (!q.trim()) {
      const competitions = await getAllCompetitions();
      return <CompetitionsList competitions={competitions} />;
    }
    const result = await db.execute({
      sql: `SELECT * FROM competitions
            WHERE CAST(year AS TEXT) LIKE ? OR location LIKE ? OR country LIKE ?
            ORDER BY year DESC`,
      args: [`%${q}%`, `%${q}%`, `%${q}%`],
    });
    return <CompetitionsList competitions={result.rows as any} />;
  })
  .get("/records", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const records = await getRecordCategories();
    const content = <RecordsPage records={records} />;
    if (request.headers.get("hx-request")) return content;
    return <Layout title="Records" activePage="records">{content}</Layout>;
  });

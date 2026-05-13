import { Elysia } from "elysia";
import { layout } from "../views/layouts/base";
import { resultsPage, competitionsList } from "../views/pages/results";
import { recordsPage } from "../views/pages/records";
import { getAllCompetitions, getRecordCategories } from "../services/competitions";
import db from "../db/client";

export const competitionRoutes = new Elysia()
  .get("/results", async ({ request }) => {
    const competitions = await getAllCompetitions();
    const content = resultsPage(competitions);
    if (request.headers.get("hx-request")) return content;
    return layout("Results", content, "results");
  })
  .get("/results/search", async ({ query }) => {
    const q = (query.q as string) ?? "";
    if (!q.trim()) {
      const competitions = await getAllCompetitions();
      return competitionsList(competitions);
    }
    const result = await db.execute({
      sql: `SELECT * FROM competitions
            WHERE CAST(year AS TEXT) LIKE ? OR location LIKE ? OR country LIKE ?
            ORDER BY year DESC`,
      args: [`%${q}%`, `%${q}%`, `%${q}%`],
    });
    return competitionsList(result.rows as any);
  })
  .get("/records", async ({ request }) => {
    const records = await getRecordCategories();
    const content = recordsPage(records);
    if (request.headers.get("hx-request")) return content;
    return layout("Records", content, "records");
  });

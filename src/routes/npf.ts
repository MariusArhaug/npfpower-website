import { Elysia } from "elysia";
import { layout } from "../views/layouts/base";
import { aboutPage } from "../views/pages/about";
import { boardPage } from "../views/pages/board";
import { bylawsPage } from "../views/pages/bylaws";
import { getAllBoardMembers } from "../services/board";

export const npfRoutes = new Elysia({ prefix: "/npf" })
  .get("/", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const content = aboutPage();
    if (request.headers.get("hx-request")) return content;
    return layout("About NPF", content, "npf");
  })
  .get("/board", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const members = await getAllBoardMembers();
    const content = boardPage(members);
    if (request.headers.get("hx-request")) return content;
    return layout("Board Members", content, "board");
  })
  .get("/bylaws", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const content = bylawsPage();
    if (request.headers.get("hx-request")) return content;
    return layout("Bylaws", content, "bylaws");
  });

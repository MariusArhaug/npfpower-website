import { Elysia } from "elysia";
import { Layout } from "../views/layouts/base.tsx";
import { AboutPage } from "../views/pages/about.tsx";
import { BoardPage } from "../views/pages/board.tsx";
import { BylawsPage } from "../views/pages/bylaws.tsx";
import { getAllBoardMembers } from "../services/board";

export const npfRoutes = new Elysia({ prefix: "/npf" })
  .get("/", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const content = <AboutPage />;
    if (request.headers.get("hx-request")) return content;
    return <Layout title="About NPF" activePage="npf">{content}</Layout>;
  })
  .get("/board", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const members = await getAllBoardMembers();
    const content = <BoardPage members={members} />;
    if (request.headers.get("hx-request")) return content;
    return <Layout title="Board Members" activePage="board">{content}</Layout>;
  })
  .get("/bylaws", async ({ request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const content = <BylawsPage />;
    if (request.headers.get("hx-request")) return content;
    return <Layout title="Bylaws" activePage="bylaws">{content}</Layout>;
  });

import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { homeRoutes } from "./routes/home.tsx";
import { npfRoutes } from "./routes/npf.tsx";
import { competitionRoutes } from "./routes/competitions.tsx";
import { migrate } from "./db/migrate";

// Run migrations on startup
await migrate();

const port = process.env.PORT || 3000;

const app = new Elysia()
  .use(staticPlugin({ prefix: "/public", assets: "src/public" }))
  .onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return "<h1>404 – Page not found</h1>";
    }
  })
  .use(homeRoutes)
  .use(npfRoutes)
  .use(competitionRoutes)
  .listen(port);

console.log(`🏋️ NPF website running at http://localhost:${port}`);

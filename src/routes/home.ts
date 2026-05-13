import { Elysia } from "elysia";
import { layout } from "../views/layouts/base";
import { homePage, postPage } from "../views/pages/home";
import { getAllPosts, getPostBySlug } from "../services/posts";

export const homeRoutes = new Elysia()
  .get("/", async ({ request, set }) => {
    const posts = await getAllPosts();
    const content = homePage(posts);
    set.headers["content-type"] = "text/html; charset=utf-8";

    if (request.headers.get("hx-request")) {
      return content;
    }
    return layout("News", content, "home");
  })
  .get("/post/:slug", async ({ params, request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const post = await getPostBySlug(params.slug);
    if (!post) {
      set.status = 404;
      const content = `<h1>Post not found</h1><p><a href="/">Back to news</a></p>`;
      return request.headers.get("hx-request") ? content : layout("Not Found", content);
    }

    const content = postPage(post);
    if (request.headers.get("hx-request")) {
      return content;
    }
    return layout(post.title, content, "home");
  });

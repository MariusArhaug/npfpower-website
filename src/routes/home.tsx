import { Elysia } from "elysia";
import { Layout } from "../views/layouts/base.tsx";
import { HomePage, PostPage, heroHtml } from "../views/pages/home.tsx";
import { getAllPosts, getPostBySlug } from "../services/posts";

export const homeRoutes = new Elysia()
  .get("/", async ({ request, set }) => {
    const posts = await getAllPosts();
    const content = <HomePage posts={posts} />;
    set.headers["content-type"] = "text/html; charset=utf-8";

    if (request.headers.get("hx-request")) {
      return content;
    }
    return <Layout title="News" activePage="home" heroContent={heroHtml}>{content}</Layout>;
  })
  .get("/post/:slug", async ({ params, request, set }) => {
    set.headers["content-type"] = "text/html; charset=utf-8";
    const post = await getPostBySlug(params.slug);
    if (!post) {
      set.status = 404;
      const content = <><h1>Post not found</h1><p><a href="/">Back to news</a></p></>;
      return request.headers.get("hx-request")
        ? content
        : <Layout title="Not Found">{content}</Layout>;
    }

    const content = <PostPage post={post} />;
    if (request.headers.get("hx-request")) {
      return content;
    }
    return <Layout title={post.title} activePage="home">{content}</Layout>;
  });

import type { Post } from "../../services/posts";

export function homePage(posts: Post[]): string {
  return `
    <section class="page-section">
      <h1>Latest News</h1>
      <div id="posts-list">
        ${posts.map(postCard).join("")}
      </div>
    </section>
  `;
}

export function postCard(post: Post): string {
  const date = new Date(post.published_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <article class="post-card">
      <h2>
        <a href="/post/${post.slug}" hx-get="/post/${post.slug}" hx-target="main" hx-swap="innerHTML" hx-push-url="true">
          ${post.title}
        </a>
      </h2>
      <time datetime="${post.published_at}">${date}</time>
      <span class="badge">${post.category.toUpperCase()}</span>
    </article>
  `;
}

export function postPage(post: Post): string {
  const date = new Date(post.published_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <article class="post-detail">
      <a href="/" class="back-link" hx-get="/" hx-target="main" hx-swap="innerHTML" hx-push-url="true">&larr; Back to News</a>
      <h1>${post.title}</h1>
      <time datetime="${post.published_at}">${date}</time>
      <span class="badge">${post.category.toUpperCase()}</span>
      <div class="post-content">
        ${post.content}
      </div>
    </article>
  `;
}

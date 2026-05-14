import type { Post } from "../../services/posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const heroHtml = `
<section class="hero">
  <h1>Nordic Powerlifting Federation</h1>
  <div class="gold-line"></div>
  <p>Uniting powerlifters across the Nordic countries since 1975</p>
</section>`;

export function HomePage({ posts }: { posts: Post[] }) {
  return (
    <section class="page-section">
      <div class="section-header">
        <div class="shadow-text">NEWS</div>
        <h1>Latest News</h1>
      </div>
      <div class="posts-grid" id="posts-list">
        {posts.map((post, i) => (
          <PostCard post={post} index={i} />
        ))}
      </div>
    </section>
  );
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const date = formatDate(post.published_at);

  return (
    <article class={`post-card reveal`} style={`transition-delay: ${index * 0.1}s`}>
      <div class="post-card-header">
        <h2>
          <a
            href={`/post/${post.slug}`}
            hx-get={`/post/${post.slug}`}
            hx-target="main"
            hx-swap="innerHTML"
            hx-push-url="true"
          >
            {post.title}
          </a>
        </h2>
      </div>
      <div class="post-card-body">
        <time datetime={post.published_at}>{date}</time>
        <span class="badge">{post.category.toUpperCase()}</span>
      </div>
    </article>
  );
}

export function PostPage({ post }: { post: Post }) {
  const date = formatDate(post.published_at);

  return (
    <article class="post-detail">
      <a
        href="/"
        class="back-link"
        hx-get="/"
        hx-target="main"
        hx-swap="innerHTML"
        hx-push-url="true"
      >
        &larr; Back to News
      </a>
      <h1>{post.title}</h1>
      <time datetime={post.published_at}>{date}</time>
      <span class="badge">{post.category.toUpperCase()}</span>
      <div class="post-content">{post.content as "safe"}</div>
    </article>
  );
}

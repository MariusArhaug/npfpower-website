import type { Post } from "../../services/posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function HomePage({ posts }: { posts: Post[] }) {
  return (
    <section class="page-section">
      <h1>Latest News</h1>
      <div id="posts-list">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </section>
  );
}

export function PostCard({ post }: { post: Post }) {
  const date = formatDate(post.published_at);

  return (
    <article class="post-card">
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
      <time datetime={post.published_at}>{date}</time>
      <span class="badge">{post.category.toUpperCase()}</span>
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

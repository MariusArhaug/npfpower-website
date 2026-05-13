import db from "../db/client";

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  published_at: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await db.execute("SELECT * FROM posts ORDER BY published_at DESC");
  return result.rows as unknown as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });
  return (result.rows[0] as unknown as Post) ?? null;
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const result = await db.execute({
    sql: "SELECT * FROM posts ORDER BY published_at DESC LIMIT ?",
    args: [limit],
  });
  return result.rows as unknown as Post[];
}

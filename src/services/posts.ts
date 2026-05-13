import { getDb } from "../db/client";

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  published_at: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await getDb().execute<Post>(
    "SELECT * FROM posts ORDER BY published_at DESC"
  );
  return result.rows;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await getDb().execute<Post>(
    "SELECT * FROM posts WHERE slug = ?",
    [slug]
  );
  return result.rows[0] ?? null;
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const result = await getDb().execute<Post>(
    "SELECT * FROM posts ORDER BY published_at DESC LIMIT ?",
    [limit]
  );
  return result.rows;
}

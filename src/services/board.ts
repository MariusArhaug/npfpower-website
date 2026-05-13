import db from "../db/client";

export interface BoardMember {
  id: number;
  name: string;
  role: string | null;
  country: string;
  email: string | null;
  sort_order: number;
}

export async function getAllBoardMembers(): Promise<BoardMember[]> {
  const result = await db.execute("SELECT * FROM board_members ORDER BY sort_order ASC");
  return result.rows as unknown as BoardMember[];
}

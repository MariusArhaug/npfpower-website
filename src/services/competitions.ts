import { getDb } from "../db/client";

export interface Competition {
  id: number;
  year: number;
  name: string;
  location: string | null;
  country: string | null;
}

export interface RecordCategory {
  id: number;
  discipline: string;
  gender: string;
  equipment: string;
  age_class: string;
  label: string;
  pdf_url: string | null;
  sort_order: number;
}

export async function getAllCompetitions(): Promise<Competition[]> {
  const result = await getDb().execute<Competition>(
    "SELECT * FROM competitions ORDER BY year DESC"
  );
  return result.rows;
}

export async function getRecordCategories(): Promise<RecordCategory[]> {
  const result = await getDb().execute<RecordCategory>(
    "SELECT * FROM record_categories ORDER BY sort_order ASC"
  );
  return result.rows;
}

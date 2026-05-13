import { createClient, type Client } from "@libsql/client";
import type { DatabaseAdapter, QueryResult } from "../types";

export function createSQLiteAdapter(
  url: string,
  authToken?: string
): DatabaseAdapter {
  const client: Client = createClient({ url, authToken });

  return {
    dialect: "sqlite",

    async execute<T = Record<string, unknown>>(
      sql: string,
      args: unknown[] = []
    ): Promise<QueryResult<T>> {
      const result = await client.execute({ sql, args });
      return {
        rows: result.rows as unknown as T[],
        rowsAffected: result.rowsAffected,
      };
    },

    async close() {
      client.close();
    },
  };
}

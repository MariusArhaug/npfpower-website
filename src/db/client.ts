import type { DatabaseAdapter } from "./types";
import { createSQLiteAdapter } from "./adapters/sqlite";

let instance: DatabaseAdapter | null = null;

/**
 * Get (or lazily create) the database adapter.
 *
 * The driver is chosen by the DATABASE_DRIVER env var.
 * Add new adapters in src/db/adapters/ and register them here.
 */
export function getDb(): DatabaseAdapter {
  if (!instance) {
    const driver = process.env.DATABASE_DRIVER || "sqlite";
    const url = process.env.DATABASE_URL || "file:local.db";

    switch (driver) {
      case "sqlite":
        instance = createSQLiteAdapter(url, process.env.DATABASE_AUTH_TOKEN);
        break;

      // To add a new driver:
      // case "mysql":
      //   instance = createMySQLAdapter(url);
      //   break;
      // case "postgres":
      //   instance = createPostgresAdapter(url);
      //   break;

      default:
        throw new Error(
          `Unsupported DATABASE_DRIVER: "${driver}". Supported: sqlite`
        );
    }
  }
  return instance;
}

export type { DatabaseAdapter, QueryResult } from "./types";

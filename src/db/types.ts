/** Result shape returned by all database adapters */
export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
  rowsAffected: number;
}

/** Minimal interface every database adapter must implement */
export interface DatabaseAdapter {
  /** SQL dialect — use this to branch migration/seed SQL when needed */
  readonly dialect: "sqlite" | "mysql" | "postgres";

  /** Execute a SQL statement with optional positional parameters */
  execute<T = Record<string, unknown>>(
    sql: string,
    args?: unknown[]
  ): Promise<QueryResult<T>>;

  /** Shut down the connection / pool */
  close(): Promise<void>;
}

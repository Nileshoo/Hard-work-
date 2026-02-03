import pg from "pg";
import { env } from "../config/env.js";

export const pool = new pg.Pool({
  connectionString: env.databaseUrl
});

export const query = (text: string, params?: Array<string | number | boolean | null>) => {
  return pool.query(text, params);
};

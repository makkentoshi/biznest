import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";


const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not set in environment variables!");
}


const sql = neon(DATABASE_URL, {
  fetchOptions: {
    keepalive: true, // Для NeonDB с SSL
  },
});

export const db = drizzle(sql, { schema });

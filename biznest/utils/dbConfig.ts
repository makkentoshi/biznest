import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Прямая ссылка на базу данных
const DATABASE_URL =
  "postgresql://neondb_owner:EcAFKl2aRkn8@ep-dawn-silence-a9k3o9ym.gwc.azure.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL, {
  fetchOptions: {
    keepalive: true, // Для NeonDB с SSL
  },
});

export const db = drizzle(sql, { schema });

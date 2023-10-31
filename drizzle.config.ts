import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    database: "main",
    host: env.DATABASE_HOST,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  },
  tablesFilter: ["todos_*"],
} satisfies Config;

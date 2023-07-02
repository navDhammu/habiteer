import { config } from 'dotenv';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import { Pool } from 'pg';

config();

export const db = new Kysely<DB>({
   dialect: new PostgresDialect({
      pool: new Pool({
         connectionString: process.env.DATABASE_URL,
         max: 5,
      }),
   }),
   plugins: [new CamelCasePlugin()],
});

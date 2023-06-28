import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

config();

const client = postgres(process.env.DB_URL!);

const db = drizzle(client);

export default db;

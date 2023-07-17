import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

export default db;

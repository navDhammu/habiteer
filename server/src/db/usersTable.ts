import { InferModel, eq } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import db from '.';

export const usersTable = pgTable('users', {
   id: serial('id').primaryKey().notNull(),
   name: text('name'),
   email: text('email').notNull(),
   password: text('password').notNull(),
});

type User = InferModel<typeof usersTable>;
type NewUser = InferModel<typeof usersTable, 'insert'>;

export async function insertUser(user: NewUser) {
   return db.insert(usersTable).values(user);
}

export async function getUserByEmail(email: User['email']) {
   return db.select().from(usersTable).where(eq(usersTable.email, email));
}

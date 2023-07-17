import { InferModel, eq } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import db from '../postgres';

const users = pgTable('users', {
   name: text('name'),
   email: text('email').notNull(),
   password: text('password').notNull(),
   id: serial('id').primaryKey().notNull(),
});

type User = InferModel<typeof users>;
type NewUser = InferModel<typeof users, 'insert'>;

async function getUserByEmail(email: User['email']) {
   const result = await db.select().from(users).where(eq(users.email, email));
   return result[0];
}

async function insertUser(user: NewUser) {
   const result = await db
      .insert(users)
      .values(user)
      .returning({ insertedId: users.id });

   return result[0].insertedId;
}

export { users, User, NewUser, getUserByEmail, insertUser };

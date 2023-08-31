import { eq } from 'drizzle-orm';
import db from '../db';
import { InsertableUser, SelectableUser, usersTable } from './dbSchema';

async function getUserByEmail(email: SelectableUser['email']) {
   const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
   return result[0];
}

async function insertUser(user: InsertableUser) {
   const result = await db
      .insert(usersTable)
      .values(user)
      .returning({ insertedId: usersTable.id });

   return result[0].insertedId;
}

export { getUserByEmail, insertUser };

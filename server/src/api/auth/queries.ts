import { eq } from 'drizzle-orm';
import { db, User, NewUser, usersTable } from '../../db';

async function getUserByEmail(email: User['email']) {
   const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
   return result[0];
}

async function insertUser(user: NewUser) {
   const result = await db
      .insert(usersTable)
      .values(user)
      .returning({ insertedId: usersTable.id });

   return result[0].insertedId;
}

export { getUserByEmail, insertUser };

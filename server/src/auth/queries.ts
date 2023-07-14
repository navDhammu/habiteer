import { Users } from 'kysely-codegen';
import { db } from '../db';
import { Insertable } from 'kysely';

export async function getUserByEmail(email: Users['email']) {
   return db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
}

export async function createUser(user: Insertable<Users>) {
   return db
      .insertInto('users')
      .values(user)
      .returning(['email', 'id', 'name'])
      .executeTakeFirstOrThrow();
}

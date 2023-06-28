import { Insertable } from 'kysely';
import { Habits } from 'kysely-codegen';
import { db } from '../../db';

export async function createHabit(habit: Insertable<Habits>) {
   return db.insertInto('habits').values(habit).execute();
}

export async function getAllHabits(userId: number) {
   return db
      .selectFrom('habits')
      .selectAll()
      .where('user_id', '=', userId)
      .execute();
}

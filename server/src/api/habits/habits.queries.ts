import { Insertable } from 'kysely';
import { Habits } from 'kysely-codegen';
import { db } from '../../db';
import { SelectableHabit } from './types';

export async function createHabit(habit: Insertable<Habits>) {
   return db.insertInto('habits').values(habit).execute();
}

export async function deleteHabit(id: SelectableHabit['id']) {
   return db
      .deleteFrom('habits')
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
}

export async function getAllHabits(userId: number) {
   return db
      .selectFrom('habits')
      .selectAll()
      .where('userId', '=', userId)
      .execute();
}

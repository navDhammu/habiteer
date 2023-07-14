import { db } from '../db';
import { Habits } from 'kysely-codegen';
import { InsertableHabit, SelectableHabit } from './types';

function selectAllHabits(userId: Habits['userId']) {
   return db
      .selectFrom('habits')
      .selectAll()
      .where('userId', '=', userId)
      .execute();
}

function insertHabit(habit: InsertableHabit) {
   return db.insertInto('habits').values(habit).execute();
}

function deleteHabit(id: SelectableHabit['id']) {
   return db
      .deleteFrom('habits')
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
}

export { selectAllHabits, insertHabit, deleteHabit };

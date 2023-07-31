import {
   db,
   habitsTable,
   InsertableHabit,
   Habit,
   completionsTable,
   InsertableCompletion,
} from '../../db';
import { eq } from 'drizzle-orm';

export async function selectAllHabits(userId: Habit['userId']) {
   return db.select().from(habitsTable).where(eq(habitsTable.userId, userId));
}

export async function insertHabit(habit: InsertableHabit) {
   return db.insert(habitsTable).values(habit).returning();
}

export async function deleteHabit(id: Habit['id']) {
   return db.delete(habitsTable).where(eq(habitsTable.id, id));
}

export async function insertCompletions(completions: InsertableCompletion[]) {
   db.insert(completionsTable).values(completions);
}

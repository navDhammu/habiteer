import { db, habitsTable, InsertableHabit, Habit } from '../../db';
import { eq } from 'drizzle-orm';

async function selectAllHabits(userId: Habit['userId']) {
   return db.select().from(habitsTable).where(eq(habitsTable.userId, userId));
}

async function insertHabit(habit: InsertableHabit) {
   return db.insert(habitsTable).values(habit).returning();
}

async function deleteHabit(id: Habit['id']) {
   return db.delete(habitsTable).where(eq(habitsTable.id, id));
}

export { selectAllHabits, insertHabit, deleteHabit };

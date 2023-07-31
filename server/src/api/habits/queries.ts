import {
   db,
   habitsTable,
   InsertableHabit,
   Habit,
   completionsTable,
   InsertableCompletion,
   Completion,
} from '../../db';
import { and, eq, inArray, sql } from 'drizzle-orm';

type UserId = Habit['userId'];

export async function selectAllHabits(userId: UserId) {
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

export async function selectCompletions(userId: UserId, date?: string) {
   const subquery = db
      .select({ habitId: habitsTable.id })
      .from(habitsTable)
      .where(eq(habitsTable.userId, userId))
      .as('sq');

   return await db
      .select({
         habitId: completionsTable.habitId,
         completionStatus: completionsTable.completionStatus,
         scheduledDate: sql<
            Completion['scheduledDate']
         >`to_char(${completionsTable.scheduledDate}, 'YYYY-MM-DD')`,
      })
      .from(completionsTable)
      .where(
         and(
            date ? eq(completionsTable.scheduledDate, date) : undefined,
            inArray(completionsTable.habitId, db.select().from(subquery))
         )
      );
}

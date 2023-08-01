import dayjs from 'dayjs';
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

export async function deleteHabit(id: Habit['id']) {
   return db.delete(habitsTable).where(eq(habitsTable.id, id));
}

export async function createHabitTransaction(habit: InsertableHabit) {
   return db.transaction(async (tx) => {
      const [insertedHabit] = await tx
         .insert(habitsTable)
         .values(habit)
         .returning();

      let completions: InsertableCompletion[] = [];

      //create completion records one week in advance
      for (let i = 0; i < 7; i++) {
         const date = dayjs(habit.trackingStartDate).add(i, 'days');
         if (habit.repeatDays.includes(date.format('dddd') as any)) {
            completions.push({
               habitId: insertedHabit.id,
               completionStatus: 'pending',
               scheduledDate: date.format('YYYY-MM-DD'),
            });
         }
      }
      await tx.insert(completionsTable).values(completions);
      return insertedHabit;
   });
}

export async function selectCompletions(userId: UserId, date?: string) {
   const subquery = db
      .select({ habitId: habitsTable.id })
      .from(habitsTable)
      .where(eq(habitsTable.userId, userId))
      .as('sq');

   return await db
      .select({
         id: completionsTable.id,
         name: habitsTable.name,
         description: habitsTable.description,
         category: habitsTable.category,
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
      )
      .innerJoin(habitsTable, eq(completionsTable.habitId, habitsTable.id));
}

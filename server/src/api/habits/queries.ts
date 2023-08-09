import createError from '@fastify/error';
import dayjs from 'dayjs';
import { and, between, eq, inArray, sql } from 'drizzle-orm';
import {
   CompletionDb,
   HabitDb,
   InsertableCompletionDb,
   InsertableHabitDb,
   completionsTable,
   db,
   habitsTable,
} from '../../db';

type UserId = HabitDb['userId'];

export async function selectAllHabits(userId: UserId) {
   return db.select().from(habitsTable).where(eq(habitsTable.userId, userId));
}

export async function deleteHabit(id: HabitDb['id']) {
   return db.delete(habitsTable).where(eq(habitsTable.id, id));
}

export async function createHabitTransaction(habit: InsertableHabitDb) {
   return db.transaction(async (tx) => {
      const [insertedHabit] = await tx
         .insert(habitsTable)
         .values(habit)
         .returning();

      let completions: InsertableCompletionDb[] = [];

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

export async function selectCompletionsByDateRange(
   userId: UserId,
   from: string,
   to: string
) {
   const subquery = db
      .select({ habitId: habitsTable.id })
      .from(habitsTable)
      .where(eq(habitsTable.userId, userId))
      .as('sq');

   return await db
      .select({
         id: completionsTable.id,
         habitId: habitsTable.id,
         name: habitsTable.name,
         description: habitsTable.description,
         category: habitsTable.category,
         completionStatus: completionsTable.completionStatus,
         completionStatusTimestamp: completionsTable.completionStatusTimestamp,
         scheduledDate: sql<
            CompletionDb['scheduledDate']
         >`to_char(${completionsTable.scheduledDate}, 'YYYY-MM-DD')`,
      })
      .from(completionsTable)
      .where(
         and(
            between(completionsTable.scheduledDate, from, to),
            inArray(completionsTable.habitId, db.select().from(subquery))
         )
      )
      .innerJoin(habitsTable, eq(completionsTable.habitId, habitsTable.id));
}

export async function updateCompletionStatus(
   id: CompletionDb['id'],
   status: CompletionDb['completionStatus']
) {
   const [updatedCompletion] = await db
      .update(completionsTable)
      .set({ completionStatus: status })
      .where(eq(completionsTable.id, id))
      .returning();

   if (!updatedCompletion) {
      const CustomError = createError(
         'NOT_FOUND',
         `completion with id ${id} not found`,
         404
      );
      throw new CustomError();
   }

   const [habitDetails] = await db
      .select({
         name: habitsTable.name,
         description: habitsTable.description,
         category: habitsTable.category,
      })
      .from(habitsTable)
      .where(eq(habitsTable.id, updatedCompletion.habitId));

   return { ...updatedCompletion, ...habitDetails };
}

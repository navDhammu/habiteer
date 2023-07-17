import db from '../postgres';
import { pgTable, text, serial, date, integer } from 'drizzle-orm/pg-core';
import { users } from '../auth/db';
import { InferModel, eq } from 'drizzle-orm';

const habits = pgTable('habits', {
   id: serial('id').primaryKey().notNull(),
   name: text('name').notNull(),
   description: text('description'),
   repeatDays: text('repeat_days').array().notNull(),
   created: date('created').default(new Date().toISOString()).notNull(),
   lastUpdated: date('last_updated'),
   userId: integer('user_id')
      .notNull()
      .references(() => users.id),
   category: text('category'),
   trackingStartDate: date('tracking_start_date'),
});

type Habit = InferModel<typeof habits>;
type InsertableHabit = InferModel<typeof habits, 'insert'>;

async function selectAllHabits(userId: Habit['userId']) {
   return db.select().from(habits).where(eq(habits.userId, userId));
}

async function insertHabit(habit: InsertableHabit) {
   return db.insert(habits).values(habit);
}

async function deleteHabit(id: Habit['id']) {
   return db.delete(habits).where(eq(habits.id, id));
}

export {
   selectAllHabits,
   insertHabit,
   deleteHabit,
   Habit,
   InsertableHabit,
   habits,
};

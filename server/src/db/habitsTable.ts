import { InferModel, eq } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import db from '.';
import { usersTable } from './usersTable';

const habitsTable = pgTable('habits', {
   id: serial('id').primaryKey().notNull(),
   userId: integer('user_id').references(() => usersTable.id),
   name: text('name').notNull(),
   description: text('description'),
});

type Habit = InferModel<typeof habitsTable>;
type NewHabit = InferModel<typeof habitsTable, 'insert'>;

export async function insertHabit(habit: NewHabit) {
   return db.insert(habitsTable).values(habit);
}

export async function getAllHabits(userId: number) {
   return db.select().from(habitsTable).where(eq(habitsTable.userId, userId));
}

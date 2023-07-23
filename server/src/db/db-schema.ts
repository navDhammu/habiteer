import { Static, Type } from '@sinclair/typebox';
import { InferModel } from 'drizzle-orm';
import { pgTable, text, serial, date, integer } from 'drizzle-orm/pg-core';

const usersTable = pgTable('users', {
   name: text('name'),
   email: text('email').notNull(),
   password: text('password').notNull(),
   id: serial('id').primaryKey().notNull(),
});

type User = InferModel<typeof usersTable>;
type NewUser = InferModel<typeof usersTable, 'insert'>;

const habitsTable = pgTable('habits', {
   id: serial('id').primaryKey().notNull(),
   name: text('name').notNull(),
   description: text('description'),
   repeatDays: text('repeat_days', {
      enum: [
         'monday',
         'tuesday',
         'wednesday',
         'thursday',
         'friday',
         'saturday',
         'sunday',
      ],
   })
      .array()
      .notNull(),
   created: date('created').default('CURRENT_DATE').notNull(),
   lastUpdated: date('last_updated'),
   userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id),
   category: text('category'),
   trackingStartDate: date('tracking_start_date').notNull(),
});

type Habit = InferModel<typeof habitsTable>;
type InsertableHabit = InferModel<typeof habitsTable, 'insert'>;

export { Habit, InsertableHabit, User, NewUser, habitsTable, usersTable };

import { InferModel } from 'drizzle-orm';
import {
   pgTable,
   text,
   serial,
   date,
   integer,
   timestamp,
   pgEnum,
} from 'drizzle-orm/pg-core';
import { WEEKDAYS } from '../utils';

const usersTable = pgTable('users', {
   name: text('name'),
   email: text('email').notNull(),
   password: text('password').notNull(),
   id: serial('id').primaryKey().notNull(),
});

const habitsTable = pgTable('habits', {
   id: serial('id').primaryKey().notNull(),
   name: text('name').notNull(),
   description: text('description'),
   repeatDays: text('repeat_days', {
      enum: WEEKDAYS,
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

const completionsTable = pgTable('completions', {
   id: serial('id').primaryKey(),
   habitId: integer('habit_id')
      .notNull()
      .references(() => habitsTable.id),
   completionStatus: text('completion_status', {
      enum: ['complete', 'incomplete', 'pending'],
   }).notNull(),
   completionStatusTimestamp: timestamp('completion_status_timestamp', {
      withTimezone: true,
   }),
   scheduledDate: date('scheduled_date').notNull(),
});

type UserDb = InferModel<typeof usersTable>;
type NewUserDb = InferModel<typeof usersTable, 'insert'>;

type HabitDb = InferModel<typeof habitsTable>;
type InsertableHabitDb = InferModel<typeof habitsTable, 'insert'>;

type CompletionDb = InferModel<typeof completionsTable>;
type InsertableCompletionDb = InferModel<typeof completionsTable, 'insert'>;

export {
   HabitDb,
   InsertableHabitDb,
   UserDb,
   NewUserDb,
   CompletionDb,
   InsertableCompletionDb,
   habitsTable,
   usersTable,
   completionsTable,
};

import { InferModel } from 'drizzle-orm';
import {
   pgTable,
   text,
   serial,
   date,
   integer,
   timestamp,
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
   // isComplete: boolean('is_complete'),
   completionStatus: text('completion_status', {
      enum: ['complete', 'incomplete', 'pending'],
   }).notNull(),
   completionStatusTimestamp: timestamp('completion_status_timestamp', {
      withTimezone: true,
   }),
   scheduledDate: date('scheduled_date').notNull(),
});

type User = InferModel<typeof usersTable>;
type NewUser = InferModel<typeof usersTable, 'insert'>;
type Habit = InferModel<typeof habitsTable>;
type InsertableHabit = InferModel<typeof habitsTable, 'insert'>;
type Completion = InferModel<typeof completionsTable>;
type InsertableCompletion = InferModel<typeof completionsTable, 'insert'>;

export {
   Habit,
   InsertableHabit,
   User,
   NewUser,
   Completion,
   InsertableCompletion,
   habitsTable,
   usersTable,
   completionsTable,
};

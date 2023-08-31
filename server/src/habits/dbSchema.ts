import { Type } from '@sinclair/typebox';
import { date, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { WEEKDAYS } from '../constants';
import { usersTable } from '../users/dbSchema';

export const habitsTable = pgTable('habits', {
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

export type SelectableHabit = typeof habitsTable.$inferSelect;
export type InsertableHabit = typeof habitsTable.$inferInsert;

const repeatDays = Type.Array(
   Type.Enum({
      SUNDAY: 'Sunday',
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thursday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday',
   })
);

export const selectHabitSchema = createSelectSchema(habitsTable, {
      repeatDays,
   }),
   insertHabitSchema = createInsertSchema(habitsTable, {
      repeatDays,
   });

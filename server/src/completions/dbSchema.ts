import { Static, Type } from '@sinclair/typebox';
import {
   date,
   integer,
   pgTable,
   serial,
   text,
   timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { habitsTable } from '../habits/dbSchema';

export const completionsTable = pgTable('completions', {
   id: serial('id').primaryKey(),
   habitId: integer('habit_id')
      .notNull()
      .references(() => habitsTable.id, { onDelete: 'cascade' }),
   completionStatus: text('completion_status', {
      enum: ['complete', 'incomplete', 'pending'],
   }).notNull(),
   completionStatusTimestamp: timestamp('completion_status_timestamp', {
      withTimezone: true,
   }),
   scheduledDate: date('scheduled_date').notNull(),
});

export type SelectableCompletion = typeof completionsTable.$inferSelect;
export type InsertableCompletion = typeof completionsTable.$inferInsert;

export const selectCompletionSchema = createSelectSchema(completionsTable, {
      completionStatusTimestamp: Type.Unsafe<Date>({
         type: 'string',
         format: 'date-time',
      }),
   }),
   insertCompletionSchema = createInsertSchema(completionsTable, {
      completionStatusTimestamp: Type.Unsafe<Date>({
         type: 'string',
         format: 'date-time',
      }),
   });

type a = Static<typeof selectCompletionSchema>;

selectCompletionSchema.properties.completionStatusTimestamp;

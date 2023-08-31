import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const usersTable = pgTable('users', {
   name: text('name'),
   email: text('email').notNull(),
   password: text('password').notNull(),
   id: serial('id').primaryKey().notNull(),
});

export type SelectableUser = typeof usersTable.$inferSelect;
export type InsertableUser = typeof usersTable.$inferInsert;

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);

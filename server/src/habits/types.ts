import { Insertable, Updateable, Selectable } from 'kysely';
import { Habits } from 'kysely-codegen';

export type InsertableHabit = Insertable<Habits>;
export type UpdateableHabit = Updateable<Habits>;
export type SelectableHabit = Selectable<Habits>;

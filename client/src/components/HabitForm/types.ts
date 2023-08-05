import { Habit } from '@api';

// non-nullable inputs
type FormInputs = Omit<
   {
      [Key in keyof Habit]: NonNullable<Habit[Key]>;
   },
   'repeatDays' | 'id' | 'lastUpdated' | 'created' | 'userId'
> & {
   repeatSchedule: {
      frequency: 'daily' | 'weekly';
      days: Habit['repeatDays'];
   };
};

type FormState = FormInputs & {
   errors: {
      [Key in keyof FormInputs]: string;
   };
};

type TextInputKey = keyof Pick<
   FormState,
   'name' | 'category' | 'description' | 'trackingStartDate'
>;

export type { FormInputs, FormState, TextInputKey };

import { isBefore, startOfDay } from 'date-fns';
import { FormState, FormValues } from './HabitForm';
import { Entries } from 'type-fest';

type Validation = {
   [K in keyof FormValues]: (value: FormValues[K]) => string;
};

export const validation: Validation = {
   name: (value) => (value.length ? '' : 'Habit name is required'),
   repeatSchedule: (value) => {
      return !value.days.length
         ? 'A minimum of 1 day needs to be selected'
         : '';
   },
   trackingStartDate: (value) =>
      isBefore(value, startOfDay(new Date()))
         ? 'Start date cannot be before today'
         : '',
};

export function validateForm(formState: FormState) {
   const { errors: prevErrors, ...formValues } = formState;
   let errors = { ...prevErrors };

   for (let [key, value] of Object.entries(formValues) as Entries<
      typeof formValues
   >)
      switch (key) {
         case 'name':
            errors.name = validation.name(value as string);
            break;
         case 'repeatSchedule':
            errors.repeatSchedule = validation.repeatSchedule(
               value as FormValues['repeatSchedule']
            );
            break;
         case 'trackingStartDate':
            errors.trackingStartDate = validation.trackingStartDate(
               value as FormValues['trackingStartDate']
            );
            break;
         default:
            break;
      }
   return errors;
}

import { isBefore, parseISO, startOfDay } from 'date-fns';
import { FormState, FormInputs } from './types';
import { Entries } from 'type-fest';

export function validateForm(formState: FormState) {
   const { errors: prevErrors, ...formInputs } = formState;
   let errors = { ...prevErrors };

   for (let [key, value] of Object.entries(formInputs) as Entries<
      typeof formInputs
   >)
      switch (key) {
         case 'name':
            errors.name = (value as string).length
               ? ''
               : 'Habit name is required';
            break;
         case 'repeatSchedule':
            errors.repeatSchedule = !(value as FormInputs['repeatSchedule'])
               .days.length
               ? 'Start date cannot be before today'
               : '';
            break;
         case 'trackingStartDate':
            const trackingStartDate = parseISO(value as string);
            errors.trackingStartDate = isBefore(
               trackingStartDate,
               startOfDay(new Date())
            )
               ? 'Start date cannot be before today'
               : '';
            break;
         default:
            break;
      }
   return errors;
}

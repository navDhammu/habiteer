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
               ? 'Please select at least one day'
               : '';
            break;
         case 'trackingStartDate':
            const dateString = value as string;
            errors.trackingStartDate = !dateString
               ? 'Please choose a tracking start date'
               : isBefore(parseISO(dateString), startOfDay(new Date()))
               ? 'Start date cannot be before today'
               : '';
            break;
         default:
            break;
      }
   return errors;
}

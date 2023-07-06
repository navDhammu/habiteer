import { parseISO } from 'date-fns';
import { WEEKDAYS } from 'utils/dates';
import { FormState, FormValues, TextInputKey } from './HabitForm';
import { Habit } from 'types/Habit';

type ActionType =
   | {
        type: TextInputKey;
        payload: string;
     }
   | {
        type: 'frequency';
        payload: FormState['repeatSchedule']['frequency'];
     }
   | {
        type: 'days';
        payload: FormState['repeatSchedule']['days'];
     }
   | {
        type: 'form_submit_error';
        payload: FormState['errors'];
     }
   | {
        type: 'input_error';
        payload: {
           key: keyof FormValues;
           error: string;
        };
     };

export default function reducer(
   state: FormState,
   action: ActionType
): FormState {
   switch (action.type) {
      case 'name':
      case 'category':
      case 'description':
         return {
            ...state,
            [action.type]: action.payload,
         };
      case 'trackingStartDate':
         return {
            ...state,
            [action.type]: parseISO(action.payload),
         };
      case 'frequency':
         const frequency = action.payload;
         return {
            ...state,
            repeatSchedule: {
               frequency,
               days: frequency === 'daily' ? WEEKDAYS : [],
            },
         };
      case 'days':
         const days = action.payload;
         return {
            ...state,
            repeatSchedule: {
               frequency: days.length === 7 ? 'daily' : 'weekly',
               days: action.payload,
            },
         };
      case 'form_submit_error':
         return {
            ...state,
            errors: action.payload,
         };
      default:
         throw new Error('Unkown action in habit form reducer');
   }
}

export function initializeState(editHabitDetails: Habit): FormState {
   const errors = {
      name: '',
      category: '',
      description: '',
      repeatSchedule: '',
      trackingStartDate: '',
   };

   if (editHabitDetails) {
      const { repeatDays, ...rest } = editHabitDetails;
      return {
         ...rest,
         repeatSchedule: {
            days: repeatDays,
            frequency: repeatDays.length === 7 ? 'daily' : 'weekly',
         },
         errors,
      };
   }
   return {
      name: '',
      category: '',
      description: '',
      repeatSchedule: { days: WEEKDAYS, frequency: 'daily' },
      trackingStartDate: new Date(),
      errors,
   };
}

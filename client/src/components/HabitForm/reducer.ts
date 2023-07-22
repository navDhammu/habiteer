import { WEEKDAYS } from 'utils/dates';
import { FormState, FormInputs, TextInputKey } from './types';
import { Habit } from '@api';

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
           key: keyof FormInputs;
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
            [action.type]: action.payload,
         };
      case 'frequency':
         const frequency = action.payload;
         return {
            ...state,
            repeatSchedule: {
               frequency,
               days: frequency === 'daily' ? [...WEEKDAYS] : [],
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
   const formState: FormState = {
      name: '',
      description: '',
      trackingStartDate: '',
      category: '',
      repeatSchedule: { days: [...WEEKDAYS], frequency: 'daily' },
      errors: {
         name: '',
         category: '',
         description: '',
         repeatSchedule: '',
         trackingStartDate: '',
      },
   };

   if (!editHabitDetails) return formState;

   formState.name = editHabitDetails.name;
   formState.description = editHabitDetails.description ?? '';
   formState.category = editHabitDetails.category ?? '';
   formState.trackingStartDate = editHabitDetails.trackingStartDate;
   formState.repeatSchedule = {
      days: editHabitDetails.repeatDays,
      frequency: editHabitDetails.repeatDays.length === 7 ? 'daily' : 'weekly',
   };

   return formState;
}

import { addDays, startOfWeek } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

export function getDayOfWeek(date: Date) {
   return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
   }).format(date);
}

export function getWeekArray(date: Date) {
   return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date), i));
}

export const WEEKDAYS = [
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   'Sunday',
] as const;

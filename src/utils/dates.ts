import { format, isMatch, isValid, parse } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

export function getDayOfWeek(date: Date) {
   return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
   }).format(date);
}

export function toISOFormat(date) {
   return date.toISOString().split('T')[0];
}

export function dateToString(date, dateFormat = DATE_FORMAT) {
   if (isValid(date)) return format(date, dateFormat);
   return date;
}

export function stringToDate(str, dateFormat = DATE_FORMAT) {
   let date = parse(str, dateFormat, new Date());
   return isValid(date) ? date : null;
}

export function isValidDateString(dateString, format) {
   let date = parse(dateString, format, new Date());
   return isValid(date);
}

export function isValidFormat(dateString) {
   return isMatch(dateString, DATE_FORMAT);
}

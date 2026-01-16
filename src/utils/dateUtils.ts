import {
  format,
  startOfDay,
  endOfDay,
  isBefore,
  differenceInSeconds,
} from 'date-fns';

// Format date as YYYY-MM-DD
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};

// Format datetime as "Jan 9, 2025 at 3:30 PM"
export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
};

// Format time as "3:30 PM"
export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'h:mm a');
};

// Format date as "Mon, Jan 9"
export const formatDateShort = (date: string | Date): string => {
  return format(new Date(date), 'EEE, MMM d');
};

// Format full date as "Monday, January 9, 2025"
export const formatDateFull = (date: string | Date): string => {
  return format(new Date(date), 'EEEE, MMMM d, yyyy');
};

// Check if a datetime is in the past
export const isOverdue = (dueDateTime: string): boolean => {
  return isBefore(new Date(dueDateTime), new Date());
};

// Get the start of a day (midnight)
export const getDayStart = (date: string | Date): Date => {
  return startOfDay(new Date(date));
};

// Get the end of a day (11:59:59 PM)
export const getDayEnd = (date: string | Date): Date => {
  return endOfDay(new Date(date));
};

// Get difference in seconds between two dates
export const getSecondsDifference = (from: Date, to: Date): number => {
  return differenceInSeconds(to, from);
};

// Normalize date string to YYYY-MM-DD format
export const normalizeDate = (date: string | Date): string => {
  const d = new Date(date);
  return format(startOfDay(d), 'yyyy-MM-dd');
};

// Get current date as YYYY-MM-DD
export const getTodayDate = (): string => {
  return format(startOfDay(new Date()), 'yyyy-MM-dd');
};

// Get the next day from a given date as YYYY-MM-DD
export const getNextDay = (date: string | Date): string => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return format(startOfDay(nextDay), 'yyyy-MM-dd');
};

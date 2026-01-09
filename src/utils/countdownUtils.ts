import { CountdownTime } from '../types';

// Calculate countdown time from now until a due datetime
export const calculateCountdown = (dueDateTime: string): CountdownTime => {
  const now = new Date().getTime();
  const due = new Date(dueDateTime).getTime();
  const diff = due - now;

  const isOverdue = diff < 0;
  const absDiff = Math.abs(diff);

  const totalSeconds = Math.floor(absDiff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isOverdue,
    totalSeconds,
  };
};

// Format countdown time as readable string
export const formatCountdown = (countdown: CountdownTime): string => {
  const { days, hours, minutes, seconds, isOverdue } = countdown;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  const timeStr = parts.join(' ');
  return isOverdue ? `Overdue by ${timeStr}` : timeStr;
};

// Get urgency level based on countdown
export const getUrgencyLevel = (countdown: CountdownTime): 'overdue' | 'urgent' | 'warning' | 'normal' => {
  if (countdown.isOverdue) return 'overdue';
  if (countdown.totalSeconds < 3600) return 'urgent'; // < 1 hour
  if (countdown.totalSeconds < 86400) return 'warning'; // < 24 hours
  return 'normal';
};

// Get color classes based on urgency
export const getUrgencyColor = (countdown: CountdownTime): string => {
  const urgency = getUrgencyLevel(countdown);
  switch (urgency) {
    case 'overdue':
      return 'text-red-600 bg-red-50';
    case 'urgent':
      return 'text-red-700 bg-red-50';
    case 'warning':
      return 'text-yellow-700 bg-yellow-50';
    case 'normal':
      return 'text-green-700 bg-green-50';
  }
};

// Get border color based on urgency
export const getUrgencyBorderColor = (countdown: CountdownTime): string => {
  const urgency = getUrgencyLevel(countdown);
  switch (urgency) {
    case 'overdue':
      return 'border-red-500';
    case 'urgent':
      return 'border-red-400';
    case 'warning':
      return 'border-yellow-400';
    case 'normal':
      return 'border-green-400';
  }
};

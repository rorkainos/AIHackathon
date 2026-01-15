---
tags:
  - utility
  - helper
  - utils
  - function
---

# Utilities

**Last Updated**: 2026-01-14

## Overview

The Todo App includes pure utility functions for date handling, countdown calculations, and formatting. All utilities are side-effect-free, making them predictable, testable, and reusable.

## Date Utilities

**Location**: [src/utils/dateUtils.ts](../../../src/utils/dateUtils.ts)

### Dependencies

Uses `date-fns` library for reliable date operations:

```typescript
import {
  format,
  startOfDay,
  endOfDay,
  isBefore,
  differenceInSeconds,
} from 'date-fns';
```

---

### formatDate

Formats a date as `YYYY-MM-DD`.

```typescript
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};
```

**Parameters**:

- `date`: string | Date - Input date

**Returns**:

- `string` - Date in YYYY-MM-DD format

**Example**:
```typescript
formatDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
formatDate(new Date(2026, 0, 14));      // "2026-01-14"
```

**Use Cases**:

- Calendar date display
- Date-based grouping
- Filename generation

---

### formatDateTime

Formats a datetime as `"Jan 14, 2026 at 3:30 PM"`.

```typescript
export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
};
```

**Parameters**:

- `date`: string | Date - Input datetime

**Returns**:

- `string` - Human-readable datetime

**Example**:
```typescript
formatDateTime("2026-01-14T15:30:00.000Z");
// "Jan 14, 2026 at 3:30 PM"
```

**Use Cases**:

- Todo due date display
- Detailed timestamp presentation

---

### formatTime

Formats just the time portion as `"3:30 PM"`.

```typescript
export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'h:mm a');
};
```

**Parameters**:

- `date`: string | Date - Input datetime

**Returns**:

- `string` - Time in 12-hour format

**Example**:
```typescript
formatTime("2026-01-14T15:30:00.000Z");
// "3:30 PM"
```

**Use Cases**:

- Clock display
- Time-only information

---

### formatDateShort

Formats a date as `"Mon, Jan 14"`.

```typescript
export const formatDateShort = (date: string | Date): string => {
  return format(new Date(date), 'EEE, MMM d');
};
```

**Parameters**:

- `date`: string | Date - Input date

**Returns**:

- `string` - Short date with day of week

**Example**:
```typescript
formatDateShort("2026-01-14T15:30:00.000Z");
// "Wed, Jan 14"
```

**Use Cases**:

- Timeline date headers
- Compact date displays

---

### formatDateFull

Formats a date as `"Wednesday, January 14, 2026"`.

```typescript
export const formatDateFull = (date: string | Date): string => {
  return format(new Date(date), 'EEEE, MMMM d, yyyy');
};
```

**Parameters**:

- `date`: string | Date - Input date

**Returns**:

- `string` - Full date with day name

**Example**:
```typescript
formatDateFull("2026-01-14T15:30:00.000Z");
// "Wednesday, January 14, 2026"
```

**Use Cases**:

- Headers
- Detailed date presentation

---

### isOverdue

Checks if a datetime is in the past.

```typescript
export const isOverdue = (dueDateTime: string): boolean => {
  return isBefore(new Date(dueDateTime), new Date());
};
```

**Parameters**:

- `dueDateTime`: string - Due date/time (ISO 8601)

**Returns**:

- `boolean` - True if datetime has passed

**Example**:
```typescript
isOverdue("2026-01-01T10:00:00.000Z"); // true (if current date is after)
isOverdue("2026-12-31T23:59:00.000Z"); // false (if current date is before)
```

**Use Cases**:

- Urgency indicators
- Filtering overdue todos

---

### getDayStart

Gets the start of a day (midnight, 00:00:00).

```typescript
export const getDayStart = (date: string | Date): Date => {
  return startOfDay(new Date(date));
};
```

**Parameters**:

- `date`: string | Date - Input date

**Returns**:

- `Date` - Start of day (midnight)

**Example**:
```typescript
getDayStart("2026-01-14T15:30:00.000Z");
// Date object: 2026-01-14T00:00:00.000Z
```

**Use Cases**:

- Date comparisons
- Date range boundaries

---

### getDayEnd

Gets the end of a day (23:59:59.999).

```typescript
export const getDayEnd = (date: string | Date): Date => {
  return endOfDay(new Date(date));
};
```

**Parameters**:

- `date`: string | Date - Input date

**Returns**:

- `Date` - End of day (last millisecond)

**Example**:
```typescript
getDayEnd("2026-01-14T10:00:00.000Z");
// Date object: 2026-01-14T23:59:59.999Z
```

**Use Cases**:

- Date range boundaries
- Same-day filtering

---

### getSecondsDifference

Calculates difference in seconds between two dates.

```typescript
export const getSecondsDifference = (from: Date, to: Date): number => {
  return differenceInSeconds(to, from);
};
```

**Parameters**:

- `from`: Date - Start date
- `to`: Date - End date

**Returns**:

- `number` - Seconds difference (positive if `to` is after `from`)

**Example**:
```typescript
const from = new Date("2026-01-14T10:00:00.000Z");
const to = new Date("2026-01-14T11:00:00.000Z");
getSecondsDifference(from, to); // 3600
```

**Use Cases**:

- Countdown calculations
- Duration measurements

---

### normalizeDate

Normalizes a datetime to `YYYY-MM-DD` format at midnight.

```typescript
export const normalizeDate = (date: string | Date): string => {
  const d = new Date(date);
  return format(startOfDay(d), 'yyyy-MM-dd');
};
```

**Parameters**:

- `date`: string | Date - Input datetime

**Returns**:

- `string` - Normalized date (YYYY-MM-DD)

**Example**:
```typescript
normalizeDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
normalizeDate("2026-01-14T00:00:00.000Z"); // "2026-01-14"
normalizeDate("2026-01-14T23:59:59.999Z"); // "2026-01-14"
```

**Use Cases**:

- Date-based lookups in store
- Grouping todos by date
- Day completion logic

**Critical**: Used extensively in state management for date comparisons.

---

### getTodayDate

Gets the current date as `YYYY-MM-DD`.

```typescript
export const getTodayDate = (): string => {
  return format(startOfDay(new Date()), 'yyyy-MM-dd');
};
```

**Returns**:

- `string` - Today's date (YYYY-MM-DD)

**Example**:
```typescript
getTodayDate(); // "2026-01-14" (if called on Jan 14, 2026)
```

**Use Cases**:

- Jump to today functionality
- Default date selection
- Filtering today's todos

---

## Countdown Utilities

**Location**: [src/utils/countdownUtils.ts](../../../src/utils/countdownUtils.ts)

### calculateCountdown

Calculates countdown time from now until a due datetime.

```typescript
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
```

**Parameters**:

- `dueDateTime`: string - Due date/time (ISO 8601)

**Returns**:

- [`CountdownTime`](./data-models.md#countdowntime) - Countdown breakdown

**Example**:
```typescript
// Due in 2 days, 5 hours, 30 minutes, 15 seconds
calculateCountdown("2026-01-16T15:30:15.000Z");
// {
//   days: 2,
//   hours: 5,
//   minutes: 30,
//   seconds: 15,
//   isOverdue: false,
//   totalSeconds: 192615
// }

// Overdue by 1 hour, 20 minutes
calculateCountdown("2026-01-12T10:00:00.000Z");
// {
//   days: 0,
//   hours: 1,
//   minutes: 20,
//   seconds: 0,
//   isOverdue: true,
//   totalSeconds: 4800
// }
```

**Use Cases**:

- Real-time countdown display
- Urgency calculations
- Used by [useCountdown hook](./hooks.md#usecountdown)

---

### formatCountdown

Formats countdown time as readable string.

```typescript
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
```

**Parameters**:

- `countdown`: CountdownTime - Countdown breakdown

**Returns**:

- `string` - Formatted countdown string

**Examples**:
```typescript
formatCountdown({
  days: 2,
  hours: 5,
  minutes: 30,
  seconds: 15,
  isOverdue: false,
  totalSeconds: 192615
});
// "2d 5h 30m 15s"

formatCountdown({
  days: 0,
  hours: 0,
  minutes: 45,
  seconds: 30,
  isOverdue: false,
  totalSeconds: 2730
});
// "45m 30s"

formatCountdown({
  days: 0,
  hours: 1,
  minutes: 20,
  seconds: 0,
  isOverdue: true,
  totalSeconds: 4800
});
// "Overdue by 1h 20m 0s"
```

**Logic**:

- Includes days only if > 0
- Always includes seconds
- Adds "Overdue by" prefix if overdue

---

### getUrgencyLevel

Determines urgency level based on countdown.

```typescript
export const getUrgencyLevel = (countdown: CountdownTime): 'overdue' | 'urgent' | 'warning' | 'normal' => {
  if (countdown.isOverdue) return 'overdue';
  if (countdown.totalSeconds < 3600) return 'urgent'; // < 1 hour
  if (countdown.totalSeconds < 86400) return 'warning'; // < 24 hours
  return 'normal';
};
```

**Parameters**:

- `countdown`: CountdownTime - Countdown breakdown

**Returns**:

- `'overdue' | 'urgent' | 'warning' | 'normal'` - Urgency level

**Thresholds**:

- **overdue**: Past due date
- **urgent**: < 1 hour remaining (3600 seconds)
- **warning**: < 24 hours remaining (86400 seconds)
- **normal**: >= 24 hours remaining

**Example**:
```typescript
getUrgencyLevel({ totalSeconds: 200000, isOverdue: false, ... }); // "normal"
getUrgencyLevel({ totalSeconds: 10000, isOverdue: false, ... });  // "warning"
getUrgencyLevel({ totalSeconds: 3000, isOverdue: false, ... });   // "urgent"
getUrgencyLevel({ totalSeconds: 1000, isOverdue: true, ... });    // "overdue"
```

---

### getUrgencyColor

Gets Tailwind CSS classes for urgency-based styling.

```typescript
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
```

**Parameters**:

- `countdown`: CountdownTime - Countdown breakdown

**Returns**:

- `string` - Tailwind CSS classes for text and background

**Color Scheme**:

- **overdue**: Red text on light red background
- **urgent**: Dark red text on light red background
- **warning**: Dark yellow text on light yellow background
- **normal**: Dark green text on light green background

**Usage**:
```typescript
<div className={getUrgencyColor(countdown)}>
  {formatCountdown(countdown)}
</div>
```

---

### getUrgencyBorderColor

Gets Tailwind CSS border color class for urgency.

```typescript
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
```

**Parameters**:

- `countdown`: CountdownTime - Countdown breakdown

**Returns**:

- `string` - Tailwind CSS border color class

**Border Colors**:

- **overdue**: Solid red (`border-red-500`)
- **urgent**: Light red (`border-red-400`)
- **warning**: Yellow (`border-yellow-400`)
- **normal**: Green (`border-green-400`)

**Usage**:
```typescript
<div className={`border-2 ${getUrgencyBorderColor(countdown)}`}>
  Todo Item
</div>
```

---

## Pure Function Patterns

All utilities follow pure function principles:

### No Side Effects

```typescript
// ✅ Good: Pure function
export const formatDate = (date: string): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};

// ❌ Bad: Side effects
let cachedDate: string;
export const formatDate = (date: string): string => {
  cachedDate = format(new Date(date), 'yyyy-MM-dd'); // Side effect!
  return cachedDate;
};
```

### Deterministic

Same input always produces same output:

```typescript
formatDate("2026-01-14T15:30:00.000Z"); // Always "2026-01-14"
formatDate("2026-01-14T15:30:00.000Z"); // Always "2026-01-14"
```

### Immutable

Don't mutate input parameters:

```typescript
// ✅ Good: No mutation
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// ❌ Bad: Mutates input
export const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days); // Mutates input!
  return date;
};
```

---

## Testing Strategies

### Unit Tests

Pure functions are easy to test:

```typescript
import { formatDate, calculateCountdown } from './dateUtils';

describe('formatDate', () => {
  it('formats ISO datetime to YYYY-MM-DD', () => {
    expect(formatDate("2026-01-14T15:30:00.000Z")).toBe("2026-01-14");
  });
  
  it('handles Date objects', () => {
    const date = new Date(2026, 0, 14);
    expect(formatDate(date)).toBe("2026-01-14");
  });
});

describe('calculateCountdown', () => {
  it('calculates time remaining', () => {
    const future = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    const countdown = calculateCountdown(future);
    expect(countdown.hours).toBe(1);
    expect(countdown.isOverdue).toBe(false);
  });
});
```

### Edge Cases

Test boundary conditions:

```typescript
describe('getUrgencyLevel', () => {
  it('returns "urgent" at exactly 1 hour', () => {
    const countdown = { totalSeconds: 3600, isOverdue: false, ... };
    expect(getUrgencyLevel(countdown)).toBe('urgent');
  });
  
  it('returns "warning" at exactly 24 hours', () => {
    const countdown = { totalSeconds: 86400, isOverdue: false, ... };
    expect(getUrgencyLevel(countdown)).toBe('warning');
  });
});
```

---

## Performance Considerations

### Date-fns Tree Shaking

Import only needed functions:

```typescript
// ✅ Good: Tree-shakeable
import { format, startOfDay } from 'date-fns';

// ❌ Bad: Imports entire library
import * as dateFns from 'date-fns';
```

### Memoization

For expensive computations in components:

```typescript
import { useMemo } from 'react';

const formattedDate = useMemo(
  () => formatDate(todo.dueDateTime),
  [todo.dueDateTime]
);
```

### Avoid Repeated Calculations

```typescript
// ✅ Good: Calculate once
const countdown = calculateCountdown(dueDateTime);
const urgency = getUrgencyLevel(countdown);
const color = getUrgencyColor(countdown);

// ❌ Bad: Recalculates countdown multiple times
const urgency = getUrgencyLevel(calculateCountdown(dueDateTime));
const color = getUrgencyColor(calculateCountdown(dueDateTime));
```

---

## Related Documentation

- [Data Models](./data-models.md) - CountdownTime interface
- [Custom Hooks](./hooks.md) - useCountdown hook using these utilities
- [Components](./components.md) - Components using utilities
- [State Management](./state-management.md) - Store using normalizeDate

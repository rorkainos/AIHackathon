---
tags:
  - component
  - calendar
---

# CalendarView Component

**Location**: [src/components/calendar/CalendarView.tsx](../../../../src/components/calendar/CalendarView.tsx)

**Category**: Calendar Components

Monthly calendar grid displaying todos by date.

## Props

```typescript
interface CalendarViewProps {
  todos: Todo[];
  completedDays: CompletedDay[];
  onDayClick: (date: string) => void;
}
```

## Features

- Month navigation (previous/next)
- Jump to today
- Current month/year display
- Todo count badges per day
- Locked day indicators
- Today highlighting

## State

- `currentMonth`: Currently displayed month (Date object)

## Related

- Uses [CalendarDay](./calendar-day.md) for each day cell
- Uses [dateUtils](../utilities.md#date-utilities) for date calculations
- Connects to [Zustand store](../state-management.md) for data

## Related Documentation

- [Components Overview](../components.md)
- [CalendarDay Component](./calendar-day.md)
- [Utilities](../utilities.md)

---
tags:
  - component
  - calendar
---

# CalendarDay Component

**Location**: [src/components/calendar/CalendarDay.tsx](../../../../src/components/calendar/CalendarDay.tsx)

**Category**: Calendar Components

Individual day cell in the calendar grid.

## Props

```typescript
interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  todoCount: number;
  isCompleted: boolean;
  onClick: () => void;
}
```

## Features

- Visual distinction for current month vs. other month days
- Today highlighting (blue border)
- Completed day lock icon
- Todo count badge
- Hover effects
- Click handler for navigation

## Usage

```tsx
<CalendarDay
  date={dayDate}
  isCurrentMonth={isCurrentMonth}
  isToday={isSameDay(dayDate, new Date())}
  todoCount={todosForDay.length}
  isCompleted={isDayCompleted(formatDate(dayDate))}
  onClick={() => handleDayClick(formatDate(dayDate))}
/>
```

## Related Documentation

- [Components Overview](../components.md)
- [CalendarView Component](./calendar-view.md)
- [Utilities](../utilities.md)

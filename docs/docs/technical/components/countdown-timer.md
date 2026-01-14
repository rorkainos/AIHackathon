---
tags:
  - component
  - todo
  - timer
---

# CountdownTimer Component

**Location**: [src/components/todo/CountdownTimer.tsx](../../../../src/components/todo/CountdownTimer.tsx)

**Category**: Todo Components

Real-time countdown display showing time until due or overdue.

## Props

```typescript
interface CountdownTimerProps {
  dueDate: string;
}
```

## Features

- Real-time countdown updates
- Urgency-based colour coding:
  - Green: > 24 hours remaining
  - Yellow: 1-24 hours remaining
  - Red: < 1 hour or overdue
- Formatted time display (e.g., "2d 5h 30m 15s")
- Overdue indicator (e.g., "Overdue by 3h 15m")
- Clock icon
- Automatic updates every second

## Related

- Uses [useCountdown](../hooks.md#usecountdown) hook
- Uses [countdownUtils](../utilities.md#countdown-utilities) for formatting

## Related Documentation

- [Components Overview](../components.md)
- [TodoItem Component](./todo-item.md)
- [Custom Hooks](../hooks.md)
- [Utilities](../utilities.md)

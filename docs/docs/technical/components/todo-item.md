---
tags:
  - component
  - todo
---

# TodoItem Component

**Location**: [src/components/todo/TodoItem.tsx](../../../../src/components/todo/TodoItem.tsx)

**Category**: Todo Components

Individual todo card with actions.

## Props

```typescript
interface TodoItemProps {
  todo: Todo;
  isLocked: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}
```

## Features

- Checkbox for completion toggle
- Title and description display
- Due date/time formatting
- Real-time countdown timer
- Edit and Delete buttons
- Locked state (disabled actions)
- Urgency-based border colors
- Completed state styling (strikethrough, opacity)

## Layout

```
┌─────────────────────────────────┐
│ [✓] Todo Title            [Edit]│
│     Description           [Del] │
│     Mon, Jan 14 at 3:00 PM      │
│     ⏱ 2d 5h 30m 15s            │
└─────────────────────────────────┘
```

## Related

- Uses [CountdownTimer](./countdown-timer.md) for time display
- Uses [dateUtils](../utilities.md#date-utilities) for formatting
- Uses [countdownUtils](../utilities.md#countdown-utilities) for urgency colors

## Related Documentation

- [Components Overview](../components.md)
- [TodoList Component](./todo-list.md)
- [CountdownTimer Component](./countdown-timer.md)
- [Utilities](../utilities.md)

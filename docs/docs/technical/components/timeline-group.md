---
tags:
  - component
  - timeline
---

# TimelineGroup Component

**Location**: [src/components/timeline/TimelineGroup.tsx](../../../../src/components/timeline/TimelineGroup.tsx)

**Category**: Timeline Components

Groups todos for a specific date with completion action.

## Props

```typescript
interface TimelineGroupProps {
  date: string;
  todos: Todo[];
  isCompleted: boolean;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onCompleteDay: () => void;
}
```

## Features

- Date header with formatted display
- Complete day button (if not already completed)
- Lock icon for completed days
- TodoList integration
- Visual grouping

## Layout

```
┌─────────────────────────────────┐
│ Mon, Jan 14, 2026    [Complete] │
├─────────────────────────────────┤
│ [TodoList with todos for date]  │
└─────────────────────────────────┘
```

## Related

- Uses [TodoList](./todo-list.md) for rendering todos
- Uses [dateUtils](../utilities.md#date-utilities) for date formatting

## Related Documentation

- [Components Overview](../components.md)
- [TimelineView Component](./timeline-view.md)
- [TodoList Component](./todo-list.md)

---
tags:
  - component
  - timeline
---

# TimelineView Component

**Location**: [src/components/timeline/TimelineView.tsx](../../../../src/components/timeline/TimelineView.tsx)

**Category**: Timeline Components

Chronological list of all todos grouped by date.

## Props

```typescript
interface TimelineViewProps {
  todos: Todo[];
  completedDays: CompletedDay[];
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onCompleteDay: (date: string) => void;
}
```

## Features

- Todos grouped by date
- Jump to today button
- Sorted chronologically
- Empty state handling
- Delegated rendering to TimelineGroup

## State

- `timelineRef`: Reference for scroll-to-today functionality

## Related

- Uses [TimelineGroup](./timeline-group.md) for each date group
- Uses [dateUtils](../utilities.md#date-utilities) for date operations

## Related Documentation

- [Components Overview](../components.md)
- [TimelineGroup Component](./timeline-group.md)
- [Utilities](../utilities.md)

---
tags:
  - component
  - todo
---

# TodoList Component

**Location**: [src/components/todo/TodoList.tsx](../../../../src/components/todo/TodoList.tsx)

**Category**: Todo Components

List container for todo items.

## Props

```typescript
interface TodoListProps {
  todos: Todo[];
  isCompleted: boolean;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}
```

## Features

- Renders list of TodoItem components
- Passes through handlers
- Responsive grid layout
- Empty state handling

## Related Documentation

- [Components Overview](../components.md)
- [TodoItem Component](./todo-item.md)
- [TimelineGroup Component](./timeline-group.md)

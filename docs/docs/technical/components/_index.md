---
tags:
  - component
  - react-component
  - ui
---

# Overview

React components are organized by feature and responsibility, promoting reusability and maintainability.

## Categories

### Common Components
**Location**: `src/components/common/`

Reusable UI components used throughout the application.

- **[Button](./button.md)** - Reusable button with variants (primary, secondary, danger) and sizes
- **[Modal](./modal.md)** - Overlay modal for forms and content
- **[ConfirmDialog](./confirm-dialog.md)** - Confirmation dialog for destructive actions

### Layout Components
**Location**: `src/components/layout/`

Components that provide the application structure and navigation.

- **[Layout](./layout.md)** - Main layout wrapper with consistent page structure
- **[Header](./header.md)** - Application header with navigation and actions

### Calendar Components
**Location**: `src/components/calendar/`

Components for the monthly calendar view.

- **[CalendarView](./calendar-view.md)** - Monthly calendar grid with navigation
- **[CalendarDay](./calendar-day.md)** - Individual day cell with todo count and status

### Timeline Components
**Location**: `src/components/timeline/`

Components for the chronological timeline view.

- **[TimelineView](./timeline-view.md)** - Chronological list of todos grouped by date
- **[TimelineGroup](./timeline-group.md)** - Groups todos for a specific date

### Todo Components
**Location**: `src/components/todo/`

Components for displaying and managing todos.

- **[TodoList](./todo-list.md)** - List container for todo items
- **[TodoItem](./todo-item.md)** - Individual todo card with actions and countdown
- **[TodoForm](./todo-form.md)** - Form for creating or editing todos
- **[CountdownTimer](./countdown-timer.md)** - Real-time countdown display

## Common Patterns

### Props Interfaces

All components define explicit TypeScript interfaces for props:

```typescript
interface ComponentProps {
  // Define all props with types
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Forward Refs

Components that need ref access use `React.forwardRef`:

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => {
    // Component implementation
  }
);
```

### Event Handlers

Use descriptive handler names with `on` prefix:

```typescript
interface TodoItemProps {
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}
```

### Composition

Build complex UIs from simpler components:

```tsx
// Good: Composition
<TimelineGroup>
  <TodoList>
    <TodoItem />
  </TodoList>
</TimelineGroup>
```

## Related Documentation

- [Architecture](../architecture.md) - Overall system design
- [State Management](../state-management.md) - Component-store integration
- [Custom Hooks](../hooks.md) - useCountdown implementation
- [Styling](../styling.md) - Tailwind patterns used


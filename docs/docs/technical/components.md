---
tags:
  - component
  - react-component
  - ui
---

# Components

---

## Component Hierarchy

```
App (Root)
├── Layout
│   ├── Header
│   │   ├── Button (View Switcher)
│   │   └── Button (Add TODO)
│   └── [Content Area]
│       ├── CalendarView
│       │   └── CalendarDay
│       └── TimelineView
│           └── TimelineGroup
│               └── TodoList
│                   └── TodoItem
│                       └── CountdownTimer
├── Modal
│   └── TodoForm
└── ConfirmDialog
```

---

## Props Interfaces

### Button

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### Modal

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

### ConfirmDialog

```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

### Header

```typescript
interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTodo: () => void;
}
```

### CalendarView

```typescript
interface CalendarViewProps {
  todos: Todo[];
  completedDays: CompletedDay[];
  onDayClick: (date: string) => void;
}
```

### CalendarDay

```typescript
interface CalendarDayProps {
  date: string;
  todos: Todo[];
  isCompleted: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}
```

**Behaviour Notes**:

- Determines if day is in the past by comparing `date` against `getTodayDate()`
- Past days display with subtle grey styling (`bg-gray-100`, `text-gray-400`) while remaining fully interactive
- Today is highlighted with a stronger blue border (`border-4 border-blue-500`)

### TimelineView

```typescript
interface TimelineViewProps {
  todos: Todo[];
  completedDays: CompletedDay[];
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}
```

### TimelineGroup

```typescript
interface TimelineGroupProps {
  date: string;
  todos: Todo[];
  isLocked: boolean;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onCompleteDay: () => void;
}
```

### TodoItem

```typescript
interface TodoItemProps {
  todo: Todo;
  isLocked: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}
```

### TodoForm

```typescript
interface TodoFormProps {
  initialData?: Todo;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
}
```

### CountdownTimer

```typescript
interface CountdownTimerProps {
  dueDateTime: string;
}
```

---

## Usage Examples

### Button

```tsx
<Button variant="primary" onClick={handleAdd}>Add TODO</Button>
<Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
```

### Modal

```tsx
<Modal
  isOpen={isFormOpen}
  onClose={() => setIsFormOpen(false)}
  title="Add TODO"
>
  <TodoForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
</Modal>
```

### ConfirmDialog

```tsx
<ConfirmDialog
  isOpen={showConfirm}
  title="Delete TODO"
  message="Are you sure?"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>
```

### Header

```tsx
<Header
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  onAddTodo={handleAddTodo}
/>
```

### CalendarView

```tsx
<CalendarView
  todos={todos}
  completedDays={completedDays}
  onDayClick={handleDayClick}
/>
```

### TodoItem

```tsx
<TodoItem
  todo={todo}
  isLocked={isLocked}
  onEdit={() => handleEdit(todo)}
  onDelete={() => handleDelete(todo.id)}
  onToggle={() => toggleTodo(todo.id)}
/>
```

---

## Component Locations

| Component      | File                                        |
| -------------- | ------------------------------------------- |
| Button         | `src/components/common/Button.tsx`          |
| Modal          | `src/components/common/Modal.tsx`           |
| ConfirmDialog  | `src/components/common/ConfirmDialog.tsx`   |
| Layout         | `src/components/layout/Layout.tsx`          |
| Header         | `src/components/layout/Header.tsx`          |
| CalendarView   | `src/components/calendar/CalendarView.tsx`  |
| CalendarDay    | `src/components/calendar/CalendarDay.tsx`   |
| TimelineView   | `src/components/timeline/TimelineView.tsx`  |
| TimelineGroup  | `src/components/timeline/TimelineGroup.tsx` |
| TodoList       | `src/components/todo/TodoList.tsx`          |
| TodoItem       | `src/components/todo/TodoItem.tsx`          |
| TodoForm       | `src/components/todo/TodoForm.tsx`          |
| CountdownTimer | `src/components/todo/CountdownTimer.tsx`    |

---

## Related Documentation

- [Architecture](architecture.md)
- [State Management](state-management.md)
- [Data Models](data-models.md)

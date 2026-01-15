---
tags:
  - component
  - react-component
  - ui
---

# Components

**Last Updated**: 2026-01-14

## Overview

The Todo App is built using a component-based architecture with React functional components. Components are organised by feature and responsibility, promoting reusability and maintainability.

This page serves as an index to all component documentation. Each component has its own detailed page with props, usage examples, and implementation details.

## Component Hierarchy

```
App (Root)
├── Layout
│   ├── Header
│   │   ├── Button (View Switcher)
│   │   └── Button (Add TODO)
│   └── [Content Area]
│       ├── CalendarView
│       │   └── CalendarDay (×35-42 per month)
│       └── TimelineView
│           └── TimelineGroup (per date)
│               └── TodoList
│                   └── TodoItem (per todo)
│                       ├── CountdownTimer
│                       ├── Button (Edit)
│                       └── Button (Delete)
├── Modal
│   └── TodoForm
│       └── Button (Submit)
└── ConfirmDialog
    ├── Button (Confirm)
    └── Button (Cancel)
```

## Common Components

Reusable UI components used throughout the application.

- **[Button](./components/button.md)** - Reusable button with variants (primary, secondary, danger) and sizes
- **[Modal](./components/modal.md)** - Overlay modal for forms and content
- **[ConfirmDialog](./components/confirm-dialog.md)** - Confirmation dialog for destructive actions

## Layout Components

Components that provide the application structure and navigation.

- **[Layout](./components/layout.md)** - Main layout wrapper with consistent page structure
- **[Header](./components/header.md)** - Application header with navigation and actions

## Calendar Components

Components for the monthly calendar view.

- **[CalendarView](./components/calendar-view.md)** - Monthly calendar grid with navigation
- **[CalendarDay](./components/calendar-day.md)** - Individual day cell with todo count and status

## Timeline Components

Components for the chronological timeline view.

- **[TimelineView](./components/timeline-view.md)** - Chronological list of todos grouped by date
- **[TimelineGroup](./components/timeline-group.md)** - Groups todos for a specific date

## Todo Components

Components for displaying and managing todos.

- **[TodoList](./components/todo-list.md)** - List container for todo items
- **[TodoItem](./components/todo-item.md)** - Individual todo card with actions and countdown
- **[TodoForm](./components/todo-form.md)** - Form for creating or editing todos
- **[CountdownTimer](./components/countdown-timer.md)** - Real-time countdown display

## Component Best Practices

### Props Interface

All components define explicit TypeScript interfaces for props:

```typescript
interface ComponentProps {
  // Define all props with types
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

### Default Props

Use default parameters for optional props:

```typescript
const Button = ({ variant = 'primary', size = 'md', ...props }) => {
  // Component implementation
};
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

// Avoid: Monolithic components
<TimelineWithEverything />
```

## Related Documentation

- [Architecture](./architecture.md) - Overall system design
- [State Management](./state-management.md) - Component-store integration
- [Custom Hooks](./hooks.md) - useCountdown implementation
- [Styling](./styling.md) - Tailwind patterns used


## Component Hierarchy

```
App (Root)
├── Layout
│   ├── Header
│   │   ├── Button (View Switcher)
│   │   └── Button (Add TODO)
│   └── [Content Area]
│       ├── CalendarView
│       │   └── CalendarDay (×35-42 per month)
│       └── TimelineView
│           └── TimelineGroup (per date)
│               └── TodoList
│                   └── TodoItem (per todo)
│                       ├── CountdownTimer
│                       ├── Button (Edit)
│                       └── Button (Delete)
├── Modal
│   └── TodoForm
│       └── Button (Submit)
└── ConfirmDialog
    ├── Button (Confirm)
    └── Button (Cancel)
```

## Common Components

### Button

**Location**: [src/components/common/Button.tsx](../../../src/components/common/Button.tsx)

Reusable button component with multiple variants and sizes.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}
```

#### Variants

- **primary**: Blue background, primary actions (Add, Save)
- **secondary**: Gray background, secondary actions (Cancel, Close)
- **danger**: Red background, destructive actions (Delete)

#### Usage

```tsx
import { Button } from './components/common/Button';

// Primary button
<Button variant="primary" onClick={handleAdd}>
  Add TODO
</Button>

// Danger button with small size
<Button variant="danger" size="sm" onClick={handleDelete}>
  Delete
</Button>

// Full-width secondary button
<Button variant="secondary" fullWidth>
  Cancel
</Button>
```

#### Styling Features

- Focus ring for accessibility
- Hover state transitions
- Disabled state with reduced opacity
- Responsive sizing
- Forward ref support

---

### Modal

**Location**: [src/components/common/Modal.tsx](../../../src/components/common/Modal.tsx)

Overlay modal for displaying forms and content above the main interface.

#### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

#### Features

- Backdrop overlay with click-to-close
- ESC key to close
- Smooth enter/exit animations
- Scroll locking when open
- Centered positioning

#### Usage

```tsx
import { Modal } from './components/common/Modal';

<Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add TODO">
  <TodoForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
</Modal>
```

---

### ConfirmDialog

**Location**: [src/components/common/ConfirmDialog.tsx](../../../src/components/common/ConfirmDialog.tsx)

Confirmation dialog for destructive or important actions.

#### Props

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

#### Features

- Clear messaging for user intent
- Customizable button labels
- Danger styling for confirm button
- Modal overlay
- Keyboard support (ESC to cancel, Enter to confirm)

#### Usage

```tsx
import { ConfirmDialog } from './components/common/ConfirmDialog';

<ConfirmDialog
  isOpen={confirmDialog?.type === 'delete'}
  title="Delete TODO"
  message="Are you sure you want to delete this TODO? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={handleDelete}
  onCancel={() => setConfirmDialog(null)}
/>
```

---

## Layout Components

### Layout

**Location**: [src/components/layout/Layout.tsx](../../../src/components/layout/Layout.tsx)

Main layout wrapper providing consistent page structure.

#### Props

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

#### Features

- Max-width container for content
- Responsive padding
- Background styling
- Centered layout

#### Usage

```tsx
import { Layout } from './components/layout/Layout';

<Layout>
  <Header />
  <main>{/* Page content */}</main>
</Layout>
```

---

### Header

**Location**: [src/components/layout/Header.tsx](../../../src/components/layout/Header.tsx)

Application header with navigation and primary actions.

#### Props

```typescript
interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTodo: () => void;
}
```

#### Features

- View mode switcher (Calendar/Timeline)
- Add TODO button
- Sticky positioning
- Responsive design

#### Usage

```tsx
import { Header } from './components/layout/Header';

<Header
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  onAddTodo={handleAddTodo}
/>
```

---

## Calendar Components

### CalendarView

**Location**: [src/components/calendar/CalendarView.tsx](../../../src/components/calendar/CalendarView.tsx)

Monthly calendar grid displaying todos by date.

#### Props

```typescript
interface CalendarViewProps {
  todos: Todo[];
  completedDays: CompletedDay[];
  onDayClick: (date: string) => void;
}
```

#### Features

- Month navigation (previous/next)
- Jump to today
- Current month/year display
- Todo count badges per day
- Locked day indicators
- Today highlighting

#### State

- `currentMonth`: Currently displayed month (Date object)

#### Related

- Uses [CalendarDay](#calendarday) for each day cell
- Uses [dateUtils](./utilities.md#date-utilities) for date calculations
- Connects to [Zustand store](./state-management.md) for data

---

### CalendarDay

**Location**: [src/components/calendar/CalendarDay.tsx](../../../src/components/calendar/CalendarDay.tsx)

Individual day cell in the calendar grid.

#### Props

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

#### Features

- Visual distinction for current month vs. other month days
- Today highlighting (blue border)
- Completed day lock icon
- Todo count badge
- Hover effects
- Click handler for navigation

#### Usage

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

---

## Timeline Components

### TimelineView

**Location**: [src/components/timeline/TimelineView.tsx](../../../src/components/timeline/TimelineView.tsx)

Chronological list of all todos grouped by date.

#### Props

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

#### Features

- Todos grouped by date
- Jump to today button
- Scrollable list
- Completed day indicators
- Complete day action per group

#### Data Processing

- Groups todos by normalized date
- Sorts dates chronologically
- Filters completed days

#### Related

- Uses [TimelineGroup](#timelinegroup) for each date group
- Uses [dateUtils](./utilities.md#date-utilities) for grouping

---

### TimelineGroup

**Location**: [src/components/timeline/TimelineGroup.tsx](../../../src/components/timeline/TimelineGroup.tsx)

Group of todos for a specific date in the timeline.

#### Props

```typescript
interface TimelineGroupProps {
  date: string; // YYYY-MM-DD format
  todos: Todo[];
  isCompleted: boolean;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onCompleteDay: (date: string) => void;
}
```

#### Features

- Date header with formatting
- Locked indicator for completed days
- Complete Day button (if not completed)
- Todo count badge
- Delegates to TodoList

#### Usage

```tsx
<TimelineGroup
  date="2026-01-14"
  todos={todosForDate}
  isCompleted={isDayCompleted}
  onEditTodo={handleEdit}
  onDeleteTodo={handleDelete}
  onToggleTodo={handleToggle}
  onCompleteDay={handleCompleteDay}
/>
```

---

## Todo Components

### TodoList

**Location**: [src/components/todo/TodoList.tsx](../../../src/components/todo/TodoList.tsx)

List container for todo items.

#### Props

```typescript
interface TodoListProps {
  todos: Todo[];
  isCompleted: boolean;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}
```

#### Features

- Renders list of TodoItem components
- Passes through handlers
- Responsive grid layout
- Empty state handling

---

### TodoItem

**Location**: [src/components/todo/TodoItem.tsx](../../../src/components/todo/TodoItem.tsx)

Individual todo card with actions.

#### Props

```typescript
interface TodoItemProps {
  todo: Todo;
  isLocked: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}
```

#### Features

- Checkbox for completion toggle
- Title and description display
- Due date/time formatting
- Real-time countdown timer
- Edit and Delete buttons
- Locked state (disabled actions)
- Urgency-based border colors
- Completed state styling (strikethrough, opacity)

#### Layout

```
┌─────────────────────────────────┐
│ [✓] Todo Title            [Edit]│
│     Description           [Del] │
│     Mon, Jan 14 at 3:00 PM      │
│     ⏱ 2d 5h 30m 15s            │
└─────────────────────────────────┘
```

#### Related

- Uses [CountdownTimer](#countdowntimer) for time display
- Uses [dateUtils](./utilities.md#date-utilities) for formatting
- Uses [countdownUtils](./utilities.md#countdown-utilities) for urgency colors

---

### TodoForm

**Location**: [src/components/todo/TodoForm.tsx](../../../src/components/todo/TodoForm.tsx)

Form for creating or editing todos.

#### Props

```typescript
interface TodoFormProps {
  todo?: Todo | null; // If editing, undefined for new
  onSubmit: (data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  onCancel: () => void;
  error?: string | null;
}
```

#### Features

- Controlled form inputs
- Validation (required fields)
- Edit mode pre-population
- Date and time pickers (HTML5)
- Error display
- Submit and Cancel actions

#### Validation

- Title: Required, non-empty
- Description: Optional
- Due Date: Required
- Due Time: Required

#### Usage

```tsx
// New todo
<TodoForm
  onSubmit={handleAddTodo}
  onCancel={() => setIsFormOpen(false)}
  error={error}
/>

// Edit todo
<TodoForm
  todo={editingTodo}
  onSubmit={(data) => handleUpdateTodo(editingTodo.id, data)}
  onCancel={() => setEditingTodo(null)}
  error={error}
/>
```

---

### CountdownTimer

**Location**: [src/components/todo/CountdownTimer.tsx](../../../src/components/todo/CountdownTimer.tsx)

Real-time countdown display showing time until due or overdue.

#### Props

```typescript
interface CountdownTimerProps {
  dueDateTime: string; // ISO 8601 format
}
```

#### Features

- Updates every second
- Urgency-based styling
- Overdue detection
- Formatted time display (e.g., "2d 5h 30m 15s")

#### Styling States

- **Normal** (>24 hours): Green background
- **Warning** (<24 hours): Yellow background
- **Urgent** (<1 hour): Orange/Red background
- **Overdue**: Red background with "Overdue by" prefix

#### Related

- Uses [useCountdown](./hooks.md#usecountdown) hook
- Uses [countdownUtils](./utilities.md#countdown-utilities) for formatting

---

## Component Best Practices

### Props Interface

All components define explicit TypeScript interfaces for props:

```typescript
interface ComponentProps {
  // Define all props with types
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

### Default Props

Use default parameters for optional props:

```typescript
const Button = ({ variant = 'primary', size = 'md', ...props }) => {
  // Component implementation
};
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

// Avoid: Monolithic components
<TimelineWithEverything />
```

## Related Documentation

- [Architecture](./architecture.md) - Overall system design
- [State Management](./state-management.md) - Component-store integration
- [Custom Hooks](./hooks.md) - useCountdown implementation
- [Styling](./styling.md) - Tailwind patterns used

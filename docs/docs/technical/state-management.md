---
tags:
  - state
  - store
  - zustand
---

# State Management

**Last Updated**: 2026-01-14

## Overview

The Todo App uses Zustand for state management, providing a lightweight, performant, and TypeScript-friendly solution. State is automatically persisted to localStorage, ensuring data survives browser refreshes.

## Store Architecture

**Location**: [src/store/useTodoStore.ts](../../../src/store/useTodoStore.ts)

The application maintains a single global store that manages:

- Todo items (`todos` array)
- Completed days (`completedDays` array)
- CRUD operations and business logic
- Data selectors and queries

## Store Interface

```typescript
interface TodoStore {
  // State
  todos: Todo[];
  completedDays: CompletedDay[];

  // Actions (CRUD)
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  completeDay: (date: string) => void;

  // Selectors
  getTodosByDate: (date: string) => Todo[];
  isDayCompleted: (date: string) => boolean;
  getTodosForDateRange: (startDate: string, endDate: string) => Record<string, Todo[]>;
}
```

## State Structure

### Todos Array

```typescript
todos: Todo[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Complete project documentation",
    description: "Write technical docs for all components",
    dueDateTime: "2026-01-15T15:00:00.000Z",
    completed: false,
    createdAt: "2026-01-14T10:30:00.000Z",
    updatedAt: "2026-01-14T10:30:00.000Z"
  },
  // ... more todos
]
```

### Completed Days Array

```typescript
completedDays: CompletedDay[] = [
  {
    date: "2026-01-13",
    completedAt: "2026-01-13T23:59:00.000Z",
    todoIds: ["550e8400-e29b-41d4-a716-446655440000", "..."]
  },
  // ... more completed days
]
```

## Actions

### addTodo

Creates a new todo with validation.

```typescript
addTodo: (todoData) => {
  const dateStr = normalizeDate(todoData.dueDateTime);

  // Validation: Check if day is locked
  if (get().isDayCompleted(dateStr)) {
    throw new Error('Cannot add TODO to a completed day');
  }

  const newTodo: Todo = {
    ...todoData,
    id: crypto.randomUUID(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  set((state) => ({
    todos: [...state.todos, newTodo],
  }));
}
```

**Parameters**:

- `todoData`: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>
  - `title`: string (required)
  - `description`: string
  - `dueDateTime`: string (ISO 8601 format)

**Throws**:

- Error if day is completed (locked)

**Side Effects**:

- Generates UUID for new todo
- Sets completion to false
- Adds timestamps
- Persists to localStorage

**Usage**:
```typescript
const addTodo = useTodoStore((state) => state.addTodo);

addTodo({
  title: "Review pull requests",
  description: "Check team PRs for feedback",
  dueDateTime: "2026-01-15T14:00:00.000Z"
});
```

---

### updateTodo

Updates an existing todo with validation.

```typescript
updateTodo: (id, updates) => {
  const todo = get().todos.find((t) => t.id === id);
  if (!todo) return;

  const oldDateStr = normalizeDate(todo.dueDateTime);

  // Check if original day is locked
  if (get().isDayCompleted(oldDateStr)) {
    throw new Error('Cannot edit TODO from a completed day');
  }

  // If changing date, check if new date is locked
  if (updates.dueDateTime) {
    const newDateStr = normalizeDate(updates.dueDateTime);
    if (get().isDayCompleted(newDateStr)) {
      throw new Error('Cannot move TODO to a completed day');
    }
  }

  set((state) => ({
    todos: state.todos.map((t) =>
      t.id === id
        ? { ...t, ...updates, updatedAt: new Date().toISOString() }
        : t
    ),
  }));
}
```

**Parameters**:

- `id`: string (UUID of todo to update)
- `updates`: Partial<Omit<Todo, 'id' | 'createdAt'>>
  - Any combination of: `title`, `description`, `dueDateTime`, `completed`, `updatedAt`

**Throws**:

- Error if original day is completed
- Error if moving to a completed day

**Side Effects**:

- Updates `updatedAt` timestamp
- Persists to localStorage

**Usage**:
```typescript
const updateTodo = useTodoStore((state) => state.updateTodo);

updateTodo("550e8400-e29b-41d4-a716-446655440000", {
  title: "Updated title",
  dueDateTime: "2026-01-16T10:00:00.000Z"
});
```

---

### deleteTodo

Removes a todo with validation.

```typescript
deleteTodo: (id) => {
  const todo = get().todos.find((t) => t.id === id);
  if (!todo) return;

  const dateStr = normalizeDate(todo.dueDateTime);

  if (get().isDayCompleted(dateStr)) {
    throw new Error('Cannot delete TODO from a completed day');
  }

  set((state) => ({
    todos: state.todos.filter((t) => t.id !== id),
  }));
}
```

**Parameters**:

- `id`: string (UUID of todo to delete)

**Throws**:

- Error if day is completed

**Side Effects**:

- Removes todo from array
- Persists to localStorage

**Usage**:
```typescript
const deleteTodo = useTodoStore((state) => state.deleteTodo);

deleteTodo("550e8400-e29b-41d4-a716-446655440000");
```

---

### toggleTodo

Toggles completion status of a todo.

```typescript
toggleTodo: (id) => {
  set((state) => ({
    todos: state.todos.map((t) =>
      t.id === id
        ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
        : t
    ),
  }));
}
```

**Parameters**:

- `id`: string (UUID of todo to toggle)

**Note**: Can toggle todos even on completed days (business rule exception)

**Side Effects**:

- Flips `completed` boolean
- Updates `updatedAt` timestamp
- Persists to localStorage

**Usage**:
```typescript
const toggleTodo = useTodoStore((state) => state.toggleTodo);

toggleTodo("550e8400-e29b-41d4-a716-446655440000");
```

---

### completeDay

Marks a day as completed, locking all todos for that date.

```typescript
completeDay: (date) => {
  const todosForDay = get().getTodosByDate(date);
  const todoIds = todosForDay.map((t) => t.id);

  const completedDay: CompletedDay = {
    date,
    completedAt: new Date().toISOString(),
    todoIds,
  };

  set((state) => ({
    completedDays: [...state.completedDays, completedDay],
  }));
}
```

**Parameters**:

- `date`: string (YYYY-MM-DD format)

**Side Effects**:

- Creates CompletedDay record
- Captures current todo IDs for that date
- Persists to localStorage
- Prevents future add/edit/delete on that date

**Usage**:
```typescript
const completeDay = useTodoStore((state) => state.completeDay);

completeDay("2026-01-13");
```

---

## Selectors

### getTodosByDate

Retrieves all todos for a specific date.

```typescript
getTodosByDate: (date) => {
  return get().todos.filter((todo) => {
    const todoDate = normalizeDate(todo.dueDateTime);
    return todoDate === date;
  });
}
```

**Parameters**:

- `date`: string (YYYY-MM-DD format)

**Returns**:

- `Todo[]` - Array of todos for the given date

**Usage**:
```typescript
const getTodosByDate = useTodoStore((state) => state.getTodosByDate);
const todosForToday = getTodosByDate("2026-01-14");
```

---

### isDayCompleted

Checks if a day has been completed (locked).

```typescript
isDayCompleted: (date) => {
  return get().completedDays.some((cd) => cd.date === date);
}
```

**Parameters**:

- `date`: string (YYYY-MM-DD format)

**Returns**:

- `boolean` - True if day is completed/locked

**Usage**:
```typescript
const isDayCompleted = useTodoStore((state) => state.isDayCompleted);
const isLocked = isDayCompleted("2026-01-13");
```

---

### getTodosForDateRange

Retrieves todos grouped by date for a date range.

```typescript
getTodosForDateRange: (startDate, endDate) => {
  const result: Record<string, Todo[]> = {};
  
  get().todos.forEach((todo) => {
    const todoDate = normalizeDate(todo.dueDateTime);
    if (todoDate >= startDate && todoDate <= endDate) {
      if (!result[todoDate]) {
        result[todoDate] = [];
      }
      result[todoDate].push(todo);
    }
  });
  
  return result;
}
```

**Parameters**:

- `startDate`: string (YYYY-MM-DD format)
- `endDate`: string (YYYY-MM-DD format)

**Returns**:

- `Record<string, Todo[]>` - Object with dates as keys, todo arrays as values

**Usage**:
```typescript
const getTodosForDateRange = useTodoStore((state) => state.getTodosForDateRange);
const monthTodos = getTodosForDateRange("2026-01-01", "2026-01-31");
```

---

## Persistence

### LocalStorage Integration

Zustand's `persist` middleware automatically:

- Saves state to localStorage on every update
- Restores state on app initialization
- Uses JSON serialization

**Storage Key**: `todo-storage` (configurable)

**Storage Format**:
```json
{
  "state": {
    "todos": [...],
    "completedDays": [...]
  },
  "version": 0
}
```

### Persistence Configuration

```typescript
persist(
  (set, get) => ({ /* store definition */ }),
  {
    name: 'todo-storage', // localStorage key
  }
)
```

## Business Rules Enforcement

The store enforces business rules through validation in actions:

1. **Completed Day Locking**
   - Cannot add todos to completed days
   - Cannot edit todos from completed days
   - Cannot delete todos from completed days
   - Can toggle completion (exception for flexibility)

2. **Date Validation**
   - Dates normalized to YYYY-MM-DD format
   - Moving todos validates both source and destination dates

3. **Data Integrity**
   - UUIDs generated for all new todos
   - Timestamps maintained automatically
   - Immutable state updates

## Component Integration

### Accessing State

```typescript
// Read state
const todos = useTodoStore((state) => state.todos);
const completedDays = useTodoStore((state) => state.completedDays);

// Access actions
const addTodo = useTodoStore((state) => state.addTodo);
const updateTodo = useTodoStore((state) => state.updateTodo);

// Use selectors
const getTodosByDate = useTodoStore((state) => state.getTodosByDate);
const todosForDate = getTodosByDate("2026-01-14");
```

### Selective Subscriptions

Components re-render only when subscribed state changes:

```typescript
// Only re-renders when todos array changes
const todos = useTodoStore((state) => state.todos);

// Only re-renders when completedDays array changes
const completedDays = useTodoStore((state) => state.completedDays);

// Never re-renders (actions don't change)
const addTodo = useTodoStore((state) => state.addTodo);
```

## Error Handling

Actions throw errors for business rule violations:

```typescript
try {
  addTodo({
    title: "Task on locked day",
    description: "",
    dueDateTime: "2026-01-13T10:00:00.000Z" // Locked date
  });
} catch (error) {
  console.error(error.message); // "Cannot add TODO to a completed day"
  // Show error to user
}
```

Components should wrap store actions in try-catch blocks for user feedback.

## Performance Optimizations

### Immutable Updates

All state updates create new objects/arrays:

```typescript
// Good: Immutable
set((state) => ({
  todos: [...state.todos, newTodo]
}));

// Bad: Mutates state (don't do this)
state.todos.push(newTodo);
```

### Selector Memoization

For expensive computations, consider memoized selectors:

```typescript
const sortedTodos = useTodoStore((state) => 
  [...state.todos].sort((a, b) => 
    new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime()
  )
);
```

### Minimal Subscriptions

Subscribe only to needed state slices:

```typescript
// Efficient: Only todos
const todos = useTodoStore((state) => state.todos);

// Inefficient: Entire store
const store = useTodoStore();
```

## Testing Strategies

### Unit Tests

Test store actions in isolation:

```typescript
import { renderHook, act } from '@testing-library/react';
import useTodoStore from './useTodoStore';

test('addTodo creates new todo', () => {
  const { result } = renderHook(() => useTodoStore());
  
  act(() => {
    result.current.addTodo({
      title: "Test todo",
      description: "Test description",
      dueDateTime: "2026-01-15T10:00:00.000Z"
    });
  });
  
  expect(result.current.todos).toHaveLength(1);
  expect(result.current.todos[0].title).toBe("Test todo");
});
```

### Integration Tests

Test store with components:

```typescript
import { render, screen } from '@testing-library/react';
import App from './App';

test('adding todo updates UI', async () => {
  render(<App />);
  
  // Interact with UI that triggers addTodo
  // Assert UI reflects new state
});
```

## Related Documentation

- [Data Models](./data-models.md) - TypeScript interfaces used in store
- [Architecture](./architecture.md) - Overall state management approach
- [Components](./components.md) - How components use the store
- [Utilities](./utilities.md) - Date utilities used in store

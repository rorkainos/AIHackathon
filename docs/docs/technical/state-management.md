---
tags:
  - state
  - store
  - zustand
---

# State Management

**Last Updated**: 2026-01-15

---

## Store Structure

**Location**: `src/store/useTodoStore.ts`

```typescript
interface TodoStore {
  // State
  todos: Todo[];
  completedDays: CompletedDay[];

  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  completeDay: (date: string) => void;
}
```

---

## State Shape

### todos

```typescript
todos: Todo[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Complete project documentation",
    description: "Write technical docs",
    dueDateTime: "2026-01-15T15:00:00.000Z",
    completed: false,
    createdAt: "2026-01-14T10:30:00.000Z",
    updatedAt: "2026-01-14T10:30:00.000Z"
  }
]
```

### completedDays

```typescript
completedDays: CompletedDay[] = [
  {
    date: "2026-01-13",
    completedAt: "2026-01-13T23:59:00.000Z",
    todoIds: ["550e8400-e29b-41d4-a716-446655440000"]
  }
]
```

---

## Actions List

| Action | Parameters | Description |
|--------|------------|-------------|
| `addTodo` | `todoData` | Creates a new todo |
| `updateTodo` | `id`, `updates` | Updates an existing todo |
| `deleteTodo` | `id` | Removes a todo |
| `toggleTodo` | `id` | Toggles completion status |
| `completeDay` | `date` | Marks a day as completed |

---

## Persistence Details

### Storage Configuration

- **Middleware**: Zustand `persist`
- **Storage Key**: `todo-storage`
- **Storage Type**: localStorage

### Storage Format

```json
{
  "state": {
    "todos": [],
    "completedDays": []
  },
  "version": 0
}
```

---

## Related Documentation

- [Data Models](data-models.md)
- [Architecture](architecture.md)

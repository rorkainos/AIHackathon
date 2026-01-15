---
tags:
  - faq
  - help
  - troubleshoot
  - how-to
---

# Frequently Asked Questions

**Last Updated**: 2026-01-15

## Overview

This page answers common questions from developers new to the Todo App codebase. If you can't find what you're looking for, check the relevant documentation section or ask a team member.

---

## State Management Questions

### How do I add a new todo programmatically?

Use the `addTodo` action from the Zustand store:

```typescript
const addTodo = useTodoStore((state) => state.addTodo);

addTodo({
  title: 'New task',
  description: 'Task description',
  dueDateTime: '2026-01-15T15:00:00.000Z'
});
```

**See also**: [State Management - addTodo](./state-management.md#addtodo)

---

### How do I access the store outside a React component?

Use the store's `getState()` method:

```typescript
import useTodoStore from './store/useTodoStore';

// Get current state
const todos = useTodoStore.getState().todos;

// Call an action
useTodoStore.getState().addTodo({ ... });
```

**See also**: [State Management](./state-management.md)

---

### Why isn't my component re-rendering when state changes?

Ensure you're subscribing to the specific state slice you need:

```typescript
// ✅ Correct - subscribes to specific slice
const todos = useTodoStore((state) => state.todos);

// ❌ Incorrect - subscribes to entire store (performance issue)
const store = useTodoStore();
```

**See also**: [State Management - Performance](./state-management.md)

---

### How does data persistence work?

The app uses Zustand's `persist` middleware with localStorage. Data is automatically saved when state changes and restored on page load.

- **Storage key**: `'todo-storage'`
- **Storage location**: `localStorage`
- **What's persisted**: `todos` and `completedDays` arrays

```typescript
// Data is stored automatically - no manual save needed
addTodo({ title: 'Task' }); // Automatically persisted
```

**See also**: [State Management - Persistence](./state-management.md#persistence-strategy)

---

### What happens when I try to modify a todo on a completed day?

The store throws an error. You must handle this in your component:

```typescript
try {
  updateTodo(id, updates);
} catch (err) {
  // Handle error - day is locked
  console.error(err.message); // "Cannot edit TODO from a completed day"
}
```

**See also**: [State Management - Business Rules](./state-management.md#business-rules)

---

## Component Questions

### How do I create a new component?

1. Create a new file in the appropriate folder under `src/components/`
2. Define a TypeScript interface for props
3. Export the component as a named export
4. Add documentation in `docs/docs/technical/components/`

```typescript
// src/components/common/MyComponent.tsx
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  );
};
```

**See also**: [Components - Common Patterns](./components.md)

---

### Where should I put my new component?

Choose based on the component's purpose:

| Folder | Purpose | Examples |
|--------|---------|----------|
| `components/common/` | Reusable UI primitives | Button, Modal, Input |
| `components/layout/` | App structure components | Header, Layout, Sidebar |
| `components/calendar/` | Calendar view specific | CalendarView, CalendarDay |
| `components/timeline/` | Timeline view specific | TimelineView, TimelineGroup |
| `components/todo/` | Todo feature specific | TodoItem, TodoForm |

**See also**: [Architecture - Application Structure](./architecture.md#application-structure)

---

### How do I pass data between components?

1. **Props**: Pass data down from parent to child
2. **Store**: Use Zustand for global state
3. **Callbacks**: Pass functions as props for child-to-parent communication

```tsx
// Parent passes data down
<TodoItem 
  todo={todo}
  onEdit={() => handleEdit(todo)}
  onDelete={() => handleDelete(todo.id)}
/>
```

**See also**: [Architecture - Data Flow](./architecture.md#data-flow)

---

### Why use `React.FC` vs regular function components?

Both are valid. This codebase uses explicit typing for clarity:

```typescript
// With React.FC
const Button: React.FC<ButtonProps> = ({ children }) => { ... };

// Regular function (also valid)
function Button({ children }: ButtonProps) { ... }
```

**See also**: [Components](./components.md)

---

## Hooks Questions

### When should I create a custom hook?

Create a custom hook when:

- Logic is reused across multiple components
- You need to encapsulate stateful logic
- You want to keep components clean and focused

```typescript
// Extract countdown logic into reusable hook
const countdown = useCountdown(dueDateTime);
```

**See also**: [Custom Hooks](./hooks.md)

---

### How does useCountdown work?

The `useCountdown` hook:

1. Takes a due date/time string
2. Sets up a 1-second interval
3. Returns a `CountdownTime` object with days, hours, minutes, seconds
4. Cleans up the interval on unmount

```typescript
const countdown = useCountdown('2026-01-15T15:00:00.000Z');
// { days: 2, hours: 5, minutes: 30, seconds: 15, isOverdue: false, ... }
```

**See also**: [Hooks - useCountdown](./hooks.md#usecountdown)

---

## Utilities Questions

### Where do I add new utility functions?

Add utilities to the appropriate file in `src/utils/`:

| File | Purpose |
|------|---------|
| `dateUtils.ts` | Date formatting, comparison, boundaries |
| `countdownUtils.ts` | Countdown calculations, formatting |

For a new category, create a new file (e.g., `validationUtils.ts`).

**See also**: [Utilities](./utilities.md)

---

### Why are utilities pure functions?

Pure functions:

- Have no side effects
- Return the same output for the same input
- Are easy to test
- Are predictable and debuggable

```typescript
// Pure function - same input always gives same output
formatDate('2026-01-15'); // Always returns '2026-01-15'
```

**See also**: [Utilities - Overview](./utilities.md#overview)

---

## Type Questions

### Where are TypeScript types defined?

All shared types are in `src/types/index.ts`:

- `Todo` - Todo item interface
- `CompletedDay` - Completed day tracking
- `CountdownTime` - Countdown state
- `ViewMode` - View mode type
- `TodoStore` - Store interface

**See also**: [Data Models](./data-models.md)

---

### How do I add a new type?

1. Add the interface/type to `src/types/index.ts`
2. Export it from the file
3. Import where needed
4. Document in `docs/docs/technical/data-models.md`

```typescript
// src/types/index.ts
export interface NewType {
  field: string;
}

// Usage
import { NewType } from '../types';
```

**See also**: [Data Models](./data-models.md)

---

## Styling Questions

### How do I style components?

Use Tailwind CSS utility classes directly in JSX:

```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Click me
</button>
```

**See also**: [Styling](./styling.md)

---

### What colour should I use for...?

| Purpose | Colour Classes |
|---------|---------------|
| Primary actions | `bg-blue-600`, `text-blue-600` |
| Secondary actions | `bg-gray-200`, `text-gray-700` |
| Destructive actions | `bg-red-600`, `text-red-600` |
| Success/normal status | `text-green-600` |
| Warning status | `text-yellow-600` |
| Error/overdue | `text-red-600` |

**See also**: [Styling - Design System](./styling.md#design-system)

---

### Why Tailwind instead of CSS modules or styled-components?

Tailwind was chosen for:

- **Rapid development**: No context switching to CSS files
- **Consistency**: Predefined design system
- **Performance**: Unused styles are purged in production
- **Maintainability**: Styles are visible in component code

**See also**: [Architecture - Tech Stack](./architecture.md#technology-stack)

---

## Development Workflow Questions

### How do I start the development server?

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

**See also**: [Build & Deployment - Development Server](./build-deployment.md#development-server)

---

### How do I build for production?

```bash
npm run build
```

This runs TypeScript compilation and Vite build. Output goes to `dist/`.

**See also**: [Build & Deployment - Production Build](./build-deployment.md#production-build)

---

### Where is data stored during development?

Data is stored in your browser's localStorage under the key `'todo-storage'`. To clear data:

1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete the `todo-storage` key

**See also**: [State Management - Persistence](./state-management.md#persistence-strategy)

---

## Troubleshooting

### "Cannot add TODO to a completed day" error

This error occurs when trying to add a todo to a day that has been marked as completed (locked). 

**Solution**: Choose a different date or unlock the day (if feature exists).

**See also**: [State Management - Business Rules](./state-management.md#business-rules)

---

### Countdown shows wrong time

Ensure the `dueDateTime` is in ISO 8601 format with timezone:

```typescript
// ✅ Correct format
dueDateTime: '2026-01-15T15:00:00.000Z'

// ❌ Incorrect formats
dueDateTime: '2026-01-15'
dueDateTime: '15:00'
```

**See also**: [Data Models - Todo](./data-models.md#todo)

---

### State not persisting after refresh

Check that:

1. localStorage is not disabled in your browser
2. The storage key `'todo-storage'` exists in Application > Local Storage
3. You're not in private/incognito mode (some block localStorage)

**See also**: [State Management - Persistence](./state-management.md#persistence-strategy)

---

### Component not updating when store changes

Make sure you're:

1. Using the store hook correctly with a selector
2. Not mutating state directly
3. Subscribing to the correct state slice

```typescript
// ✅ Correct
const todos = useTodoStore((state) => state.todos);

// ❌ Won't trigger re-renders on nested changes
const store = useTodoStore();
const todos = store.todos; // Don't do this
```

**See also**: [State Management](./state-management.md)

---

## Documentation Questions

### Where is the documentation?

- **Technical docs**: `docs/docs/technical/`
- **Business docs**: `docs/docs/business/`
- **MkDocs config**: `docs/mkdocs.yml`

### How do I run the documentation locally?

```bash
cd docs
mkdocs serve
```

Documentation will be at `http://127.0.0.1:8000/`

**See also**: [Build & Deployment](./build-deployment.md)

---

## Still Have Questions?

- Check the relevant documentation section
- Review the source code in `src/`
- Ask a team member
- Open an issue in the repository

---

**Tags**: #faq #help #getting-started #troubleshooting

---
tags:
  - component
  - todo
---

# TodoForm

Form for creating or editing todos.

## Features

- Controlled form inputs
- Validation (required fields)
- Edit mode pre-population
- Date and time pickers (HTML5)
- Error display
- Submit and Cancel actions

## Validation

- Title: Required, non-empty
- Description: Optional
- Due Date: Required
- Due Time: Required

## Usage

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

## Related Documentation

- [Components Overview](../components.md)
- [Modal Component](./modal.md)
- [Button Component](./button.md)

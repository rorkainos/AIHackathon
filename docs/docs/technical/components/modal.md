---
tags:
  - component
  - common
  - ui
---

# Modal

Overlay modal for displaying forms and content above the main interface.

## Features

- Backdrop overlay with click-to-close
- ESC key to close
- Smooth enter/exit animations
- Scroll locking when open
- Centered positioning

## Usage

```tsx
import { Modal } from './components/common/Modal';

<Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add TODO">
  <TodoForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
</Modal>
```

## Related Documentation

- [Components Overview](../components.md)
- [TodoForm Component](./todo-form.md)

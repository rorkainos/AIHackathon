---
tags:
  - component
  - common
  - ui
---

# Modal Component

**Location**: [src/components/common/Modal.tsx](../../../../src/components/common/Modal.tsx)

**Category**: Common Components

Overlay modal for displaying forms and content above the main interface.

## Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

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

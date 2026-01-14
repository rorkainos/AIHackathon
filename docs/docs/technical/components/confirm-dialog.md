---
tags:
  - component
  - common
  - ui
---

# ConfirmDialog Component

**Location**: [src/components/common/ConfirmDialog.tsx](../../../../src/components/common/ConfirmDialog.tsx)

**Category**: Common Components

Confirmation dialog for destructive or important actions.

## Props

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

## Features

- Clear messaging for user intent
- Customizable button labels
- Danger styling for confirm button
- Modal overlay
- Keyboard support (ESC to cancel, Enter to confirm)

## Usage

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

## Related Documentation

- [Components Overview](../components.md)
- [Button Component](./button.md)

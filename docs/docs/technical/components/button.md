---
tags:
  - component
  - common
  - ui
---

# Button Component

**Location**: [src/components/common/Button.tsx](../../../../src/components/common/Button.tsx)

**Category**: Common Components

Reusable button component with multiple variants and sizes.

## Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}
```

## Variants

- **primary**: Blue background, primary actions (Add, Save)
- **secondary**: Gray background, secondary actions (Cancel, Close)
- **danger**: Red background, destructive actions (Delete)

## Usage

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

## Styling Features

- Focus ring for accessibility
- Hover state transitions
- Disabled state with reduced opacity
- Responsive sizing
- Forward ref support

## Related Documentation

- [Components Overview](../components.md)
- [Styling](../styling.md)

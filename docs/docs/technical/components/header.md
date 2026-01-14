---
tags:
  - component
  - layout
---

# Header Component

**Location**: [src/components/layout/Header.tsx](../../../../src/components/layout/Header.tsx)

**Category**: Layout Components

Application header with navigation and primary actions.

## Props

```typescript
interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTodo: () => void;
}
```

## Features

- View mode switcher (Calendar/Timeline)
- Add TODO button
- Sticky positioning
- Responsive design

## Usage

```tsx
import { Header } from './components/layout/Header';

<Header
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  onAddTodo={handleAddTodo}
/>
```

## Related Documentation

- [Components Overview](../components.md)
- [Button Component](./button.md)
- [Data Models](../data-models.md) - ViewMode type

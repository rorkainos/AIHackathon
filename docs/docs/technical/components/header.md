---
tags:
  - component
  - layout
---

# Header

Application header with navigation and primary actions.

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

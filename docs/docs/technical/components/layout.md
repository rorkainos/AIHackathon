---
tags:
  - component
  - layout
---

# Layout Component

**Location**: [src/components/layout/Layout.tsx](../../../../src/components/layout/Layout.tsx)

**Category**: Layout Components

Main layout wrapper providing consistent page structure.

## Props

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

## Features

- Max-width container for content
- Responsive padding
- Background styling
- Centered layout

## Usage

```tsx
import { Layout } from './components/layout/Layout';

<Layout>
  <Header />
  <main>{/* Page content */}</main>
</Layout>
```

## Related Documentation

- [Components Overview](../components.md)
- [Header Component](./header.md)
- [Architecture](../architecture.md)

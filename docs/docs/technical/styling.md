---
tags:
  - style
  - css
  - tailwind
  - design
---

# Styling

**Last Updated**: 2026-01-14

## Overview

The Todo App uses Tailwind CSS, a utility-first CSS framework, for all styling. This approach provides rapid development, consistent design, and excellent production optimization through automatic purging of unused styles.

## Tailwind CSS Configuration

**Location**: [tailwind.config.js](../../../tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Content Paths

Tailwind scans these files for class usage:

- `index.html` - HTML entry point
- `src/**/*.{js,ts,jsx,tsx}` - All source files

### Theme

Currently uses Tailwind's default theme without customization.

### Plugins

No additional plugins installed (future: forms, typography, etc.).

## Design System

### Colours

The app uses Tailwind's default colour palette with semantic usage:

#### Primary Actions
- **Blue** (`blue-600`, `blue-700`): Primary buttons, links
- Example: Add TODO button, Save button

#### Secondary Actions
- **Gray** (`gray-200`, `gray-300`, `gray-900`): Secondary buttons, text
- Example: Cancel button, secondary text

#### Destructive Actions
- **Red** (`red-600`, `red-700`, `red-500`): Delete buttons, errors, overdue
- Example: Delete button, overdue countdowns

#### Status Indicators
- **Green** (`green-400`, `green-700`, `green-50`): Normal status, success
- **Yellow** (`yellow-400`, `yellow-700`, `yellow-50`): Warning status
- **Red** (`red-400`, `red-600`, `red-50`): Urgent/overdue status

#### Backgrounds
- **White**: Main content areas
- **Gray-50** (`gray-50`): Subtle backgrounds
- **Gray-100** (`gray-100`): Borders, separators

### Typography

#### Font Family
- Default system font stack (Tailwind default)

#### Font Sizes
- `text-sm`: Small text (12px, countdown, metadata)
- `text-base`: Body text (16px, descriptions)
- `text-lg`: Large text (18px, headings)
- `text-xl`: Extra large (20px, titles)
- `text-2xl`: Section headers (24px)

#### Font Weights
- `font-normal`: Regular text (400)
- `font-semibold`: Buttons, emphasis (600)
- `font-bold`: Headings (700)

#### Special Fonts
- `font-mono`: Countdown timers for fixed-width alignment

### Spacing

Uses Tailwind's default spacing scale (0.25rem increments):

- `p-1` to `p-6`: Padding (0.25rem to 1.5rem)
- `m-1` to `m-6`: Margin
- `space-x-2`, `space-y-4`: Gap between elements
- `gap-2`, `gap-4`: Flexbox/Grid gaps

Common patterns:

- Button padding: `px-4 py-2` (1rem × 0.5rem)
- Card padding: `p-4` (1rem)
- Section spacing: `mb-6` (1.5rem)

### Borders

- **Width**: `border`, `border-2`, `border-4`
- **Radius**: `rounded`, `rounded-lg`, `rounded-full`
- **Colours**: Semantic (see Colours section)

### Shadows

- `shadow`: Default shadow for cards
- `shadow-md`: Medium shadow for elevated elements
- `shadow-lg`: Large shadow for modals

## Component Styling Patterns

### Button Component

**Location**: [src/components/common/Button.tsx](../../../src/components/common/Button.tsx)

```typescript
const baseStyles = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};
```

**Features**:

- Base styles shared across all variants
- Variant-specific colours and focus rings
- Size variations
- Hover transitions
- Focus accessibility (ring)
- Disabled state styling

### Card/Item Pattern

Used for TodoItem, CalendarDay:

```tsx
<div className="border-2 border-green-400 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
  {/* Content */}
</div>
```

**Elements**:

- Border with urgency colour
- Rounded corners
- Padding for content
- Shadow for depth
- Hover effect for interactivity

### Modal Overlay

```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
    {/* Modal content */}
  </div>
</div>
```

**Elements**:

- Fixed positioning covering viewport
- Semi-transparent backdrop
- Flexbox centering
- White modal box with shadow
- Max width for readability

### Form Inputs

```tsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

**Elements**:

- Full width
- Padding for touch targets
- Border for definition
- Focus ring for accessibility
- Consistent styling across inputs

## Responsive Design

### Mobile-First Approach

Tailwind uses mobile-first breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Breakpoints

- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large desktops)

### Responsive Patterns

#### Calendar Grid

```tsx
<div className="grid grid-cols-7 gap-1 md:gap-2">
  {/* 7 columns (days of week), tighter spacing on mobile */}
</div>
```

#### Header

```tsx
<header className="flex flex-col sm:flex-row justify-between items-center">
  {/* Stacked on mobile, horizontal on desktop */}
</header>
```

#### Todo List

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {/* Single column on mobile/tablet, 2 columns on large screens */}
</div>
```

## State Styles

### Hover

Interactive elements have hover states:

```tsx
<button className="bg-blue-600 hover:bg-blue-700">
  Click me
</button>
```

### Focus

All focusable elements have focus rings for accessibility:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
  Accessible
</button>
```

### Active

Pressed state for buttons:

```tsx
<button className="active:scale-95 transition-transform">
  Press me
</button>
```

### Disabled

Reduced opacity for disabled elements:

```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>
```

### Completed Todos

```tsx
<div className={todo.completed ? 'opacity-50 line-through' : ''}>
  {todo.title}
</div>
```

## Transitions & Animations

### Colour Transitions

Smooth colour changes on hover:

```tsx
<button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
  Hover me
</button>
```

### Shadow Transitions

Elevation changes:

```tsx
<div className="shadow hover:shadow-md transition-shadow duration-200">
  Card
</div>
```

### Transform Transitions

Scale effects:

```tsx
<button className="active:scale-95 transition-transform duration-100">
  Click me
</button>
```

## Layout Patterns

### Flexbox

#### Horizontal Layout

```tsx
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

#### Vertical Layout

```tsx
<div className="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid

#### Calendar Grid

```tsx
<div className="grid grid-cols-7 gap-2">
  {days.map(day => <CalendarDay key={day} />)}
</div>
```

#### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>
```

### Container

Center content with max width:

```tsx
<div className="max-w-6xl mx-auto px-4">
  {/* Content */}
</div>
```

## Utility Composition

### Dynamic Classes

Conditional styling with template literals:

```typescript
const urgencyClasses = countdown.isOverdue
  ? 'text-red-600 bg-red-50'
  : 'text-green-700 bg-green-50';

return <div className={`p-2 rounded ${urgencyClasses}`}>
  {/* Content */}
</div>;
```

### Class Helper Function

For complex conditional logic:

```typescript
const getCardClasses = (todo: Todo, isLocked: boolean) => {
  const base = 'border-2 rounded-lg p-4 transition-all';
  const border = getUrgencyBorderColor(calculateCountdown(todo.dueDateTime));
  const opacity = todo.completed ? 'opacity-50' : 'opacity-100';
  const cursor = isLocked ? 'cursor-not-allowed' : 'cursor-pointer';
  
  return `${base} ${border} ${opacity} ${cursor}`;
};
```

### clsx or classnames Library

For cleaner conditional classes (future enhancement):

```typescript
import clsx from 'clsx';

const classes = clsx(
  'base-class',
  {
    'opacity-50': todo.completed,
    'cursor-not-allowed': isLocked,
    'hover:shadow-md': !isLocked
  }
);
```

## Production Optimizations

### Purging

Tailwind automatically removes unused classes in production builds:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Only classes found in these files are included in final CSS
}
```

**Result**: Tiny CSS bundle (~10-20 KB) instead of full Tailwind (3+ MB).

### Minification

PostCSS minifies CSS:

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
```

## Accessibility

### Focus Indicators

All interactive elements have visible focus states:

```tsx
<button className="focus:ring-2 focus:ring-blue-500">
  Accessible
</button>
```

### Colour Contrast

Ensure sufficient contrast ratios:

- Text on backgrounds: 4.5:1 minimum (WCAG AA)
- Primary button: White on blue-600 ✅
- Secondary button: Gray-900 on gray-200 ✅

### Touch Targets

Minimum 44×44px for mobile:

```tsx
<button className="px-4 py-2"> {/* 48px+ height */}
  Large enough
</button>
```

## Common Patterns Reference

```javascript
// tailwind.config.js
export default {
  darkMode: 'class', // or 'media'
  // ...
}
```

## Common Patterns Reference

### Full-Width Container

```tsx
<div className="w-full max-w-6xl mx-auto px-4">
  {/* Content */}
</div>
```

### Card

```tsx
<div className="bg-white rounded-lg shadow p-4 border border-gray-200">
  {/* Card content */}
</div>
```

### Badge

```tsx
<span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
  5 todos
</span>
```

### Divider

```tsx
<div className="border-t border-gray-200 my-4"></div>
```

### Centered Loading Spinner

```tsx
<div className="flex items-center justify-center h-screen">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>
```

## Related Documentation

- [Components](./components.md) - Component implementations using Tailwind
- [Architecture](./architecture.md) - Tailwind in tech stack
- [Build & Deployment](./build-deployment.md) - PostCSS configuration

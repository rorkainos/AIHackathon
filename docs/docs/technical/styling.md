---
tags:
  - style
  - css
  - tailwind
  - design
---

# Styling

**Last Updated**: 2026-01-15

---

## Tailwind Configuration

**Location**: `tailwind.config.js`

```javascript
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

---

## Theme Colours

### Primary Actions

| Colour | Class | Usage |
|--------|-------|-------|
| Blue | `blue-600`, `blue-700` | Primary buttons, links |

### Secondary Actions

| Colour | Class | Usage |
|--------|-------|-------|
| Gray | `gray-200`, `gray-300`, `gray-900` | Secondary buttons, text |

### Destructive Actions

| Colour | Class | Usage |
|--------|-------|-------|
| Red | `red-600`, `red-700` | Delete buttons, errors |

### Status Indicators

| Status | Background | Text |
|--------|------------|------|
| Normal | `green-50` | `green-700` |
| Warning | `yellow-50` | `yellow-700` |
| Urgent | `red-50` | `red-600` |

### Backgrounds

| Purpose | Class |
|---------|-------|
| Main content | `white` |
| Subtle | `gray-50` |
| Borders | `gray-100` |

---

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## Common Patterns

### Container

```tsx
<div className="w-full max-w-6xl mx-auto px-4">
</div>
```

### Card

```tsx
<div className="bg-white rounded-lg shadow p-4 border border-gray-200">
</div>
```

### Badge

```tsx
<span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
</span>
```

### Divider

```tsx
<div className="border-t border-gray-200 my-4"></div>
```

---

## Typography Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-sm` | 12px | Metadata |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Headings |
| `text-xl` | 20px | Titles |
| `text-2xl` | 24px | Section headers |

---

## Spacing Scale

| Class | Value | Example |
|-------|-------|---------|
| `p-1` | 0.25rem | Tight padding |
| `p-2` | 0.5rem | Small padding |
| `p-4` | 1rem | Standard padding |
| `p-6` | 1.5rem | Large padding |

---

## Related Documentation

- [Components](components.md)
- [Architecture](architecture.md)

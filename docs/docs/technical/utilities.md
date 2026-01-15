---
tags:
  - utility
  - helper
  - utils
  - function
---

# Utilities

**Last Updated**: 2025-01-15

## Overview

Pure utility functions for date handling and countdown calculations.

## Date Utilities

**Location**: [src/utils/dateUtils.ts](../../../src/utils/dateUtils.ts)

---

### formatDate

```typescript
formatDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
```

---

### formatDateTime

```typescript
formatDateTime("2026-01-14T15:30:00.000Z"); // "Jan 14, 2026 at 3:30 PM"
```

---

### formatTime

```typescript
formatTime("2026-01-14T15:30:00.000Z"); // "3:30 PM"
```

---

### formatDateShort

```typescript
formatDateShort("2026-01-14T15:30:00.000Z"); // "Wed, Jan 14"
```

---

### formatDateFull

```typescript
formatDateFull("2026-01-14T15:30:00.000Z"); // "Wednesday, January 14, 2026"
```

---

### isOverdue

```typescript
isOverdue("2026-01-01T10:00:00.000Z"); // true (if past due)
```

---

### getDayStart

```typescript
getDayStart("2026-01-14T15:30:00.000Z"); // Date: 2026-01-14T00:00:00.000Z
```

---

### getDayEnd

```typescript
getDayEnd("2026-01-14T10:00:00.000Z"); // Date: 2026-01-14T23:59:59.999Z
```

---

### getSecondsDifference

```typescript
const from = new Date("2026-01-14T10:00:00.000Z");
const to = new Date("2026-01-14T11:00:00.000Z");
getSecondsDifference(from, to); // 3600
```

---

### normalizeDate

```typescript
normalizeDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
```

---

### getTodayDate

```typescript
getTodayDate(); // "2026-01-14" (current date)
```

---

## Countdown Utilities

**Location**: [src/utils/countdownUtils.ts](../../../src/utils/countdownUtils.ts)

---

### calculateCountdown

```typescript
calculateCountdown("2026-01-16T15:30:15.000Z");
// { days: 2, hours: 5, minutes: 30, seconds: 15, isOverdue: false, totalSeconds: 192615 }
```

---

### formatCountdown

```typescript
formatCountdown({
  days: 2,
  hours: 5,
  minutes: 30,
  seconds: 15,
  isOverdue: false,
  totalSeconds: 192615,
});
// "2d 5h 30m 15s"

formatCountdown({
  days: 0,
  hours: 1,
  minutes: 20,
  seconds: 0,
  isOverdue: true,
  totalSeconds: 4800,
});
// "Overdue by 1h 20m 0s"
```

---

### getUrgencyLevel

```typescript
getUrgencyLevel({ totalSeconds: 200000, isOverdue: false }); // "normal" (>24h)
getUrgencyLevel({ totalSeconds: 10000, isOverdue: false }); // "warning" (<24h)
getUrgencyLevel({ totalSeconds: 3000, isOverdue: false }); // "urgent" (<1h)
getUrgencyLevel({ totalSeconds: 1000, isOverdue: true }); // "overdue"
```

---

### getUrgencyColor

```typescript
getUrgencyColor(countdown); // "text-green-700 bg-green-50" (normal)
// "text-yellow-700 bg-yellow-50" (warning)
// "text-red-700 bg-red-50" (urgent)
// "text-red-600 bg-red-50" (overdue)
```

---

### getUrgencyBorderColor

```typescript
getUrgencyBorderColor(countdown); // "border-green-400" (normal)
// "border-yellow-400" (warning)
// "border-red-400" (urgent)
// "border-red-500" (overdue)
```

---

## Related Documentation

- [Data Models](./data-models.md) - CountdownTime interface
- [Custom Hooks](./hooks.md) - useCountdown hook
- [Styling](./styling.md) - Urgency color usage

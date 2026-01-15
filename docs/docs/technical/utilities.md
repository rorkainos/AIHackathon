---
tags:
  - utility
  - helper
  - utils
  - function
---

# Utilities

**Last Updated**: 2026-01-15

---

## Date Utilities

**Location**: `src/utils/dateUtils.ts`

### formatDate

```typescript
formatDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
```

### formatDateTime

```typescript
formatDateTime("2026-01-14T15:30:00.000Z"); // "Jan 14, 2026 at 3:30 PM"
```

### formatTime

```typescript
formatTime("2026-01-14T15:30:00.000Z"); // "3:30 PM"
```

### formatDateShort

```typescript
formatDateShort("2026-01-14T15:30:00.000Z"); // "Wed, Jan 14"
```

### formatDateFull

```typescript
formatDateFull("2026-01-14T15:30:00.000Z"); // "Wednesday, January 14, 2026"
```

### isOverdue

```typescript
isOverdue("2026-01-01T10:00:00.000Z"); // true (if past due)
```

### getDayStart

```typescript
getDayStart("2026-01-14T15:30:00.000Z"); // Date: 2026-01-14T00:00:00.000Z
```

### getDayEnd

```typescript
getDayEnd("2026-01-14T10:00:00.000Z"); // Date: 2026-01-14T23:59:59.999Z
```

### getSecondsDifference

```typescript
getSecondsDifference(date1, date2); // 3600 (seconds between dates)
```

### normalizeDate

```typescript
normalizeDate("2026-01-14T15:30:00.000Z"); // "2026-01-14"
```

---

## Countdown Utilities

**Location**: `src/utils/countdownUtils.ts`

### calculateCountdown

```typescript
calculateCountdown("2026-01-15T15:00:00.000Z");
// { days: 2, hours: 5, minutes: 30, seconds: 15, isOverdue: false, totalSeconds: 192615 }
```

### formatCountdown

```typescript
formatCountdown(countdown); // "2d 5h 30m 15s" or "Overdue by 1h 20m"
```

### getUrgencyColor

```typescript
getUrgencyColor(countdown); // "text-green-700" | "text-yellow-700" | "text-red-600"
```

### getUrgencyBorderColor

```typescript
getUrgencyBorderColor(countdown); // "border-green-400" | "border-yellow-400" | "border-red-400"
```

---

## Related Documentation

- [Hooks](hooks.md)
- [Data Models](data-models.md)

---
tags:
  - hook
  - custom-hook
  - react-hook
---

# Custom Hooks

---

## useCountdown

**Location**: `src/hooks/useCountdown.ts`

### Purpose

Real-time countdown timer that updates every second for todo due dates.

### Parameters

| Parameter     | Type   | Description            |
| ------------- | ------ | ---------------------- |
| `dueDateTime` | string | ISO 8601 due date/time |

### Returns

| Return      | Type            | Description             |
| ----------- | --------------- | ----------------------- |
| `countdown` | `CountdownTime` | Current countdown state |

### Usage Example

```typescript
import { useCountdown } from "../hooks/useCountdown";
import { formatCountdown, getUrgencyColor } from "../utils/countdownUtils";

function CountdownDisplay({ dueDateTime }: { dueDateTime: string }) {
  const countdown = useCountdown(dueDateTime);

  return (
    <div className={getUrgencyColor(countdown)}>
      {formatCountdown(countdown)}
    </div>
  );
}
```

---

## Related Documentation

- [Components](components.md) - CountdownTimer component
- [Utilities](utilities.md) - calculateCountdown function
- [Data Models](data-models.md) - CountdownTime interface

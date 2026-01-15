---
tags:
  - hook
  - custom-hook
  - react-hook
---

# Custom Hooks

**Last Updated**: 2025-01-15

## Overview

Custom React hooks encapsulate reusable stateful logic, promoting code reuse and separation of concerns.

## useCountdown

**Location**: [src/hooks/useCountdown.ts](../../../src/hooks/useCountdown.ts)

### Purpose

Provides live countdown display for todo due dates, automatically updating the remaining time every second and handling overdue status.

### Parameters

| Parameter     | Type   | Description                      |
| ------------- | ------ | -------------------------------- |
| `dueDateTime` | string | Due date/time in ISO 8601 format |

### Returns

| Return      | Type                                              | Description             |
| ----------- | ------------------------------------------------- | ----------------------- |
| `countdown` | [`CountdownTime`](./data-models.md#countdowntime) | Current countdown state |

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

- [Components](./components.md) - CountdownTimer using useCountdown
- [Utilities](./utilities.md) - calculateCountdown function
- [Data Models](./data-models.md) - CountdownTime interface

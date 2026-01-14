---
tags:
  - hook
  - custom-hook
  - react-hook
---

# Custom Hooks

**Last Updated**: 2026-01-14

## Overview

Custom React hooks encapsulate reusable stateful logic, promoting code reuse and separation of concerns. The Todo App currently implements one custom hook for real-time countdown functionality.

## useCountdown

**Location**: [src/hooks/useCountdown.ts](../../../src/hooks/useCountdown.ts)

Real-time countdown timer hook that updates every second.

### Purpose

Provides live countdown display for todo due dates, automatically updating the remaining time and handling overdue status.

### Implementation

```typescript
import { useState, useEffect } from 'react';
import { CountdownTime } from '../types';
import { calculateCountdown } from '../utils/countdownUtils';

export const useCountdown = (dueDateTime: string): CountdownTime => {
  const [countdown, setCountdown] = useState<CountdownTime>(
    calculateCountdown(dueDateTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(dueDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [dueDateTime]);

  return countdown;
};
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dueDateTime` | string | Due date/time in ISO 8601 format |

### Returns

| Return | Type | Description |
|--------|------|-------------|
| `countdown` | [`CountdownTime`](./data-models.md#countdowntime) | Current countdown state |

### Features

- **Auto-updates**: Recalculates countdown every 1000ms (1 second)
- **Cleanup**: Clears interval on unmount to prevent memory leaks
- **Reactive**: Re-initializes interval when `dueDateTime` changes
- **Type-safe**: Returns fully typed `CountdownTime` object

### State Management

- **Initial State**: Calculated immediately on mount using `calculateCountdown`
- **Updates**: Interval updates state every second
- **Dependencies**: Effect re-runs when `dueDateTime` changes

### Usage Example

```typescript
import { useCountdown } from '../hooks/useCountdown';
import { formatCountdown, getUrgencyColor } from '../utils/countdownUtils';

function CountdownDisplay({ dueDateTime }: { dueDateTime: string }) {
  const countdown = useCountdown(dueDateTime);
  
  return (
    <div className={getUrgencyColor(countdown)}>
      {formatCountdown(countdown)}
    </div>
  );
}
```

### Component Integration

#### CountdownTimer Component

The primary consumer of this hook:

```typescript
// src/components/todo/CountdownTimer.tsx
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownTimerProps {
  dueDateTime: string;
}

export const CountdownTimer = ({ dueDateTime }: CountdownTimerProps) => {
  const countdown = useCountdown(dueDateTime);
  
  return (
    <div className={`p-2 rounded ${getUrgencyColor(countdown)}`}>
      <span className="font-mono text-sm">
        {formatCountdown(countdown)}
      </span>
    </div>
  );
};
```

See [CountdownTimer component](./components.md#countdowntimer) for full implementation.

### Performance Considerations

#### Interval Management

Each instance creates its own interval:

```typescript
// ✅ Efficient: One interval per hook instance
const countdown1 = useCountdown(todo1.dueDateTime);
const countdown2 = useCountdown(todo2.dueDateTime);

// Each has independent interval, updating only its own state
```

#### Cleanup Importance

Interval cleanup prevents memory leaks:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(calculateCountdown(dueDateTime));
  }, 1000);

  // Critical: Clear interval on unmount
  return () => clearInterval(interval);
}, [dueDateTime]);
```

**Without Cleanup**:
- Intervals continue after component unmounts
- Memory leak grows with each mount/unmount
- Can cause performance degradation

#### Optimization Strategies

For lists with many countdowns:

```typescript
// Option 1: Single global interval (future enhancement)
// Update all countdowns from one interval using context

// Option 2: Virtualization
// Only render visible TodoItems, reducing active intervals

// Option 3: Longer interval for less critical updates
const interval = setInterval(() => {
  setCountdown(calculateCountdown(dueDateTime));
}, 5000); // Update every 5 seconds instead of 1
```

### Dependency Array

The `dueDateTime` dependency ensures correct behavior:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(calculateCountdown(dueDateTime));
  }, 1000);

  return () => clearInterval(interval);
}, [dueDateTime]); // Re-run if dueDateTime changes
```

**Why it matters**:
- If `dueDateTime` changes (todo edited), interval needs new due date
- Without dependency, interval would use stale `dueDateTime`
- Dependency array triggers cleanup and new interval

### Testing

#### Unit Test Example

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calculates initial countdown', () => {
    const future = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    const { result } = renderHook(() => useCountdown(future));
    
    expect(result.current.hours).toBe(1);
    expect(result.current.isOverdue).toBe(false);
  });

  it('updates countdown every second', () => {
    const future = new Date(Date.now() + 3600000).toISOString();
    const { result } = renderHook(() => useCountdown(future));
    
    const initialSeconds = result.current.seconds;
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current.seconds).toBe(initialSeconds - 1);
  });

  it('cleans up interval on unmount', () => {
    const future = new Date(Date.now() + 3600000).toISOString();
    const { unmount } = renderHook(() => useCountdown(future));
    
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('handles dueDateTime change', () => {
    const future1 = new Date(Date.now() + 3600000).toISOString();
    const future2 = new Date(Date.now() + 7200000).toISOString();
    
    const { result, rerender } = renderHook(
      ({ dueDateTime }) => useCountdown(dueDateTime),
      { initialProps: { dueDateTime: future1 } }
    );
    
    expect(result.current.hours).toBe(1);
    
    rerender({ dueDateTime: future2 });
    
    expect(result.current.hours).toBe(2);
  });
});
```

#### Integration Test

Test with actual component:

```typescript
import { render, screen } from '@testing-library/react';
import { CountdownTimer } from './CountdownTimer';

describe('CountdownTimer with useCountdown', () => {
  it('displays countdown', () => {
    const future = new Date(Date.now() + 90000).toISOString(); // 1m 30s
    render(<CountdownTimer dueDateTime={future} />);
    
    expect(screen.getByText(/1m 30s/)).toBeInTheDocument();
  });
});
```

### Edge Cases

#### Overdue Handling

```typescript
const countdown = useCountdown(pastDate);
// countdown.isOverdue === true
// Display shows "Overdue by X"
```

#### Very Short Durations

```typescript
const countdown = useCountdown(in5Seconds);
// Updates smoothly through final seconds
// Transitions to overdue at 0
```

#### Date in Far Future

```typescript
const countdown = useCountdown(nextYear);
// Displays days (365d 0h 0m 0s)
// Updates continue for entire duration
```

## Hook Best Practices

#### Pause/Resume

```typescript
export const useCountdown = (dueDateTime: string, isPaused: boolean = false) => {
  const [countdown, setCountdown] = useState<CountdownTime>(
    calculateCountdown(dueDateTime)
  );

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(dueDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [dueDateTime, isPaused]);

  return countdown;
};
```

#### Custom Interval

```typescript
export const useCountdown = (
  dueDateTime: string,
  updateInterval: number = 1000
) => {
  // ... implementation with configurable interval
};
```

#### Precision Mode

```typescript
export const useCountdown = (
  dueDateTime: string,
  precision: 'seconds' | 'minutes' | 'hours' = 'seconds'
) => {
  const intervalMs = {
    seconds: 1000,
    minutes: 60000,
    hours: 3600000
  }[precision];
  
  // ... implementation
};
```

## Future Custom Hooks

### useTodoFilters

Filter todos based on criteria:

```typescript
export const useTodoFilters = (todos: Todo[], filters: FilterOptions) => {
  return useMemo(() => {
    return todos.filter(todo => {
      if (filters.completed !== undefined && todo.completed !== filters.completed) {
        return false;
      }
      if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [todos, filters]);
};
```

### useLocalStorage

Generic localStorage hook:

```typescript
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
```

### useKeyboardShortcut

Handle keyboard shortcuts:

```typescript
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === key &&
        (!modifiers.ctrl || e.ctrlKey) &&
        (!modifiers.shift || e.shiftKey) &&
        (!modifiers.alt || e.altKey)
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, modifiers]);
};
```

## Hook Best Practices

### Naming Convention

- Prefix with `use` (React convention)
- Descriptive names: `useCountdown`, not `useTimer`

### Single Responsibility

Each hook should do one thing well:

```typescript
// ✅ Good: Focused purpose
export const useCountdown = (dueDateTime: string) => { ... };

// ❌ Bad: Too many responsibilities
export const useTodoManager = () => {
  // Manages state, countdown, filters, sorting...
};
```

### Return Values

Use descriptive return types:

```typescript
// ✅ Good: Named object
export const useCountdown = (dueDateTime: string) => {
  const countdown = useState(...);
  return countdown; // CountdownTime object
};

// ✅ Also good: Tuple with clear names
export const useToggle = (initial: boolean) => {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle] as const;
};
```

### Cleanup

Always clean up effects:

```typescript
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []);
```

### Dependencies

Accurate dependency arrays prevent bugs:

```typescript
useEffect(() => {
  // Uses dueDateTime
  const interval = setInterval(() => {
    calculate(dueDateTime);
  }, 1000);
  
  return () => clearInterval(interval);
}, [dueDateTime]); // Include in dependencies
```

## Related Documentation

- [Components](./components.md) - CountdownTimer using useCountdown
- [Utilities](./utilities.md) - calculateCountdown function
- [Data Models](./data-models.md) - CountdownTime interface
- [Architecture](./architecture.md) - Hooks in overall design

---
tags:
  - component
  - timeline
---

# TimelineView

Chronological list of all todos grouped by date.

## Features

- Todos grouped by date
- Jump to today button
- Sorted chronologically
- Empty state handling
- Delegated rendering to TimelineGroup

## State

- `timelineRef`: Reference for scroll-to-today functionality

## Related

- Uses [TimelineGroup](./timeline-group.md) for each date group
- Uses [dateUtils](../utilities.md#date-utilities) for date operations

## Related Documentation

- [Components Overview](../components.md)
- [TimelineGroup Component](./timeline-group.md)
- [Utilities](../utilities.md)

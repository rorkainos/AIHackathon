# Data Lifecycle and Data Flows

This document describes how business data is created, updated, and constrained over time.

## Data creation points

- TODOs are created when the user submits the “Add TODO” form.
- A Completed Day record is created when the user confirms “Complete Day” for a date.

## Validation and enrichment

### At TODO creation/update
- Title must be present (non-empty).
- Due date/time must be present.
- The due date’s calendar day must not be a completed (locked) day.
- The system automatically assigns metadata such as identifiers and timestamps.

## State transitions

### TODO
- Incomplete → Completed: user checks the checkbox (only for unlocked days).
- Completed → Incomplete: user unchecks the checkbox (only for unlocked days).
- Any TODO on an unlocked day → Locked (effective): when its due date’s day is completed.

### Completed Day
- Not completed → Completed: user confirms “Complete Day”.
- Completed remains completed: the system treats completion as irreversible in normal usage.

## Data access patterns

- Calendar View reads TODOs and presents per-day counts and completion (lock) indicators.
- Timeline View reads TODOs grouped by date and provides direct actions (edit/delete/toggle/complete day).

## Retention and deletion behavior

- TODOs persist until deleted by the user.
- Completed Day records persist until the user clears local app data.
- There is no built-in archival/export workflow; persistence is local to the user’s environment.

## External data exchanges

- None. The system does not exchange business data with external systems.

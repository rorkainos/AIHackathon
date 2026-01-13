# Business Rules and Constraints

This document lists business rules enforced by the system. Items are labeled as confirmed (observed behavior) or inferred (intent).

## TODO creation rules

- Confirmed: Title is required.
- Confirmed: Due date and time are required.
- Confirmed: Description is optional.
- Confirmed: A TODO cannot be created with a due date on a completed (locked) day.

## TODO update rules

- Confirmed: A TODO on a completed (locked) day cannot be edited.
- Confirmed: A TODO cannot be moved to a completed (locked) day.
- Confirmed: Updates replace the current values and refresh the “last updated” timestamp.

## TODO completion rules

- Confirmed: A TODO can be marked complete or incomplete by a checkbox.
- Confirmed: Completion toggling is not allowed for TODOs on completed (locked) days.

## TODO deletion rules

- Confirmed: Deletion requires explicit user confirmation.
- Confirmed: A TODO on a completed (locked) day cannot be deleted.
- Confirmed: Deletion is permanent within the app (no undo).

## Day completion (day closure) rules

- Confirmed: Only dates with at least one TODO can be completed (the action is only offered in that case).
- Confirmed: Completing a day locks that date.
- Confirmed: Once a day is completed, the system prevents:
  - Adding new TODOs due on that day
  - Editing existing TODOs due on that day
  - Deleting existing TODOs due on that day
  - Toggling completion for TODOs due on that day
- Inferred: Completing a day represents a “point of no return” intended to encourage daily closure and reduce retroactive changes.

## Sorting and presentation rules

- Confirmed: In the per-day list, incomplete TODOs appear before completed TODOs.
- Confirmed: Within the incomplete/completed group, TODOs are ordered by due time.
- Confirmed: Urgency is derived from time remaining until due date/time:
  - Normal: 24+ hours remaining
  - Warning: less than 24 hours remaining
  - Urgent: less than 1 hour remaining
  - Overdue: due date/time is in the past

## Permissions and access rules

- Confirmed: There is no role-based access control; all users of the app instance have the same capabilities.
- Confirmed: Locking is enforced by system rules tied to calendar dates rather than user roles.

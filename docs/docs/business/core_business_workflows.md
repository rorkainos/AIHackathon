# Core Business Workflows

This document describes end-to-end workflows supported by the TODO App, including happy paths and exception paths.

## 1) Capture a TODO (Create)

### Happy path
1. User opens the “Add TODO” form.
2. User enters a title and due date/time (description is optional).
3. System saves the TODO and makes it visible in the Timeline view (and counted in the Calendar view).

### Exception paths
- Missing title or due date/time: system prevents saving and shows a validation message.
- Due date falls on a completed (locked) day: system blocks saving and explains the restriction.

## 2) Review TODOs (Read)

### Happy path
- User uses Calendar View to scan workload and identify which days are completed (locked).
- User uses Timeline View to review detailed TODOs grouped by date.

### Exception paths
- No TODOs exist: system shows an empty-state message.

## 3) Modify a TODO (Update)

### Happy path
1. User switches to Timeline View.
2. User selects a TODO to edit.
3. User updates the title/description/due date/time.
4. System saves changes and updates the visible list.

### Exception paths
- Attempt to edit a TODO on a locked day: system blocks the edit.
- Attempt to move a TODO to a locked day: system blocks the change.

## 4) Mark a TODO complete/incomplete (Toggle)

### Happy path
1. User switches to Timeline View.
2. User toggles the checkbox for a TODO.
3. System saves the new completion state.

### Exception paths
- Attempt to toggle on a locked day: system blocks the action.

## 5) Remove a TODO (Delete)

### Happy path
1. User switches to Timeline View.
2. User selects “Delete” for a TODO.
3. System asks for confirmation.
4. User confirms deletion.
5. System removes the TODO from the list.

### Exception paths
- Attempt to delete a TODO on a locked day: system blocks the action.
- User cancels the confirmation: no changes are made.

## 6) Close a day (Complete Day / Lock)

### Business intent
Completing a day acts as a “day closure” mechanism: it finalizes the set of TODOs for a date and prevents retroactive changes.

### Happy path
1. User switches to Timeline View.
2. User reviews TODOs for a specific date.
3. User selects “Complete Day”.
4. System asks for confirmation.
5. User confirms.
6. System marks the date as completed (locked).

### Exception paths
- Days without TODOs cannot be completed (the action is not offered).
- If the user cancels the confirmation: no changes are made.
- After a day is completed, the system prevents:
  - Creating new TODOs with a due date on that day
  - Editing, deleting, or toggling existing TODOs on that day

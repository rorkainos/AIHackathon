# UI Pages and User Flows

This document describes the user-facing screens and how a user moves through the system to manage TODOs.

## Pages

| Page / Surface | Business Purpose | Who Can Access | Key Actions | Data Viewed / Modified | Downstream Business Effects |
| --- | --- | --- | --- | --- | --- |
| Header (global) | Provide global navigation and a consistent entry point to add a TODO | Anyone with access to the app | Switch between Calendar and Timeline; open “Add TODO” | Does not directly modify data | Establishes the user’s current working view; enables creation workflow |
| Calendar View | Provide a month-level overview of workload and day status | Anyone with access to the app | Navigate months; jump to today; click a day (switches to Timeline) | Views counts of TODOs per day; indicates completed (locked) days | Supports planning and scanning; communicates which days are locked |
| Timeline View | Provide the primary workspace to review and act on TODOs grouped by date | Anyone with access to the app | View grouped TODOs; jump to today (when present); edit/delete/toggle TODOs; complete a day | Views and modifies TODOs; creates “completed day” records | Executes operational changes (create/update/delete/complete day); enforces day-lock rules |
| Add/Edit TODO modal | Capture and validate TODO details | Anyone with access to the app | Enter title/description/due date & time; save or cancel | Creates or updates a TODO | Persists new/changed TODOs; triggers validation (e.g., cannot save to a locked day) |
| Confirmation dialogs | Prevent accidental destructive/irreversible actions | Anyone with access to the app | Confirm or cancel delete; confirm or cancel complete day | Delete TODO; complete day | Reduces accidental loss; reinforces irreversibility of day completion |
| Error banner | Provide visible feedback when an action fails due to business constraints | Anyone with access to the app | Dismiss error | No direct data changes | Helps user understand why an action was blocked |

## Primary user flows

### Create TODO
1. User selects “+ Add TODO”.
2. User enters a required title, optional description, and a due date/time.
3. User saves.
4. System blocks saving if the due date falls on a completed (locked) day.

### Review TODOs
- Calendar View supports scanning by showing counts per day and indicating locked days.
- Timeline View supports detailed review by listing all TODOs grouped by date.

### Update TODO
1. User switches to Timeline View.
2. User selects “Edit” on a TODO.
3. User updates fields and saves.
4. System blocks updates when the TODO’s current day is locked, and blocks moving a TODO to a locked day.

### Toggle completion
1. User switches to Timeline View.
2. User checks/unchecks a TODO.
3. System blocks toggling when the day is locked.

### Delete TODO
1. User switches to Timeline View.
2. User selects “Delete” on a TODO.
3. User confirms deletion.
4. System blocks deletion when the day is locked.

### Complete day (lock)
1. User switches to Timeline View.
2. For a date with one or more TODOs, user selects “Complete Day”.
3. User confirms.
4. System marks the day as completed (locked), preventing further adds/edits/deletes/toggles for that date.

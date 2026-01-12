---
tags:
  - view
  - timeline
  - countdown
---
# Timeline View

## Overview

The timeline view provides a chronological list of TODOs organized by date.

## Access
Select "Timeline" from the header navigation

## Display Features

  - Chronological list displaying all TODOs grouped by date
  - "Jump to Today" button to jump to current date grouping
  - The view shows all TODOs across all dates

**TODO Date Grouping**

Each date group shows the following:

- Date header (e.g., "Monday, January 12, 2026")
- List of TODOs for that date sorted chronologically by due date
- "Complete Day" button for dates that are not marked as completed and have TODOs
- Completed days show lock icons on the right and a "Day Completed" caption

**Single TODO Information**

Each TODO displays:

- Title
- Description
- Due date/time
    - Format eg. "Due: Jan 12, 2026 at 12:30 PM"
- Real-time countdown timer
    - Updated every second
    - Present for all TODO items including those in completed days
    - Format e.g. 7h 51m 55s
    - For overdue items the remaining time is prefixed with "Overdue by"
- Completion status checkbox (disabled for completed sections) that can be toggled
- [Update button](actions/update-todo.md)
- [Delete button](actions/delete-todo.md)

Color-coding of urgency is used as card left border color as well as color of the countdown timer:

- **Green** for more than 24 hours remaining
- **Yellow** for less than 24 hours remaining
- **Red** for overdue

Completed TODO item rows are grayed out and the title is struck-through
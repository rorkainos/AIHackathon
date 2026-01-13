---
tags:
  - todo
---
# Read Todo

## Overview

Reading todos allows users to view their existing tasks in different organized views with real-time countdown information.

## Process

1. User selects Calendar or Timeline view from the header
2. **Calendar View**: Monthly grid shows the number of TODOs per day, navigation between months, and a shortcut to today
3. User switches to **Timeline View** to see the actual TODO list grouped by date, with a shortcut to today (if today exists in the timeline)
4. In Timeline View, each TODO displays:
   - Title and description
   - Due date/time
   - Real-time countdown timer (days, hours, minutes, seconds)
  - Color-coded urgency: green (24+ hours remaining), yellow (<24 hours), red (<1 hour), red (overdue)
   - Completion status (checkbox)
5. Completed days show lock icons and prevent modifications

## Business Rules

- TODOs are retrieved from localStorage
- Countdown timers update every second
- Completed TODOs are visually grayed out
- Completed days lock all TODOs for that day (no add/edit/delete/toggle)
- Calendar shows badges with TODO counts per day
- Timeline groups TODOs by date for easy scanning
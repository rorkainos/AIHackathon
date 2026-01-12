---
tags:
  - todo
---
# Read Todo

## Overview

Reading todos allows users to view their existing tasks in different organized views with real-time countdown information.

## Process

1. User selects Calendar or Timeline view from the header
2. **Calendar View**: Monthly grid shows TODO counts per day, navigation between months, jump to today
3. **Timeline View**: Chronological list of all TODOs grouped by date, jump to today button
4. Each TODO displays:
   - Title and description
   - Due date/time
   - Real-time countdown timer (days, hours, minutes, seconds)
   - Color-coded urgency: green (>1hr), yellow (<1hr), red (overdue)
   - Completion status (checkbox)
5. Completed days show lock icons and prevent modifications

## Business Rules

- TODOs are retrieved from localStorage
- Countdown timers update every second
- Completed TODOs are visually grayed out
- Completed days lock all TODOs for that day (no add/edit/delete)
- Calendar shows badges with TODO counts per day
- Timeline groups TODOs by date for easy scanning
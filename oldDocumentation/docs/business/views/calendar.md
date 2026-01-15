---
tags:
  - view
  - calendar
---
# Calendar View

## Overview

The calendar view provides a monthly grid interface for visualizing TODOs organized by date

## Access
Select "Calendar" from the header navigation

## Display Features

- Calendar shows one month at a time with navigation controls allowing users to change months:
    - "Today" button to jump to current month
    - "Prev" button to jump to previous month
    - "Next" button to jump to next month

- Day cells showing date numbers
- Badge indicators with TODO counts per day (blue background regardless of TODO status)
- Completed days are highlighted with yellow background and a lock icon below the day number
- Incomplete days have white background
- Days falling outside of the currently viewed month are grayed out

## Interaction

- Hovering over a date changes the date background and card border to blue for both completed and incomplete dates
- Clicking on a date shows TODOs for that date in a Timeline view

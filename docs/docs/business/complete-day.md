---
tags:
  - complete_day
---
# Complete Day

## Overview

Completing a day allows users to archive all TODOs for a specific date and lock the day to prevent further modifications.

## Process

1. User views TODOs for a day in Timeline view
2. User clicks the "Complete Day" button at the bottom
3. System shows confirmation dialog listing all TODOs for the day
4. User confirms completion
5. System creates a CompletedDay record with the date and TODO IDs
6. Day is marked as locked with visual indicators
7. All TODOs for the day remain visible but cannot be modified

## Business Rules

- Only days with existing TODOs can be completed
- Completion archives all TODOs for that date
- Completed days show lock icons in calendar/timeline
- No new TODOs can be added to completed days
- Existing TODOs on completed days cannot be edited or deleted
- TODOs remain visible for reference
- Completion can be done multiple times (overwrites previous completion)
- Completed day records are stored in localStorage
---
tags:
  - lock
  - timeline
---
# Complete Day

## Overview

Completing a day allows users to archive all TODOs for a specific date and lock the day to prevent further modifications.

## Process

1. User views TODOs for a day in Timeline view
2. User clicks the "Complete Day" button displayed below the list of TODOs for a given date
3. System shows confirmation dialog listing all TODOs for the day
4. User confirms completion or cancels the action
5. System creates a completed day record with the date and TODO IDs
6. Day is marked as locked with visual indicators: a lock icon and "Day Completed" message
7. All TODOs for the day remain visible but cannot be modified

## Business Rules

- Only days with existing TODOs can be completed
- Completion archives all TODOs for that date
- Completed days show lock icons in calendar and timeline view
- No new TODOs can be added to completed days
- Existing TODOs on completed days cannot be edited or deleted - the edit and delete buttons are not displayed
- Existign TODOs on completed days cannot be marked as completed - the checkbox is disabled
- TODOs remain visible for reference
- Completed day records are stored in localStorage
- Each day can be marked as completed without exception
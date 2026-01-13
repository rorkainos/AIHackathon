---
tags:
  - todo
---
# Update Todo

## Overview

Updating a todo allows users to modify existing tasks, including marking them as complete.

## Process

1. User switches to Timeline view
2. User clicks the "Edit" button on the TODO
3. User modifies title, description, or due date/time
4. User clicks "Update TODO"
5. System validates that the original day is not completed (locked)
6. If changing due date, validates that the new date is not completed
7. TODO is updated in localStorage with new timestamp
8. User can also toggle completion by checking/unchecking the checkbox (only when the day is not locked)

## Business Rules

- Cannot edit TODOs from completed (locked) days
- Cannot move TODOs to completed (locked) days
- Title is required and cannot be empty
- Description is optional
- Due date/time can be changed
- Completion status can be toggled unless the TODO's day is completed (locked)
- Updates are persisted to localStorage with updatedAt timestamp
- Changes are reflected immediately in all views
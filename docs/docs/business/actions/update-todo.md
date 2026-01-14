---
tags:
  - todo
  - timeline
---
# Update Todo

## Overview

Updating a TODO allows users to modify existing tasks, including marking them as complete.

## Process

1. User finds the TODO in Timeline view
2. User clicks the "Edit" button on the TODO
3. User modifies title, description, or due date/time
4. User clicks "Update TODO"
5. System validates that the original day is not completed (locked)
6. If changing due date, validates that the new date is not completed
7. TODO is updated in localStorage with new timestamp
8. User can also toggle completion by checking/unchecking the checkbox

## Business Rules

- It is not possible to edit TODOs from completed (locked) days
- It is not possible to move TODOs to completed (locked) days
- Title cannot be changed to an empty string
- Description is optional
- Due date/time can be changed
- Updates are persisted to localStorage with updatedAt timestamp
- Changes are reflected immediately in all views
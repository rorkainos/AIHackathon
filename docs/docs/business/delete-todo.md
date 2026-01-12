---
tags:
  - todo
---
# Delete Todo

## Overview

Deleting a todo removes it permanently from the user's list.

## Process

1. User finds the TODO in Calendar or Timeline view
2. User clicks the "Delete" button on the TODO
3. System shows confirmation dialog
4. User confirms deletion
5. System validates that the TODO's day is not completed (locked)
6. TODO is removed from localStorage
7. TODO disappears from all views

## Business Rules

- Cannot delete TODOs from completed (locked) days
- Deletion requires user confirmation
- Deletion is permanent and cannot be undone
- Removed TODOs are immediately deleted from localStorage
- Changes are reflected immediately in all views
---
tags:
  - todo
---
# Create Todo

## Overview

Creating a new todo item allows users to add tasks to their list with a specific due date and time.

## Process

1. User clicks the "+ Add TODO" button in the top right
2. User enters the todo title (required)
3. User adds an optional description
4. User selects the due date and time
5. User clicks "Add TODO"
6. System validates that the due date is not on a completed (locked) day
7. Todo is saved to localStorage with a unique ID and timestamps
8. User receives visual confirmation and the todo appears in the current view

## Business Rules

- Title is required and cannot be empty
- Description is optional
- Due date and time are required
- Cannot add TODOs to days that have been marked as completed
- TODOs are stored locally in the browser using localStorage
- Each TODO gets a unique UUID and creation/update timestamps
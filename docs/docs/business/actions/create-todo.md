---
tags:
  - todo
  - new
  - timeline
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
7. Todo is saved to localStorage with a unique ID and timestamp
8. User receives visual confirmation and the todo appears in the current view

## Business Rules

- Title is required and cannot be empty
- If title is empty a validation message appears above the form in the popup  "Title is required"
- Description is optional
- Due date and time are required
- If due date and time are not provied a validation message appears above the form in the popup "Due date and time are required"
- The default due date is today and default time is current time in the date picker
- The due date and time can be typed within the text box or selected using a calendar date picker control
- Cannot add TODOs to days that have been marked as completed
- TODOs are stored locally in the browser using localStorage
- Each TODO gets a unique UUID and creation/update timestamps
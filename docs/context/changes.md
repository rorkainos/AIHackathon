# Changes Documentation

## Comparison Details

- **Branch**: `origin/mkdocs`
- **Latest Commit**: `9037a58e661b1b4f26badd8f70eb7f8d85a69566`
- **Generated**: 2026-01-12 15:20:23

---

## Latest Commit Hash

```
9037a58e661b1b4f26badd8f70eb7f8d85a69566
```

---

## Summary

**Total commits**: 1

## Changed Files

- 📝 **Modified**: `README.md`
- ✅ **Added**: `docs/docs/business/complete-day.md`
- ✅ **Added**: `docs/docs/business/create-todo.md`
- ✅ **Added**: `docs/docs/business/delete-todo.md`
- ✅ **Added**: `docs/docs/business/index.md`
- ✅ **Added**: `docs/docs/business/read-todo.md`
- ✅ **Added**: `docs/docs/business/update-todo.md`
- ✅ **Added**: `docs/docs/tags.md`
- ✅ **Added**: `docs/docs/technical/index.md`
- ✅ **Added**: `docs/mkdocs.yml`

## Detailed Changes

```diff
diff --git a/README.md b/README.md
index db1e2c8..1d76e12 100644
--- a/README.md
+++ b/README.md
@@ -40,16 +40,18 @@ A modern, feature-rich TODO application built with React, TypeScript, and Tailwi
 - **State Management:** Zustand (with localStorage persistence)
 - **Styling:** Tailwind CSS
 - **Date Handling:** date-fns
+- **Documentation:** MkDocs with Material theme
 
 ## Getting Started
 
 ### Prerequisites
 - Node.js 18+ and npm
+- Python and pip (for MkDocs documentation)
 
 ### Installation
 
 ```bash
-# Install dependencies
+# Install Node.js dependencies
 npm install
 
 # Start development server
@@ -118,6 +120,43 @@ Each TODO displays a real-time countdown showing:
 
 Format: `2d 5h 30m 15s` or `Overdue by 1h 20m`
 
+## Documentation
+
+This project uses MkDocs to generate static documentation. We are using the Material theme for a modern look.
+
+### MkDocs Installation
+
+To install the documentation run the following command:
+```bash
+pip install mkdocs mkdocs-material
+```
+
+### Running the Documentation Server
+
+To preview the documentation locally:
+
+```bash
+cd docs
+mkdocs serve
+```
+
+The documentation will be available at `http://127.0.0.1:8000/`
+
+### Building the Documentation
+
+To build the static site:
+
+```bash
+cd docs
+mkdocs build
+```
+
+The built site will be in the `docs/site` directory.
+
+### Deploying the Documentation
+
+Upload the contents of the `docs/site` directory to your web hosting service.
+
 ## Data Storage
 
 All data is stored locally in your browser using localStorage:
@@ -139,19 +178,24 @@ All data is stored locally in your browser using localStorage:
 ## Project Structure
 
 ```
+docs/                 # MkDocs documentation
+├── mkdocs.yml        # MkDocs configuration
+└── docs/             # Documentation source files
+    ├── technical/    # Technical docs
+    └── business/     # Business docs
 src/
-├── components/           # React components
-│   ├── layout/          # Header, Layout wrapper
-│   ├── todo/            # TODO form, item, list, timer
-│   ├── calendar/        # Calendar view
-│   ├── timeline/        # Timeline view
-│   └── common/          # Reusable: Button, Modal, Dialog
-├── store/               # Zustand state management
-├── types/               # TypeScript interfaces
-├── utils/               # Date, countdown utilities
-├── hooks/               # Custom React hooks
-├── App.tsx              # Main app component
-└── main.tsx             # Entry point
+├── components/       # React components
+│   ├── layout/       # Header, Layout wrapper
+│   ├── todo/         # TODO form, item, list, timer
+│   ├── calendar/     # Calendar view
+│   ├── timeline/     # Timeline view
+│   └── common/       # Reusable: Button, Modal, Dialog
+├── store/            # Zustand state management
+├── types/            # TypeScript interfaces
+├── utils/            # Date, countdown utilities
+├── hooks/            # Custom React hooks
+├── App.tsx           # Main app component
+└── main.tsx          # Entry point
 ```
 
 ## Performance
diff --git a/docs/docs/business/complete-day.md b/docs/docs/business/complete-day.md
new file mode 100644
index 0000000..d749dfd
--- /dev/null
+++ b/docs/docs/business/complete-day.md
@@ -0,0 +1,30 @@
+---
+tags:
+  - complete_day
+---
+# Complete Day
+
+## Overview
+
+Completing a day allows users to archive all TODOs for a specific date and lock the day to prevent further modifications.
+
+## Process
+
+1. User views TODOs for a day in Timeline view
+2. User clicks the "Complete Day" button at the bottom
+3. System shows confirmation dialog listing all TODOs for the day
+4. User confirms completion
+5. System creates a CompletedDay record with the date and TODO IDs
+6. Day is marked as locked with visual indicators
+7. All TODOs for the day remain visible but cannot be modified
+
+## Business Rules
+
+- Only days with existing TODOs can be completed
+- Completion archives all TODOs for that date
+- Completed days show lock icons in calendar/timeline
+- No new TODOs can be added to completed days
+- Existing TODOs on completed days cannot be edited or deleted
+- TODOs remain visible for reference
+- Completion can be done multiple times (overwrites previous completion)
+- Completed day records are stored in localStorage
\ No newline at end of file
diff --git a/docs/docs/business/create-todo.md b/docs/docs/business/create-todo.md
new file mode 100644
index 0000000..dab2c98
--- /dev/null
+++ b/docs/docs/business/create-todo.md
@@ -0,0 +1,29 @@
+---
+tags:
+  - todo
+---
+# Create Todo
+
+## Overview
+
+Creating a new todo item allows users to add tasks to their list with a specific due date and time.
+
+## Process
+
+1. User clicks the "+ Add TODO" button in the top right
+2. User enters the todo title (required)
+3. User adds an optional description
+4. User selects the due date and time
+5. User clicks "Add TODO"
+6. System validates that the due date is not on a completed (locked) day
+7. Todo is saved to localStorage with a unique ID and timestamps
+8. User receives visual confirmation and the todo appears in the current view
+
+## Business Rules
+
+- Title is required and cannot be empty
+- Description is optional
+- Due date and time are required
+- Cannot add TODOs to days that have been marked as completed
+- TODOs are stored locally in the browser using localStorage
+- Each TODO gets a unique UUID and creation/update timestamps
\ No newline at end of file
diff --git a/docs/docs/business/delete-todo.md b/docs/docs/business/delete-todo.md
new file mode 100644
index 0000000..33d0aba
--- /dev/null
+++ b/docs/docs/business/delete-todo.md
@@ -0,0 +1,27 @@
+---
+tags:
+  - todo
+---
+# Delete Todo
+
+## Overview
+
+Deleting a todo removes it permanently from the user's list.
+
+## Process
+
+1. User finds the TODO in Calendar or Timeline view
+2. User clicks the "Delete" button on the TODO
+3. System shows confirmation dialog
+4. User confirms deletion
+5. System validates that the TODO's day is not completed (locked)
+6. TODO is removed from localStorage
+7. TODO disappears from all views
+
+## Business Rules
+
+- Cannot delete TODOs from completed (locked) days
+- Deletion requires user confirmation
+- Deletion is permanent and cannot be undone
+- Removed TODOs are immediately deleted from localStorage
+- Changes are reflected immediately in all views
\ No newline at end of file
diff --git a/docs/docs/business/index.md b/docs/docs/business/index.md
new file mode 100644
index 0000000..cbb6602
--- /dev/null
+++ b/docs/docs/business/index.md
@@ -0,0 +1,23 @@
+---
+tags:
+  - actions
+---
+# Business Documentation
+
+This section contains business documentation for the Todo App.
+
+The Todo App allows users to manage their tasks effectively with features including:
+
+- Creating, reading, updating, and deleting TODOs with due dates and times
+- Real-time countdown timers showing time until due
+- Calendar and timeline views for organizing tasks
+- Completing entire days to lock and archive TODOs
+- Local storage persistence in the browser
+
+## Documentation Pages
+
+- [Create Todo](create-todo.md) - Process for adding new TODOs
+- [Read Todo](read-todo.md) - Viewing TODOs in calendar and timeline views
+- [Update Todo](update-todo.md) - Modifying existing TODOs
+- [Delete Todo](delete-todo.md) - Removing TODOs permanently
+- [Complete Day](complete-day.md) - Archiving and locking days
\ No newline at end of file
diff --git a/docs/docs/business/read-todo.md b/docs/docs/business/read-todo.md
new file mode 100644
index 0000000..6881d15
--- /dev/null
+++ b/docs/docs/business/read-todo.md
@@ -0,0 +1,31 @@
+---
+tags:
+  - todo
+---
+# Read Todo
+
+## Overview
+
+Reading todos allows users to view their existing tasks in different organized views with real-time countdown information.
+
+## Process
+
+1. User selects Calendar or Timeline view from the header
+2. **Calendar View**: Monthly grid shows TODO counts per day, navigation between months, jump to today
+3. **Timeline View**: Chronological list of all TODOs grouped by date, jump to today button
+4. Each TODO displays:
+   - Title and description
+   - Due date/time
+   - Real-time countdown timer (days, hours, minutes, seconds)
+   - Color-coded urgency: green (>1hr), yellow (<1hr), red (overdue)
+   - Completion status (checkbox)
+5. Completed days show lock icons and prevent modifications
+
+## Business Rules
+
+- TODOs are retrieved from localStorage
+- Countdown timers update every second
+- Completed TODOs are visually grayed out
+- Completed days lock all TODOs for that day (no add/edit/delete)
+- Calendar shows badges with TODO counts per day
+- Timeline groups TODOs by date for easy scanning
\ No newline at end of file
diff --git a/docs/docs/business/update-todo.md b/docs/docs/business/update-todo.md
new file mode 100644
index 0000000..0c148b8
--- /dev/null
+++ b/docs/docs/business/update-todo.md
@@ -0,0 +1,31 @@
+---
+tags:
+  - todo
+---
+# Update Todo
+
+## Overview
+
+Updating a todo allows users to modify existing tasks, including marking them as complete.
+
+## Process
+
+1. User finds the TODO in Calendar or Timeline view
+2. User clicks the "Edit" button on the TODO
+3. User modifies title, description, or due date/time
+4. User clicks "Update TODO"
+5. System validates that the original day is not completed (locked)
+6. If changing due date, validates that the new date is not completed
+7. TODO is updated in localStorage with new timestamp
+8. User can also toggle completion by checking/unchecking the checkbox
+
+## Business Rules
+
+- Cannot edit TODOs from completed (locked) days
+- Cannot move TODOs to completed (locked) days
+- Title is required and cannot be empty
+- Description is optional
+- Due date/time can be changed
+- Completion status can be toggled at any time
+- Updates are persisted to localStorage with updatedAt timestamp
+- Changes are reflected immediately in all views
\ No newline at end of file
diff --git a/docs/docs/tags.md b/docs/docs/tags.md
new file mode 100644
index 0000000..3b49781
--- /dev/null
+++ b/docs/docs/tags.md
@@ -0,0 +1,5 @@
+# Tags
+
+Following is a list of relevant tags:
+
+<!-- material/tags -->
\ No newline at end of file
diff --git a/docs/docs/technical/index.md b/docs/docs/technical/index.md
new file mode 100644
index 0000000..f352a09
--- /dev/null
+++ b/docs/docs/technical/index.md
@@ -0,0 +1,5 @@
+# Technical Documentation
+
+This section contains technical documentation for the Todo App.
+
+The Todo App is built using modern web technologies.
\ No newline at end of file
diff --git a/docs/mkdocs.yml b/docs/mkdocs.yml
new file mode 100644
index 0000000..03d6093
--- /dev/null
+++ b/docs/mkdocs.yml
@@ -0,0 +1,17 @@
+site_name: Todo App Hackathon
+theme:
+  name: material
+plugins:
+  - tags
+nav:
+  - Technical Documentation:
+      - Overview: technical/index.md
+  - Business Documentation:
+      - Overview: business/index.md
+      - Todo Actions:
+          - Create Todo: business/create-todo.md
+          - Read Todo: business/read-todo.md
+          - Update Todo: business/update-todo.md
+          - Delete Todo: business/delete-todo.md
+          - Complete Day: business/complete-day.md
+  - Tags: tags.md
\ No newline at end of file
```

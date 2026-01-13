# Business Data Model

This section documents the business-facing data entities managed by the system.

## Entity: TODO

| Field | Description |
| --- | --- |
| Entity Name | TODO |
| Business Purpose | Represents a user’s commitment to perform a task by a specific due date and time |
| Entity Type | Transaction |
| Primary Identifier | System-generated unique identifier |
| Key Attributes | Title (required), Description (optional), Due date/time (required), Completion flag |
| Relationships | Belongs to a due-date (used for grouping); can be associated with a completed day (by date and identifier reference) |
| Lifecycle States | Active (incomplete), Completed (checked), Locked (when its due date is a completed day) |
| Created By | User |
| Updated By | User |
| Retention / Deletion | Retained until deleted by user; deletion is permanent within the app |
| Sensitivity | User-provided content; may contain personal or confidential information depending on what the user enters |

## Entity: Completed Day

| Field | Description |
| --- | --- |
| Entity Name | Completed Day |
| Business Purpose | Represents “day closure” for a specific calendar date, preventing retroactive changes |
| Entity Type | Audit / Control |
| Primary Identifier | Date (calendar day) |
| Key Attributes | Date, Completion timestamp, List of TODO identifiers present at completion |
| Relationships | References the TODOs present for that date at completion time |
| Lifecycle States | Completed (locked) |
| Created By | User |
| Updated By | Not updated in normal use; a completed day remains locked |
| Retention / Deletion | Retained until user clears local app data; not deleted by normal UI actions |
| Sensitivity | Low (date and identifiers), but may indirectly reveal behavior patterns (work cadence) |

## Supporting concepts (derived)

| Concept | Description |
| --- | --- |
| Day (date) | Used as a grouping key to organize TODOs in the Timeline and counts in the Calendar |
| Urgency level | A derived status computed from the difference between current time and the TODO’s due date/time (normal/warning/urgent/overdue) |

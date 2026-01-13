# Assumptions and Open Questions

This document lists assumptions made while documenting the system and questions to confirm with stakeholders.

## Assumptions (based on observed behavior)

- The system is intended for single-user, personal task management.
- Users do not collaborate or share TODOs.
- “Complete Day” is intentionally irreversible to support day closure.
- Calendar View is intended as an overview rather than a detailed task list.
- Data persistence is local to the user’s environment.

## Known limitations (observed)

- No identity, permissions, or segregation of duties.
- No export/import.
- No audit trail beyond basic timestamps.
- No ability to undo delete or undo day completion.

## Open questions

1. Should selecting a day in Calendar View navigate directly to that day’s section in Timeline View, or filter the timeline to that day?
2. Should “Complete Day” be reversible (e.g., an “Uncomplete Day” action) for mistake recovery?
3. Should users be able to add TODOs directly from a specific date selection (calendar-driven creation)?
4. Should the system support reminders/notifications for upcoming due times?
5. Should there be basic search and filtering (by text, status, date range)?
6. Should there be a formal reporting view (e.g., completed tasks per day/week)?
7. Are there any explicit compliance requirements (retention, export, deletion guarantees) if users store sensitive information in TODO descriptions?

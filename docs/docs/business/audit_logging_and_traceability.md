# Audit Logging and Traceability

This document describes what actions are traceable and what audit evidence is (and is not) available.

## Auditable business actions (limited)

The system supports the following user actions:
- Create TODO
- Update TODO
- Toggle TODO completion
- Delete TODO
- Complete a day (lock)

## What the system records

- Each TODO includes timestamps for when it was created and last updated.
- Each completed day includes a completion timestamp and a list of TODO identifiers present for that date at completion time.

## What the system does not record

- No user identity is captured (no login).
- No full audit trail of changes exists (no before/after history of edits).
- No record of failed attempts (e.g., blocked actions on locked days) is retained.
- No immutable event log exists.

## Traceability implications

- You can generally answer “when was this TODO last changed?” via the last-updated timestamp.
- You cannot reliably reconstruct:
  - Who changed something
  - What the prior values were
  - The sequence of changes over time

## Audit expectations (from Jira)

The available Jira tickets do not contain explicit audit or compliance requirements. Any auditability described here is based on observed system behavior.

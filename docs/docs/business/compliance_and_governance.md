# Compliance, Risk, and Governance

This document summarizes governance and risk considerations based on observed behavior.

## Data sensitivity

- TODO titles and descriptions are user-entered and may contain sensitive information depending on usage.
- The system does not classify or restrict content.

## Access control and identity

- There is no authentication.
- Anyone who can access the app instance in a given browser context can view and change the data in that context.

## Data retention and deletion

- TODOs remain stored until deleted by the user.
- Completed day records remain stored until local app data is cleared.
- Deletion is permanent within the app and there is no undo.

## Security and privacy posture (practical implications)

- Data is stored locally in the user’s environment rather than in a centralized system.
- Users should assume that anyone with access to their device/browser profile may be able to access their TODOs.

## Regulatory considerations

No specific regulatory requirements are indicated by the available documentation or Jira tickets. If this system is used for regulated or personal data, additional controls (identity, access management, audit trails, retention controls, and export/deletion tooling) may be required.

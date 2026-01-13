# Users, Roles, and Permissions

## User Types

### Single User
The application supports a single user type with full access to all functionality. There is no concept of different roles, user accounts, or permission levels.

**Capabilities:**
- Full create, read, update, and delete access to all tasks
- Ability to complete days and lock them from further editing
- Access to all views (calendar and timeline)
- No restrictions on any system functionality

## Permission Model

### Unrestricted Access
All functionality is available to anyone who accesses the application in their browser. There are no:
- Login requirements
- Password protections
- Access controls
- Permission checks

### Self-Imposed Restrictions
The only restrictions are those the user creates for themselves through business rules:
- Once a day is marked as "complete," tasks for that day cannot be modified
- This is a system-enforced rule, not a permission-based restriction

## No Authentication or Authorization

The system does not implement:
- User authentication
- Authorization checks
- Role-based access control
- Multi-user permissions
- Session management

## Business Implications

### Single-Device, Single-Browser Context
- Data is stored per browser, per device
- No user identity tracking
- No ability to access the same tasks from different browsers or devices
- Each browser instance maintains its own independent task list

### No Segregation of Duties
Since there is only one implicit user:
- No approval workflows exist
- No delegation of tasks
- No visibility controls
- No data access restrictions

## Assumptions

The current design assumes:
- The application is used by one person on one device
- No need for data sharing or collaboration
- The user trusts the security of their local device
- Browser storage is sufficient for data protection

---
agent: 'agent'
description: 'Generate GIT commit with documentation update for a jira ticket currenty being developed.'
---

#  Generate documentation commit for a Jira Ticket

You are an assistant that helps developer update or extend business documentation for this project stored in local folder based on the business requirements retrieved from configured sources related to changes being implemented in the jira ticket.

You will first generate updates to the documentation and then after getting confirmation create a git commit with the changes.

## Your Task

1. Identify the ticket number based on the current branch name in the local git repository e.g. DOC-1234 or feature/DOC-1234/something
2. Fetch business requirements for the jira ticket from the defined sources below using the ticket number
3. Analyze the existing documentation in the local folder to identify relevant sections that need to be updated or new documentation that needs to be created based on the fetched business requirements
4. Generate the necessary documentation updates or new documentation content in markdown format
5. Present the generated documentation changes to the user for review and approval
6. Once approved, create a git commit with the changes providing the commit message "TrueDocs_<JIRA_TICKET_KEY>"

## Business Requirement sources

Please fetch business context for the jira ticket from the following sources:
1. The jira ticket description and comments fetched using jira API via local script with the jira ticket key
2. The jira epic description and comments fetched using jira API via local script with the epic key obtained from the previous step output
3. Any additional links or attachments provided to this prompt

The local script can be invoked using: `./scripts/jira/fetch_jira_ticket_details.sh <JIRA_TICKET_KEY>`

## Analysis and Documentation Update Guidelines

When analyzing the existing documentation and generating updates, consider the following guidelines:
- Use `/docs/docs/business/` folder as the source of truth for business documentation
- Use `/docs/mkdocs.yml` and nav -> Business Documentation section to identify the structure and organization of the business documentation
- Use `/docs/docs/tags.md` and Business Documentation Tags section to identify relevant tags to apply to the documentation updates
- Update or create new files in the `/docs/docs/business/` folder only
- Create or update tags in the markdown front matter of the documentation files as needed
- Do not analyse code or technical documentation files
- Ensure that the documentation is clear, concise, and accurately reflects the business requirements and do not contain duplicate information
- Follow existing formatting, style, and structure conventions used in the documentation
- Ensure the documentation is aligned with requirements of MkDocs static site generator

## Presentation of the outcome of the generation

Present the generated documentation changes in a clear, coincise, tubular  format

`| File Path | Change Type | Summary of Changes |`

Where:
- `File Path`: The relative path to the documentation file that was updated or created from the `docs/business` folder
- `Change Type`: Either "Updated" or "Created"
- `Summary of Changes`: A brief description of the changes made to the documentation file e.g. "Added section on user roles", "Updated business rules for task management"
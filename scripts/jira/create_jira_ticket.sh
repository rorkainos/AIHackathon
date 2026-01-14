#!/bin/bash

set -e

# Usage: ./create_jira_ticket.sh "Story Summary" "Story Description" [epic-key]
# Example: ./create_jira_ticket.sh "Add new feature" "This story covers implementation of..." "DOC-1234"

if [ $# -lt 2 ]; then
    echo "Usage: $0 <summary> <description> [epic-key]"
    echo "Example: $0 \"Add new feature\" \"This story covers...\" \"DOC-1234\""
    exit 1
fi

SUMMARY="$1"
DESCRIPTION="$2"
PROJECT_KEY="DOC"
EPIC_KEY="${3:-}"

JIRA_DOMAIN="documentator.atlassian.net"

if [ -z "$TRUEDOCS_JIRA_API_TOKEN" ]; then
    echo "Error: TRUEDOCS_JIRA_API_TOKEN environment variable is not set"
    exit 1
fi

if [ -z "$JIRA_EMAIL" ]; then
    echo "Error: JIRA_EMAIL environment variable is not set"
    exit 1
fi

echo "Creating JIRA Story in project: $PROJECT_KEY"
echo "Summary: $SUMMARY"
if [ -n "$EPIC_KEY" ]; then
    echo "Epic: $EPIC_KEY"
fi
echo ""


json_payload=$(jq -n \
    --arg project "$PROJECT_KEY" \
    --arg summary "$SUMMARY" \
    --arg description "$DESCRIPTION" \
    --arg epic "$EPIC_KEY" \
    '{
        fields: (
            {
                project: { key: $project },
                summary: $summary,
                description: $description,
                issuetype: { name: "Story" }
            } + if $epic != "" then { parent: { key: $epic } } else {} end
        )
    }')

# Create the JIRA issue
jira_response=$(curl --retry 5 --retry-delay 5 --max-time 30 -s -X POST \
    -H "Authorization: Basic $(printf '%s' "$JIRA_EMAIL:$TRUEDOCS_JIRA_API_TOKEN" | base64)" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    "https://$JIRA_DOMAIN/rest/api/2/issue" \
    -d "$json_payload")

echo "$jira_response"
exit;

# Check if the request was successful
if echo "$jira_response" | jq -e '.key' > /dev/null 2>&1; then
    ISSUE_KEY=$(echo "$jira_response" | jq -r '.key')
    ISSUE_ID=$(echo "$jira_response" | jq -r '.id')
    echo "✅ Successfully created JIRA Story"
    echo "Issue Key: $ISSUE_KEY"
    echo "Issue ID: $ISSUE_ID"
    echo "URL: https://$JIRA_DOMAIN/browse/$ISSUE_KEY"
else
    echo "❌ Failed to create JIRA issue"
    echo "Response:"
    echo "$jira_response" | jq '.'
    exit 1
fi

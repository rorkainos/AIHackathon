#!/bin/bash

set -e

# Usage: ./fetch_jira_ticket.sh <ticket-id>
# Example: ./fetch_jira_ticket.sh "DOC-8"

if [ $# -ne 1 ]; then
    echo "Usage: $0 <ticket-id>"
    echo "Example: $0 \"DOC-8\""
    exit 1
fi

TICKET_ID="$1"
JIRA_DOMAIN="documentator.atlassian.net"

if [ -z "$TRUEDOCS_JIRA_API_TOKEN" ]; then
    echo "Error: TRUEDOCS_JIRA_API_TOKEN environment variable is not set"
    exit 1
fi

if [ -z "$JIRA_EMAIL" ]; then
    echo "Error: JIRA_EMAIL environment variable is not set"
    exit 1
fi

echo "Fetching JIRA ticket: $TICKET_ID"
echo ""

# Fetch the JIRA issue
jira_response=$(curl --retry 5 --retry-delay 5 --max-time 30 -s -X GET \
    -H "Authorization: Basic $(printf '%s' "$JIRA_EMAIL:$TRUEDOCS_JIRA_API_TOKEN" | base64)" \
    -H "Accept: application/json" \
    "https://$JIRA_DOMAIN/rest/api/2/issue/$TICKET_ID?expand=comments")

# Check if the request was successful
if echo "$jira_response" | jq -e '.key' > /dev/null 2>&1; then
    SUMMARY=$(echo "$jira_response" | jq -r '.fields.summary')
    DESCRIPTION=$(echo "$jira_response" | jq -r '.fields.description // "No description available"')
    EPIC_KEY=$(echo "$jira_response" | jq -r '.fields.parent.key // empty')
    URL="https://$JIRA_DOMAIN/browse/$TICKET_ID"
    
    # Output JSON
    jq -n \
        --arg ticket_id "$TICKET_ID" \
        --arg title "$SUMMARY" \
        --arg description "$DESCRIPTION" \
        --arg epic "$EPIC_KEY" \
        --arg url "$URL" \
        --argjson comments "$(echo "$jira_response" | jq -c '.fields.comment.comments // []')" \
        '{
            ticket_id: $ticket_id,
            title: $title,
            description: $description,
            url: $url,
            comments: ($comments | map(.body))
        } + if $epic != "" then { epic: $epic } else {} end'
else
    echo '{"error": "Failed to fetch JIRA ticket"}' >&2
    exit 1
fi
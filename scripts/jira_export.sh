#!/bin/bash
set -euo pipefail

# -----------------------------
# Script to export Jira tickets from a specified project into a JSON file.
# Requires JIRA_EMAIL and JIRA_API_TOKEN environment variables to be set.
# Usage: /bin/bash scripts/jira_export.sh

# -----------------------------
# Configuration
# -----------------------------
JIRA_BASE_URL="https://documentator.atlassian.net"
JIRA_PROJECT="TrueDocs"
OUTPUT_FILE="jira/jira_tickets.json"
MAX_RESULTS=100

# -----------------------------
# Helper Functions
# -----------------------------
need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: Missing required command: $1" >&2
    exit 1
  }
}

urlencode() {
  printf '%s' "$1" | jq -sRr @uri
}

# -----------------------------
# Validation
# -----------------------------
need_cmd curl
need_cmd jq
need_cmd git

if [[ -z "${JIRA_EMAIL:-}" ]]; then
  echo "Error: JIRA_EMAIL environment variable is not set" >&2
  echo "Set it with: export JIRA_EMAIL=your-email@example.com" >&2
  exit 1
fi

if [[ -z "${JIRA_API_TOKEN:-}" ]]; then
  echo "Error: JIRA_API_TOKEN environment variable is not set" >&2
  echo "Set it with: export JIRA_API_TOKEN=your-api-token" >&2
  echo "Get your token from: https://id.atlassian.com/manage-profile/security/api-tokens" >&2
  exit 1
fi

# -----------------------------
# Detect Jira API Base
# -----------------------------
echo "Detecting Jira API endpoint..." >&2

detect_jira_base() {
  local candidates=(
    "${JIRA_BASE_URL}/rest/api/3"
    "${JIRA_BASE_URL}/jira/rest/api/3"
  )
  
  for api_base in "${candidates[@]}"; do
    local http_code
    http_code=$(curl -s -o /dev/null -w '%{http_code}' \
      -u "${JIRA_EMAIL}:${JIRA_API_TOKEN}" \
      "${api_base}/myself")
    
    if [[ "$http_code" == "200" ]]; then
      echo "$api_base"
      return 0
    fi
  done
  
  echo "Error: Could not find working Jira API endpoint" >&2
  echo "Tried:" >&2
  printf '  - %s\n' "${candidates[@]}" >&2
  exit 1
}

API_BASE=$(detect_jira_base)
echo "Using API base: $API_BASE" >&2

# -----------------------------
# Detect Issue Key from Branch
# -----------------------------

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)
if [[ -z "$BRANCH_NAME" || "$BRANCH_NAME" == "HEAD" ]]; then
  echo "Error: Could not determine current git branch (detached HEAD?)" >&2
  exit 1
fi

# Expected branch format: {typeOfTask}/{ticketNo}/{description}
# Example: feature/doc-2/add-jira-export
ISSUE_KEY_RAW=""
if [[ "$BRANCH_NAME" =~ ([A-Za-z][A-Za-z0-9]+-[0-9]+) ]]; then
  ISSUE_KEY_RAW="${BASH_REMATCH[1]}"
fi

# Jira keys are typically uppercase (e.g. DOC-2). Normalize only for the request.
ISSUE_KEY=$(printf '%s' "$ISSUE_KEY_RAW" | tr '[:lower:]' '[:upper:]')

if [[ -z "$ISSUE_KEY" ]]; then
  echo "Error: Could not find a Jira issue key in branch name: $BRANCH_NAME" >&2
  echo "Expected something like: feature/doc-2/your-description" >&2
  exit 1
fi

echo "Detected branch: $BRANCH_NAME" >&2
echo "Fetching Jira ticket: $ISSUE_KEY" >&2

# -----------------------------
# Fetch Ticket
# -----------------------------
JQL="key = ${ISSUE_KEY}"

RESPONSE=$(curl -s -w '\n%{http_code}' \
  -u "${JIRA_EMAIL}:${JIRA_API_TOKEN}" \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -X POST \
  -d "{\"jql\":\"${JQL}\",\"maxResults\":1,\"fields\":[\"summary\",\"description\"]}" \
  "${API_BASE}/search/jql")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "Error: Jira API request failed (HTTP $HTTP_CODE)" >&2
  echo "$BODY" | jq -r '.errorMessages[]? // .message? // "Unknown error"' >&2
  exit 1
fi

# -----------------------------
# Process and Save
# -----------------------------
echo "$BODY" | jq '[.issues[] | {
  key: .key,
  title: .fields.summary,
  description: (
    if .fields.description == null then ""
    elif (.fields.description | type) == "string" then .fields.description
    else [.. | .text? // empty] | join(" ")
    end
  )
}]' > "$OUTPUT_FILE"

TICKET_COUNT=$(echo "$BODY" | jq '.issues | length')
echo "✓ Exported $TICKET_COUNT tickets to: $OUTPUT_FILE" >&2

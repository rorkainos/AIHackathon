#!/bin/bash

# Script to generate changes.md comparing an old commit with the latest commit on a branch
# Usage: ./generate-changes.sh <old_commit_hash> <branch>

set -e

# Check if commit hash is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide the old commit hash"
    echo "Usage: $0 <old_commit_hash> <branch>"
    echo "  branch: optional, defaults to origin/main"
    exit 1
fi

OLD_COMMIT=$1
BRANCH=${2:-origin/main}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Get the git root directory
GIT_ROOT=$(git rev-parse --show-toplevel)

# Get the latest commit hash on the specified branch
LATEST_COMMIT=$(git rev-parse $BRANCH)

# Filter path
# FILTER_PATH="lambdas/src"

echo "Generating changes.md..."
echo "Old commit: $OLD_COMMIT"
echo "Branch: $BRANCH"
echo "Latest commit: $LATEST_COMMIT"
# echo "Filtering path: $FILTER_PATH"

# Create the changes.md file
OUTPUT_FILE="$GIT_ROOT/docs/context/changes.md"

# Create directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Write header
cat > $OUTPUT_FILE << EOF
# Changes Documentation

## Comparison Details

- **Branch**: \`$BRANCH\`
- **Latest Commit**: \`$LATEST_COMMIT\`
- **Generated**: $(date "+%Y-%m-%d %H:%M:%S")

---

## Latest Commit Hash

\`\`\`
$LATEST_COMMIT
\`\`\`

---

## Summary

EOF

# Get commit count (for all commits, but we'll only show changes in lambdas/src)
COMMIT_COUNT=$(git rev-list --count $OLD_COMMIT..$LATEST_COMMIT)
echo "**Total commits**: $COMMIT_COUNT" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE


# Get list of changed files
echo "## Changed Files" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
git diff --name-status $OLD_COMMIT $LATEST_COMMIT > /tmp/changed_files.txt
while read status file; do
    case $status in
        A) echo "- ✅ **Added**: \`$file\`" >> $OUTPUT_FILE ;;
        M) echo "- 📝 **Modified**: \`$file\`" >> $OUTPUT_FILE ;;
        D) echo "- ❌ **Deleted**: \`$file\`" >> $OUTPUT_FILE ;;
        R*) echo "- 🔄 **Renamed**: \`$file\`" >> $OUTPUT_FILE ;;
        *) echo "- ⚠️ **$status**: \`$file\`" >> $OUTPUT_FILE ;;
    esac
done < /tmp/changed_files.txt
rm -f /tmp/changed_files.txt
echo "" >> $OUTPUT_FILE

# Get detailed diff
echo "## Detailed Changes" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo '```diff' >> $OUTPUT_FILE

# Get full diff
git diff --no-renames $OLD_COMMIT $LATEST_COMMIT >> $OUTPUT_FILE

echo '```' >> $OUTPUT_FILE

echo "✅ changes.md generated successfully!"

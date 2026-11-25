#!/usr/bin/env bash
set -euo pipefail

api="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID:?}/pages/projects/${CLOUDFLARE_PAGES_PROJECT:?}/deployments"
ids=$(mktemp)
trap 'rm -f "$ids"' EXIT

# Collect every page before deleting, so deletions cannot shift the pagination.
for ((page = 1; ; page++)); do
  response=$(curl --fail --silent --show-error \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN:?}" \
    "${api}?env=preview&per_page=25&page=${page}")
  jq --exit-status '.success' <<< "$response" >/dev/null
  jq --raw-output --arg branch "${PREVIEW_BRANCH:?}" --arg keep "${KEEP_DEPLOYMENT_ID:-}" \
    '.result[] | select(.environment == "preview" and .deployment_trigger.metadata.branch == $branch and .id != $keep) | .id' \
    <<< "$response" >> "$ids"
  pages=$(jq --exit-status '.result_info.total_pages' <<< "$response")
  ((page >= pages)) && break
done

while IFS= read -r id; do
  npx --no-install wrangler pages deployment delete "$id" --project-name "$CLOUDFLARE_PAGES_PROJECT" --force
done < "$ids"

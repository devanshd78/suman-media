#!/bin/sh
set -eu

: "${NEXT_PUBLIC_SANITY_PROJECT_ID:?Set NEXT_PUBLIC_SANITY_PROJECT_ID}"
: "${NEXT_PUBLIC_SANITY_DATASET:?Set NEXT_PUBLIC_SANITY_DATASET}"
: "${NEXT_PUBLIC_SITE_URL:?Set NEXT_PUBLIC_SITE_URL}"

printf '%s\n' "Checking Sanity schema extraction..."
npx sanity schema extract --path /tmp/suman-media-schema.json >/dev/null

printf '%s\n' "Checking Sanity document validation..."
npx sanity documents validate

printf '%s\n' "Current CORS origins:"
npx sanity cors list

printf '%s\n' "Sanity configuration checks completed."

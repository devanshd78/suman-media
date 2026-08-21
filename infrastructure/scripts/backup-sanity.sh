#!/bin/sh
set -eu

DATASET=${NEXT_PUBLIC_SANITY_DATASET:-production}
BACKUP_DIR=${SANITY_BACKUP_DIR:-./backups/sanity}
RETENTION_DAYS=${SANITY_BACKUP_RETENTION_DAYS:-30}
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
DESTINATION="$BACKUP_DIR/${DATASET}_${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"

npx sanity datasets export "$DATASET" "$DESTINATION"
find "$BACKUP_DIR" -type f -name '*.tar.gz' -mtime "+$RETENTION_DAYS" -delete

echo "Sanity backup created: $DESTINATION"

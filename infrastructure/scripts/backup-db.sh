#!/bin/sh
set -eu

ENV_FILE=${ENV_FILE:-.env}
BACKUP_DIR=${BACKUP_DIR:-./backups}
RETENTION_DAYS=${RETENTION_DAYS:-30}
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
COMPOSE_FILE=${COMPOSE_FILE:-docker-compose.production.yml}

if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
DB_NAME=$(docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T postgres printenv POSTGRES_DB)

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T postgres \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' \
  > "$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.dump"

find "$BACKUP_DIR" -type f -name '*.dump' -mtime "+$RETENTION_DAYS" -delete

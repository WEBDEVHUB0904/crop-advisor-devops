#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$ROOT_DIR/backend/.env" ]; then
  echo "backend/.env not found" >&2
  exit 1
fi

set -a
source "$ROOT_DIR/backend/.env"
set +a

required_vars=(
  BREVO_API_KEY
  BREVO_SENDER_EMAIL
  BREVO_SENDER_NAME
  CELERY_BROKER_URL
  CELERY_RESULT_BACKEND
  DB_PASSWORD
  DJANGO_SECRET_KEY
  DJANGO_SUPERUSER_EMAIL
  DJANGO_SUPERUSER_PASSWORD
  GEMINI_API_KEY
)

for var_name in "${required_vars[@]}"; do
  if [ -z "${!var_name:-}" ]; then
    echo "Missing required variable: ${var_name}" >&2
    exit 1
  fi
done

kubectl create secret generic app-secrets \
  --namespace crop-advisor \
  --from-literal=BREVO_API_KEY="$BREVO_API_KEY" \
  --from-literal=BREVO_SENDER_EMAIL="$BREVO_SENDER_EMAIL" \
  --from-literal=BREVO_SENDER_NAME="$BREVO_SENDER_NAME" \
  --from-literal=CELERY_BROKER_URL="$CELERY_BROKER_URL" \
  --from-literal=CELERY_RESULT_BACKEND="$CELERY_RESULT_BACKEND" \
  --from-literal=DB_PASSWORD="$DB_PASSWORD" \
  --from-literal=DJANGO_SECRET_KEY="$DJANGO_SECRET_KEY" \
  --from-literal=DJANGO_SUPERUSER_EMAIL="$DJANGO_SUPERUSER_EMAIL" \
  --from-literal=DJANGO_SUPERUSER_PASSWORD="$DJANGO_SUPERUSER_PASSWORD" \
  --from-literal=GEMINI_API_KEY="$GEMINI_API_KEY" \
  --dry-run=client -o yaml | kubectl apply -f -
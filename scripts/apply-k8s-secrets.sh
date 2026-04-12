#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/backend/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "backend/.env not found" >&2
  exit 1
fi

# Normalize CRLF to LF so sourcing works on Linux even if file came from Windows.
tmp_env_file="$(mktemp)"
trap 'rm -f "$tmp_env_file"' EXIT
sed 's/\r$//' "$ENV_FILE" > "$tmp_env_file"

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
  # Match KEY=... lines and require non-empty value after '='.
  if ! grep -qE "^${var_name}=" "$tmp_env_file"; then
    echo "Missing required variable: ${var_name}" >&2
    exit 1
  fi

  var_value="$(grep -E "^${var_name}=" "$tmp_env_file" | head -n1 | cut -d'=' -f2-)"
  if [ -z "$var_value" ]; then
    echo "Missing required variable: ${var_name}" >&2
    exit 1
  fi
done

kubectl create secret generic app-secrets \
  --namespace crop-advisor \
  --from-env-file="$tmp_env_file" \
  --dry-run=client -o yaml | kubectl apply -f -
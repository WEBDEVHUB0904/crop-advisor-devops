#!/bin/sh
set -e

max_attempts=10
attempt=1

until python manage.py migrate --noinput; do
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "Database migration failed after ${max_attempts} attempts."
    exit 1
  fi

  echo "Database is unavailable, retrying in 5 seconds..."
  attempt=$((attempt + 1))
  sleep 5
done

python manage.py collectstatic --noinput

exec "$@"
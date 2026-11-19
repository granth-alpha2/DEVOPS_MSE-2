#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  POSTGRES_PASSWORD="$(openssl rand -hex 24)"
  JWT_SECRET="$(openssl rand -hex 32)"
  printf '%s\n' \
    "POSTGRES_USER=agriprofit_admin" \
    "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" \
    "POSTGRES_DB=agriprofit" \
    "NEXT_PUBLIC_APP_URL=http://${PUBLIC_IP:-localhost}" \
    "JWT_SECRET=$JWT_SECRET" \
    "GEMINI_API_KEY=" \
    "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=" > .env
  echo "Created .env with generated database and JWT secrets."
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed. Install Docker Engine and Docker Compose Plugin, then rerun."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose is not available. Install the Docker Compose v2 plugin."
  exit 1
fi

docker compose build
PUBLIC_HTTP_PORT=80 docker compose up -d

echo "Waiting for application health..."
for _ in $(seq 1 60); do
  if curl -fsS http://127.0.0.1/api/health >/dev/null 2>&1; then
    echo "Deployment healthy."
    docker compose ps
    exit 0
  fi
  sleep 2
done

echo "Deployment started but /api/health did not become healthy."
docker compose ps
docker compose logs --tail=100
exit 1

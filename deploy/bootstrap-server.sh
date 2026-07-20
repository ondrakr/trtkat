#!/usr/bin/env bash
# One-shot bootstrap on Hetzner: Node, dirs, env from trtkat API secrets.
set -euo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root"
  exit 1
fi

# Node 20 LTS
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

mkdir -p /opt/trtkat-web

HETZNER_ENV=/opt/trtkat/hetzner/.env
if [[ ! -f "$HETZNER_ENV" ]]; then
  echo "Missing $HETZNER_ENV"
  exit 1
fi

# shellcheck disable=SC1090
set -a
source "$HETZNER_ENV"
set +a

ANON="${ANON_KEY:-}"
SERVICE="${SERVICE_ROLE_KEY:-}"
if [[ -z "$ANON" || -z "$SERVICE" ]]; then
  echo "ANON_KEY / SERVICE_ROLE_KEY missing in $HETZNER_ENV"
  exit 1
fi

cat > /opt/trtkat-web/.env <<EOF
HOST=127.0.0.1
PORT=3001
VITE_SITE_URL=https://www.trtkat.cz
VITE_APP_STORE_URL=https://apps.apple.com/app/trtkat/id0000000000
VITE_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=com.trtkat.app
VITE_GA4_MEASUREMENT_ID=G-20QXHN7DCC
VITE_SUPABASE_URL=https://api.trtkat.cz
VITE_SUPABASE_ANON_KEY=${ANON}
SUPABASE_URL=https://api.trtkat.cz
SUPABASE_SERVICE_ROLE_KEY=${SERVICE}
WAITLIST_WEBHOOK_URL=
EOF
chmod 600 /opt/trtkat-web/.env
echo "Wrote /opt/trtkat-web/.env"

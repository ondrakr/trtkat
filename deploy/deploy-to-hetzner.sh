#!/usr/bin/env bash
# Deploy marketing/admin web to Hetzner (/opt/trtkat-web).
# Run from Mac: ./deploy/deploy-to-hetzner.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${HETZNER_HOST:-167.233.32.187}"
SSH_KEY="${HETZNER_SSH_KEY:-$HOME/.ssh/id_ed25519_trtkat}"
REMOTE="/opt/trtkat-web"

SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "root@${HOST}")
RSYNC=(rsync -az --delete
  --exclude node_modules
  --exclude .git
  --exclude dist
  --exclude .env
  --exclude .DS_Store
  -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new"
)

echo "==> Sync code → ${HOST}:${REMOTE}"
"${SSH[@]}" "mkdir -p ${REMOTE}"
"${RSYNC[@]}" "${ROOT}/" "root@${HOST}:${REMOTE}/"

echo "==> Install + build on server"
"${SSH[@]}" "bash -s" <<EOF
set -euo pipefail
cd ${REMOTE}
if [[ ! -f .env ]]; then
  echo "Chybí ${REMOTE}/.env — nejdřív spusť deploy/bootstrap-server.sh"
  exit 1
fi
npm ci
# Vite načte VITE_* z .env samo
npm run build
# Nginx (www-data) musí číst dist; rsync zachová Mac UID → oprav práva
chmod 755 /opt/trtkat-web
chmod -R a+rX /opt/trtkat-web/dist
chown -R root:www-data /opt/trtkat-web/dist
install -m 644 deploy/trtkat-web-api.service /etc/systemd/system/trtkat-web-api.service
install -m 644 deploy/nginx-trtkat.cz.conf /etc/nginx/sites-available/trtkat.cz
ln -sfn /etc/nginx/sites-available/trtkat.cz /etc/nginx/sites-enabled/trtkat.cz
nginx -t
systemctl daemon-reload
systemctl enable --now trtkat-web-api
systemctl restart trtkat-web-api
systemctl reload nginx
sleep 1
curl -sf http://127.0.0.1:3001/api/health
echo
systemctl is-active trtkat-web-api
echo "==> Deploy OK"
EOF

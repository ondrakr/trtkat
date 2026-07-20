#!/usr/bin/env bash
# Volá GitHub Actions přes SSH po rsync kódu do /opt/trtkat-web.
set -euo pipefail

REMOTE="${TRTKAT_WEB_ROOT:-/opt/trtkat-web}"
cd "${REMOTE}"

if [[ ! -f .env ]]; then
  echo "Chybí ${REMOTE}/.env — nejdřív deploy/bootstrap-server.sh"
  exit 1
fi

echo "==> npm ci + build"
npm ci
npm run build

echo "==> permissions"
chmod 755 "${REMOTE}"
chmod -R a+rX "${REMOTE}/dist"
chown -R root:www-data "${REMOTE}/dist"

echo "==> systemd + nginx"
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
echo "==> Web deploy OK"

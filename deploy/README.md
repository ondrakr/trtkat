# Deploy trtkat.cz na Hetzner

Stejný VPS jako app API (`api.trtkat.cz`). Web + admin API → `/opt/trtkat-web`, DB přes `https://api.trtkat.cz`.

## Jednorázově na serveru

```bash
scp -i ~/.ssh/id_ed25519_trtkat deploy/bootstrap-server.sh root@167.233.32.187:/tmp/
ssh -i ~/.ssh/id_ed25519_trtkat root@167.233.32.187 bash /tmp/bootstrap-server.sh
```

## Auto-deploy (GitHub Actions)

Push do `main` → Actions nahraje kód na `/opt/trtkat-web`, `npm ci && build`, restart API + Nginx.

Secrets v `ondrakr/trtkat`: `HETZNER_HOST`, `HETZNER_USER`, `HETZNER_SSH_KEY`  
(stejný CI SSH klíč jako u app repa `hlavaam/trtkat`).

Ručně: Actions → **Deploy Hetzner web** → Run workflow.

## Deploy z Macu

```bash
./deploy/deploy-to-hetzner.sh
```

## DNS

| Záznam | Hodnota |
|--------|---------|
| A `@` | `167.233.32.187` |
| A `www` | `167.233.32.187` |

Po DNS:

```bash
ssh -i ~/.ssh/id_ed25519_trtkat root@167.233.32.187 \
  'certbot --nginx -d www.trtkat.cz -d trtkat.cz --non-interactive --agree-tos -m admin@trtkat.cz --redirect'
```

Pak vypni Vercel projekt.

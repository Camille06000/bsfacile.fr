#!/bin/bash
# ── Deploy BS Facile → VPS 72.60.233.11 ──────────────────
# Usage : bash deploy.sh
# Prérequis : SSH configuré (ssh root@72.60.233.11 fonctionne)

VPS="root@72.60.233.11"
APP_DIR="/var/www/bsfacile"
REPO="https://github.com/Camille06000/bsfacile.fr.git"

echo "🚀 Déploiement BS Facile → $VPS"

ssh $VPS << 'ENDSSH'
  set -e

  # ── 1. Installer Node.js 20 si absent ──
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi

  # ── 2. Installer PM2 si absent ──
  if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
  fi

  # ── 3. Installer nginx si absent ──
  if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
  fi

  # ── 4. Clone ou pull le repo ──
  if [ -d "/var/www/bsfacile/.git" ]; then
    cd /var/www/bsfacile && git pull origin main
  else
    git clone https://github.com/Camille06000/bsfacile.fr.git /var/www/bsfacile
  fi

  # ── 5. Build ──
  cd /var/www/bsfacile
  npm ci --production=false
  npm run build

  # ── 6. (Re)démarrer avec PM2 ──
  pm2 delete bsfacile 2>/dev/null || true
  pm2 start npm --name bsfacile -- start
  pm2 save
  pm2 startup

  echo "✅ App démarrée sur port 3000"
ENDSSH

# ── 7. Configurer nginx ──
echo "📝 Configuration nginx..."
ssh $VPS "cat > /etc/nginx/sites-available/bsfacile << 'NGINX'
server {
    listen 80;
    server_name bsfacile.fr www.bsfacile.fr 72.60.233.11;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/bsfacile /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
echo '✅ Nginx configuré'"

echo ""
echo "✅ Déploiement terminé !"
echo "   → http://72.60.233.11"
echo ""
echo "⚠️  Pour HTTPS avec ton domaine bsfacile.fr :"
echo "   1. Pointer bsfacile.fr → 72.60.233.11 chez ton registrar"
echo "   2. SSH root@72.60.233.11 puis : apt install certbot python3-certbot-nginx -y"
echo "   3. certbot --nginx -d bsfacile.fr -d www.bsfacile.fr"

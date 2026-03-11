#!/bin/bash
set -e

echo "======================================"
echo "  Enabling SSL"
echo "======================================"
echo ""

echo "🔒 Switching proxy to SSL configuration..."
docker compose -f docker-compose.prod.yml cp nginx/nginx.conf proxy:/etc/nginx/nginx.conf
docker compose -f docker-compose.prod.yml exec -T proxy nginx -t

if [ $? -eq 0 ]; then
    docker compose -f docker-compose.prod.yml exec -T proxy nginx -s reload
    echo ""
    echo "======================================"
    echo "  ✅ SSL Enabled!"
    echo "======================================"
    echo ""
    echo "Your sites are now live:"
    echo "  🌐 https://cc.segicaweb.com          (Landing Page)"
    echo "  📊 https://cc-app.segicaweb.com       (Dashboard Marca)"
    echo "  🔧 https://cc-admin.segicaweb.com     (Dashboard Interno)"
    echo ""
    echo "Setup auto-renewal cron (every Monday at 3 AM):"
    echo '  echo "0 3 * * 1 cd $(pwd) && docker compose -f docker-compose.prod.yml run --rm certbot renew && docker compose -f docker-compose.prod.yml exec -T proxy nginx -s reload" | crontab -'
else
    echo "❌ Nginx config test failed! Check nginx/nginx.conf"
    exit 1
fi

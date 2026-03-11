#!/bin/bash
set -e

echo "======================================"
echo "  SSL Certificate Generation"
echo "======================================"
echo ""

DOMAINS=("cc.segicaweb.com" "cc-app.segicaweb.com" "cc-admin.segicaweb.com")
EMAIL="hello@creativecommerce.co"

# Ensure proxy is using init config (HTTP only)
echo "📋 Switching proxy to HTTP-only mode..."
docker compose -f docker-compose.prod.yml exec -T proxy sh -c "cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak || true"
docker compose -f docker-compose.prod.yml cp nginx/nginx-init.conf proxy:/etc/nginx/nginx.conf
docker compose -f docker-compose.prod.yml exec -T proxy nginx -s reload 2>/dev/null || \
docker compose -f docker-compose.prod.yml restart proxy

echo ""
echo "⏳ Waiting for proxy to be ready..."
sleep 5

for domain in "${DOMAINS[@]}"; do
    echo ""
    echo "🔐 Generating certificate for: $domain"
    docker compose -f docker-compose.prod.yml run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        -d "$domain" \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --force-renewal
done

echo ""
echo "======================================"
echo "  ✅ SSL Certificates Generated!"
echo "======================================"
echo ""
echo "Certificates for:"
for domain in "${DOMAINS[@]}"; do
    echo "  ✓ $domain"
done
echo ""
echo "Next step: Run ./scripts/ssl-enable.sh to activate HTTPS"

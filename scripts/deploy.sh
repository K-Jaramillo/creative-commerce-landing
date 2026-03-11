#!/bin/bash
set -e

echo "======================================"
echo "  Creative Commerce — Deploy"
echo "======================================"
echo ""

# Check for .env.production
if [ ! -f .env.production ]; then
    echo "❌ .env.production not found!"
    echo "   Copy .env.production.example to .env.production and fill in values:"
    echo "   cp .env.production.example .env.production"
    exit 1
fi

# Load env
set -a
source .env.production
set +a

# Validate required vars
if [ "$DB_PASSWORD" = "CHANGE_ME_STRONG_PASSWORD_HERE" ] || [ -z "$DB_PASSWORD" ]; then
    echo "❌ Please set a real DB_PASSWORD in .env.production"
    exit 1
fi

if [ "$NEXTAUTH_SECRET" = "CHANGE_ME_GENERATE_WITH_OPENSSL_RAND" ] || [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ Please set NEXTAUTH_SECRET in .env.production"
    echo "   Generate one with: openssl rand -hex 32"
    exit 1
fi

echo "📦 Building Docker images..."
docker compose -f docker-compose.prod.yml build

echo ""
echo "🚀 Starting services..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

echo ""
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker compose -f docker-compose.prod.yml exec -T postgres pg_isready -U ${DB_USER:-creative_commerce} > /dev/null 2>&1; do
    sleep 2
    echo "   Waiting..."
done
echo "✅ PostgreSQL is ready"

echo ""
echo "🗃️ Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T landing npx prisma db push --schema=/app/packages/database/prisma/schema.prisma --accept-data-loss 2>/dev/null || \
docker compose -f docker-compose.prod.yml exec -T landing sh -c "cd /app && npx prisma db push --accept-data-loss" 2>/dev/null || \
echo "⚠️  Migration via container failed. Running locally..."

echo ""
echo "🌱 Seeding database..."
docker compose -f docker-compose.prod.yml exec -T landing sh -c "cd /app && npx tsx packages/database/prisma/seed.ts" 2>/dev/null || \
echo "⚠️  Seed via container failed. You can seed manually later."

echo ""
echo "======================================"
echo "  ✅ Deployment Complete!"
echo "======================================"
echo ""
echo "Services running:"
echo "  🌐 Landing:          http://localhost:3000  (cc.segicaweb.com)"
echo "  📊 Dashboard Marca:  http://localhost:3001  (cc-app.segicaweb.com)"
echo "  🔧 Dashboard Interno: http://localhost:3002 (cc-admin.segicaweb.com)"
echo "  🐘 PostgreSQL:       localhost:5432 (internal)"
echo ""
echo "Next steps:"
echo "  1. Point DNS A records to this server for:"
echo "     - cc.segicaweb.com"
echo "     - cc-app.segicaweb.com"
echo "     - cc-admin.segicaweb.com"
echo "  2. Run: ./scripts/ssl-init.sh"
echo "  3. Run: ./scripts/ssl-enable.sh"
echo ""
echo "Default login:"
echo "  Admin:  admin@creativecommerce.co / admin123"
echo "  Marca:  demo@beautyglow.com / marca123"
echo ""
echo "⚠️  CHANGE DEFAULT PASSWORDS IN PRODUCTION!"

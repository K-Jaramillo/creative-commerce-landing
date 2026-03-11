#!/bin/bash
set -e

echo "======================================"
echo "  Docker Swarm Deploy"
echo "======================================"
echo ""

# Check for .env.production
if [ ! -f .env.production ]; then
    echo "❌ .env.production not found!"
    echo "   cp .env.production.example .env.production"
    exit 1
fi

# Load env
set -a
source .env.production
set +a

# Check if swarm is initialized
if ! docker info --format '{{.Swarm.LocalNodeState}}' 2>/dev/null | grep -q active; then
    echo "⚠️  Docker Swarm not initialized. Initializing..."
    docker swarm init
fi

echo "📦 Building Docker images..."
docker compose -f docker-compose.prod.yml build

echo ""
echo "🚀 Deploying stack to Docker Swarm..."
docker stack deploy -c docker-stack.yml creative-commerce

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

echo ""
echo "📋 Service status:"
docker stack services creative-commerce

echo ""
echo "======================================"
echo "  ✅ Swarm Deployment Complete!"
echo "======================================"
echo ""
echo "Useful commands:"
echo "  docker stack services creative-commerce     — List services"
echo "  docker stack ps creative-commerce            — List tasks"
echo "  docker service logs creative-commerce_landing — View logs"
echo "  docker stack rm creative-commerce             — Remove stack"
echo ""
echo "Next: Configure SSL with ./scripts/ssl-init.sh"

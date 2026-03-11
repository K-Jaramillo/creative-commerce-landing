# Creative Commerce — Sistema de Gestión TikTok Shop

Sistema integral para gestionar el ciclo de vida de marcas clientes y creadores de TikTok Shop.

## Stack

- **Frontend**: Next.js 15 + Tailwind CSS v4 + shadcn/ui
- **Backend**: Next.js API Routes + Prisma ORM
- **Base de datos**: PostgreSQL (Docker)
- **IA Local**: Ollama (Llama 3 / Mistral)
- **Auth**: NextAuth.js (email/contraseña)
- **Monorepo**: Turborepo

## Estructura

```
apps/
  landing/           → Landing page + formulario (puerto 3000)
  dashboard-marca/   → Dashboard para marcas (puerto 3001)
  dashboard-interno/ → Dashboard equipo CC (puerto 3002)

packages/
  database/  → Prisma schema + cliente
  ui/        → Componentes compartidos
  ai/        → Integración con Ollama
  types/     → TypeScript types
```

## Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Levantar servicios (PostgreSQL + Ollama)
```bash
docker compose up -d
```

### 3. Descargar modelo de IA
```bash
docker exec -it cc-ollama ollama pull llama3.2
```

### 4. Configurar base de datos
```bash
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Iniciar desarrollo
```bash
npm run dev
```

Esto levanta las 3 apps simultáneamente:
- Landing: http://localhost:3000
- Dashboard Marca: http://localhost:3001
- Dashboard Interno: http://localhost:3002

## Usuarios de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@creativecommerce.co | admin123 |
| Marca | demo@beautyglow.com | marca123 |

## Flujos principales

1. **Captación**: Marca llena formulario → IA genera plan → Equipo llama en 3 días
2. **Onboarding**: Se crea usuario de marca → Acceso a dashboard → Búsqueda de creadores
3. **Matching**: TikTok API → Algoritmo de compatibilidad → Contacto → Tracking

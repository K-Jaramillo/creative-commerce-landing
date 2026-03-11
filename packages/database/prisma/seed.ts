import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Servicios de Creative Commerce
  const services = [
    {
      name: 'Lanzamiento de TikTok Shop',
      slug: 'lanzamiento-tiktok-shop',
      description: 'Llevamos tu marca de cero a una tienda completamente operativa en aproximadamente 30 días.',
      features: [
        'Registro y configuración completa de TikTok Shop',
        'Diseño del storefront',
        'Optimización de listados de productos',
        'Integración logística y de envíos',
        'Configuración de pagos e impuestos',
        'Páginas de producto optimizadas para conversión',
        'Revisión de cumplimiento y políticas de TikTok Shop',
        'Configuración de categorías restringidas y documentación requerida',
      ],
      sortOrder: 1,
    },
    {
      name: 'Validación de Mercado en TikTok',
      slug: 'validacion-mercado-tiktok',
      description: 'Validamos que tu producto tenga demanda dentro de la plataforma antes de escalar.',
      features: [
        'Envío de producto a creadores seleccionados',
        'Contenido de prueba en múltiples formatos',
        'Primeras colaboraciones con afiliados',
        'Pruebas iniciales de anuncios',
        'Estrategia de precio, bundles y ofertas',
        'Reporte con datos reales de rendimiento y recomendaciones',
      ],
      sortOrder: 2,
    },
    {
      name: 'Red de Creadores Afiliados',
      slug: 'red-creadores-afiliados',
      description: 'Reclutamos, gestionamos y activamos creadores que promocionan tus productos a cambio de comisión.',
      features: [
        'Búsqueda y selección de creadores por categoría y audiencia',
        'Campañas de reclutamiento activas',
        'Envío de productos para contenido',
        'Gestión completa de afiliados',
        'Optimización de comisiones',
        'Seguimiento de rendimiento por creador',
      ],
      sortOrder: 3,
    },
    {
      name: 'Producción de Contenido',
      slug: 'produccion-contenido',
      description: 'Producimos contenido constantemente para probar enfoques creativos y escalar lo que funciona.',
      features: [
        'Videos de producto',
        'Contenido estilo UGC',
        'Colaboraciones con creadores',
        'Clips de transmisiones en vivo',
        'Sistema de pruebas creativas',
        'Derechos de uso del contenido para otras plataformas',
      ],
      sortOrder: 4,
    },
    {
      name: 'Live Shopping',
      slug: 'live-shopping',
      description: 'Transmisiones en vivo donde se muestran productos, se responden preguntas y se ofrecen promociones exclusivas.',
      features: [
        'Hosts bilingües (inglés y español)',
        'Demostraciones de producto en vivo',
        'Guión de ventas en vivo',
        'Ofertas exclusivas y bundles',
        'Interacción directa con la audiencia',
      ],
      sortOrder: 5,
    },
    {
      name: 'Publicidad en TikTok Shop',
      slug: 'publicidad-tiktok-shop',
      description: 'Escalamos productos y contenidos ganadores con anuncios optimizados para ventas reales.',
      features: [
        'Video Shopping Ads',
        'LIVE Shopping Ads',
        'Spark Ads con contenido de creadores (mayor ROI en la plataforma)',
        'GMV Max y campañas Smart+ de TikTok',
        'Pruebas creativas continuas',
        'Optimización de presupuesto y ROAS',
      ],
      sortOrder: 6,
    },
    {
      name: 'Análisis y Optimización',
      slug: 'analisis-optimizacion',
      description: 'Analizamos el rendimiento de cada pieza del sistema para escalar lo que funciona.',
      features: [
        'Seguimiento de ventas totales (GMV) y por canal',
        'ROAS y costo por adquisición (CPA)',
        'Ranking de rendimiento por creador',
        'Puntuación de rendimiento por contenido',
        'Análisis de conversión por producto',
        'Insights de productos y categorías',
        'Reportes con frecuencia definida según tu plan (semanal o mensual)',
        'Sesiones de estrategia con recomendaciones accionables',
      ],
      sortOrder: 7,
    },
    {
      name: 'Gestión de Reseñas y Calificaciones',
      slug: 'gestion-resenas-calificaciones',
      description: 'Gestionamos activamente las calificaciones para mantener tus productos visibles y competitivos.',
      features: [
        'Estrategia para generar reseñas orgánicas',
        'Monitoreo continuo de calificaciones por producto',
        'Respuesta y gestión de feedback negativo',
        'Optimización de listados basada en comentarios de clientes',
        'Alertas de productos con calificaciones en riesgo',
      ],
      sortOrder: 8,
    },
    {
      name: 'Estrategia de Promociones y Eventos de TikTok Shop',
      slug: 'estrategia-promociones-eventos',
      description: 'Aseguramos que tu marca aproveche cada evento promocional de TikTok Shop.',
      features: [
        'Participación estratégica en eventos de TikTok Shop (Super Brand Day, campañas estacionales)',
        'Configuración de Flash Deals y cupones de la plataforma',
        'Creación de bundles y ofertas exclusivas por evento',
        'Calendario promocional alineado con el calendario de TikTok Shop',
        'Coordinación de contenido y transmisiones en vivo durante eventos',
      ],
      sortOrder: 9,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ ${services.length} servicios creados`);

  // Admin user (password: admin123)
  const bcrypt = await import('bcryptjs');
  const adminPasswordHash = await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { email: 'admin@creativecommerce.co' },
    update: {},
    create: {
      email: 'admin@creativecommerce.co',
      passwordHash: adminPasswordHash,
      name: 'Admin Creative Commerce',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user creado (admin@creativecommerce.co / admin123)');

  // Marca de ejemplo
  const demoBrand = await prisma.brand.upsert({
    where: { id: 'demo-brand-001' },
    update: {},
    create: {
      id: 'demo-brand-001',
      name: 'BeautyGlow',
      website: 'https://beautyglow.com',
      industry: 'Belleza y Cuidado Personal',
      activePlanTier: 'GROWTH',
      isActive: true,
    },
  });

  const brandPasswordHash = await bcrypt.hash('marca123', 12);
  await prisma.user.upsert({
    where: { email: 'demo@beautyglow.com' },
    update: {},
    create: {
      email: 'demo@beautyglow.com',
      passwordHash: brandPasswordHash,
      name: 'María González',
      role: 'BRAND',
      brandId: demoBrand.id,
    },
  });
  console.log('✅ Marca demo creada (demo@beautyglow.com / marca123)');

  // Creadores de ejemplo
  const creators = [
    {
      tiktokUsername: 'beauty_elena',
      displayName: 'Elena Rodriguez',
      followers: 250000,
      engagementRate: 4.5,
      averageViews: 50000,
      categories: ['Belleza', 'Cuidado Personal'],
      languages: ['Español', 'Inglés'],
      isInNetwork: true,
    },
    {
      tiktokUsername: 'techreviews_mike',
      displayName: 'Mike Thompson',
      followers: 180000,
      engagementRate: 3.8,
      averageViews: 35000,
      categories: ['Tecnología', 'Gadgets'],
      languages: ['Inglés'],
      isInNetwork: true,
    },
    {
      tiktokUsername: 'hogar_sofia',
      displayName: 'Sofía Martínez',
      followers: 120000,
      engagementRate: 5.2,
      averageViews: 28000,
      categories: ['Hogar', 'Decoración'],
      languages: ['Español'],
      isInNetwork: true,
    },
    {
      tiktokUsername: 'fitness_carlos',
      displayName: 'Carlos Mendez',
      followers: 320000,
      engagementRate: 4.1,
      averageViews: 65000,
      categories: ['Salud', 'Fitness'],
      languages: ['Español', 'Inglés'],
      isInNetwork: true,
    },
    {
      tiktokUsername: 'lifestyle_ana',
      displayName: 'Ana García',
      followers: 95000,
      engagementRate: 6.0,
      averageViews: 22000,
      categories: ['Estilo de Vida', 'Moda'],
      languages: ['Español', 'Inglés'],
      isInNetwork: true,
    },
  ];

  for (const creator of creators) {
    await prisma.creator.upsert({
      where: { tiktokUsername: creator.tiktokUsername },
      update: creator,
      create: creator,
    });
  }
  console.log(`✅ ${creators.length} creadores de ejemplo creados`);

  // Métricas de ejemplo para la marca demo (últimos 30 días)
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const baseGmv = 500 + Math.random() * 1500;

    await prisma.metric.create({
      data: {
        brandId: demoBrand.id,
        date,
        gmv: Math.round(baseGmv * 100) / 100,
        roas: Math.round((2 + Math.random() * 3) * 100) / 100,
        cpa: Math.round((8 + Math.random() * 12) * 100) / 100,
        totalSales: Math.floor(10 + Math.random() * 40),
        affiliateSales: Math.round(baseGmv * 0.4 * 100) / 100,
        liveSales: Math.round(baseGmv * 0.3 * 100) / 100,
        adSales: Math.round(baseGmv * 0.2 * 100) / 100,
        organicSales: Math.round(baseGmv * 0.1 * 100) / 100,
        adSpend: Math.round((100 + Math.random() * 300) * 100) / 100,
        totalViews: Math.floor(5000 + Math.random() * 20000),
        totalOrders: Math.floor(5 + Math.random() * 25),
      },
    });
  }
  console.log('✅ 31 días de métricas de ejemplo creadas');

  // Lead de ejemplo
  await prisma.lead.upsert({
    where: { id: 'demo-lead-001' },
    update: {},
    create: {
      id: 'demo-lead-001',
      brandName: 'NaturVida Supplements',
      website: 'https://naturvida.com',
      industry: 'Salud y Bienestar',
      mainProducts: 'Suplementos naturales, vitaminas, proteínas plant-based',
      alreadyOnTikTok: false,
      monthlySalesVolume: '$50,000 - $100,000/mes',
      mainObjective: 'Lanzar en TikTok Shop por primera vez',
      estimatedBudget: '$3,000 - $5,000/mes',
      hasExistingContent: true,
      contactName: 'Roberto Silva',
      email: 'roberto@naturvida.com',
      phone: '+1 (305) 555-0123',
      howFoundUs: 'Instagram',
      additionalNotes: 'Tenemos presencia en Amazon y Shopify. Queremos expandir a TikTok Shop.',
      status: 'NUEVO',
    },
  });
  console.log('✅ Lead de ejemplo creado');

  console.log('\n🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

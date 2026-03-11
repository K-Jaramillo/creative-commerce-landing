"use client";

import { useState } from "react";

interface Service {
  number: number;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    number: 1,
    title: "Lanzamiento de TikTok Shop",
    description:
      "Llevamos tu marca de cero a una tienda completamente operativa en TikTok Shop, lista para recibir tráfico y generar ventas desde el primer día.",
    features: [
      "Registro y configuración completa",
      "Diseño del storefront",
      "Optimización de listados",
      "Integración logística",
      "Configuración de pagos",
      "Páginas optimizadas para conversión",
      "Revisión de cumplimiento y políticas",
      "Configuración de categorías restringidas",
    ],
  },
  {
    number: 2,
    title: "Validación de Mercado en TikTok",
    description:
      "No todos los productos despegan igual. Validamos tu catálogo con datos reales antes de escalar, para invertir solo en lo que funciona.",
    features: [
      "Envío de producto a creadores",
      "Contenido de prueba",
      "Primeras colaboraciones con afiliados",
      "Pruebas iniciales de anuncios",
      "Estrategia de precio/bundles",
      "Reporte con datos reales",
    ],
  },
  {
    number: 3,
    title: "Red de Creadores Afiliados",
    description:
      "Los creadores son el motor de ventas en TikTok Shop. Construimos y gestionamos tu red de afiliados para generar contenido que convierte.",
    features: [
      "Búsqueda y selección por categoría",
      "Campañas de reclutamiento",
      "Envío de productos",
      "Gestión completa de afiliados",
      "Optimización de comisiones",
      "Seguimiento de rendimiento",
    ],
  },
  {
    number: 4,
    title: "Producción de Contenido",
    description:
      "El crecimiento depende del volumen y la experimentación. Producimos contenido optimizado para TikTok Shop a escala.",
    features: [
      "Videos de producto",
      "Contenido UGC",
      "Colaboraciones con creadores",
      "Clips de lives",
      "Sistema de pruebas creativas",
      "Derechos de uso multiplataforma",
    ],
  },
  {
    number: 5,
    title: "Live Shopping",
    description:
      "El live commerce combina entretenimiento y ventas en tiempo real. Organizamos y ejecutamos lives que generan conversiones.",
    features: [
      "Hosts bilingües",
      "Demostraciones en vivo",
      "Guión de ventas",
      "Ofertas exclusivas",
      "Interacción directa",
    ],
  },
  {
    number: 6,
    title: "Publicidad en TikTok Shop",
    description:
      "Escalamos productos y contenidos ganadores con anuncios diseñados para maximizar ventas dentro de TikTok Shop.",
    features: [
      "Video Shopping Ads",
      "LIVE Shopping Ads",
      "Spark Ads (mayor ROI)",
      "GMV Max/Smart+",
      "Pruebas creativas",
      "Optimización ROAS",
    ],
  },
  {
    number: 7,
    title: "Análisis y Optimización",
    description:
      "Las decisiones se toman con datos. Monitoreamos cada métrica clave para optimizar tu operación continuamente.",
    features: [
      "Seguimiento GMV",
      "ROAS/CPA",
      "Ranking por creador",
      "Puntuación por contenido",
      "Análisis conversión por producto",
      "Insights",
      "Reportes periódicos",
      "Sesiones de estrategia",
    ],
  },
  {
    number: 8,
    title: "Gestión de Reseñas y Calificaciones",
    description:
      "Las calificaciones determinan visibilidad y confianza. Gestionamos tu reputación para mantener un perfil competitivo.",
    features: [
      "Estrategia reseñas orgánicas",
      "Monitoreo continuo",
      "Gestión feedback negativo",
      "Optimización de listados",
      "Alertas de riesgo",
    ],
  },
  {
    number: 9,
    title: "Estrategia de Promociones y Eventos",
    description:
      "TikTok Shop tiene su propio ecosistema de eventos y promociones. Te posicionamos para aprovechar cada oportunidad.",
    features: [
      "Participación en eventos (Super Brand Day)",
      "Flash Deals/cupones",
      "Bundles exclusivos",
      "Calendario promocional",
      "Coordinación de contenido/lives durante eventos",
    ],
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 p-6 text-left cursor-pointer"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
          {service.number}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {service.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {service.description}
          </p>
        </div>

        <svg
          className={`mt-1 size-5 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-6 pb-6 pt-4">
          <ul className="grid gap-2 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-0.5 text-emerald-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="bg-gray-50 py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Qué hacemos
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            La infraestructura completa para vender en TikTok Shop
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Cada servicio está diseñado para resolver un problema específico que
            impide a las marcas generar ventas consistentes en TikTok Shop.
            Juntos, forman un sistema integral de adquisición y conversión.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

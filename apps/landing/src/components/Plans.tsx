interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  tagline: string;
  popular: boolean;
  audience: string;
  liveCommerce: {
    frequency: string;
    duration: string;
    detail: string;
  };
  includesNote: string | null;
  features: PlanFeature[];
  ambassadorNote: string | null;
  idealFor: string;
  result: string;
}

const plans: Plan[] = [
  {
    name: "LAUNCH",
    tagline: "Entra a TikTok Shop",
    popular: false,
    audience: "Para marcas que quieren validar TikTok Shop como canal de ventas.",
    liveCommerce: {
      frequency: "1 transmisión/semana",
      duration: "1‑2 hrs",
      detail: "Fase estratégica de prueba · Rotación de hosts bilingües",
    },
    includesNote: null,
    features: [
      { text: "Configuración completa de tienda" },
      { text: "Revisión de cumplimiento" },
      { text: "Optimización de listados" },
      { text: "Validación de mercado" },
      { text: "Primeras colaboraciones con afiliados" },
      { text: "Producción inicial de contenido" },
      { text: "Gestión inicial de reseñas" },
      { text: "Reporte mensual de rendimiento" },
    ],
    ambassadorNote: null,
    idealFor:
      "Marcas con producto probado que quieren un nuevo canal sin arriesgar mucho.",
    result:
      "En 30 días: tienda operativa + datos reales de rendimiento.",
  },
  {
    name: "GROWTH",
    tagline: "Escala Tus Ventas",
    popular: true,
    audience: "Para marcas listas para acelerar sus ventas en TikTok Shop.",
    liveCommerce: {
      frequency: "3 transmisiones/semana",
      duration: "2‑3 hrs",
      detail: "Rotación estratégica de hosts",
    },
    includesNote: "Incluye todo en Launch más:",
    features: [
      { text: "Expansión de red de creadores" },
      { text: "Producción continua de contenido" },
      { text: "Gestión de anuncios (Video Shopping Ads, Spark Ads, GMV Max)" },
      { text: "Calendario de contenido" },
      { text: "Pruebas creativas A/B" },
      { text: "Optimización de comisiones y bundles" },
      { text: "Participación en eventos de TikTok Shop" },
      { text: "Gestión activa de reseñas" },
      { text: "Análisis semanal (ROAS, CPA, rendimiento por host)" },
    ],
    ambassadorNote: null,
    idealFor:
      "Marcas con ventas existentes que quieren un canal predecible de ingresos.",
    result:
      "Sistema de ventas activo con múltiples fuentes de tráfico.",
  },
  {
    name: "SCALE",
    tagline: "Domina Tu Categoría",
    popular: false,
    audience:
      "Para marcas listas para dominar su categoría con un embajador de marca dedicado.",
    liveCommerce: {
      frequency: "5 transmisiones/semana",
      duration: "3‑4 hrs",
      detail: "Brand Ambassador exclusivo",
    },
    includesNote: "Incluye todo en Growth más:",
    features: [
      { text: "Brand Ambassador exclusivo para tu marca" },
      { text: "Reclutamiento masivo de creadores" },
      { text: "Producción de contenido a volumen" },
      { text: "Escalamiento avanzado de anuncios con objetivo ROAS" },
      { text: "Estrategia de crecimiento semanal" },
      { text: "Calendario completo de eventos" },
      { text: "Gestión integral de reseñas y reputación" },
      { text: "Distribución de contenido multiplataforma" },
      { text: "Derechos de uso de todo el contenido" },
    ],
    ambassadorNote:
      "¿Por qué un embajador dedicado cambia todo? Un Brand Ambassador crea una conexión auténtica con tu audiencia. La lealtad parasocial — esa relación que la audiencia siente con el presentador — convierte espectadores casuales en compradores recurrentes.",
    idealFor:
      "Marcas con presupuesto para dominar su categoría en TikTok Shop.",
    result: "TikTok Shop como canal de ingresos principal.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-gray-900"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isPopular = plan.popular;

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 md:p-8 ${
        isPopular
          ? "relative border-gray-900 bg-white shadow-xl ring-1 ring-gray-900"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1 text-xs font-semibold tracking-wide text-white">
          MÁS POPULAR
        </span>
      )}

      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-400">
          {plan.name}
        </p>
        <h3 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
          {plan.tagline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {plan.audience}
        </p>
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Live Commerce */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-400">
          LIVE COMMERCE
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-900">
          {plan.liveCommerce.frequency}{" "}
          <span className="font-normal text-gray-500">
            · {plan.liveCommerce.duration}
          </span>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {plan.liveCommerce.detail}
        </p>
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Ambassador Note (Scale only) */}
      {plan.ambassadorNote && (
        <>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm leading-relaxed text-gray-600">
              {plan.ambassadorNote}
            </p>
          </div>
          <hr className="my-6 border-gray-100" />
        </>
      )}

      {/* Features */}
      <div className="grow">
        {plan.includesNote && (
          <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400">
            {plan.includesNote}
          </p>
        )}
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5 text-sm text-gray-700">
              <CheckIcon />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Ideal for */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-400">
          IDEAL PARA
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {plan.idealFor}
        </p>
      </div>

      {/* Result */}
      <div className="mt-4">
        <p className="text-xs font-semibold tracking-widest text-gray-400">
          RESULTADO ESPERADO
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-900">
          {plan.result}
        </p>
      </div>

      {/* CTA */}
      <a
        href="#formulario"
        className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
          isPopular
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "border border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white"
        }`}
      >
        Agenda Tu Llamada Estratégica
      </a>
    </div>
  );
}

export default function Plans() {
  return (
    <section id="planes" className="bg-gray-50 px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <div className="text-center">
          <span className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-gray-500">
            Planes
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          Diseñados para generar ingresos — desde el primer mes.
        </h2>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-gray-500 md:text-lg">
          Cada plan está construido en torno a una pregunta simple: ¿dónde está
          tu marca hoy y cuánto quieres vender mañana? Sin contratos a largo
          plazo. Sin sorpresas. Solo un sistema diseñado para crecer contigo.
        </p>

        {/* System description */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h3 className="text-sm font-semibold tracking-wide text-gray-900">
            Qué construimos para tu marca
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Un sistema completo de ventas en TikTok Shop basado en{" "}
            <span className="font-medium text-gray-700">
              contenido optimizado para ventas
            </span>
            ,{" "}
            <span className="font-medium text-gray-700">
              creadores afiliados que promocionan tu producto
            </span>
            ,{" "}
            <span className="font-medium text-gray-700">
              live commerce que convierte audiencia en compradores
            </span>{" "}
            y{" "}
            <span className="font-medium text-gray-700">
              publicidad que amplifica contenido ganador
            </span>
            .
          </p>
        </div>

        {/* Plan cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Custom plan */}
        <p className="mt-14 text-center text-sm leading-relaxed text-gray-500">
          ¿Tu marca necesita algo diferente?{" "}
          <a
            href="#formulario"
            className="font-medium text-gray-900 underline underline-offset-4 hover:no-underline"
          >
            Creamos planes personalizados
          </a>{" "}
          adaptados a tus objetivos y presupuesto.
        </p>
      </div>
    </section>
  );
}

const problems = [
  {
    title: "Creadores",
    description:
      "La mayoría de las ventas en TikTok Shop provienen de creadores que recomiendan productos a su audiencia. La mayoría de las marcas no tiene las relaciones ni la infraestructura para activar cientos de creadores.",
  },
  {
    title: "Contenido nativo",
    description:
      "Los anuncios tradicionales no funcionan en TikTok. El contenido que vende es auténtico, entretenido y creado específicamente para la plataforma.",
  },
  {
    title: "Live commerce",
    description:
      "Las transmisiones en vivo son una de las herramientas de conversión más poderosas, pero requieren talento, producción profesional y estrategia en tiempo real.",
  },
  {
    title: "Complejidad operativa",
    description:
      "Gestionar TikTok Shop implica configurar la tienda, coordinar creadores, producir contenido, gestionar afiliados, optimizar anuncios y manejar logística. No es una tarea secundaria. Es un sistema completo de ventas.",
  },
];

export default function WhyBrandsFail() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <div className="text-center">
          <span className="mb-6 inline-block rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-600">
            El problema
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          TikTok Shop no es solo otro canal de marketing.
        </h2>

        {/* Intro paragraph */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-gray-500 md:text-lg">
          Intentas publicar el mismo tipo de anuncios que usas en Meta o Google.
          No funcionan. Contactas a un par de creadores, pero no responden o no
          generan ventas. Tu equipo ya tiene suficiente trabajo y TikTok Shop
          queda olvidado en una lista de pendientes.
        </p>

        {/* Problem cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

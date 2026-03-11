const pillars = [
  {
    title: "Creadores afiliados",
    description:
      "Reclutamos, gestionamos y escalamos una red de creadores que promocionan tus productos de forma auténtica.",
  },
  {
    title: "Contenido nativo",
    description:
      "Producimos contenido diseñado para TikTok — entretenido, auténtico y optimizado para conversión.",
  },
  {
    title: "Live commerce",
    description:
      "Operamos transmisiones en vivo con hosts profesionales, producción de estudio y estrategia en tiempo real.",
  },
  {
    title: "Publicidad estratégica",
    description:
      "Amplificamos el contenido ganador con campañas de Spark Ads y Shop Ads para maximizar el retorno.",
  },
];

const stats = [
  { value: "62M+", label: "Hispanohablantes en EE.UU." },
  { value: "2x", label: "Alcance potencial" },
  { value: "Menos competencia", label: "" },
  { value: "Más conversión", label: "" },
];

export default function OurSolution() {
  return (
    <section className="bg-black px-6 py-20 text-white md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <div className="text-center">
          <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-300">
            Nuestra solución
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          Convertimos TikTok en un canal predecible de ventas para tu marca.
        </h2>

        {/* Content paragraph */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-gray-400 md:text-lg">
          Creative Commerce opera como el equipo de TikTok Shop de tu marca.
          Nos encargamos de la estrategia, los creadores, el contenido, las
          transmisiones en vivo y la publicidad — para que tú puedas
          concentrarte en tu producto mientras nosotros generamos ventas.
        </p>

        {/* Pillars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <span className="text-gray-400">▸</span>
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bilingual section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            Y lo hacemos en dos idiomas...
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
            Estados Unidos tiene más de 62 millones de hispanohablantes — el
            segundo mercado de habla hispana más grande del mundo. La mayoría de
            las marcas solo crean contenido en inglés, dejando sin atender a una
            audiencia masiva con alto poder adquisitivo. Nosotros producimos y
            operamos en ambos idiomas, duplicando tu alcance desde el primer día.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-5"
            >
              <span className="text-2xl font-bold tracking-tight md:text-3xl">
                {stat.value}
              </span>
              {stat.label && (
                <span className="text-xs text-gray-400 md:text-sm">
                  {stat.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className="mt-16 text-center text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          Una estrategia. Dos mercados enormes. Un solo equipo que lo ejecuta
          todo.
        </p>
      </div>
    </section>
  );
}

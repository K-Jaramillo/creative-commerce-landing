const steps = [
  {
    number: 1,
    title: "Llamada estratégica",
    description:
      "Analizamos tu marca, tus productos y el potencial en TikTok Shop.",
  },
  {
    number: 2,
    title: "Lanzamiento de tienda",
    description:
      "Configuramos tu tienda y optimizamos los productos para conversión.",
  },
  {
    number: 3,
    title: "Activación de creadores",
    description:
      "Los creadores comienzan a promocionar tus productos a través de afiliados.",
  },
  {
    number: 4,
    title: "Contenido y live commerce",
    description:
      "Se publican contenidos y transmisiones en vivo para generar tráfico y ventas.",
  },
  {
    number: 5,
    title: "Escalar",
    description:
      "Los productos y contenidos ganadores se amplifican con publicidad y más creadores.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-3xl">
        {/* Label */}
        <div className="text-center">
          <span className="mb-6 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-500">
            Cómo funciona
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          De la primera llamada a las primeras ventas en 30 días.
        </h2>

        {/* Timeline */}
        <div className="mt-16 space-y-0">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative flex gap-6">
              {/* Vertical line & circle */}
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-900 bg-gray-900 text-sm font-bold text-white">
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px grow bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className={idx < steps.length - 1 ? "pb-10" : "pb-0"}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

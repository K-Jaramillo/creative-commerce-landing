const infrastructure = [
  "Internet de fibra dedicada 1 Gbps",
  "Sistema de respaldo eléctrico UPS",
  "Cámaras profesionales Sony",
  "Iluminación profesional Godox",
  "Micrófonos Shure",
  "Estudio de podcast y contenido",
];

export default function Studio() {
  return (
    <section id="estudio" className="bg-white px-6 py-24 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--cc-accent)]">
          Nuestro estudio
        </p>

        {/* Headline */}
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Diseñado para live commerce.
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
          Creative Commerce opera desde un estudio profesional dedicado a la
          producción de contenido y transmisiones en vivo. Esto nos permite
          producir contenido de alta calidad de forma constante.
        </p>

        {/* Infrastructure grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infrastructure.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5"
            >
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--cc-accent)]" />
              <span className="text-base font-medium text-gray-800">{item}</span>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-gray-500">
          Nuestra infraestructura garantiza que ninguna transmisión en vivo se
          interrumpa — porque una caída técnica en medio de una venta en vivo no
          es solo un problema técnico, es dinero perdido.
        </p>
      </div>
    </section>
  );
}

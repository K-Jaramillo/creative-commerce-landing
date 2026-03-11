export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <a href="#" className="text-lg font-bold tracking-tight">
          CREATIVE<span className="text-gray-400">.</span>COMMERCE
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <li>
            <a href="#servicios" className="hover:text-gray-900 transition-colors">
              Servicios
            </a>
          </li>
          <li>
            <a href="#estudio" className="hover:text-gray-900 transition-colors">
              Estudio
            </a>
          </li>
          <li>
            <a href="#proceso" className="hover:text-gray-900 transition-colors">
              Proceso
            </a>
          </li>
          <li>
            <a href="#planes" className="hover:text-gray-900 transition-colors">
              Paquetes
            </a>
          </li>
        </ul>

        <a
          href="#formulario"
          className="hidden md:inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          Agenda Tu Llamada
        </a>
      </nav>

      {/* Hero content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center md:px-12 lg:px-20">
        {/* Tag */}
        <span className="mb-6 inline-block rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-600">
          Operador de TikTok Shop para marcas de ecommerce (Bilingüe)
        </span>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Mientras lees esto, tus competidores están cerrando ventas en TikTok
          Shop
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
          En Creative Commerce construimos y operamos canales completos de
          ventas en TikTok Shop. Desde la configuración de la tienda hasta
          creadores afiliados, live commerce, producción de contenido y
          publicidad — nos encargamos de todo para convertir TikTok en un motor
          constante de ventas.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#formulario"
            className="inline-flex items-center rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Agenda una llamada estratégica
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Main stat */}
        <div className="mt-16 max-w-3xl">
          <p className="text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl">
            70% de las compras en TikTok Shop comienzan con contenido de
            creadores
          </p>
        </div>

        {/* Support stats */}
        <div className="mt-12 mb-12 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "$15B+", label: "GMV de TikTok Shop en EE.UU." },
            { value: "250%", label: "Crecimiento anual" },
            { value: "62M+", label: "Hispanohablantes en EE.UU." },
            { value: "2x", label: "Alcance potencial con contenido bilingüe" },
          ].map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-5"
            >
              <span className="text-2xl font-bold tracking-tight md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

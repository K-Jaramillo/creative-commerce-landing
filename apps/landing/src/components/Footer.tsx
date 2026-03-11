const bullets = [
  "El potencial de tu marca en TikTok Shop",
  "Estrategia para activar creadores",
  "Un plan claro para lanzar y escalar ventas",
];

const socials = [
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer>
      {/* CTA section */}
      <section className="bg-black px-6 py-24 text-white md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Tus competidores ya están vendiendo en TikTok Shop.
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Agenda una llamada estratégica gratuita. Te mostraremos:
          </p>

          <ul className="mt-8 space-y-4 text-left sm:mx-auto sm:max-w-md">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--cc-accent)]" />
                <span className="text-base text-gray-200">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#formulario"
            className="mt-10 inline-block rounded-full bg-[var(--cc-accent)] px-10 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            Agendar llamada
          </a>
        </div>
      </section>

      {/* Footer bottom */}
      <div className="bg-gray-900 px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Brand */}
          <div>
            <p className="text-base font-semibold text-white">Creative Commerce</p>
            <p className="mt-1 text-sm text-gray-400">
              Agencia de crecimiento TikTok Shop
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-600">|</span>}
                <a href={s.href} className="transition-colors hover:text-white">
                  {s.label}
                </a>
              </span>
            ))}
          </div>

          {/* Email */}
          <a
            href="mailto:hello@creativecommerce.co"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            hello@creativecommerce.co
          </a>
        </div>
      </div>
    </footer>
  );
}

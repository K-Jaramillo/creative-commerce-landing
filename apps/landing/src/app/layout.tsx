import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Creative Commerce | Operador de TikTok Shop para Marcas',
  description:
    'Construimos y operamos canales completos de ventas en TikTok Shop. Creadores afiliados, live commerce, producción de contenido y publicidad — nos encargamos de todo.',
  openGraph: {
    title: 'Creative Commerce | TikTok Shop para Marcas',
    description: 'Convertimos TikTok en un canal predecible de ventas para tu marca.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}

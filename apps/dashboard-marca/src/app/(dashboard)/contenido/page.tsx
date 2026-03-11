export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';

type ContentItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  views: number;
  likes: number;
  sales: number;
};

type LiveStreamItem = {
  id: string;
  hostName: string;
  scheduledAt: Date;
  viewers: number;
  sales: number;
  status: string;
};

const typeLabels: Record<string, string> = {
  VIDEO_PRODUCTO: 'Video Producto',
  UGC: 'UGC',
  CLIP_LIVE: 'Clip Live',
  COLABORACION: 'Colaboración',
};

const statusLabels: Record<string, string> = {
  BORRADOR: 'Borrador',
  PUBLICADO: 'Publicado',
  ARCHIVADO: 'Archivado',
};

const statusColors: Record<string, string> = {
  BORRADOR: 'bg-yellow-100 text-yellow-700',
  PUBLICADO: 'bg-green-100 text-green-700',
  ARCHIVADO: 'bg-gray-100 text-gray-700',
};

const liveStatusLabels: Record<string, string> = {
  PROGRAMADO: 'Programado',
  EN_VIVO: 'En Vivo',
  COMPLETADO: 'Completado',
  CANCELADO: 'Cancelado',
};

const liveStatusColors: Record<string, string> = {
  PROGRAMADO: 'bg-blue-100 text-blue-700',
  EN_VIVO: 'bg-red-100 text-red-700',
  COMPLETADO: 'bg-green-100 text-green-700',
  CANCELADO: 'bg-gray-100 text-gray-700',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}

export default async function ContenidoPage() {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No se encontró tu marca. Contacta al equipo de soporte.</p>
      </div>
    );
  }

  const [content, liveStreams] = await Promise.all([
    prisma.content.findMany({
      where: { brandId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.liveStream.findMany({
      where: { brandId },
      orderBy: { scheduledAt: 'desc' },
    }),
  ]);

  const now = new Date();
  const upcomingLives = liveStreams.filter(
    (l: LiveStreamItem) => new Date(l.scheduledAt) >= now && l.status !== 'CANCELADO'
  );
  const pastLives = liveStreams.filter(
    (l: LiveStreamItem) => new Date(l.scheduledAt) < now || l.status === 'COMPLETADO'
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contenido</h1>
        <p className="mt-1 text-gray-500">Videos, contenido y transmisiones en vivo</p>
      </div>

      {/* Content grid */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Galería de Contenido</h2>
        {content.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Sin contenido aún</h3>
            <p className="mt-2 max-w-md mx-auto text-gray-500">
              Tu contenido aparecerá aquí una vez que comencemos a producir.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.map((item: ContentItem) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Thumbnail placeholder */}
                <div className="flex h-40 items-center justify-center bg-gray-100">
                  <svg
                    className="h-10 w-10 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[item.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {statusLabels[item.status] || item.status}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {typeLabels[item.type] || item.type}
                    </span>
                  </div>
                  <h3 className="truncate font-medium text-gray-900">{item.title}</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-500">
                    <div>
                      <p className="font-medium text-gray-700">{item.views.toLocaleString()}</p>
                      <p>Vistas</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{item.likes.toLocaleString()}</p>
                      <p>Likes</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{item.sales.toLocaleString()}</p>
                      <p>Ventas</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Streams */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Transmisiones en Vivo</h2>

        {liveStreams.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-400">No hay transmisiones en vivo programadas aún.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upcoming */}
            {upcomingLives.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium uppercase text-gray-400">Próximas</h3>
                <div className="space-y-2">
                  {upcomingLives.map((live: LiveStreamItem) => (
                    <div
                      key={live.id}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{live.hostName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(live.scheduledAt).toLocaleDateString('es-MX', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          liveStatusColors[live.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {liveStatusLabels[live.status] || live.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            {pastLives.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium uppercase text-gray-400">Pasadas</h3>
                <div className="space-y-2">
                  {pastLives.map((live: LiveStreamItem) => (
                    <div
                      key={live.id}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{live.hostName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(live.scheduledAt).toLocaleDateString('es-MX', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{live.viewers.toLocaleString()} viewers</span>
                        <span>{formatCurrency(live.sales)}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            liveStatusColors[live.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {liveStatusLabels[live.status] || live.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

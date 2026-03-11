export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';

type CreatorData = {
  displayName: string;
  tiktokUsername: string;
  followers: number;
  engagementRate: number;
  averageViews: number;
};

type MatchData = {
  id: string;
  contactStatus: string;
  commissionRate: number | null;
  creator: CreatorData;
};

const statusLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  CONTACTADO: 'Contactado',
  INTERESADO: 'Interesado',
  ACTIVO: 'Activo',
  RECHAZADO: 'Rechazado',
};

const statusColors: Record<string, string> = {
  PENDIENTE: 'bg-gray-100 text-gray-700',
  CONTACTADO: 'bg-blue-100 text-blue-700',
  INTERESADO: 'bg-yellow-100 text-yellow-700',
  ACTIVO: 'bg-green-100 text-green-700',
  RECHAZADO: 'bg-red-100 text-red-700',
};

export default async function CreadoresPage() {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No se encontró tu marca. Contacta al equipo de soporte.</p>
      </div>
    );
  }

  const matches = await prisma.brandCreatorMatch.findMany({
    where: { brandId },
    include: { creator: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Creadores</h1>
        <p className="mt-1 text-gray-500">Creadores asignados a tu marca</p>
      </div>

      {matches.length === 0 ? (
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
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Sin creadores asignados</h3>
          <p className="mt-2 max-w-md mx-auto text-gray-500">
            Aún no tienes creadores asignados. Nuestro equipo está trabajando en encontrar los
            mejores creadores para tu marca.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match: MatchData) => (
            <div
              key={match.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* Profile pic placeholder */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-400">
                  {match.creator.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900">
                    {match.creator.displayName}
                  </h3>
                  <p className="truncate text-sm text-gray-500">@{match.creator.tiktokUsername}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[match.contactStatus] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {statusLabels[match.contactStatus] || match.contactStatus}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">Seguidores</p>
                  <p className="font-medium text-gray-900">
                    {match.creator.followers.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Engagement</p>
                  <p className="font-medium text-gray-900">
                    {match.creator.engagementRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Vistas Promedio</p>
                  <p className="font-medium text-gray-900">
                    {match.creator.averageViews.toLocaleString()}
                  </p>
                </div>
                {match.commissionRate && (
                  <div>
                    <p className="text-gray-400">Comisión</p>
                    <p className="font-medium text-gray-900">{match.commissionRate}%</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

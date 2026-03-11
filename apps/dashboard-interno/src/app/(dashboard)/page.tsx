export const dynamic = 'force-dynamic';

import { prisma } from '@creative-commerce/database';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  NUEVO: 'bg-blue-100 text-blue-700',
  PLAN_GENERADO: 'bg-purple-100 text-purple-700',
  CONTACTADO: 'bg-yellow-100 text-yellow-700',
  CONVERTIDO: 'bg-green-100 text-green-700',
  DESCARTADO: 'bg-red-100 text-red-700',
};

export default async function DashboardPage() {
  const [totalLeads, newLeads, activeBrands, totalCreators, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NUEVO' } }),
    prisma.brand.count({ where: { isActive: true } }),
    prisma.creator.count({ where: { isInNetwork: true } }),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const stats = [
    { label: 'Total Leads', value: totalLeads, icon: '🎯' },
    { label: 'Leads Nuevos', value: newLeads, icon: '🆕' },
    { label: 'Marcas Activas', value: activeBrands, icon: '🏢' },
    { label: 'Creadores en Red', value: totalCreators, icon: '🎬' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Leads Recientes</h3>
          <Link href="/leads" className="text-sm text-gray-500 hover:text-gray-900 transition">
            Ver todos →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentLeads.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400">
              No hay leads todavía.
            </div>
          ) : (
            recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{lead.brandName}</p>
                  <p className="text-sm text-gray-500">{lead.industry} · {lead.contactName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusColors[lead.status] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {lead.createdAt.toLocaleDateString('es-ES')}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

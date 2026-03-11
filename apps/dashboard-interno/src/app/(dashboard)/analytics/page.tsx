export const dynamic = 'force-dynamic';

import { prisma } from '@creative-commerce/database';

export default async function AnalyticsPage() {
  const [totalGmv, totalLeads, convertedLeads, activeBrands, activeCreators] =
    await Promise.all([
      prisma.metric.aggregate({ _sum: { gmv: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'CONVERTIDO' } }),
      prisma.brand.count({ where: { isActive: true } }),
      prisma.creator.count({ where: { isInNetwork: true } }),
    ]);

  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  const stats = [
    {
      label: 'Total GMV',
      value: `$${(totalGmv._sum.gmv || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: '💰',
      description: 'Suma de GMV de todas las marcas',
    },
    {
      label: 'Total Leads',
      value: totalLeads.toString(),
      icon: '🎯',
      description: 'Leads recibidos en total',
    },
    {
      label: 'Tasa de Conversión',
      value: `${conversionRate}%`,
      icon: '📊',
      description: 'Leads convertidos a marcas',
    },
    {
      label: 'Marcas Activas',
      value: activeBrands.toString(),
      icon: '🏢',
      description: 'Marcas con plan activo',
    },
    {
      label: 'Creadores Activos',
      value: activeCreators.toString(),
      icon: '🎬',
      description: 'Creadores en la red',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';

type MetricRow = {
  id: string;
  gmv: number;
  roas: number;
  cpa: number;
  totalSales: number;
  totalOrders: number;
  totalViews: number;
  adSpend: number;
  date: Date;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}

export default async function MetricasPage() {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No se encontró tu marca. Contacta al equipo de soporte.</p>
      </div>
    );
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const metrics = await prisma.metric.findMany({
    where: {
      brandId,
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: 'desc' },
  });

  const totalGmv = metrics.reduce((sum: number, m: MetricRow) => sum + m.gmv, 0);
  const avgRoas = metrics.length > 0 ? metrics.reduce((sum: number, m: MetricRow) => sum + m.roas, 0) / metrics.length : 0;
  const avgCpa = metrics.length > 0 ? metrics.reduce((sum: number, m: MetricRow) => sum + m.cpa, 0) / metrics.length : 0;
  const totalSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.totalSales, 0);
  const totalOrders = metrics.reduce((sum: number, m: MetricRow) => sum + m.totalOrders, 0);
  const totalViews = metrics.reduce((sum: number, m: MetricRow) => sum + m.totalViews, 0);
  const totalAdSpend = metrics.reduce((sum: number, m: MetricRow) => sum + m.adSpend, 0);

  const last14 = metrics.slice(0, 14);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Métricas Detalladas</h1>
        <p className="mt-1 text-gray-500">Últimos 30 días — datos diarios</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">GMV Total</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(totalGmv)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">ROAS Promedio</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{avgRoas.toFixed(2)}x</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">CPA Promedio</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(avgCpa)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">Ventas</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{totalSales.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">Órdenes</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">Vistas</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-400">Ad Spend</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(totalAdSpend)}</p>
        </div>
      </div>

      {/* Daily metrics table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Métricas Diarias — Últimos 14 días</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 font-medium text-gray-500">Fecha</th>
                <th className="px-6 py-3 font-medium text-gray-500">GMV</th>
                <th className="px-6 py-3 font-medium text-gray-500">ROAS</th>
                <th className="px-6 py-3 font-medium text-gray-500">CPA</th>
                <th className="px-6 py-3 font-medium text-gray-500">Ventas</th>
                <th className="px-6 py-3 font-medium text-gray-500">Órdenes</th>
                <th className="px-6 py-3 font-medium text-gray-500">Vistas</th>
                <th className="px-6 py-3 font-medium text-gray-500">Ad Spend</th>
              </tr>
            </thead>
            <tbody>
              {last14.length > 0 ? (
                last14.map((m: MetricRow) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">
                      {new Date(m.date).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">{formatCurrency(m.gmv)}</td>
                    <td className="px-6 py-3 text-gray-700">{m.roas.toFixed(2)}x</td>
                    <td className="px-6 py-3 text-gray-700">{formatCurrency(m.cpa)}</td>
                    <td className="px-6 py-3 text-gray-700">{m.totalSales.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-700">{m.totalOrders.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-700">{m.totalViews.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-700">{formatCurrency(m.adSpend)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    No hay datos de métricas disponibles aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

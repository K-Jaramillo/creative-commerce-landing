export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';
import { GmvChart } from './gmv-chart';

type MetricRow = {
  gmv: number;
  roas: number;
  cpa: number;
  totalSales: number;
  affiliateSales: number;
  liveSales: number;
  adSales: number;
  organicSales: number;
  date: Date;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No se encontró tu marca. Contacta al equipo de soporte.</p>
      </div>
    );
  }

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
  });

  if (!brand) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">No se encontró tu marca.</p>
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
    orderBy: { date: 'asc' },
  });

  const totalGmv = metrics.reduce((sum: number, m: MetricRow) => sum + m.gmv, 0);
  const avgRoas = metrics.length > 0 ? metrics.reduce((sum: number, m: MetricRow) => sum + m.roas, 0) / metrics.length : 0;
  const avgCpa = metrics.length > 0 ? metrics.reduce((sum: number, m: MetricRow) => sum + m.cpa, 0) / metrics.length : 0;
  const totalSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.totalSales, 0);
  const affiliateSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.affiliateSales, 0);
  const liveSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.liveSales, 0);
  const adSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.adSales, 0);
  const organicSales = metrics.reduce((sum: number, m: MetricRow) => sum + m.organicSales, 0);

  const chartData = metrics.map((m: MetricRow) => ({
    date: new Date(m.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
    gmv: m.gmv,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {brand.name}</h1>
        <p className="mt-1 text-gray-500">Resumen de métricas — últimos 30 días</p>
      </div>

      {/* Top stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">GMV Total</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(totalGmv)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">ROAS Promedio</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{avgRoas.toFixed(2)}x</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">CPA Promedio</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(avgCpa)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Ventas</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales by channel */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Ventas por Canal</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-gray-400">Afiliados</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(affiliateSales)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-gray-400">Live Commerce</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(liveSales)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-gray-400">Publicidad</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(adSales)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-gray-400">Orgánico</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(organicSales)}</p>
          </div>
        </div>
      </div>

      {/* GMV Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">GMV Diario</h2>
        {chartData.length > 0 ? (
          <GmvChart data={chartData} />
        ) : (
          <p className="py-12 text-center text-gray-400">No hay datos de métricas aún.</p>
        )}
      </div>
    </div>
  );
}

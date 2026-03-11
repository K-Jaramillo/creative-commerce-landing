export const dynamic = 'force-dynamic';

import { prisma } from '@creative-commerce/database';
import Link from 'next/link';

const planColors: Record<string, string> = {
  LAUNCH: 'bg-blue-100 text-blue-700',
  GROWTH: 'bg-purple-100 text-purple-700',
  SCALE: 'bg-orange-100 text-orange-700',
};

export default async function MarcasPage() {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { users: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
        <Link
          href="/marcas?action=new"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          + Nueva Marca
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Industria</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Usuarios</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No hay marcas todavía.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{brand.name}</p>
                      {brand.website && (
                        <p className="text-xs text-gray-500 mt-0.5">{brand.website}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{brand.industry}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          planColors[brand.activePlanTier] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {brand.activePlanTier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{brand._count.users}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          brand.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {brand.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-gray-500 hover:text-gray-900 transition">
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

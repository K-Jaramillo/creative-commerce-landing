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

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <span className="text-sm text-gray-500">{leads.length} total</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Industria</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No hay leads todavía.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <Link href={`/leads/${lead.id}`} className="font-medium text-gray-900 hover:underline">
                        {lead.brandName}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{lead.contactName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.industry}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.estimatedBudget}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[lead.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.createdAt.toLocaleDateString('es-ES')}
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

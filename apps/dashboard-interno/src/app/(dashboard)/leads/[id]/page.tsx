export const dynamic = 'force-dynamic';

import { prisma } from '@creative-commerce/database';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LeadStatusForm } from './status-form';

const statusColors: Record<string, string> = {
  NUEVO: 'bg-blue-100 text-blue-700',
  PLAN_GENERADO: 'bg-purple-100 text-purple-700',
  CONTACTADO: 'bg-yellow-100 text-yellow-700',
  CONVERTIDO: 'bg-green-100 text-green-700',
  DESCARTADO: 'bg-red-100 text-red-700',
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { aiPlan: true },
  });

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/leads" className="text-sm text-gray-500 hover:text-gray-900 transition">
            ← Volver a Leads
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{lead.brandName}</h1>
          <p className="text-gray-500">{lead.industry} · {lead.contactName}</p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            statusColors[lead.status] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {lead.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Nombre</p>
                <p className="font-medium text-gray-900">{lead.contactName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{lead.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Teléfono</p>
                <p className="font-medium text-gray-900">{lead.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Cómo nos encontró</p>
                <p className="font-medium text-gray-900">{lead.howFoundUs || '—'}</p>
              </div>
            </div>
          </div>

          {/* Brand Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Información de la Marca</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Sitio Web</p>
                <p className="font-medium text-gray-900">{lead.website}</p>
              </div>
              <div>
                <p className="text-gray-500">Productos Principales</p>
                <p className="font-medium text-gray-900">{lead.mainProducts}</p>
              </div>
              <div>
                <p className="text-gray-500">Volumen de Ventas</p>
                <p className="font-medium text-gray-900">{lead.monthlySalesVolume}</p>
              </div>
              <div>
                <p className="text-gray-500">Presupuesto Estimado</p>
                <p className="font-medium text-gray-900">{lead.estimatedBudget}</p>
              </div>
              <div>
                <p className="text-gray-500">Objetivo Principal</p>
                <p className="font-medium text-gray-900">{lead.mainObjective}</p>
              </div>
              <div>
                <p className="text-gray-500">¿Ya en TikTok?</p>
                <p className="font-medium text-gray-900">{lead.alreadyOnTikTok ? 'Sí' : 'No'}</p>
              </div>
              <div>
                <p className="text-gray-500">¿Contenido existente?</p>
                <p className="font-medium text-gray-900">{lead.hasExistingContent ? 'Sí' : 'No'}</p>
              </div>
            </div>
            {lead.additionalNotes && (
              <div className="mt-4 text-sm">
                <p className="text-gray-500">Notas Adicionales</p>
                <p className="font-medium text-gray-900 mt-1">{lead.additionalNotes}</p>
              </div>
            )}
          </div>

          {/* AI Plan */}
          {lead.aiPlan && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">📋 Plan Generado por IA</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Análisis de Marca</p>
                  <p className="text-gray-800 mt-1 whitespace-pre-wrap">{lead.aiPlan.brandAnalysis}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Plan Recomendado</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {lead.aiPlan.recommendedPlan}
                  </span>
                  <p className="text-gray-800 mt-2">{lead.aiPlan.planJustification}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Servicios Prioritarios</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lead.aiPlan.priorityServices.map((service, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Estrategia de Creadores</p>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Categorías</p>
                      <p className="font-medium text-gray-900">{lead.aiPlan.creatorCategories.join(', ')}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Idiomas</p>
                      <p className="font-medium text-gray-900">{lead.aiPlan.creatorLanguages.join(', ')}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Creadores Estimados</p>
                      <p className="font-medium text-gray-900">{lead.aiPlan.estimatedCreators}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Potencial en TikTok</p>
                  <p className="text-gray-800 mt-1">{lead.aiPlan.tiktokPotential}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Puntos Clave para la Llamada</p>
                  <ul className="mt-2 space-y-1">
                    {lead.aiPlan.keyPointsForCall.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-800">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <LeadStatusForm
            leadId={lead.id}
            currentStatus={lead.status}
            internalNotes={lead.internalNotes || ''}
            callScheduledAt={lead.callScheduledAt?.toISOString().slice(0, 16) || ''}
          />

          {lead.status === 'CONTACTADO' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Acciones</h3>
              <Link
                href={`/marcas?fromLead=${lead.id}`}
                className="block w-full text-center bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Crear Marca
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

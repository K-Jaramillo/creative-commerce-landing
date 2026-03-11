'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['NUEVO', 'PLAN_GENERADO', 'CONTACTADO', 'CONVERTIDO', 'DESCARTADO'] as const;

export function LeadStatusForm({
  leadId,
  currentStatus,
  internalNotes: initialNotes,
  callScheduledAt: initialCallDate,
}: {
  leadId: string;
  currentStatus: string;
  internalNotes: string;
  callScheduledAt: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [internalNotes, setInternalNotes] = useState(initialNotes);
  const [callScheduledAt, setCallScheduledAt] = useState(initialCallDate);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSave() {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          status,
          internalNotes,
          callScheduledAt: callScheduledAt || null,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al actualizar');
      }

      setMessage('Guardado correctamente');
      router.refresh();
    } catch {
      setMessage('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h3 className="font-semibold text-gray-900">Gestión</h3>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Programar Llamada</label>
        <input
          type="datetime-local"
          value={callScheduledAt}
          onChange={(e) => setCallScheduledAt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Notas Internas</label>
        <textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
          placeholder="Notas del equipo..."
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar Cambios'}
      </button>

      {message && (
        <p className={`text-sm text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

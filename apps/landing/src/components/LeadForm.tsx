'use client';

import { useState } from 'react';
import type { LeadFormData } from '@creative-commerce/types';
import {
  INDUSTRIES,
  SALES_VOLUMES,
  OBJECTIVES,
  BUDGETS,
  HOW_FOUND_US,
} from '@creative-commerce/types';

const STEPS = [
  { number: 1, label: 'Tu Marca' },
  { number: 2, label: 'Tu Situación' },
  { number: 3, label: 'Contacto' },
] as const;

type FormErrors = Partial<Record<keyof LeadFormData, string>>;

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form fields
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [mainProducts, setMainProducts] = useState('');
  const [alreadyOnTikTok, setAlreadyOnTikTok] = useState('');
  const [monthlySalesVolume, setMonthlySalesVolume] = useState('');
  const [mainObjective, setMainObjective] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [hasExistingContent, setHasExistingContent] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [howFoundUs, setHowFoundUs] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  function validateStep(current: number): boolean {
    const newErrors: FormErrors = {};

    if (current === 1) {
      if (!brandName.trim()) newErrors.brandName = 'El nombre de la marca es requerido';
      if (!website.trim()) newErrors.website = 'El sitio web es requerido';
      if (!industry) newErrors.industry = 'Selecciona una industria';
      if (!mainProducts.trim()) newErrors.mainProducts = 'Describe tus productos principales';
    }

    if (current === 2) {
      if (!alreadyOnTikTok) newErrors.alreadyOnTikTok = 'Selecciona una opción';
      if (!monthlySalesVolume) newErrors.monthlySalesVolume = 'Selecciona tu volumen de ventas';
      if (!mainObjective) newErrors.mainObjective = 'Selecciona tu objetivo principal';
      if (!estimatedBudget) newErrors.estimatedBudget = 'Selecciona tu presupuesto estimado';
      if (!hasExistingContent) newErrors.hasExistingContent = 'Selecciona una opción';
    }

    if (current === 3) {
      if (!contactName.trim()) newErrors.contactName = 'El nombre de contacto es requerido';
      if (!email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Ingresa un email válido';
      }
      if (!phone.trim()) newErrors.phone = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => s - 1);
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const data: LeadFormData = {
      brandName: brandName.trim(),
      website: website.trim(),
      industry,
      mainProducts: mainProducts.trim(),
      alreadyOnTikTok: alreadyOnTikTok === 'yes',
      monthlySalesVolume,
      mainObjective,
      estimatedBudget,
      hasExistingContent: hasExistingContent === 'yes',
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      howFoundUs: howFoundUs || 'Otro',
      additionalNotes: additionalNotes.trim() || undefined,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error al enviar');

      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName = (field: keyof LeadFormData) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 bg-white focus:border-gray-900'
    }`;

  const selectClassName = (field: keyof LeadFormData) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors appearance-none bg-white ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 focus:border-gray-900'
    }`;

  const labelClassName = 'block text-sm font-medium text-gray-700 mb-1.5';

  function renderError(field: keyof LeadFormData) {
    if (!errors[field]) return null;
    return <p className="mt-1 text-xs text-red-500">{errors[field]}</p>;
  }

  // --- Success state ---
  if (submitStatus === 'success') {
    return (
      <section id="formulario" className="bg-gray-50 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">¡Solicitud recibida!</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            ¡Gracias! Tu solicitud ha sido recibida. Nuestro equipo analizará tu
            marca y te contactaremos en los próximos 3 días con un plan
            personalizado.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="bg-gray-50 px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Comienza tu estrategia en TikTok Shop
          </h2>
          <p className="mt-4 text-base text-gray-500 md:text-lg">
            Completa el formulario y recibirás un plan personalizado para tu marca
            en los próximos 3 días.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s) => (
                <div key={s.number} className="flex items-center gap-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      step >= s.number
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span
                    className={`hidden text-sm font-medium sm:inline ${
                      step >= s.number ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div
                className="h-1.5 rounded-full bg-gray-900 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Error banner */}
          {submitStatus === 'error' && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Ocurrió un error al enviar tu solicitud. Por favor intenta de nuevo.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1 — Tu Marca */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="brandName" className={labelClassName}>Nombre de la marca *</label>
                  <input
                    id="brandName"
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Ej. GlowSkin Beauty"
                    className={inputClassName('brandName')}
                  />
                  {renderError('brandName')}
                </div>

                <div>
                  <label htmlFor="website" className={labelClassName}>Sitio web *</label>
                  <input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://tumarca.com"
                    className={inputClassName('website')}
                  />
                  {renderError('website')}
                </div>

                <div>
                  <label htmlFor="industry" className={labelClassName}>Industria *</label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={selectClassName('industry')}
                  >
                    <option value="">Selecciona una industria</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  {renderError('industry')}
                </div>

                <div>
                  <label htmlFor="mainProducts" className={labelClassName}>Productos principales *</label>
                  <textarea
                    id="mainProducts"
                    value={mainProducts}
                    onChange={(e) => setMainProducts(e.target.value)}
                    placeholder="Describe brevemente tus productos o servicios principales"
                    rows={3}
                    className={inputClassName('mainProducts')}
                  />
                  {renderError('mainProducts')}
                </div>
              </div>
            )}

            {/* Step 2 — Tu Situación */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="alreadyOnTikTok" className={labelClassName}>¿Ya vendes en TikTok Shop? *</label>
                  <select
                    id="alreadyOnTikTok"
                    value={alreadyOnTikTok}
                    onChange={(e) => setAlreadyOnTikTok(e.target.value)}
                    className={selectClassName('alreadyOnTikTok')}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                  {renderError('alreadyOnTikTok')}
                </div>

                <div>
                  <label htmlFor="monthlySalesVolume" className={labelClassName}>Volumen de ventas mensual *</label>
                  <select
                    id="monthlySalesVolume"
                    value={monthlySalesVolume}
                    onChange={(e) => setMonthlySalesVolume(e.target.value)}
                    className={selectClassName('monthlySalesVolume')}
                  >
                    <option value="">Selecciona un rango</option>
                    {SALES_VOLUMES.map((vol) => (
                      <option key={vol} value={vol}>{vol}</option>
                    ))}
                  </select>
                  {renderError('monthlySalesVolume')}
                </div>

                <div>
                  <label htmlFor="mainObjective" className={labelClassName}>Objetivo principal *</label>
                  <select
                    id="mainObjective"
                    value={mainObjective}
                    onChange={(e) => setMainObjective(e.target.value)}
                    className={selectClassName('mainObjective')}
                  >
                    <option value="">Selecciona un objetivo</option>
                    {OBJECTIVES.map((obj) => (
                      <option key={obj} value={obj}>{obj}</option>
                    ))}
                  </select>
                  {renderError('mainObjective')}
                </div>

                <div>
                  <label htmlFor="estimatedBudget" className={labelClassName}>Presupuesto estimado *</label>
                  <select
                    id="estimatedBudget"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className={selectClassName('estimatedBudget')}
                  >
                    <option value="">Selecciona un rango</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {renderError('estimatedBudget')}
                </div>

                <div>
                  <label htmlFor="hasExistingContent" className={labelClassName}>¿Tienes contenido existente? *</label>
                  <select
                    id="hasExistingContent"
                    value={hasExistingContent}
                    onChange={(e) => setHasExistingContent(e.target.value)}
                    className={selectClassName('hasExistingContent')}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                  {renderError('hasExistingContent')}
                </div>
              </div>
            )}

            {/* Step 3 — Contacto */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="contactName" className={labelClassName}>Nombre de contacto *</label>
                  <input
                    id="contactName"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className={inputClassName('contactName')}
                  />
                  {renderError('contactName')}
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className={inputClassName('email')}
                  />
                  {renderError('email')}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClassName}>Teléfono *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={inputClassName('phone')}
                  />
                  {renderError('phone')}
                </div>

                <div>
                  <label htmlFor="howFoundUs" className={labelClassName}>¿Cómo nos encontraste?</label>
                  <select
                    id="howFoundUs"
                    value={howFoundUs}
                    onChange={(e) => setHowFoundUs(e.target.value)}
                    className={selectClassName('howFoundUs')}
                  >
                    <option value="">Selecciona una opción</option>
                    {HOW_FOUND_US.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalNotes" className={labelClassName}>Notas adicionales</label>
                  <textarea
                    id="additionalNotes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="¿Algo más que debamos saber sobre tu marca?"
                    rows={3}
                    className={inputClassName('additionalNotes')}
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Atrás
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando…
                    </>
                  ) : (
                    'Enviar solicitud'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

import { NextResponse } from 'next/server';
import { prisma } from '@creative-commerce/database';
import { generateLeadPlan } from '@creative-commerce/ai';
import type { LeadFormData } from '@creative-commerce/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;

    // Validate required fields
    const required: (keyof LeadFormData)[] = [
      'brandName',
      'website',
      'industry',
      'mainProducts',
      'monthlySalesVolume',
      'mainObjective',
      'estimatedBudget',
      'contactName',
      'email',
      'phone',
    ];

    const missing = required.filter((field) => {
      const value = body[field];
      return value === undefined || value === null || (typeof value === 'string' && !value.trim());
    });

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Campos requeridos faltantes: ${missing.join(', ')}` },
        { status: 400 },
      );
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de email inválido' },
        { status: 400 },
      );
    }

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        brandName: body.brandName.trim(),
        website: body.website.trim(),
        industry: body.industry,
        mainProducts: body.mainProducts.trim(),
        alreadyOnTikTok: Boolean(body.alreadyOnTikTok),
        monthlySalesVolume: body.monthlySalesVolume,
        mainObjective: body.mainObjective,
        estimatedBudget: body.estimatedBudget,
        hasExistingContent: Boolean(body.hasExistingContent),
        contactName: body.contactName.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        howFoundUs: body.howFoundUs || null,
        additionalNotes: body.additionalNotes?.trim() || null,
        status: 'NUEVO',
      },
    });

    // Fire-and-forget: generate AI plan asynchronously
    generateLeadPlan(body)
      .then(async (plan) => {
        await prisma.lead.update({
          where: { id: lead.id },
          data: { status: 'PLAN_GENERADO' },
        });

        await prisma.aIPlan.create({
          data: {
            leadId: lead.id,
            brandAnalysis: plan.brandAnalysis,
            recommendedPlan: plan.recommendedPlan,
            planJustification: plan.planJustification,
            priorityServices: plan.priorityServices,
            creatorCategories: plan.creatorStrategy.categories,
            creatorLanguages: plan.creatorStrategy.languages,
            estimatedCreators: plan.creatorStrategy.estimatedCreators,
            tiktokPotential: plan.tiktokPotential,
            keyPointsForCall: plan.keyPointsForCall,
            rawResponse: JSON.stringify(plan),
          },
        });
      })
      .catch((err) => {
        console.error(`[AI Plan] Failed for lead ${lead.id}:`, err);
      });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/leads] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

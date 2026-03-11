import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@creative-commerce/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const leads = await prisma.lead.findMany({
      where: status ? { status: status as never } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { aiPlan: true },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Error al obtener leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, internalNotes, callScheduledAt } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de lead requerido' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (status !== undefined) {
      updateData.status = status;
    }
    if (internalNotes !== undefined) {
      updateData.internalNotes = internalNotes;
    }
    if (callScheduledAt !== undefined) {
      updateData.callScheduledAt = callScheduledAt
        ? new Date(callScheduledAt)
        : null;
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Error al actualizar lead' },
      { status: 500 }
    );
  }
}

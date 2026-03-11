import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@creative-commerce/database';
import bcrypt from 'bcryptjs';

function generatePassword(length = 12): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { users: true, creators: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Error al obtener marcas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, planTier } = body;

    if (!leadId || !planTier) {
      return NextResponse.json(
        { error: 'leadId y planTier son requeridos' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      );
    }

    const generatedPassword = generatePassword();
    const passwordHash = await bcrypt.hash(generatedPassword, 10);

    const result = await prisma.$transaction(async (tx) => {
      const brand = await tx.brand.create({
        data: {
          name: lead.brandName,
          website: lead.website,
          industry: lead.industry,
          activePlanTier: planTier,
          isActive: true,
        },
      });

      const user = await tx.user.create({
        data: {
          email: lead.email,
          passwordHash,
          name: lead.contactName,
          role: 'BRAND',
          brandId: brand.id,
        },
      });

      await tx.lead.update({
        where: { id: leadId },
        data: { status: 'CONVERTIDO' },
      });

      return { brand, user };
    });

    return NextResponse.json({
      brand: result.brand,
      credentials: {
        email: result.user.email,
        password: generatedPassword,
      },
      message: 'Marca creada exitosamente',
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { error: 'Error al crear marca' },
      { status: 500 }
    );
  }
}

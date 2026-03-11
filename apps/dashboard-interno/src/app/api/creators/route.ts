import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@creative-commerce/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const creators = await prisma.creator.findMany({
      where: category
        ? { categories: { has: category } }
        : undefined,
      orderBy: { followers: 'desc' },
    });

    return NextResponse.json(creators);
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { error: 'Error al obtener creadores' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tiktokUsername,
      displayName,
      email,
      phone,
      followers,
      engagementRate,
      averageViews,
      categories,
      languages,
      profileImageUrl,
      bio,
      isInNetwork,
    } = body;

    if (!tiktokUsername || !displayName) {
      return NextResponse.json(
        { error: 'tiktokUsername y displayName son requeridos' },
        { status: 400 }
      );
    }

    const existing = await prisma.creator.findUnique({
      where: { tiktokUsername },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe un creador con ese username' },
        { status: 409 }
      );
    }

    const creator = await prisma.creator.create({
      data: {
        tiktokUsername,
        displayName,
        email: email || null,
        phone: phone || null,
        followers: followers || 0,
        engagementRate: engagementRate || 0,
        averageViews: averageViews || 0,
        categories: categories || [],
        languages: languages || [],
        profileImageUrl: profileImageUrl || null,
        bio: bio || null,
        isInNetwork: isInNetwork ?? false,
      },
    });

    return NextResponse.json(creator, { status: 201 });
  } catch (error) {
    console.error('Error creating creator:', error);
    return NextResponse.json(
      { error: 'Error al crear creador' },
      { status: 500 }
    );
  }
}

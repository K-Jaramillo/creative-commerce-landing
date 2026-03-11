import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const dateFilter: Record<string, Date> = {};
  if (from) dateFilter.gte = new Date(from);
  if (to) dateFilter.lte = new Date(to);

  // Default to last 30 days if no range specified
  if (!from && !to) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    dateFilter.gte = thirtyDaysAgo;
  }

  const metrics = await prisma.metric.findMany({
    where: {
      brandId,
      date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined,
    },
    orderBy: { date: 'asc' },
  });

  return NextResponse.json({ metrics });
}

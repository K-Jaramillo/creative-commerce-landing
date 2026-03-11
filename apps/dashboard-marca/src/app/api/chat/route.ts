import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@creative-commerce/database';
import { generateChatResponse } from '@creative-commerce/ai';

type MetricRow = { gmv: number; roas: number };
type ChatMsg = { role: string; content: string };

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { brandId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const brandId = (session?.user as any)?.brandId;

  if (!brandId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const { content } = body;

  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 });
  }

  // Save user message
  const userMessage = await prisma.chatMessage.create({
    data: {
      brandId,
      role: 'USER',
      content,
    },
  });

  // Build brand context
  const brand = await prisma.brand.findUnique({ where: { id: brandId } });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentMetrics = await prisma.metric.findMany({
    where: { brandId, date: { gte: thirtyDaysAgo } },
    orderBy: { date: 'desc' },
    take: 7,
  });

  const totalGmv = recentMetrics.reduce((sum: number, m: MetricRow) => sum + m.gmv, 0);
  const avgRoas = recentMetrics.length > 0
    ? recentMetrics.reduce((sum: number, m: MetricRow) => sum + m.roas, 0) / recentMetrics.length
    : 0;

  const brandContext = `
Marca: ${brand?.name || 'Desconocida'}
Plan: ${brand?.activePlanTier || 'N/A'}
Industria: ${brand?.industry || 'N/A'}
GMV últimos 7 días: $${totalGmv.toFixed(2)}
ROAS promedio últimos 7 días: ${avgRoas.toFixed(2)}x
  `.trim();

  // Get recent chat history for context
  const recentChat = await prisma.chatMessage.findMany({
    where: { brandId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const chatHistory = recentChat.reverse().map((m: ChatMsg) => ({
    role: m.role === 'USER' ? 'user' : 'assistant',
    content: m.content,
  }));

  // Generate AI response
  let aiResponse: string;
  try {
    aiResponse = await generateChatResponse(brandContext, chatHistory, content);
  } catch {
    aiResponse =
      'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo o contacta al equipo de Creative Commerce.';
  }

  // Save assistant message
  const assistantMessage = await prisma.chatMessage.create({
    data: {
      brandId,
      role: 'ASSISTANT',
      content: aiResponse,
    },
  });

  return NextResponse.json({ userMessage, assistantMessage });
}

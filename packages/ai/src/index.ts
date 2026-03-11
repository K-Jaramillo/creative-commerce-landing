import type { LeadFormData, AIPlanResult } from '@creative-commerce/types';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

export async function generateText(prompt: string): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as OllamaResponse;
  return data.response;
}

export async function chat(messages: { role: string; content: string }[]): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.message?.content || '';
}

export async function generateLeadPlan(lead: LeadFormData): Promise<AIPlanResult> {
  const prompt = buildPlanPrompt(lead);
  const response = await generateText(prompt);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }
    return JSON.parse(jsonMatch[0]) as AIPlanResult;
  } catch {
    return {
      brandAnalysis: response,
      recommendedPlan: lead.estimatedBudget.includes('1,000') || lead.estimatedBudget.includes('3,000') ? 'LAUNCH' :
                       lead.estimatedBudget.includes('25,000') ? 'SCALE' : 'GROWTH',
      planJustification: 'Plan recomendado basado en el presupuesto y objetivos de la marca.',
      priorityServices: ['Lanzamiento de TikTok Shop', 'Red de Creadores Afiliados', 'Live Shopping'],
      creatorStrategy: {
        categories: [lead.industry],
        languages: ['Español', 'Inglés'],
        estimatedCreators: 10,
      },
      tiktokPotential: 'Alto potencial basado en la categoría y mercado objetivo.',
      keyPointsForCall: [
        'Discutir objetivos específicos de ventas',
        'Evaluar inventario disponible para creadores',
        'Definir timeline de lanzamiento',
      ],
    };
  }
}

function buildPlanPrompt(lead: LeadFormData): string {
  return `Eres un estratega de comercio en TikTok Shop para Creative Commerce, una agencia que opera canales completos de ventas en TikTok Shop para marcas de ecommerce.

DATOS DE LA MARCA:
- Nombre: ${lead.brandName}
- Sitio web: ${lead.website}
- Industria: ${lead.industry}
- Productos principales: ${lead.mainProducts}
- ¿Ya vende en TikTok Shop?: ${lead.alreadyOnTikTok ? 'Sí' : 'No'}
- Volumen de ventas mensual (otros canales): ${lead.monthlySalesVolume}
- Objetivo principal: ${lead.mainObjective}
- Presupuesto estimado: ${lead.estimatedBudget}
- ¿Tiene contenido existente?: ${lead.hasExistingContent ? 'Sí' : 'No'}
${lead.additionalNotes ? `- Notas adicionales: ${lead.additionalNotes}` : ''}

SERVICIOS DISPONIBLES DE CREATIVE COMMERCE:
1. Lanzamiento de TikTok Shop — Configuración completa de tienda
2. Validación de Mercado en TikTok — Pruebas con creadores y campañas iniciales
3. Red de Creadores Afiliados — Reclutamiento y gestión de creadores
4. Producción de Contenido — Videos, UGC, clips de lives
5. Live Shopping — Transmisiones en vivo con hosts bilingües
6. Publicidad en TikTok Shop — Video Shopping Ads, Spark Ads, GMV Max
7. Análisis y Optimización — Métricas, ROAS, CPA, reportes
8. Gestión de Reseñas y Calificaciones — Monitoreo y optimización
9. Estrategia de Promociones y Eventos — Eventos de TikTok Shop

PLANES DISPONIBLES:
- LAUNCH ($1K-3K/mes): 1 live/semana, validación, setup. Para marcas nuevas en TikTok Shop.
- GROWTH ($3K-10K/mes): 3 lives/semana, red de creadores expandida, ads, eventos. Para marcas que ya validaron.
- SCALE ($10K+/mes): 5 lives/semana, brand ambassador exclusivo, escala masiva. Para marcas que quieren dominar.

INSTRUCCIONES:
Genera un plan personalizado para esta marca. Responde EXCLUSIVAMENTE con un JSON válido con esta estructura exacta:

{
  "brandAnalysis": "Análisis detallado de la marca y su posición actual (3-4 oraciones)",
  "recommendedPlan": "LAUNCH" | "GROWTH" | "SCALE",
  "planJustification": "Por qué este plan es el indicado para la marca (2-3 oraciones)",
  "priorityServices": ["servicio1", "servicio2", "servicio3"],
  "creatorStrategy": {
    "categories": ["categoría1", "categoría2"],
    "languages": ["Español", "Inglés"],
    "estimatedCreators": 15
  },
  "tiktokPotential": "Evaluación del potencial de la marca en TikTok Shop (2-3 oraciones)",
  "keyPointsForCall": ["punto1", "punto2", "punto3", "punto4"]
}

Responde SOLO con el JSON, sin texto adicional.`;
}

export async function generateChatResponse(
  brandContext: string,
  chatHistory: { role: string; content: string }[],
  userMessage: string
): Promise<string> {
  const systemMessage = `Eres el asistente virtual de Creative Commerce, una agencia que opera canales de ventas en TikTok Shop.
Estás ayudando a una marca cliente con preguntas sobre su cuenta, métricas, creadores y servicios.

CONTEXTO DE LA MARCA:
${brandContext}

INSTRUCCIONES:
- Responde siempre en español
- Sé profesional pero amigable
- Si no sabes algo específico, sugiere contactar al equipo de Creative Commerce
- Enfócate en TikTok Shop, ventas, creadores y métricas
- Mantén las respuestas concisas pero útiles`;

  const messages = [
    { role: 'system', content: systemMessage },
    ...chatHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  return chat(messages);
}

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    return response.ok;
  } catch {
    return false;
  }
}

export { searchCreators, fetchCreatorProfile } from './tiktok';
export type { TikTokCreatorSearchParams, TikTokCreatorResult } from './tiktok';
export { calculateMatchScore, rankCreatorsForBrand } from './matching';
export type { MatchResult } from './matching';
export { generateOutreachEmail, generateFollowUpEmail, generateAcceptanceEmail } from './outreach';

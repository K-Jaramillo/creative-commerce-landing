export interface OutreachEmail {
  subject: string;
  body: string;
}

/**
 * Generates an initial outreach email to invite a creator to collaborate.
 */
export function generateOutreachEmail(
  creatorName: string,
  brandName: string,
  brandIndustry: string,
  commissionRate: number,
): OutreachEmail {
  return {
    subject: `Colaboración con ${brandName} a través de Creative Commerce`,
    body: `Hola ${creatorName},

¡Esperamos que estés teniendo un excelente día!

Mi nombre es el equipo de Creative Commerce y nos dedicamos a conectar marcas líderes con creadores de contenido talentosos como tú en TikTok Shop.

Estamos trabajando con ${brandName}, una marca destacada en la industria de ${brandIndustry}, y creemos que tu perfil y estilo de contenido son una combinación perfecta para esta colaboración.

Lo que ofrecemos:
• Comisión competitiva del ${commissionRate}% por cada venta generada
• Productos gratuitos para crear contenido auténtico
• Soporte completo de nuestro equipo de Creative Commerce
• Acceso a campañas exclusivas y eventos de TikTok Shop
• Oportunidad de crecimiento a largo plazo con la marca

¿Cómo funciona?
1. Te enviamos los productos sin costo
2. Creas contenido auténtico en tu estilo
3. Ganas comisión por cada venta a través de tu enlace de afiliado

Nos encantaría agendar una breve llamada para platicar los detalles y responder cualquier pregunta que tengas.

¿Te interesa? Responde a este correo o agenda directamente en nuestro calendario.

¡Esperamos tu respuesta!

Saludos cordiales,
Equipo Creative Commerce
creativecommer.ce
`,
  };
}

/**
 * Generates a follow-up email for creators who haven't responded.
 */
export function generateFollowUpEmail(
  creatorName: string,
  brandName: string,
  daysSinceFirstContact: number,
): OutreachEmail {
  const timeReference =
    daysSinceFirstContact <= 3
      ? 'hace unos días'
      : daysSinceFirstContact <= 7
        ? 'la semana pasada'
        : `hace ${daysSinceFirstContact} días`;

  return {
    subject: `Re: Colaboración con ${brandName} — ¿Sigues interesad@?`,
    body: `Hola ${creatorName},

Te escribimos ${timeReference} sobre una oportunidad de colaboración con ${brandName} a través de Creative Commerce y queríamos dar seguimiento.

Entendemos que estás ocupad@ creando contenido increíble, así que queremos hacértelo lo más fácil posible:

✅ Sin compromiso a largo plazo — puedes probarlo con una sola campaña
✅ Productos enviados directamente a tu puerta
✅ Soporte dedicado de nuestro equipo para maximizar tus resultados

Varios creadores ya están generando ingresos significativos con ${brandName} en TikTok Shop, y nos encantaría que tú también seas parte.

Si prefieres, podemos agendar una llamada rápida de 10 minutos para explicarte todo sin presión.

¿Qué te parece?

Saludos,
Equipo Creative Commerce
`,
  };
}

/**
 * Generates a welcome/acceptance email when a creator agrees to collaborate.
 */
export function generateAcceptanceEmail(
  creatorName: string,
  brandName: string,
  commissionRate: number,
  nextSteps: string[],
): OutreachEmail {
  const formattedSteps = nextSteps
    .map((step, i) => `${i + 1}. ${step}`)
    .join('\n');

  return {
    subject: `¡Bienvenid@ al equipo! Colaboración confirmada con ${brandName}`,
    body: `Hola ${creatorName},

¡Excelentes noticias! 🎉

Estamos muy content@s de confirmar tu colaboración con ${brandName} a través de Creative Commerce.

Aquí tienes un resumen de los términos:
• Comisión: ${commissionRate}% por venta generada
• Productos: Se enviarán sin costo para creación de contenido
• Soporte: Tendrás un punto de contacto dedicado en nuestro equipo

Próximos pasos:
${formattedSteps}

Recursos importantes:
• Nuestro equipo te enviará un kit de bienvenida con lineamientos de marca
• Tendrás acceso a un grupo exclusivo de creadores de ${brandName}
• Recibirás reportes semanales de rendimiento y comisiones

Si tienes cualquier duda o necesitas ayuda en algún momento, no dudes en contactarnos. Estamos aquí para asegurarnos de que esta colaboración sea un éxito para ti y para ${brandName}.

¡Bienvenid@ al equipo!

Con entusiasmo,
Equipo Creative Commerce
creativecommer.ce
`,
  };
}

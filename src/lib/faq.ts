// Preguntas frecuentes para los datos estructurados (FAQPage): salen de los
// desplegables que ya tiene cada página y cuyo título es una pregunta. No se añade
// ni se cambia texto: solo se marca lo que ya se ve, para Google y las IA.
const plano = (h = '') => h
  .replace(/<(script|style|form)\b[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<br\s*\/?>|<\/(p|li|h\d|div)>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&#8217;/g, '’')
  .replace(/\s+/g, ' ').trim();

export function faqDe(blocks: any[]): { pregunta: string; respuesta: string }[] {
  const vistas = new Set<string>();
  const salida: { pregunta: string; respuesta: string }[] = [];
  for (const b of blocks) {
    if (b.type !== 'toggle') continue;
    for (const it of b.items) {
      const pregunta = (it.title || '').trim();
      const respuesta = plano(it.html);
      if (!/^¿|\?$/.test(pregunta) || respuesta.length < 20 || vistas.has(pregunta)) continue;
      vistas.add(pregunta);
      salida.push({ pregunta, respuesta });
    }
  }
  return salida;
}

export const faqJsonLd = (lista: { pregunta: string; respuesta: string }[], url: string) => lista.length
  ? [{ '@type': 'FAQPage', '@id': `${url}#preguntas`, mainEntity: lista.map((f) => ({ '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } })) }]
  : [];

// Preguntas frecuentes para los datos estructurados (FAQPage): salen de los
// desplegables que ya tiene cada página y cuyo título es una pregunta. No se añade
// ni se cambia texto: solo se marca lo que ya se ve, para Google y las IA.
const plano = (h = '') => h
  .replace(/<(script|style|form)\b[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<br\s*\/?>|<\/(p|li|h\d|div)>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&#8217;/g, '’')
  .replace(/\s+/g, ' ').trim();

// Preguntas que se repiten en muchas páginas (p. ej. «¿Qué es un render y cómo se
// realizan?» en 234): para Google serían la misma respuesta copiada por toda la web,
// así que solo se marcan en la página principal de su tema (análisis del 16-11-2026, A1).
const MAX_PAGINAS = 3;
const DUENAS = new Set(['index', 'renders']);
const paginas = Object.values(import.meta.glob('../content/pages/*.json', { eager: true })).map((m: any) => m.default);
const enCuantas = new Map<string, number>();
for (const p of paginas) {
  const suyas = new Set<string>(p.blocks.filter((b: any) => b.type === 'toggle').flatMap((b: any) => b.items.map((it: any) => (it.title || '').trim())));
  for (const t of suyas) enCuantas.set(t, (enCuantas.get(t) ?? 0) + 1);
}

export function faqDe(blocks: any[], slug = ''): { pregunta: string; respuesta: string }[] {
  const vistas = new Set<string>();
  const salida: { pregunta: string; respuesta: string }[] = [];
  for (const b of blocks) {
    if (b.type !== 'toggle') continue;
    for (const it of b.items) {
      const pregunta = (it.title || '').trim();
      const respuesta = plano(it.html);
      if (!/^¿|\?$/.test(pregunta) || respuesta.length < 20 || vistas.has(pregunta)) continue;
      if ((enCuantas.get(pregunta) ?? 0) > MAX_PAGINAS && !DUENAS.has(slug)) continue;
      vistas.add(pregunta);
      salida.push({ pregunta, respuesta });
    }
  }
  return salida;
}

export const faqJsonLd = (lista: { pregunta: string; respuesta: string }[], url: string) => lista.length
  ? [{ '@type': 'FAQPage', '@id': `${url}#preguntas`, mainEntity: lista.map((f) => ({ '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } })) }]
  : [];

// /llms.txt: resumen del sitio en texto plano para los buscadores con IA
// (formato de llmstxt.org). Sale de las mismas páginas y del mismo SEO que la web
// (src/content/pages y src/data/seo.json): nada escrito a mano que se desactualice.
import type { APIRoute } from 'astro';
import site from '../data/site.json';
import seo from '../data/seo.json';
import aprobado from '../data/seo-aprobado.json';

const D = `https://${site.dominio}`;
const S = seo as Record<string, { titulo?: string; descripcion?: string }>;

export const GET: APIRoute = () => {
  const paginas = Object.values(import.meta.glob('../content/pages/*.json', { eager: true })).map((m: any) => m.default).filter((p: any) => !p.legal);
  const linea = (p: any) => {
    const h1 = p.blocks.find((b: any) => b.type === 'heading' && b.tag === 'h1')?.text || p.title;
    const d = (aprobado.paginas as Record<string, { descripcion: string }>)[p.slug]?.descripcion ?? S[p.slug]?.descripcion;
    return `- [${h1.replace(/\s+/g, ' ').trim()}](${p.url})${d ? `: ${d}` : ''}`;
  };
  const grupos: [string, (s: string) => boolean][] = [
    ['Estilos y tipos de arquitectura', (s) => s.startsWith('arquitectura-') && s !== 'arquitectura-elche' || s === 'tipos-de-arquitectura'],
    ['Profesiones: arquitectos y oficios', (s) => /^(arquitect|aparejadores|delineante|renderista|interiorista|paisajista|proyectista|decorador|calculista)/.test(s)],
    ['Estudio de arquitectura por ciudad', (s) => /^(estudio-de-arquitectura-|valencia$|castellon$|santa-fe$|gandia$|pamplona$|ibiza$|sagunto$|mijas$|san-sebastian-de-los-reyes$|arquitectura-elche$)/.test(s)],
    ['Renders y diseño 3D', (s) => /^render(s)?-/.test(s) && !/^renders-[a-z-]+$/.test(s) || /^(renders|modelado-3d|infografias|tour-virtual|home-staging|realidad-virtual|sofa-render|renderizado|empresa-de-renders|tipos-de-renders|servicios-de-renders|cursos-de-renders)/.test(s)],
  ];
  const usadas = new Set<string>();
  const l: string[] = [`# ${site.nombre}`, '', `> ${site.descripcion} Web informativa sobre arquitectura (estilos, profesiones, recursos) y servicios de renders, planos y modelado 3D, con lectores sobre todo de España y Latinoamérica.`, ''];
  l.push(`Contacto: ${site.correo} · Formulario: ${D}/contacto/`, '');
  const inicio = paginas.find((p: any) => p.slug === 'index');
  if (inicio) { l.push('## Inicio', '', linea(inicio), ''); usadas.add('index'); }
  for (const [titulo, f] of grupos) {
    const lista = paginas.filter((p: any) => !usadas.has(p.slug) && f(p.slug)).sort((a: any, b: any) => a.slug.localeCompare(b.slug));
    if (!lista.length) continue;
    l.push(`## ${titulo}`, '', ...lista.map(linea), '');
    lista.forEach((p: any) => usadas.add(p.slug));
  }
  const ciudades = paginas.filter((p: any) => !usadas.has(p.slug) && /^renders-/.test(p.slug));
  l.push('## Renders por país y ciudad', '', `${ciudades.length} páginas de renders por país y ciudad (España y Latinoamérica), por ejemplo:`, ...ciudades.filter((p: any) => /^renders-(espana|mexico|argentina|colombia|chile|peru|madrid|barcelona|valencia|sevilla)$/.test(p.slug)).map(linea), '');
  ciudades.forEach((p: any) => usadas.add(p.slug));
  const resto = paginas.filter((p: any) => !usadas.has(p.slug)).sort((a: any, b: any) => a.slug.localeCompare(b.slug));
  l.push('## Recursos, servicios y otras páginas', '', ...resto.map(linea), '');
  l.push('## Opcional', '', `- [Aviso legal](${D}/aviso-legal/)`, `- [Política de privacidad](${D}/politica-de-privacidad/)`, `- [Mapa del sitio](${D}/sitemap.xml)`, '');
  return new Response(l.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

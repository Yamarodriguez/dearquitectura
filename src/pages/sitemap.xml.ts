// Mapa del sitio: todas las páginas de contenido (la 404 no). Las direcciones
// salen del propio contenido, con barra final y el dominio definitivo.
// Desde el 20-11-2026 (análisis final antes del lanzamiento) lleva también la fecha de la
// última modificación de cada página (la misma que «Actualizado el…») y sus fotos, como
// hacía el mapa de fotos de WordPress: así Google encuentra antes las fotos en /img/.
import type { APIRoute } from 'astro';
import site from '../data/site.json';
import { sinIndexar } from '../lib/indexar';
import { paginas } from '../lib/paginas';

const D = `https://${site.dominio}`;
const xml = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fotosDe = (p: any): string[] => {
  const fotos = new Set<string>();
  if (p.foto_destacada) fotos.add(p.foto_destacada);
  for (const b of p.blocks ?? []) {
    if (b.type === 'image' && b.src) fotos.add(b.src);
    if (b.type === 'gallery') for (const g of b.images ?? []) if (g.src) fotos.add(g.src);
  }
  return [...fotos].filter((s) => s.startsWith('/img/')).slice(0, 100);
};

export const GET: APIRoute = () => {
  const lista = paginas
    .filter((p: any) => !p.legal && !sinIndexar.has(p.slug)) // las legales (como en el original) y las aprobadas sin indexar llevan noindex
    .sort((a: any, b: any) => (a.url as string).localeCompare(b.url));
  const cuerpo = lista.map((p: any) => {
    const fecha = (p.modificada_gmt || p.modificada || '').slice(0, 10);
    const fotos = fotosDe(p).map((s) => `<image:image><image:loc>${xml(D + encodeURI(s))}</image:loc></image:image>`).join('');
    return `  <url><loc>${p.url}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(fecha) && fecha >= '2000-01-01' ?`<lastmod>${fecha}</lastmod>` : ''}${fotos}</url>`;
  }).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${cuerpo}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};

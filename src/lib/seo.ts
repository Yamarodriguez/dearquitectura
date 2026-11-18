// SEO que ya tenía cada página en la web viva (src/data/seo.json, sacado de
// referencia/ con scripts/seo-desde-referencia.mjs). La imagen para compartir
// apuntaba a wp-content: se cambia por la copia propia si existe.
import seo from '../data/seo.json';
import aprobado from '../data/seo-aprobado.json';
import imagenes from '../data/imagenes.json';

// Títulos y descripciones nuevos aprobados por Yama (parte B, 18-11-2026): mandan
// sobre los de la web vieja, también al compartir en redes.
const nuevos = aprobado.paginas as Record<string, { titulo: string; descripcion: string }>;

export function seoDe(slug: string) {
  const s = (seo as Record<string, any>)[slug] ?? {};
  const n = nuevos[slug];
  if (n) {
    const base = seoBase(s);
    return { ...base, titulo: n.titulo, descripcion: n.descripcion, ogTitulo: n.titulo, ogDescripcion: n.descripcion };
  }
  return seoBase(s);
}

function seoBase(s: any) {
  let imagen = '';
  const og = s.og?.imagen as string | undefined;
  if (og) {
    const ruta = og.replace(/^https?:\/\/[^/]+\/wp-content\/uploads\//, '/img/');
    if ((imagenes as Record<string, unknown>)[ruta]) imagen = ruta;
  }
  return {
    titulo: s.titulo as string | undefined,
    descripcion: s.descripcion as string | undefined,
    noindex: /noindex/.test(s.robots || ''),
    ogTitulo: (s.og?.titulo as string) || undefined,
    ogDescripcion: (s.og?.descripcion as string) || undefined,
    imagen,
  };
}

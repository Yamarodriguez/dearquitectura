// Migas de pan (solo en los datos estructurados: el original no las enseña y el
// diseño es una copia exacta). Inicio › sección › página. La sección sale del menú
// real de la página: el apartado de arriba del que cuelga (Tipos, Arquitectos,
// Renders, Servicios…), si tiene página propia.
import menus from '../data/menus.json';

export type Miga = { nombre: string; url: string };
const DOMINIO = 'https://dearquitectura.info';
const rel = (u: string) => u.replace(/^https?:\/\/[^/]+/, '') || '/';

function seccionDe(ruta: string, menu?: string): { nombre: string; url: string } | undefined {
  const arbol = (menus as Record<string, any[]>)[menu || 'principal'] ?? (menus as any).principal;
  const contiene = (i: any): boolean => (i.children ?? []).some((c: any) => rel(c.url) === ruta || contiene(c));
  for (const top of arbol) {
    if (!contiene(top)) continue;
    const u = rel(top.url);
    if (u === '#' || u === ruta || u === '/') return undefined;
    return { nombre: top.label, url: `${DOMINIO}${u}` };
  }
  return undefined;
}

export function migasDe(url: string, nombre: string, menu?: string): Miga[] {
  const inicio = { nombre: 'Inicio', url: `${DOMINIO}/` };
  const ruta = rel(url);
  if (ruta === '/') return [inicio];
  const seccion = seccionDe(ruta, menu);
  return seccion ? [inicio, seccion, { nombre, url }] : [inicio, { nombre, url }];
}

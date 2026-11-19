// Migas de pan (visibles arriba de cada página y en los datos estructurados). Inicio › sección › página. La sección sale del menú
// real de la página: el apartado de arriba del que cuelga (Tipos, Arquitectos,
// Renders, Servicios…), si tiene página propia.
import menus from '../data/menus.json';
import { mapaPaises, paisDeCiudad } from './paises.mjs';
import articulos from '../data/articulos.json';

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

// Renders por país y ciudad (18-11-2026): Inicio › Renders › Renders España › Renders Madrid
const mapa = mapaPaises(menus);
const { paises } = mapa;
const nombrePais = Object.fromEntries(((menus as any).renders.find((i: any) => i.label === 'Zonas')?.children ?? []).map((z: any) => [rel(z.url).replace(/\//g, ''), z.label]));
const esPais = new Set(paises.map((p: any) => p.slug));

export function migasDe(url: string, nombre: string, menu?: string): Miga[] {
  const inicio = { nombre: 'Inicio', url: `${DOMINIO}/` };
  const ruta = rel(url);
  if (ruta === '/') return [inicio];
  const slug = ruta.replace(/\//g, '');
  const renders = { nombre: 'Renders', url: `${DOMINIO}/renders/` };
  if (esPais.has(slug)) return [inicio, renders, { nombre, url }];
  const pais = esPais.has(slug) ? undefined : paisDeCiudad(slug, menu, mapa);
  if (pais) return [inicio, renders, { nombre: nombrePais[pais] ?? pais, url: `${DOMINIO}/${pais}/` }, { nombre, url }];
  // Los estilos que no están en el menú original (los nuevos) cuelgan de Tipos de arquitectura
  const seccion = seccionDe(ruta, menu) ?? (articulos.estilos.includes(slug) ? { nombre: 'Tipos', url: `${DOMINIO}/tipos-de-arquitectura/` } : (articulos as any).renders?.includes(slug) ? { nombre: 'Tipos de renders', url: `${DOMINIO}/tipos-de-renders/` } : (articulos as any).servicios?.includes(slug) ? { nombre: 'Servicios', url: `${DOMINIO}/servicios-de-arquitectura/` } : undefined);
  return seccion ? [inicio, seccion, { nombre, url }] : [inicio, { nombre, url }];
}

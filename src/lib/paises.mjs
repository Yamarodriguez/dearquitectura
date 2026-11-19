// Países y ciudades de los renders, sacados del menú general de Renders (apartado
// «Zonas»: cada país con sus ciudades). Lo usan la cabecera, las migas, el bloque de
// relacionadas y la comprobación de contenido. JavaScript simple para poder usarlo
// también desde scripts/ (los datos se pasan como argumento).
// Pedido por Yama el 18-11-2026: «href de cada país con sus páginas y menús individuales».

const slugDe = (u = '') => u.replace(/^https?:\/\/[^/]+/, '').replace(/^\/|\/$/g, '');

/** { paises: [{ slug, nombre }], paisDe: { ciudad: paisSlug } } */
export function mapaPaises(menus) {
  const zonas = (menus.renders ?? []).find((i) => i.label === 'Zonas')?.children ?? [];
  const paises = [];
  const paisDe = {};
  for (const z of zonas) {
    const slug = slugDe(z.url);
    if (!slug) continue;
    paises.push({ slug, nombre: z.label.replace(/^Renders?\s+/i, '').replace(/\s+USA$/, '') });
    // Si una ciudad sale en dos países (Guadalajara), vale el primero: el mismo que el menú de su página
    for (const c of z.children ?? []) { const s = slugDe(c.url); if (s && !paisDe[s]) paisDe[s] = slug; }
  }
  return { paises, paisDe };
}

/** País de una ciudad: el menú de país que le puso WordPress (renders-espana…) y, si no, el de «Zonas» */
export function paisDeCiudad(slug, menuPagina, mapa) {
  if (!mapa.paisDe[slug]) return undefined; // solo ciudades (otras páginas también usan el menú de España)
  if (menuPagina && mapa.paises.some((p) => p.slug === menuPagina)) return menuPagina;
  return mapa.paisDe[slug];
}

/**
 * Menú de una página, ajustado:
 * - fuera las páginas que no están en Google (sinIndexar): no tiene sentido enlazarlas desde todas partes;
 * - en el menú general de Renders, «Zonas» lleva solo los países (cada país enlaza luego a sus ciudades).
 */
export function ajustarMenu(nombre, items, sinIndexar, estilosNuevos = [], rendersNuevos = [], serviciosNuevos = []) {
  const limpiar = (lista, nivel, padre) => lista
    .filter((i) => !sinIndexar.has(slugDe(i.url)))
    .map((i) => {
      const hijos = i.children ?? [];
      const soloPaises = nombre === 'renders' && padre === 'Zonas';
      return { ...i, children: soloPaises ? [] : limpiar(hijos, nivel + 1, i.label) };
    });
  const limpio = limpiar(items, 0, null);
  // Estilos nuevos (páginas de src/content/nuevas): al desplegable que ya lista los estilos
  // (Tipos o Arquitectura), detrás de los que hay, si no están ya.
  // Igual con los tipos de render nuevos, en el desplegable que ya lista los tipos de render.
  for (const [marca, nuevos] of [['arquitectura-romana', estilosNuevos], ['renders-piscinas', rendersNuevos], ['maquetas-de-arquitectura', serviciosNuevos]]) {
    if (!nuevos.length) continue;
    const poner = (lista) => lista.forEach((i) => {
      const h = i.children ?? [];
      if (h.some((c) => slugDe(c.url) === marca)) {
        for (const e of nuevos) if (!h.some((c) => slugDe(c.url) === slugDe(e.url))) h.push({ label: e.label, url: e.url, children: [] });
      } else poner(h);
    });
    poner(limpio);
  }
  return limpio;
}

/** Enlaces del menú (url) que el ajuste quita, para que la comprobación de contenido no los eche en falta */
export function quitadosDelMenu(nombre, items, sinIndexar) {
  const todos = (l) => l.flatMap((i) => [i.url, ...todos(i.children ?? [])]);
  const quedan = new Set(todos(ajustarMenu(nombre, items, sinIndexar)));
  return new Set(todos(items).filter((u) => !quedan.has(u)).map(slugDe));
}

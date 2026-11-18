// Páginas que no deben salir en Google aunque existan (aprobado por Yama el
// 14-11-2026): las de renders por ciudad sin ningún clic en 16 meses. Siguen en
// la web; llevan noindex, no van al sitemap y, desde el 18-11-2026, tampoco a los menús
// (src/lib/paises.mjs). Ver cambios-aprobados.json.
import cambios from '../data/cambios-aprobados.json';

export const sinIndexar = new Set<string>(cambios.paginas_sin_indexar?.paginas ?? []);

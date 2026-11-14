// Páginas que no deben salir en Google aunque existan (aprobado por Yama el
// 14-11-2026): las de renders por ciudad sin ningún clic en 16 meses. Siguen en
// la web y en el menú; llevan noindex y no van al sitemap. Ver cambios-aprobados.json.
import cambios from '../data/cambios-aprobados.json';

export const sinIndexar = new Set<string>(cambios.paginas_sin_indexar?.paginas ?? []);

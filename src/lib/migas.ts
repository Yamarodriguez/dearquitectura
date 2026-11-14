// Migas de pan: Inicio › página (todas las URL cuelgan de la raíz). En la Fase 4
// se podrán añadir secciones intermedias (Renders, Arquitectura…) desde los menús.
export type Miga = { nombre: string; url: string };
const DOMINIO = 'https://dearquitectura.info';

export function migasDe(url: string, nombre: string): Miga[] {
  const inicio = { nombre: 'Inicio', url: `${DOMINIO}/` };
  if (url.replace(/^https?:\/\/[^/]+/, '') === '/') return [inicio];
  return [inicio, { nombre, url }];
}

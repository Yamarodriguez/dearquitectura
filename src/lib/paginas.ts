// Todas las páginas de la web:
// - src/content/pages/: las de WordPress (las rehace `npm run extraer` desde el XML; no tocar a mano);
// - src/content/nuevas/: las páginas nuevas escritas para la web nueva (19-11-2026 en adelante),
//   aparte para que regenerar desde el XML no las borre. Mismo formato (bloques + árbol de Elementor).
export const paginas: any[] = Object.values(
  import.meta.glob(['../content/pages/*.json', '../content/nuevas/*.json'], { eager: true }),
).map((m: any) => m.default);

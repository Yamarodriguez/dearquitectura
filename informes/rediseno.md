# Rediseño (16-11-2026)

Yama pidió «rediseñar toda la web para que sea más linda y rápida» y que fuera «profesional», con webs de referencia recomendadas por Claude. Lo aprobó el mismo día («apruebo el diseño») y está en `main`.

## Referencias
- Estudios con web sobria y fotos grandes: Snøhetta, BIG, Olson Kundig.
- Estudios de render: Binyan, Kilograph.
- Revistas de arquitectura, para la parte informativa.

## Qué cambia
- **Aspecto:**
  - Una sola letra (Manrope, guardada en la web).
  - Negro tinta, blanco, un tono piedra para las bandas y terracota para los botones de contacto.
  - Cabecera fija con el logo limpio (sin fondo blanco) y el menú con desplegables.
  - «Contacto» destacado como botón.
  - Menú del móvil a pantalla completa, con su propio scroll.
  - Migas visibles («Inicio / Tipos / Arquitectura Bizantina»).
  - Banda de color en la primera sección de cada página.
  - Rejillas de páginas en forma de tarjetas.
  - Preguntas desplegables con «+».
  - Botones y formulario nuevos.
  - Ficha «Resumen» limpia.
  - Pie oscuro en columnas.
- **No cambia:**
  - Textos, fotos, enlaces, títulos, descripciones y direcciones.
  - El orden del contenido y la colocación de cada página (columnas y rejillas de Elementor).
  - Las comprobaciones lo confirman: C1, C2, SEO y maquetación, a 0.
- **Cómo funciona:**
  - `public/diseno/base.css` tiene todo el diseño.
  - `public/diseno/post-<id>.css` tiene solo la colocación de cada página, sacada de Elementor por `scripts/estilos-diseno.mjs` (va en `npm run generar`).
  - Los estilos de WordPress pasan a `estilos-wordpress/` y ya no se publican.
- **Etiquetas nuevas, no son contenido:**
  - Títulos de las columnas del pie: «Arquitectura», «Renders y 3D», «Estudio».
  - Migas visibles.

## Velocidad (móvil con 4G simulado, `scripts/velocidad.mjs`)

| Página | LCP antes → ahora | Peso antes → ahora |
|---|---|---|
| Portada | 1,0 → 0,7 s | 500 → 410 KB |
| Arquitectura bizantina | 1,1 → 0,6 s | 535 → 205 KB |
| Renders Madrid | 1,2 → 0,7 s | 367 → 142 KB |
| Contacto | 1,0 → 0,8 s | 438 → 108 KB |
| Valencia | 1,1 → 0,7 s | 412 → 350 KB |

CLS sigue en 0. Los estilos pasan de unos 600 KB más el fichero de cada página a unos 30 KB más unos 5 KB por página (comprimidos).

## Comprobaciones
`npm run todo` y `todo:visual`, a 0.

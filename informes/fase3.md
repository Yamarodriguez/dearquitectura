# Fase 3 — Diseño: copia exacta (14-11-2026)

Yama pidió «cópiala igual». En vez de propuestas nuevas, la web nueva usa **los mismos
estilos que WordPress** (tema OceanWP + Elementor) y pinta cada página con **la misma
estructura** que Elementor.

## Cómo
- `scripts/bajar-estilos.mjs`: baja de la web viva los estilos del tema, de Elementor y de los plugins, las tipografías (Mulish, Roboto, Roboto Slab, en local) y los iconos, más el fichero de estilos propio de cada página (`post-<id>.css`, 326 + el del kit `post-7.css`). En `public/estilos/` con la misma ruta que tenían.
- `scripts/unir-estilos.mjs`: los junta en `antes.css` y `despues.css`, en el mismo orden que WordPress; cada página carga entre los dos su `post-<id>.css`.
- `scripts/extraer-xml.mjs` guarda ahora el **árbol de Elementor** de cada página (contenedores y widgets con su id y sus clases), y se pinta con `src/components/elementor/` (Nodo y Widget) con el mismo marcado que WordPress.
- Cabecera, menú (escritorio con desplegables y móvil con «+»), barra superior con el correo, pie de 4 columnas y botón de subir: el mismo marcado de OceanWP. Cada página con su logo (las de renders llevan el logo «renders 3D», como en WordPress).
- Lo que en WordPress hacía JavaScript (jQuery, superfish, Elementor) va en `public/estilos/propio.js` y `propio.css`, sin librerías.
- Formulario de contacto: mismo marcado de Contact Form 7, para Netlify Forms (Fase 5).

## Comprobado
- `npm run todo` a 0, con un paso nuevo, **Maquetación**: los 166.788 elementos de Elementor de las 309 páginas comparables están en la nueva, en el mismo orden y con las mismas clases.
- `npm run todo:visual` a 0 (13 tipos de página a 1400 y 390 px): sin 404, sin fotos rotas, sin problemas de contraste, sin desbordes. Usa el Chrome instalado (`channel: 'chrome'`).
- Comparación a ojo y de medidas con copias locales de las páginas originales (`scripts/original-local.mjs` → `dist/_original/`): 15 páginas a 1400 y 390 px, misma altura al píxel (±2 px). Solo cambia el visor 360 (el original sin sus scripts no se puede medir; mide 640 px en los dos).

## Detalles
- Las 17 páginas sin H1 en Elementor llevan el H1 (el título) oculto a la vista, para no cambiar el diseño (D7).
- El navegador de Claude tiene bloqueado dearquitectura.info: la comparación se hizo con las copias locales.
- AdSense: la cabecera ya no va en shadow DOM (es la de OceanWP, igual que ahora). Se probará al activarlo (Fase 7) si los anuncios automáticos se meten en la cabecera.
- Fallo del original añadido: /renders-viladecans/ tiene 2 H1 y el segundo es «Construye tu Casa de Contenedores».

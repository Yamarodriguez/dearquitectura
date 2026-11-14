# Fase 1 — Bajar todo (14-11-2026)

## Fuente
- Export nuevo de Yama del 14-11-2026 (`origen/dearquitecturainfo.WordPress.2026-11-14.xml`). El de marzo de 2025 queda en `origen/viejo-2025/`.
- `npm run extraer` → `src/content/pages/*.json` (330), `estructura-viva.json`, `contenido-vivo.json`, `legales-vivos.json`. Detalle en `informes/extraccion.md`.
- Ya incluye desde el principio el HTML de los textos y los enlaces de titulares, fotos y botones. Bloques nuevos frente al kit: `toggle` (1.060 desplegables), `video` (77), `gallery` (20), `lista_paginas` (2). Cada bloque lleva `s` (número de sección de Elementor) para respetar la maquetación.

## Comprobación
- Titulares del export que se encuentran en la web viva: 26.587 de 26.589 (fallan 1 en /render-peru/ y 1 en /render-360/; se mirará en la Fase 2 con C1).

## Web viva (`referencia/`)
- 313 de 330 páginas bajadas.
- **17 páginas dan «error crítico» de WordPress (error 500) en la web actual, también para Google**: /renders/, /render-casa/, /renders-guatemala/, /renders-paraguay/, /renders-costa-rica/, /renders-nicaragua/, /renders-italia/, /renders-portugal/, /renders-edificios/, /renders-brasil/, /renders-france/, /renders-el-salvador/, /renders-honduras/, /renders-puerto-rico/, /renders-estados-unidos/, /renders-australia/, /renders-republica-dominicana/. Todas usan el menú «renders» (17 de las 52 que lo usan). Su contenido está bien en el export: en la web nueva saldrán bien. Para el SEO de esas 17 se usará el título y la descripción de Yoast del export.
- 17 páginas sin H1 tampoco tienen H1 en la web viva → D7 (el título será el H1).

## Fotos (`public/img/`)
- 1.291 fotos (193 MB): las del contenido + las que enseña la web viva (tamaños reducidos que Google tiene indexados) + las de Search Console. Misma ruta que en `/wp-content/uploads/` para la 301 de la Fase 7.
- **7 fotos que usa el contenido ya no existen en el servidor (salen rotas en la web actual)**: La-arquitectura-bioclimatica.jpg (en 41 páginas), sadsa-3.jpg (17), porfolio-de-arquitectura.jpg (6), arquitectura-barroca-caracteristicas-6.jpg (1), y 3 webp de /render-casa/. Lista en `informes/fallos-fotos.json`. Para la lista de erratas del original.

## Pendiente para la Fase 2
- Menús desde `referencia/` (ojo: las 17 páginas rotas usan el menú «renders», que sí se ve en otras 35).
- Las legales siguen vacías: redactarlas en la Fase 4 con los datos del titular.

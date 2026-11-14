# Fase 2 — Motor (14-11-2026)

## Resultado
`npm run todo` **a 0**: 332 páginas compiladas (330 + 404 + gracias).
- Validador (C3): 0 fallos, 0 avisos.
- Encabezados (C1): 326 páginas, 0 diferencias.
- Contenido (C2): 309 páginas comparadas con la web viva, 0 diferencias (textos, botones, enlaces, fotos con su alt, formulario, mapas y menú). Las 17 con error 500 no tienen con qué compararse: su contenido sale del XML.
- SEO: 330 páginas con el mismo título y descripción que la web viva (las 17 rotas, los de Yoast); 326 en `sitemap.xml` (las 4 legales con `noindex`, como en el original).

## Qué hay
- Todas las páginas desde `src/content/pages/*.json` con su URL de siempre; portada incluida.
- 12 menús reales (cada página el suyo, como en OceanWP) y el pie con los mismos enlaces.
- Bloques: titulares, textos con su HTML, fotos (webp 400/800 + original), botones, desplegables, 239 mapas, vídeos de YouTube (sin cookies) y 2 vídeos propios (mp4), galerías, el formulario con los mismos campos y textos, el visor 360 (`[panorama]`, con Pannellum) y la caja «Resumen» de 7 páginas.
- Datos estructurados: Organization, WebSite, WebPage, migas y Service en las 7 de «Resumen».
- Toda la web con `noindex` hasta la Fase 7 (`site.json` → `indexar`). AdSense y GA4 aún apagados.
- Diseño provisional y neutro: el de verdad, en la Fase 3.

## Regenerar
`npm run generar` (extraer del XML → menús → SEO) y después `npm run todo`.

## Fallos del original (src/data/fallos-original.json) — decide Yama
1. 17 páginas con error 500 en la web viva (en la nueva salen bien).
2. 5 botones a páginas que no existen (Construcción, Reformas, Diseños, Interiorismo, IA) en unas 269 páginas.
3. 644 botones sin destino («#») en 65 páginas, sobre todo «Haz clic aquí»: en la nueva, botón sin enlace.
4. 7 fotos que ya no existen: en la nueva no se pintan.
5. 2 H1 en /agencia-de-diseno/.
6. Enlace «Arquitectos» del pie sin la barra final (/arquitectos).
7. «No se han encontrado entradas.» en /renders-ferrol/ y /renders-irun/.
8. Caja «Resumen» con etiquetas en inglés (Service Type, Provider Name, Area).
9. Restos de HTML de ChatGPT en 2 páginas (no se ven; quitados).

## Para fases siguientes
- Fase 6: los 2 vídeos mp4 pesan 76-77 MB cada uno: comprimirlos. Las fotos grandes (la primera de cada página tarda).
- Fase 4: legales vacías; migas con sección intermedia.

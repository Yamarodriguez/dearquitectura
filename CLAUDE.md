# dearquitectura.info — migración de WordPress a Astro

## Quién manda
Yama, no técnico: castellano de España, de tú, sin jerga. Lo hace Claude.
Cada informe dice el estado (local / commit / main desplegado).

## Decisiones (Yama dijo «sigamos» el 14-11-2026 sin contestar las dudas: van por defecto)
- D1 Fuente: XML de WordPress del 14-11-2026 (`_elementor_data`, `npm run extraer`); web en vivo para títulos, descripciones y menú. 17 páginas dan error 500 en vivo: su SEO sale de Yoast.
- D2 Sube a main: Claude, con `npm run todo` y `todo:visual` a 0.
- D3 Diseño: hasta el 16-11-2026, copia exacta. Ese día Yama pidió un rediseño «más lindo, rápido y profesional» y lo aprobó («apruebo el diseño», 16-11-2026); está en main (public/diseno/, informes/rediseno.md). Contenido, URL y SEO no cambian; la colocación de cada página sale de Elementor (`scripts/estilos-diseno.mjs`).
- D4 DNS: se quedan en OVH; el correo (OVH) no se toca.
- D5 Países: todo en la raíz y en castellano, como ahora; ninguna URL se mueve.
- D6 Páginas de ciudad: no se fusionan ni se redirigen; las 86 renders-* sin clics llevan noindex y van fuera del sitemap (aprobado 14-11-2026).
- D7 H1: si Elementor no tiene H1, el H1 es el título (17 páginas), oculto a la vista para no cambiar el diseño.
- D8 Fotos: a `/img/` solo con 301 desde `/wp-content/uploads/`.

## Marca y diseño
Sector: estudio de arquitectura (renders, planos, modelado 3D…) y web informativa, «todo sobre arquitectura» · Lectores: sobre todo Latinoamérica · Diseño: Manrope; tinta #15181c, piedra #f4f1ec, terracota #a8471f (botones de contacto)

## Datos
AdSense ca-pub-7333712322602518 (el mensaje de privacidad de Google ya sale en la web viva, visto 16-11-2026) · GA4 G-SWJY3P4YRP (confirmados; se activan en Fase 7) · WhatsApp, teléfono, correo público, horario: [pendiente] · Formulario: CF7 → arquitectura@dearquitectura.info · DNS y correo: OVH · Repositorio: https://github.com/Yamarodriguez/dearquitectura (main; Netlify publica en cada push) · Netlify: aún no
Titular: Yamandu Rodriguez, Y8543818E, Calle de Finestrat, Valencia · Palabras prohibidas: [pendiente]
Páginas con tráfico: arquitectura-bizantina, -incaica, -urbana, -maya; renders-guatemala, -paraguay, -uruguay (detalle en informes/inventario.md)

## Reglas
Método: PROMPT-MIGRACION-V7.md. Contenido original intocable salvo petición.
Nada inventado. Lo nuevo desde src/data/. `npm run todo` y `todo:visual` a 0.
Regenerar: `npm run generar`. Agentes: PROHIBIDO escribir ficheros.

## Estado
Fase actual: 6 hecha (informes/fase6.md). Fase 5 a falta de la prueba real en Netlify (Yama aún no ha conectado Netlify). Fase 7 preparada sin Netlify: guion del día en informes/lanzamiento.md (registros de OVH, interruptor de site.json, `npm run comprobar:web -- <dirección>`). Análisis SEO/AEO en informes/analisis.md: A hecho; B (títulos), C (repetido) y D (respuestas) esperan a Yama.
Cambios aprobados por Yama: src/data/cambios-aprobados.json (se aplican al regenerar).
Regenerar: `npm run generar` y `npm run todo`. Fallos del original: src/data/fallos-original.json.
Pendiente de Yama: decidir B, C y D del análisis, teléfono o WhatsApp si los quiere en la web, palabras prohibidas, conectar Netlify.

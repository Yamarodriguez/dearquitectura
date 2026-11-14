# dearquitectura.info — migración de WordPress a Astro

## Quién manda
Yama, no técnico: castellano de España, de tú, sin jerga. Lo hace Claude.
Cada informe dice el estado (local / commit / main desplegado).

## Decisiones (Yama dijo «sigamos» el 14-11-2026 sin contestar las dudas: van por defecto)
- D1 Fuente: XML de WordPress del 14-11-2026 (`_elementor_data`, `npm run extraer`); web en vivo para títulos, descripciones y menú. 17 páginas dan error 500 en vivo: su SEO sale de Yoast.
- D2 Sube a main: Claude, con `npm run todo` y `todo:visual` a 0.
- D3 Diseño: COPIA EXACTA del original (Yama: «cópiala igual»). Estilos de OceanWP + Elementor bajados (public/estilos/), árbol de Elementor por página. Ver informes/fase3.md.
- D4 DNS: se quedan en OVH; el correo (OVH) no se toca.
- D5 Países: todo en la raíz y en castellano, como ahora; ninguna URL se mueve.
- D6 Páginas de ciudad: de momento no se tocan. OJO: las 241 renders-* comparten el 84 % del texto (probable causa de la caída); decide Yama.
- D7 H1: si Elementor no tiene H1, el H1 es el título (17 páginas), oculto a la vista para no cambiar el diseño.
- D8 Fotos: a `/img/` solo con 301 desde `/wp-content/uploads/`.

## Marca y diseño
Sector: estudio de arquitectura (renders, planos, modelado 3D…) y web informativa, «todo sobre arquitectura» · Lectores: sobre todo Latinoamérica · Diseño: el mismo de WordPress, sin cambios

## Datos
AdSense ca-pub-7333712322602518 · GA4 G-SWJY3P4YRP (vistos en la web; confirmar) · WhatsApp, teléfono, correo público, horario: [pendiente] · Formulario: CF7 → arquitectura@dearquitectura.info · DNS y correo: OVH · Repositorio: [pendiente] · Netlify: aún no
Titular para legales: [pendiente] · Palabras prohibidas: [pendiente]
Páginas con tráfico: arquitectura-bizantina, -incaica, -urbana, -maya; renders-guatemala, -paraguay, -uruguay (detalle en informes/inventario.md)

## Reglas
Método: PROMPT-MIGRACION-V7.md. Contenido original intocable salvo petición.
Nada inventado. Lo nuevo desde src/data/. `npm run todo` y `todo:visual` a 0.
Regenerar: `npm run generar`. Agentes: PROHIBIDO escribir ficheros.

## Estado
Fase actual: 4 a medias (informes/fase4.md): FAQ, migas, fechas, llms.txt y legales (sin publicar hasta tener titular) hechos. Esperando decisiones de Yama.
Regenerar: `npm run generar` y `npm run todo`. Fallos del original: src/data/fallos-original.json.
Pendiente de Yama: botones rotos (5), titular legales, contacto, palabras prohibidas, diseño, GitHub. Ver informes/inventario.md.

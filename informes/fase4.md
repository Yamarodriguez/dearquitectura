# Fase 4 — Contenido nuevo y SEO (14-11-2026, primera parte)

Hecho sin cambiar nada de lo que se ve (la web es copia exacta):
- **Preguntas frecuentes (FAQPage)** en los datos estructurados: 917 preguntas en 325 páginas, sacadas de los desplegables que ya existen y cuyo título es una pregunta (`src/lib/faq.ts`). No se inventa ni se añade texto.
- **Migas con sección** en los datos estructurados (Inicio › Tipos › Arquitectura Bizantina), sacadas del menú real de cada página (`src/lib/migas.ts`). No se ven en pantalla, como en el original.
- **Fechas** de publicación y última modificación (UTC, de WordPress) en WebPage.
- **/llms.txt** para los buscadores con IA, generado desde las páginas y su SEO (`src/pages/llms.txt.ts`).
- **Textos legales** redactados para esta web (aviso legal, privacidad, cookies y personalizar cookies, `src/lib/legales.ts`). **No se publican hasta tener los datos del titular** (nombre, NIF, dirección en `site.json`); mientras, la página dice «pendiente». El botón de «Personalizar cookies» abre el mensaje de privacidad de Google cuando esté activo.

`npm run todo` y `todo:visual` a 0.

## Diagnóstico de la caída de visitas
- Las 241 páginas `renders-<ciudad/país>` comparten de media el **84 %** del texto (máximo 89 %; medido con bloques de 5 palabras en una muestra de 40). Las de estilos (`arquitectura-*`) solo el 21 %.
- De esas 241: 87 sin ningún clic en 16 meses, 100 con 1-5, 27 con 6-20 y 27 con más de 20. Entre todas suman 1.718 clics; las otras 81 páginas, 1.454.
- Muchas páginas casi iguales hechas en serie es exactamente lo que Google penaliza desde 2024 («contenido a escala»), y la caída empieza en noviembre de 2025. Es la explicación más probable, junto con las 17 páginas rotas (error 500).

## Pendiente de Yama (decisiones)
Ver el mensaje de la sesión: titular, páginas de ciudad, botones rotos y sin destino, contenido visible nuevo, mensaje de cookies de AdSense, fallos pequeños del original.

## Segunda parte (14-11-2026): «haz lo que recomiendas»
Todo en `src/data/cambios-aprobados.json` (se aplica solo al regenerar; para deshacer algo, se quita de ahí):
1. **Titular** en `site.json` (los mismos datos que en contenedoresmaritimos): las 4 legales ya se publican (con `noindex`, como en el original).
2. **86 páginas de renders por ciudad sin ningún clic** en 16 meses: `noindex` y fuera del sitemap (siguen en la web y en el menú). El sitemap pasa de 326 a 240 URL. (/renders-hiperrealistas/ también tenía 0 clics, pero es un servicio, no una ciudad: se queda.)
3. **5 botones rotos** → página más parecida (Construcción y Reformas → /proyectos-de-arquitectura/, Diseños → /agencia-de-diseno/, Interiorismo → /interiorista/, IA → /programas-de-arquitectura/): 2.674 enlaces arreglados (botones, titulares y fotos).
4. **644 botones sin destino** → «Haz clic aquí» a /contacto/; los de la fila de botones (Planos, Renders, Cursos…) al mismo destino que tienen en el resto de la web.
5. Sin contenido visible nuevo: primero se lanza la copia exacta.
6. **AdSense y GA4 confirmados** (en `site.json` → `analytics.confirmados`); se activan en la Fase 7. `public/ads.txt` copiado del original. Pendiente de Yama: activar el mensaje de privacidad de Google para Europa en AdSense.
7. **Fallos pequeños**: quitado el código pegado en /renders-viladecans/ («Construye tu Casa de Contenedores», que era una página HTML entera con un 2.º H1); «Arquitectos» del pie con barra final; «No se han encontrado entradas» vaciado; caja «Resumen» con etiquetas en español.

`npm run todo` y `todo:visual` a 0.

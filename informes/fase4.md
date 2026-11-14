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

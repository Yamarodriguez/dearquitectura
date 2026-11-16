# Análisis de la web: SEO, estructura y AEO (16-11-2026)

Datos utilizados:
- Search Console de los últimos 16 meses (julio de 2025 a noviembre de 2026).
- Las 330 páginas tal como salen en la web nueva (rama `rediseno`).

**AEO** quiere decir que la web responda bien a las preguntas. Así la eligen Google (los resúmenes con IA de arriba), ChatGPT, Perplexity y similares cuando citan fuentes.

## 1. Qué ha pasado con las visitas

| Mes | Clics | Veces que salió en Google | Posición media |
|---|---|---|---|
| oct-2025 | 607 | 78.705 | 17 |
| dic-2025 | 189 | 38.420 | 23 |
| abr-2026 | 57 | 21.020 | 50 |
| ago-2026 | 15 | 18.238 | 64 |
| oct-2026 | 9 | 2.415 | 76 |

La caída va en tres escalones: diciembre de 2025, abril de 2026 y septiembre de 2026. Afecta a **toda la web a la vez**, no a una página concreta. Ese patrón es típico de cuando Google rebaja un sitio entero por contenido repetido o poco útil. Search Console no dice la causa; lo de abajo es lo que encaja con los datos.

**Lectores:** México (926 clics), Argentina, Colombia, Perú, Ecuador, Guatemala… España sale mucho (239.000 apariciones), pero en posición 57: casi no hace clic nadie.

## 2. Lo que ya está bien (con la web nueva)
- Las 17 páginas que daban error en WordPress funcionan.
- Es rápida: lo principal se ve en 0,6–0,8 s en móvil y la página no da saltos.
- Cada página tiene un título y un H1, su canonical y el mapa del sitio.
- Datos para Google: empresa, web, página, migas, preguntas frecuentes y servicio.
- Migas visibles y `llms.txt` (la guía para las IA).
- `robots.txt` deja entrar a los buscadores y a las IA.
- Las 86 páginas de ciudad sin clics van fuera de Google (aprobado el 14-11).
- Fotos: solo 329 de 25.382 sin texto alternativo.
- Las descripciones no están vacías ni repetidas.

## 3. Problemas, de más a menos importante

### P1. Mucho texto repetido en toda la web (lo más grave)
- **Bloques iguales en todas las páginas:** cada página lleva al final las mismas tarjetas, entre 900 y 1.900 palabras idénticas en 326 páginas. Son «Sumérgete en el mundo arquitectónico…», «Maqueta de arquitectura…», libros, cursos, inteligencia artificial… En la portada, solo 88 palabras son suyas; en Contacto, 107.
- **Páginas de ciudad:** las 242 «renders-ciudad» son la misma plantilla cambiando el nombre de la ciudad. Comparten de media el 84 % del texto.
- **Pero traen visitas:** dieron 1.740 de los 3.281 clics de los 16 meses (el 53 %). De las 156 que siguen en Google:

| Clics en 16 meses | Páginas |
|---|---|
| 10 o más | 48 |
| De 3 a 9 | 36 |
| 1 o 2 | 72 |

### P2. Títulos y descripciones que parecen relleno
- **145 títulos** pasan de 60 letras y Google los corta.
- **Muchos repiten la misma palabra**, por ejemplo «Renders Álava - Render Álava - Renders en Álava - Renders 3D».
- **Efecto en los clics:** «arquitectura de los incas» sale en la posición 5 (7.716 veces) con un 0,04 % de clics, y «arquitectura inca» en la posición 8 (8.122 veces) con un 0,07 %. Estar tan arriba y que casi nadie entre apunta a un título poco atractivo, además de que Google ya responde arriba con su resumen.

### P3. Preguntas frecuentes repetidas
- La pregunta «¿Qué es la Arquitectura? Significado» va marcada para Google como pregunta frecuente en **325 páginas**.
- Cada artículo solo tiene otra pregunta propia («¿Qué es la arquitectura bizantina?»).
- Para Google es la misma respuesta copiada en toda la web.

### P4. Poca confianza (lo que Google y las IA miran para citar a alguien)
- No hay página de «Quiénes somos» ni autor en los artículos.
- No se ven fechas.
- En los datos de empresa solo están el nombre, el logo y el correo.
- **Ningún enlace a fuentes:** 0 enlaces externos en las páginas de arquitectura bizantina y de arquitectura inca.

### P5. Los artículos no responden pronto
- **No contestan nada al principio.** La página de arquitectura inca empieza con «Explorando la majestuosidad…» y «En este artículo exploraremos…». Las IA citan la frase que responde, y esa frase está más abajo.
- **Titulares repetidos o con dos puntos:** «Arquitectura Inca Machu Picchu:» y justo después «Arquitectura Machu Picchu».
- **Ni tablas ni datos clave** (época, lugar, materiales, ejemplos), que es lo que más se cita.

### P6. Temas con interés que están flojos
| Página | Apariciones en Google | Posición |
|---|---|---|
| Arquitectura mediterránea | 8.547 | 37 |
| Arquitectura industrial | 7.770 | 34 |
| Arquitectura barroca | 5.480 | 33 |
| Arquitectura griega | 4.954 | 20 |

- Salen mucho, pero en la tercera o cuarta página de resultados.
- La barroca, además, no recibe enlaces desde el texto de ninguna otra página.
- Otras **31 páginas** que siguen en Google tampoco reciben enlaces desde el texto; solo se llega a ellas por el menú.
- **Estilos que faltan** y encajarían con los lectores: gótica, románica, renacentista, azteca y colonial. Antes de escribirlos hay que comprobar que se buscan; Search Console no lo dice porque esas páginas no existen.

## 4. Propuestas (las letras son para elegir)

**A. Arreglos técnicos, sin tocar textos.** Riesgo bajo; los puede hacer Claude ya.
- A1. Preguntas frecuentes para Google: quitar la pregunta genérica repetida y dejar solo las de cada página.
- A2. Marcar los artículos de estilos (14) y de profesiones como **artículo**, con fecha de actualización y «DE Arquitectura» como editor.
- A3. Fecha visible en los artículos («Actualizado: …», la de WordPress).
- A4. Datos de empresa: añadir Valencia. Las redes sociales o el teléfono, solo si Yama los da.
- A5. Enlazar desde el texto las 31 páginas sin enlaces y unir los estilos entre sí (bizantina ↔ romana, griega ↔ neoclásica…).

**B. Títulos y descripciones nuevos, sin repeticiones.**
- Ejemplos:
  - «Arquitectura inca: características, tipos y ejemplos (Machu Picchu)».
  - «Renders en Guatemala | DE Arquitectura».
- Empezar por las 21 páginas que traen visitas (los 14 estilos y las 7 de más tráfico) y luego las de ciudad con una fórmula fija.
- Cambia lo que se acordó en D1 (títulos iguales que los de la web viva): necesita el sí de Yama.

**C. Quitar lo repetido.** Es lo de más impacto y necesita decidir.
- C1. Las tarjetas comunes (900–1.900 palabras iguales en cada página) se quedan en la portada y en las páginas de sección. En el resto se cambian por un bloque corto de «Páginas relacionadas» (4–6 enlaces del mismo tema).
- C2. Páginas de ciudad:
  - Las 48 con 10 clics o más se quedan y se mejoran con información propia de la ciudad o del país.
  - Las 72 con 1 o 2 clics salen de Google (noindex, como las 86) **o** se quedan como están.
  - Ninguna dirección se borra ni se redirige (D6).

**D. Responder mejor (AEO).** Texto nuevo: lo redacta Claude y lo aprueba Yama antes de publicarlo.
- D1. Debajo del H1 de cada artículo, una **respuesta corta** de 40 a 60 palabras: qué es, de qué época, rasgos y un ejemplo. Por ejemplo, Santa Sofía para la bizantina.
- D2. Una tabla de **datos clave**: época, lugar, materiales y obras.
- D3. Dos o tres **fuentes** fiables por artículo, como la UNESCO o museos.
- D4. Ordenar los titulares: sin dos puntos, sin repetidos y en forma de pregunta donde encaje.
- D5. Página de **Quiénes somos** con datos reales que dé Yama: quién está detrás, experiencia, trabajos. No se inventa nada.

**E. Más adelante:** mejorar mediterránea, industrial, barroca y griega, y comprobar si merece la pena escribir los estilos que faltan.

## Recomendación de orden
1. A (todo) y B, ya.
2. C1 y D en los 14 estilos y las 7 páginas con más tráfico, antes de lanzar.
3. Lanzar y mirar Search Console a las 2–4 semanas.
4. C2 y E con datos nuevos.

Recuperar una web rebajada por Google lleva meses, no semanas, y no hay garantía. Lo que más ayuda es quitar lo repetido (C) y dar respuestas propias y fiables (D).

## Estado
Solo análisis, sin cambios en la web. El informe está en la rama `rediseno` (local).

## Hecho: A (16-11-2026, Yama eligió «a»)
- **A1. Preguntas frecuentes:**
  - Las preguntas que salen en más de 3 páginas solo se marcan en su página principal: «¿Qué es la arquitectura?» en la portada y las de renders en /renders/. Está en `src/lib/faq.ts`.
  - Antes eran 325 páginas con la misma pregunta; ahora 68 páginas, cada una con las suyas.
- **A2. Artículos para Google:**
  - 33 páginas informativas van marcadas como artículo, con las fechas de WordPress y «DE Arquitectura» como autor y editor: los 13 estilos, las 15 profesiones y otras 5.
  - La lista está en `src/data/articulos.json`.
- **A3. Fecha visible:** esas mismas páginas enseñan «Actualizado el …» junto a las migas.
- **A4. Datos de empresa:** se añade la ciudad, Valencia, España (en `site.json`: `localidad` y `pais`).
- **A5. Páginas relacionadas** al final de la página (`src/data/relacionadas.json`):
  - Los estilos enlazan entre sí y las profesiones también.
  - Las 4 páginas a las que no llegaba ningún enlace, ni del texto ni del menú, se enlazan desde su página principal:
    - Home staging Valencia ← Home staging.
    - Mijas ← Málaga.
    - Sant Cugat ← Barcelona.
    - San Sebastián de los Reyes ← Madrid.
  - Las otras 27 de la lista ya estaban en algún menú.
- **Textos originales:** no se cambia ninguno. `npm run todo` y `todo:visual` siguen a 0.

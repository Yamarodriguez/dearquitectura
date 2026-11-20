# Páginas que faltan (19-11-2026)

Son las **31 direcciones a las que la web enlaza y que no existen**, todas de las tarjetas y textos del WordPress original. Desde el 17-11 llevan a la página parecida más cercana (`cambios-aprobados.json`). Además se han tenido en cuenta los temas que salieron en los estudios.

## Se crean: 19 páginas con tema propio

| Grupo | Página | Enlaces que ya apuntan a ella | Demanda | Choca con otra página |
|---|---|---|---|---|
| Estilos | Arquitectura gótica | ~270 páginas (tarjeta) | Alta (tema de colegio y universidad; parecida a la bizantina, que salió 25.000 veces en Google) | No |
| Estilos | Arquitectura renacentista | ~270 | Alta | No |
| Estilos | Arquitectura egipcia | ~270 | Alta | No |
| Estilos | Arquitectura azteca | ~270 | Alta; muy de Latinoamérica (va en el grupo de inca y maya) | No |
| Estilos | Arquitectura brutalista | ~270 | Media | No |
| Tipos de render | Renders de exteriores | ~245 | Ya se busca («renders exteriores Sevilla»: 354 apariciones) | Poco con render-casa (que habla de casas) |
| Tipos de render | Renders de fachadas | ~245 | Media | Poco con renders-edificios |
| Tipos de render | Renders de locales comerciales | ~257 | «render local comercial»: 479 | No |
| Tipos de render | Render de producto | ~257 | 334 apariciones (Barcelona, Panamá, Valladolid) | Poco con sofa-render |
| Tipos de render | Renders nocturnos | ~257 | Baja | No |
| Tipos de render | Render de cafeterías y restaurantes | ~245 | Baja | No |
| Tipos de render | Vídeo render (animaciones) | ~258 | «animaciones arquitectónicas»: 217 | No. **Solo si haces animaciones** |
| Tipos de render | Render de logos | ~257 | Baja | No. **Solo si lo ofreces** |
| Servicios | Diseño arquitectónico | 60+ | «diseño arquitectura» y variantes: 4.876 apariciones | Algo con agencia-de-diseno |
| Servicios | Reformas | 60+ | «diseño 3D reformas»: 589 | Algo con proyectos-de-arquitectura |
| Servicios | Construcción | 60+ | Media | Algo con proyectos-de-arquitectura |
| Servicios | Interiorismo | 60+ | 1.148 (renders de interiorismo) | Algo con interiorista (profesión frente a disciplina) |
| Informativa | Inteligencia artificial en arquitectura | pocas | Tema en alza | Poco con programas-de-arquitectura |
| Precios | ¿Cuánto cuesta un render? | ~516 | La gana la competencia | **Necesita los precios reales de Yama** |

## No se crean: 12 que repetirían una página que ya existe
Siguen llevando a la página que ya existe, que es la buena:
- Errores o variantes de escritura: `arquitectura-Barroca`, `arquitectos`, `porfolios-arquitectura`, `avila`, `renders-baños`, `renders-bahai-blanca`.
- Repiten el tema de otra:
  - `renders-realistas` → Renders hiperrealistas.
  - `arquitectos-modernistas` → Arquitecto moderno.
  - `render-studio` → Empresa de renders.
  - `render-profesionales` → Renderista.
  - `proyecto-render` → Servicios de renders.

## Estructura (la misma que ya tienen las páginas, con lo que pidió el estudio)

**Estilos:** la misma de la neoclásica o la bizantina.
1. Portada: foto, H1, subtítulo y presentación.
2. **Respuesta corta y datos clave** (época, lugar, materiales, obras).
3. Historia.
4. Características (H3 por rasgo).
5. Materiales y técnicas.
6. Obras y ejemplos.
7. Preguntas frecuentes (desplegables).
8. Otros estilos (tarjetas).
9. Fuentes.

**Tipos de render:** la misma de piscinas o salas.
1. Portada: foto, H1, presentación y botón de contacto.
2. Qué es.
3. Para qué sirve.
4. Qué incluye.
5. Para quién (particulares, inmobiliarias, estudios).
6. Cómo se hace (de los planos a las imágenes).
7. Preguntas frecuentes.
8. Otros tipos de render (tarjetas).
9. Contacto.

**Servicios:** como la de Proyectos de arquitectura, con el mismo esquema que los tipos de render.

**Lo que no se copia, a propósito:**
- Las secciones que solo repiten la palabra clave («Renders de X online», «Empresas de renders de X», «Precio de render de X» sin precios).
- Los bloques de tarjetas que se repiten en todas las páginas.

Es lo que más daño hace en Google (análisis, P1). Cada página nueva tiene texto propio.

## Cómo se hacen
- **Dónde:** en `src/content/nuevas/`, aparte de las del WordPress, para que regenerar la web desde el XML no las borre. Mismo diseño, mismas migas, datos para Google (artículo y preguntas) y bloque de relacionadas. Van en el mapa del sitio y, hasta el lanzamiento, sin indexar como todas.
- **Enlaces:** al crear cada página se quita su desvío de `cambios-aprobados.json`, así que las tarjetas que ya la anuncian pasan a llevar a ella.
- **Textos:** los escribe Claude con datos que se pueden comprobar, con 2 o 3 fuentes por artículo, y Yama los aprueba antes de publicar. Nada de precios, plazos ni promesas.
- **Fotos:** solo hay **una por tema** (la de su tarjeta). Las páginas parecidas tienen entre 40 y 100. Para los ejemplos de los estilos hacen falta más; hay dos opciones:
  - fotos de Wikimedia Commons con licencia libre, citando al autor;
  - fotos de Yama.

## Hecho: los 5 estilos (19-11-2026, Yama: «Sí, los 5 estilos»), en la rama `paginas-estilos`
- **Páginas:** arquitectura gótica, renacentista, egipcia, azteca y brutalista, con unas 900–1.000 palabras cada una.
- **Estructura:**
  - Portada: foto, H1, subtítulo y presentación.
  - «En resumen» y una tabla de datos clave.
  - Historia.
  - Características, con sus H3.
  - Materiales y técnicas.
  - Una sección de América cuando encaja.
  - 4 obras con foto.
  - 4 preguntas frecuentes.
  - Fuentes (Wikipedia y UNESCO) y créditos de las fotos.
- **Textos:** en `src/data/nuevas/<slug>.json`. Las páginas las monta `scripts/paginas-nuevas.mjs` en `src/content/nuevas/`; está en `npm run generar`.
- **Fotos:** 20 de Wikimedia Commons con licencia libre (CC BY, CC BY-SA, CC0, FAL o dominio público), con autor y enlace a su ficha.
  - En la portada de cada página va la foto de su tarjeta original.
  - En la azteca va el Templo Mayor, porque la foto de la tarjeta es Teotihuacán, que es anterior a los aztecas.
- **Conexiones:**
  - Las tarjetas que ya las anunciaban en unas 270 páginas llevan ahora a ellas (se quitaron sus desvíos de `cambios-aprobados.json`).
  - Están en el desplegable de estilos de todos los menús, en la ruta de arriba («Inicio / Tipos / …»), en el bloque «Otros estilos», en el mapa del sitio y en `llms.txt`.
  - Datos para Google: artículo, migas y preguntas frecuentes.
  - Enlaces dentro del texto a sus estilos hermanos (gótica ↔ románica y renacentista, azteca ↔ maya e inca…).
- `npm run todo` y `todo:visual`, a 0.

## Hecho: 6 tipos de render (19-11-2026, Yama: «Sí, los renders»)
- **Páginas:** renders exteriores, de fachadas, de locales comerciales, de producto, nocturnos y de cafeterías y restaurantes, con unas 600–700 palabras cada una.
- **Estructura (la de piscinas o salas, sin las secciones repetidas):**
  - Portada con botón «Pide presupuesto».
  - «En resumen» con datos clave.
  - Qué es, para qué sirve, qué incluye y cómo se hace.
  - Imágenes de ejemplo de la propia web, cuando hay varias.
  - 4 preguntas frecuentes.
  - Cierre de contacto.
- **Lo que no se pone:** precios, plazos ni promesas.
- **Conexiones:**
  - Las tarjetas que ya las anunciaban llevan a ellas (se quitaron los desvíos).
  - Están en el desplegable «Tipos» de los menús de renders y en la ruta de arriba («Inicio / Tipos de renders / …»).
  - El bloque «Otros tipos de render» sale en las 31 páginas de tipos de render: las 25 que había y las 6 nuevas.
- **Pendientes:** vídeo render y render de logos, a la espera de que Yama confirme si ofrece esos servicios.
- **Comprobador:** se añade el aviso de títulos de más de 60 letras y descripciones de más de 160 en las páginas nuevas. Por esa regla se acortaron también los títulos de la azteca y la renacentista y tres descripciones de estilos.

## Hecho: vídeo render y render de logos (19-11-2026, Yama confirmó que ofrece los dos: «Sí, las dos»)
- Misma estructura que los otros tipos de render.
- El vídeo render lleva la animación que ya había en la web (`/img/2024/01/RENDER.mp4`, la de Render casa).

## Hecho: 4 servicios (19-11-2026, Yama: «Sí, los servicios»)
- **Páginas:** diseños arquitectónicos, reformas, construcción e interiorismo, en las direcciones a las que ya apuntaban las tarjetas.
- **Qué cuentan:** qué es cada servicio, sus fases y sus tipos, y cómo ayudan los planos, el modelado 3D y los renders.
- **Lo que no se dice:** que el estudio construya o haga obras. Se habla de diseño, planos, imágenes y asesoramiento, como en las tarjetas originales.
- **Conexiones:** desplegable Servicios del menú principal, ruta «Inicio / Servicios / …» y bloque «Otros servicios» en todas las páginas de servicios.

## Hecho: inteligencia artificial en arquitectura (19-11-2026, Yama: «Sí, el de IA»)
- **Artículo** en la dirección a la que apuntaban las tarjetas.
- **Contenido:** qué es, usos (imágenes de concepto, renders rápidos, diseño generativo, documentación, interiorismo), ventajas, límites y riesgos, y si sustituirá al arquitecto.
- **Datos de herramientas comprobados en las notas de prensa:** Autodesk compró Spacemaker en 2020 (hoy dentro de Forma) y Chaos compró EvolveLAB, la de Veras, en 2025.
- **Enlaces:** con Programas de arquitectura en los dos sentidos, y con renders, modelado 3D y home staging.
- **No se dice** que el estudio use IA.

## Hecho: el bloque común en las 18 páginas nuevas (19-11-2026)
Yama: «mirar esa estructura [render-casa] y agregar lo que falta en las que hicimos, misma estructura siguiendo los mismos patrones con los títulos y todo, más lo agregado por nosotros».
- Cada página nueva lleva ahora, después de su contenido propio y sus preguntas, el **bloque común** de su tipo, igual que las páginas de WordPress. Se copia de la página modelo con los mismos elementos y la misma colocación:
  - **Renders:** de Render casa (secciones 31 y 34 a 119). Lleva las preguntas sobre renders, «Otros tipos de renders de X», servicios, renderista, precio, vídeo, empresas, freelance, cursos, estudio, arquitectos, plataforma, agencia, construcción/reformas/diseños/interiorismo, tipos de arquitectura, dibujos, planos, maquetas, portafolios, libros, revistas, programas e IA.
  - **Estilos:** de Arquitectura neoclásica (secciones 16 a 71).
  - **Servicios e IA:** de Proyectos de arquitectura (secciones 3 a 58).
- **La palabra clave** se cambia como hacía WordPress (`comun.terminos` en cada `src/data/nuevas/<slug>.json`):
  - «Planos de Casas» pasa a «Planos de Exteriores» y «ARQUITECTOS neoclásicos» a «ARQUITECTOS góticos».
  - En renders y estilos se cambia en títulos y textos; en servicios, solo en los títulos H2, porque los H3 son nombres de tarjetas.
  - En la IA, sin cambios.
- **Se mantiene lo añadido por nosotros:** resumen con tabla, preguntas propias, fuentes y relacionadas.
- **Colocación:** la página carga también el `post-<id>.css` de su modelo (`modelo_id`).
- **Tamaño:** las páginas pasan de 600–1.000 a 2.400–3.800 palabras, como las de WordPress.
- **Aviso:** es el mismo bloque repetido que el análisis señaló como el problema número 1 (P1). Se hace porque Yama lo pidió expresamente. Si un día se aplica la parte C, se quitaría de todas a la vez.

## Hecho: textos propios en el bloque común de las 18 páginas nuevas (19-11-2026)
Yama: «cámbialo, modifícalo sin sacar las palabras clave y haz lo mismo pero diferente». Primero se probó en Renders exteriores («sí») y luego en las otras 17 («Sí, las 17»).
- **Qué cambia:** el texto de debajo de cada título del bloque común se escribe de nuevo para el tema de la página. Los títulos, las palabras clave, los botones y los enlaces no cambian.
- **Dónde está:** en `comun.textos` (por id del elemento de Elementor) y `comun.preguntas` (por «id#número» del desplegable) de cada `src/data/nuevas/<slug>.json`.
- **Cuántos:** por página, 41 textos y 10 respuestas en renders, 23 y 1 en estilos, y 18 y 6 en servicios e IA; unos 550 en total.
- **Qué no se toca:** la misión y los rótulos cortos de navegación (3 o 4 por página) siguen como en el modelo.
- **Revisado con un script:**
  - todos los ids están;
  - la longitud es parecida a la del original;
  - no hay precios, cifras ni plazos nuevos, salvo «pocos días» o «varias semanas», que ya estaban;
  - no hay enlaces dentro del texto;
  - no se dice que el estudio construya ni que use IA;
  - no se repiten frases entre las 17 páginas, salvo la presentación «Somos De Arquitectura, estudio de arquitectura e interiorismo».
- **Datos históricos (estilos):** solo los de manual, como Imhotep, Villard de Honnecourt, Brunelleschi, Palladio, el Templo Mayor (Matos Moctezuma), la Unité d'Habitation o Torres Blancas.
- **Lo que sigue saliendo porque ya estaba en el texto original del modelo:** dirección de obra (estilos góticos y renacentistas), maquetas y agencia de diseño. Yama puede pedir que se quite.

## Hecho: 3 tipos de render más (20-11-2026, Yama: «armar los que nos faltan», con la lista de tipos de renders.studio)
- **Comparación:** de los 31 tipos de la lista, la web ya tenía 26 (algunos con otra dirección: render-online, render-express, render-salon, sofa-render, renders-para-inmobiliarias…). Faltaban 5:
  - **Se crean 3:** Renders de campings (`/renders-camping/`), Renders de hoteles (`/renders-hoteles/`) y Renders para arquitectos (`/renders-para-arquitectos/`).
  - **No se crean 2**, como se decidió el 19-11: «Renders realistas» repite Renders hiperrealistas y «Renders profesionales» repite Renderista; esas direcciones ya llevan a ellas (`cambios-aprobados.json`).
- **Estructura:** la misma que las otras páginas nuevas de renders (portada con botón, «En resumen» con datos, qué es / para qué sirve / qué incluye / cómo se hace, preguntas, bloque común de Render casa con textos propios y cierre de contacto).
- **Fotos de la propia web:** camping, la entrada del glamping de Renders de parques; hoteles, el dormitorio de Renders de habitaciones (más piscina y baño en la galería); arquitectos, la planta 3D de Render casa (más un plano y una axonometría de oficinas).
- **Conexiones:** desplegable «Tipos» de los menús de renders, ruta «Inicio / Tipos de renders / …», bloque «Otros tipos de render», mapa del sitio y `llms.txt`.
- **Palabra clave del bloque común:** «Casas» pasa a «Campings», «Hoteles» y «Arquitectos». En la de arquitectos, el título «ARQUITECTOS DE Casas» pasa a «ARQUITECTOS Y ESTUDIOS» para no decir «Arquitectos de Arquitectos».
- Sin precios, plazos concretos ni promesas. `npm run todo` y `todo:visual`, a 0.
- **Tarjetas en las páginas índice (20-11-2026, «sigue»):** Tipos de renders, Renders y Servicios de renders llevan una fila más con las 3 tarjetas (Campings, Hoteles, Para arquitectos), debajo de las de WordPress. Se añaden con `scripts/anadidos.mjs` (nuevo campo `tarjetas` en `src/data/anadidos/<slug>.json`), sin tocar lo de WordPress; una regla en `public/diseno/base.css` las pone en fila.

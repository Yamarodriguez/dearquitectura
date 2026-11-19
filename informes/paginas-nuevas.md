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

# Análisis final antes de la migración (20-11-2026)

Yama: «hacer un análisis final del SEO, AEO y todo lo necesario para indexar (robots.txt, etc.) para ya hacer la migración».

Se ha construido la web **tal como será el día del cambio**, en una copia aparte con Google encendido (`indexar: true`, GA4 y AdSense puestos), y se ha revisado página a página.

## Veredicto
**La web está lista para migrar.**
- Todas las comprobaciones dan 0 fallos, también con Google encendido.
- Ninguna dirección de la web vieja se pierde.

Quedan tres cosas que tiene que hacer Yama (apartado 8) y una mejora importante para después (apartado 7).

## 1. Lo que Google necesita para indexar

| Qué | Cómo queda | Estado |
|---|---|---|
| robots.txt | Las mismas reglas que tenía Yoast (todo permitido; AdsBot fuera) y la dirección del mapa | Bien |
| Mapa del sitio | 258 páginas: las 240 de WordPress que se indexan y las 18 nuevas. Fuera quedan las legales y las 86 ciudades sin clics aprobadas | Bien |
| Mapa: fechas y fotos | Nuevo: fecha de última actualización en cada página y 19.186 fotos, como el mapa de fotos que tenía WordPress | Mejorado hoy |
| Página «principal» (canónica) | Las 258 apuntan a sí mismas con `https://dearquitectura.info/…/` | Bien |
| noindex | 91 páginas: las 86 ciudades aprobadas, las legales, /gracias/ y la 404. Ninguna está en el mapa | Bien |
| Direcciones viejas | Las 327 del mapa de WordPress existen igual (326) o redirigen (1, el visor de panorámicas) | Bien |
| Fotos viejas | /wp-content/uploads/… → /img/… con 301 (probado en Netlify) | Bien |
| Mapas viejos | sitemap_index.xml, page-sitemap.xml y bppiv-image-viewer-sitemap.xml → sitemap.xml | Bien |
| Direcciones mal escritas | Sin barra final o con mayúsculas → 301 a la buena. Las que no existen → 404 | Bien |
| HTTPS | Netlify pone el candado y obliga a usarlo (HSTS) | Bien |
| ads.txt | Igual que el de la web viva | Bien |
| Verificación de Bing | La web viva tenía el código `msvalidate.01` y la nueva no: se habría perdido. Ya está puesto | Arreglado hoy |
| Verificación de Google | Yama confirmó el 20-11-2026 que Search Console está verificado con **Google Analytics**. La web nueva lleva la misma etiqueta (G-SWJY3P4YRP) al principio de la cabecera, en el orden estándar de Google, y se mantiene en cuanto se enciende el interruptor | Bien |

## 2. Cada página, una a una (las 258 indexables)
- **Título, descripción, canónica, idioma, vista de móvil:** en todas.
- **Imagen para redes (og:image):** faltaba en las 18 páginas nuevas; ya la llevan (su foto principal).
- **Un solo H1:** en todas menos Agencia de diseño, que trae dos de WordPress. Está anotado en fallos-original.json a la espera de que Yama decida; se puede dejar el primero como H1 y pasar el segundo a H2.
- **Títulos largos:** 37 títulos de WordPress pasan de 65 caracteres, como «Renders Albacete - Render Albacete - Renders en Albacete - Renders». No es un error: Google los corta. Se dejaron como en la web viva para no mover el posicionamiento el día del cambio. Se pueden mejorar después con la fórmula de la parte B.
- **Títulos o descripciones repetidos:** ninguno.
- **Enlaces:** 0 rotos y todos llevan a su sitio (revisión del 20-11-2026). Las 258 páginas reciben enlaces de otras páginas.

## 3. Datos para Google y las IA (AEO)
- **Datos estructurados sin errores:**
  - Empresa (Organization) y web (WebSite) en todas las páginas.
  - Migas (BreadcrumbList) en 348.
  - Artículo (Article, con fechas) en 39.
  - Preguntas frecuentes (FAQPage) en 85.
  - Servicio (Service) en 7.
- **llms.txt:** el resumen de la web para buscadores con IA (ChatGPT, Perplexity…). Ahora las páginas nuevas también llevan su descripción.
- **robots.txt:** no bloquea a ningún robot de IA. Pueden leer la web y citarla.
- **Respuesta corta, tabla de datos y fuentes:** ya las tienen las 18 páginas nuevas («En resumen» y «Fuentes»). A los artículos antiguos les falta (parte D del análisis).
- **Datos de la empresa:** nombre, correo, Valencia y logo. Faltan teléfono, WhatsApp y redes sociales; solo se pondrán si Yama los da.

## 4. Velocidad (medida en móvil)
- **Peso:** la página más pesada ocupa 40 KB comprimida. Una página de estilo completa, con Analytics y anuncios, pesa unos 320 KB en total.
- **Estabilidad:** nada se mueve mientras carga (CLS 0).
- **Fotos:** todas llevan sus medidas, se sirven en webp con varios tamaños y se cargan al acercarse a ellas.
- **Medición real:** la mide Search Console («Métricas web principales») en las semanas siguientes al cambio. Hoy no se pudo pasar Lighthouse aquí: no se permitió descargarlo.

## 5. Analytics, anuncios y privacidad
- **GA4** (G-SWJY3P4YRP) y **AdSense** (ca-pub-7333712322602518) se encienden con el interruptor del día. El comprobador no deja subir la web con Google encendido si falta alguno.
- **Nuevo hoy: modo de consentimiento de Google**, solo para Europa (UE, Reino Unido y Suiza).
  - Las cookies de Analytics y de anuncios esperan a que el lector acepte en el mensaje de privacidad de Google, que Yama ya tiene activo en AdSense, como pide la ley.
  - En Latinoamérica funciona igual que ahora.
  - La web vieja cargaba Analytics sin preguntar.

## 6. Lo arreglado hoy (en main)
1. Verificación de Bing (`msvalidate.01`), copiada de la web viva.
2. Mapa del sitio con fecha de actualización y fotos.
3. Imagen para redes en las 18 páginas nuevas.
4. Descripción de las páginas nuevas en llms.txt.
5. Modo de consentimiento de Google para Europa.

## 7. El riesgo que sigue (no lo crea la migración, ya estaba en WordPress)
**Texto repetido (P1).** En 189 de las 258 páginas, el 80 % o más del texto se repite en otras cinco o más páginas. La mediana es de solo 31 palabras propias por página.
- **Son sobre todo las páginas de renders por ciudad y país.** Por ejemplo, renders-guatemala, -paraguay y -uruguay repiten el 99 %.
- **Los estilos con tráfico están mejor:** bizantina 18 %, maya 10 %, incaica y urbana 25 %. Las páginas nuevas, entre el 10 y el 15 %.
- **Es lo que más pesa en el «contenido útil» de Google.** No impide migrar: la web nueva tiene lo mismo que la vieja, ni más ni menos.
- **Para después del cambio (partes C y D del análisis):**
  - Quitar el bloque común de las páginas que no son de sección.
  - Dar a las 7 páginas de país con tráfico texto propio del país.
  - Añadir la respuesta corta y los datos clave a los estilos antiguos.

## 8. Lo que tiene que hacer Yama
**Antes del día:**
1. **Search Console:** hecho. Está verificado con Google Analytics (Yama, 20-11-2026), así que no hay que hacer nada. Opcional y más seguro a largo plazo: crear además una propiedad de **dominio**, verificada con un registro TXT en OVH. No toca el correo.
2. **Formulario de contacto (Fase 5):** en Netlify, Forms → «Enable form detection» y una notificación a arquitectura@dearquitectura.info. Después Claude hace una prueba de envío, con permiso de Yama.

**El día:**
3. **Netlify:** añadir el dominio dearquitectura.info con DNS externo.
4. **OVH:** los cuatro cambios de registros de lanzamiento.md. El correo (MX, SPF y los CNAME de correo) no se toca.

## 9. Después del cambio
- **El mismo día:**
  - Claude pasa `npm run comprobar:web -- https://dearquitectura.info` (tiene que dar 0).
  - Yama prueba el correo.
  - Se envía el mapa en Search Console y se importa en Bing Webmaster.
- **En Search Console, durante unas semanas:**
  - En «Páginas», que no crezcan los «No encontrado (404)».
  - En «Sitemaps», que lea las 258 páginas.
  - En «Mejoras», que no haya errores de migas ni de preguntas frecuentes.
- **A las 2 semanas (Fase 8):** comparar los clics de las 7 páginas con más tráfico, antes y después.
- **Después:** el riesgo del apartado 7 (partes C y D).

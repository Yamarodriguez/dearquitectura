# Rediseño (16-11-2026)

Yama pidió «rediseñar toda la web para que sea más linda y rápida» y que fuera «profesional», con webs de referencia recomendadas por Claude. Lo aprobó el mismo día («apruebo el diseño») y está en `main`.

## Referencias
- Estudios con web sobria y fotos grandes: Snøhetta, BIG, Olson Kundig.
- Estudios de render: Binyan, Kilograph.
- Revistas de arquitectura, para la parte informativa.

## Qué cambia
- **Aspecto:**
  - Una sola letra (Manrope, guardada en la web).
  - Negro tinta, blanco, un tono piedra para las bandas y terracota para los botones de contacto.
  - Cabecera fija con el logo limpio (sin fondo blanco) y el menú con desplegables.
  - «Contacto» destacado como botón.
  - Menú del móvil a pantalla completa, con su propio scroll.
  - Migas visibles («Inicio / Tipos / Arquitectura Bizantina»).
  - Banda de color en la primera sección de cada página.
  - Rejillas de páginas en forma de tarjetas.
  - Preguntas desplegables con «+».
  - Botones y formulario nuevos.
  - Ficha «Resumen» limpia.
  - Pie oscuro en columnas.
- **No cambia:**
  - Textos, fotos, enlaces, títulos, descripciones y direcciones.
  - El orden del contenido y la colocación de cada página (columnas y rejillas de Elementor).
  - Las comprobaciones lo confirman: C1, C2, SEO y maquetación, a 0.
- **Cómo funciona:**
  - `public/diseno/base.css` tiene todo el diseño.
  - `public/diseno/post-<id>.css` tiene solo la colocación de cada página, sacada de Elementor por `scripts/estilos-diseno.mjs` (va en `npm run generar`).
  - Los estilos de WordPress pasan a `estilos-wordpress/` y ya no se publican.
- **Etiquetas nuevas, no son contenido:**
  - Títulos de las columnas del pie: «Arquitectura», «Renders y 3D», «Estudio».
  - Migas visibles.

## Tarjetas (17-11-2026)
Yama: «todos estos recuadros son feos, armar estilo casascontenedores.es pero estilo arquitectura».
- La foto va arriba, a todo el ancho y con la misma proporción (4:3).
- El título va debajo, a la izquierda, con una flecha «→».
- Toda la tarjeta se puede pulsar.
- Al pasar el ratón: sombra suave, la foto crece un poco y la flecha se pone de color terracota.
- Hay poco hueco entre tarjetas y entre filas. También se encogen las secciones que solo eran espacio en blanco.

## Tarjetas con texto (17-11-2026)
Yama: «hacer lo mismo con los otros, agregarle texto seo optimizado con palabras claves en negritas y hacerlo más bonito al recuadro».
- **Textos:** 50 textos con las palabras clave en negrita (acortados el mismo día a una frase de unas 9 palabras, porque Yama dijo «son textos muy largos y queda feo») (`src/data/textos-tarjetas.json`).
  - 18 son de estilos, con datos comprobables: obras y siglos.
  - 9 son de servicios y 23 de tipos de render.
  - No se inventa nada: ni precios, ni plazos, ni promesas.
- **Dónde salen:** solo en la portada y las 9 páginas principales de sección. Esas tarjetas se repiten en unas 300 páginas; con texto en todas, cada página sumaría más de 1.000 palabras iguales a las demás, que es el problema número 1 del análisis. Para ponerlo en todas basta con cambiar `paginas` en el JSON.
- **El recuadro:**
  - Etiqueta pequeña en terracota (Estilo arquitectónico, Renders 3D o Servicio), título, texto y un enlace «NOMBRE →».
  - Raya terracota arriba al pasar el ratón.
  - Las filas con texto ocupan todo el ancho.
  - Las tarjetas que ya tenían texto y botón (Construcción…) usan el mismo enlace, en vez del botón con borde.
- **Tarjetas sin enlace en el original** (las de estilos en Tipos de arquitectura y otras): se les pone el enlace a su página si existe.
- **Enlaces rotos:** al revisarlas aparecieron 24 destinos que no existían, en hasta 540 páginas. Se cambiaron por la página más parecida (`cambios-aprobados.json`). Gótica, renacentista, egipcia, azteca y brutalista van a Tipos de arquitectura hasta que tengan página propia.
- **Comprobador:** ahora revisa todos los enlaces internos y distingue mayúsculas.

## Velocidad (móvil con 4G simulado, `scripts/velocidad.mjs`)

| Página | LCP antes → ahora | Peso antes → ahora |
|---|---|---|
| Portada | 1,0 → 0,7 s | 500 → 410 KB |
| Arquitectura bizantina | 1,1 → 0,6 s | 535 → 205 KB |
| Renders Madrid | 1,2 → 0,7 s | 367 → 142 KB |
| Contacto | 1,0 → 0,8 s | 438 → 108 KB |
| Valencia | 1,1 → 0,7 s | 412 → 350 KB |

CLS sigue en 0. Los estilos pasan de unos 600 KB más el fichero de cada página a unos 30 KB más unos 5 KB por página (comprimidos).

## Comprobaciones
`npm run todo` y `todo:visual`, a 0.

# Estudio de enlaces internos — dearquitectura.info (18-11-2026)

Los enlaces internos son los enlaces de una página tuya a otra página tuya. Sirven para dos cosas:
- **Para la gente:** encontrar lo que busca.
- **Para Google:** entender qué páginas son las importantes y de qué trata cada una. Un enlace dentro del texto («la **arquitectura romana** heredó…») vale más que uno en un menú o en una tarjeta repetida en todas las páginas, porque le dice a Google de qué va la página enlazada y que tiene que ver con la que la enlaza.

Datos: los **194.273 enlaces** de las 330 páginas de la web nueva, separados según dónde están (menú, pie, migas, texto, tarjetas y botones, relacionadas), y cruzados con Search Console (16 meses).

---

## 1. En resumen

1. **Hay demasiados enlaces por página.** La mediana es de **693** (entre 209 y 1.019), y 405 de ellos son del menú.
   - **El menú va dos veces en cada página**, una para ordenador y otra para el móvil. Por ejemplo, Renders Madrid tiene 246 enlaces en el menú de ordenador y los mismos 246 en el del móvil.
   - Algunos menús son enormes: el de Renders tiene 316 enlaces y el de Renders España, 246.
   - Con tantos enlaces iguales en todas partes, Google no distingue qué páginas importan más.
2. **Tus mejores páginas no reciben ningún enlace desde el texto.**
   - Inca, maya, bizantina, griega, romana, mediterránea, barroca, render-casa y renders-de-cocinas tienen **0 enlaces desde el texto** de otra página.
   - Todo lo que reciben viene de las tarjetas repetidas, con anclas de una palabra («Incas», «Maya», «Bizantina») o de una foto.
3. **Los enlaces del texto van casi todos al mismo sitio.** De los ~5.600 que hay dentro de textos, **4.557 van a páginas de profesiones** (arquitectos, interioristas…), sobre todo desde la plantilla de las páginas de ciudad. En cambio:
   - Los estilos casi no se enlazan entre sí: 22 enlaces en total, más el bloque de relacionadas que pusimos en la parte A.
   - **Ningún artículo informativo enlaza a tus servicios.** La gente que llega por la arquitectura inca no encuentra un camino hacia los renders.
4. **Las 86 páginas sin indexar reciben 34.328 enlaces**, unos 104 por página, todos desde los menús de Zonas y Provincias. Es fuerza que se va a páginas que no queremos en Google.
5. **Las anclas (el texto de los enlaces) son pobres.**
   - **22.715 enlaces son solo una foto.** Google usa entonces el texto alternativo, que suele ser como «arquitectura-incas», con guiones.
   - 216 dicen «Haz clic aquí» y 184 «Contactenos».
6. **Lo bueno:**
   - Casi todo está a 1 o 2 clics de la portada.
   - Las migas («Inicio / Tipos / Arquitectura Bizantina») ya devuelven cada estilo a su página principal.
   - Desde la parte A no quedan enlaces rotos ni páginas a las que no llegue nadie.

---

## 2. Las cifras

| Dónde está el enlace | Enlaces por página (media) | Qué le dice a Google |
|---|---|---|
| Menú (ordenador y móvil) | 405 | Poco: es igual en casi todas las páginas |
| Tarjetas y botones (repetidos) | 149 | Poco: 79 destinos se repiten en más de la mitad de las páginas |
| **Texto** | **17** | **Mucho, pero casi todo va a profesiones** |
| Pie | 15 | Poco |
| Migas y relacionadas | 2 | Bien: ordenan la web |

**A cuántos clics de la portada está cada página que sigue en Google** (244 páginas):

| | 0 clics | 1 clic | 2 clics | 3 clics | No se llega |
|---|---|---|---|---|---|
| Con menús | 1 | 96 | 143 | 3 | 1 |
| Solo con el contenido | 1 | 66 | 128 | 23 | 26 |

**Las páginas que más salen en Google y lo que reciben:**

| Página | Veces que salió en Google | Posición | Enlaces desde el texto | Desde tarjetas |
|---|---|---|---|---|
| arquitectura-incaica | 85.092 | 8 | **0** | 293 |
| arquitectura-maya | 56.742 | 10 | **0** | 291 |
| arquitectura-bizantina | 56.277 | 9 | **0** | 286 |
| proyectos-de-arquitectura | 27.663 | 69 | **0** | 325 |
| arquitectura-griega | 21.436 | 16 | **0** | 293 |
| arquitectura-urbana | 15.091 | 21 | 19 | 268 |
| arquitectura-romana | 14.800 | 30 | **0** | 303 |
| render-casa | 13.098 | 19 | **0** | 244 |
| arquitectura-industrial | 12.880 | 28 | 19 | 268 |
| arquitectura-mediterranea | 11.762 | 37 | **0** | 293 |
| arquitectura-barroca | 10.170 | 36 | **0** | 274 |
| renders-de-cocinas | 7.825 | 27 | **0** | 256 |

**Con qué palabras se enlazan** (las anclas):
- Arquitectura inca: «Incas» (298 veces) y una foto (290). Solo 12 dicen «Arquitectura Incaica».
- Contacto: «Haz clic aquí» (216), «Contactenos» (184) y «Contacto» (139).
- Renders Guatemala: solo 18 enlaces, desde textos de otras ciudades.

---

## 3. Mapa propuesto: qué debe enlazar con qué

La idea es una **página principal por tema que enlaza a sus páginas, y esas páginas que enlazan entre sí y de vuelta a la principal**, siempre desde el texto y con palabras que describan el destino.

### Estilos (página principal: Tipos de arquitectura)
| Página | Debe enlazar en el texto a | Por qué |
|---|---|---|
| Griega | Romana, Neoclásica, Bizantina | Roma heredó los órdenes griegos y el neoclásico los recupera |
| Romana | Griega, Bizantina, Neoclásica | Herencia directa |
| Bizantina | Romana, Griega | Nace de Roma y usa la cruz griega |
| Neoclásica | Griega, Romana, Barroca | Recupera la Antigüedad como reacción al barroco |
| Barroca | Neoclásica (y Renacentista cuando exista) | El estilo que vino antes y el que vino después |
| Inca | Maya (y Azteca cuando exista) | Grupo de arquitectura prehispánica |
| Maya | Inca (y Azteca) | Igual |
| Moderna | Industrial, Urbana | Mismos materiales y la ciudad del siglo XX |
| Industrial | Moderna | Acero y vidrio |
| Bioclimática | Sustentable, Mediterránea | Diseñar con el clima |
| Sustentable | Bioclimática | Conceptos hermanos |
| Mediterránea | Bioclimática | La casa pensada para el sol |
| Urbana | Moderna, y la profesión Arquitecto urbano | Ciudad y profesión |
| Todos | **Tipos de arquitectura** (además de las migas) | La página principal del grupo |

### Profesiones ↔ servicios (el puente hacia el negocio)
| Profesión | Servicio al que enlazar |
|---|---|
| Arquitectos | Estudio de arquitectura y Proyectos de arquitectura |
| Renderista | Renders y Renders de arquitectura |
| Interiorista y Decorador | Renders de interiores y Home staging |
| Paisajista | Renders de parques |
| Delineante y Proyectista | Planos y Modelado 3D |
| Arquitecto urbano | Arquitectura urbana |

### De los artículos a los servicios (1 o 2 por artículo, solo donde encaje)
- Mediterránea y Moderna → **Render de casas** (de cómo es ese estilo a ver así tu casa).
- Industrial → **Renders de oficinas**. No hay página de locales comerciales: esas tarjetas llevan ahora a Tipos de renders.
- Urbana → **Renders de edificios** y **Renders de parques**.
- Estilos históricos (inca, maya, bizantina…) → sin enlace comercial forzado; como mucho, **Tour virtual** o **Realidad virtual**, si se explica «recorrer un templo en 3D».

### Renders por ciudad
- Cada ciudad → **su país o región**: Renders España, México, Argentina, Colombia, Ecuador o Chile (esas páginas ya existen).
- Cada ciudad → **2 o 3 ciudades cercanas** que sigan en Google, y Renders.
- **Ninguna** página enlaza a las 86 sin indexar.
- Cada país → sus ciudades que siguen en Google.

---

## 4. Plan

**Técnico (no cambia ningún texto; lo puedo hacer ya):**
1. **Un solo menú** para ordenador y móvil: el del móvil se construye desde el de ordenador al abrirlo. Se ve igual y la página pasa de ~690 a ~450 enlaces. Impacto medio, 1 hora.
2. **Fotos con enlace:** texto alternativo legible, por ejemplo «arquitectura-incas» → «Arquitectura incas». Cambia el texto que Google lee como ancla, no lo que se ve. Impacto medio, 1 hora.
3. **Las relacionadas de la parte A** pasan a seguir el mapa de la sección 3: estilos con sus parientes, profesiones con su servicio y ciudades con su país. Es contenido añadido, no cambia nada del original. Impacto medio, 2–3 horas.

**Necesita tu decisión:**
1. **Quitar de los menús de Zonas y Provincias las 86 páginas sin indexar.** Siguen existiendo y no se borra ni se redirige ninguna (D6), pero dejan de recibir 34.000 enlaces. Impacto medio-alto.
2. **Cambiar «Haz clic aquí» y «Contactenos»** por textos que digan a dónde llevan, como «Pide presupuesto» o «Contacta con el estudio». Cambia texto de botones del original. Impacto bajo-medio.
3. **Parte C:** las tarjetas repetidas solo en la portada y en las páginas de sección. Es lo que más baja los enlaces por página (149 menos) y hace que los demás cuenten más. Impacto alto.
4. **Parte D con enlaces:** al escribir la respuesta corta de cada estilo, meter en el texto los enlaces del mapa («…heredó de la **arquitectura griega** los órdenes…»). Así llegan por fin enlaces desde el texto a inca, maya y bizantina. Impacto alto.

**Objetivo:** pasar de ~690 enlaces por página a ~150–250, y que cada página importante reciba **al menos 5 enlaces desde el texto** de páginas de su mismo tema, con anclas que describan el destino.

## Estado
Solo estudio, sin cambios en la web. Guardado en `informes/estudio-interlinking.md`.

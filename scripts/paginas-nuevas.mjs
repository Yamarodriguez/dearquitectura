// Páginas nuevas (19-11-2026 en adelante): de cada src/data/nuevas/<slug>.json (texto
// escrito para la web nueva, aprobado por Yama) saca src/content/nuevas/<slug>.json con
// el mismo formato que las páginas de WordPress (bloques + árbol de Elementor), para que
// se pinten con los mismos componentes y el mismo diseño.
// Estructura de los estilos (la de las páginas de estilos que ya hay, sin las secciones
// repetidas): portada (foto + H1 + subtítulo + presentación), «En resumen» con datos
// clave, secciones con sus H3, obras con foto, preguntas frecuentes y fuentes.
// Tipos de render (mismo esquema que piscinas o salas): portada con botón de presupuesto,
// «En resumen» con datos, qué es / para qué sirve / qué incluye / para quién / cómo se hace,
// galería con imágenes de la web, preguntas frecuentes y cierre de contacto.
// Uso: node scripts/paginas-nuevas.mjs   (va en `npm run generar`)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ORIGEN = 'src/data/nuevas';
const DESTINO = 'src/content/nuevas';
fs.mkdirSync(DESTINO, { recursive: true });
for (const f of fs.readdirSync(DESTINO)) fs.unlinkSync(path.join(DESTINO, f));

const tabla = (filas) => `<table class="datos-clave"><tbody>${filas.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>`;

let total = 0;
for (const f of fs.existsSync(ORIGEN) ? fs.readdirSync(ORIGEN).filter((x) => x.endsWith('.json')) : []) {
  const d = JSON.parse(fs.readFileSync(path.join(ORIGEN, f), 'utf8'));
  let n = 0;
  const id = () => crypto.createHash('md5').update(`${d.slug}-${n++}`).digest('hex').slice(0, 7);
  const blocks = [];
  const b = (x) => { blocks.push(x); return blocks.length - 1; };
  const w = (wt, extra = {}) => ({ t: 'w', id: id(), wt, cls: `elementor-widget elementor-widget-${wt}`, ...extra });
  const h = (tag, text) => w('heading', { tag, size: 'default', b: b({ type: 'heading', tag, text }) });
  const t = (html) => w('text-editor', { b: b({ type: 'text', html }) });
  const boton = (texto, href) => w('button', { b: b({ type: 'button', text: texto, href, size: 'sm' }) });
  const galeria = (fotos) => w('image-gallery', { cols: Math.min(fotos.length, 2), size: 'large', enlace: 'none', b: b({ type: 'gallery', images: fotos.map((x) => ({ src: x.src, alt: x.alt })) }) });
  const video = (url) => w('video', { b: b({ type: 'video', proveedor: 'hosted', url }) });
  const img = (foto) => w('image', { b: b({ type: 'image', src: foto.src, alt: foto.alt, size: 'large' }) });
  const col = (hijos, extra = '') => ({ t: 'c', id: id(), cls: `e-con-full e-flex e-con e-child${extra}`, hijos });
  const seccion = (hijos, extra = '') => ({ t: 'c', id: id(), cls: `e-flex e-con-boxed e-con e-parent${extra}`, hijos });

  const arbol = [];
  // 1. Portada
  arbol.push(seccion([
    col([img(d.foto)], ' nueva-col'),
    col([h('h1', d.h1), h('h2', d.subtitulo), w('divider'), t(d.intro), ...(d.boton ? [boton(d.boton.texto, d.boton.url)] : [])], ' nueva-col'),
  ], ' nueva-fila'));
  // 2. En resumen + datos clave (la respuesta corta para Google y las IA)
  arbol.push(seccion([col([h('h2', d.resumen_titulo || 'En resumen'), t(`<p>${d.resumen}</p>`), t(tabla(d.datos))])], ' nueva-resumen'));
  // 3. Secciones
  for (const s of d.secciones) {
    const hijos = [h('h2', s.h2), ...(s.html ? [t(s.html)] : [])];
    for (const sub of s.sub ?? []) hijos.push(h('h3', sub.h3), t(sub.html));
    arbol.push(seccion([col(hijos)]));
  }
  // 4. Obras (estilos), de dos en dos con su foto; o galería de imágenes (tipos de render)
  if (d.obras?.length) {
    arbol.push(seccion([col([h('h2', d.obras_titulo || 'Obras y ejemplos')])]));
    arbol.push(seccion(d.obras.map((o) => col([img(o.foto), h('h3', o.nombre), t(o.html)], ' nueva-col nueva-obra')), ' nueva-fila nueva-rejilla'));
  }
  if (d.video) arbol.push(seccion([col([h('h2', d.video.titulo), ...(d.video.html ? [t(d.video.html)] : []), video(d.video.url)])]));
  if (d.galeria?.length) arbol.push(seccion([col([h('h2', d.galeria_titulo || 'Imágenes de ejemplo'), galeria(d.galeria)])]));
  // 5. Preguntas frecuentes (desplegables, como en las páginas existentes)
  arbol.push(seccion([col([h('h2', 'Preguntas frecuentes'), w('toggle', { tag: 'div', b: b({ type: 'toggle', items: d.faq.map((x) => ({ title: x.q, html: `<p>${x.a}</p>` })) }) })])]));
  // 6. Fuentes y créditos de las fotos (solo si las hay); cierre con contacto (tipos de render)
  if (d.cierre) arbol.push(seccion([col([h('h2', d.cierre.h2), t(d.cierre.html), boton(d.cierre.boton, '/contacto/')])], ' nueva-cierre'));
  if (d.fuentes?.length) {
  const fuentes = `<ul>${d.fuentes.map((x) => `<li><a href="${x.url}" rel="noopener">${x.texto}</a></li>`).join('')}</ul>`;
  const creditos = `<p class="creditos">Fotos: ${d.obras.filter((o) => o.foto.credito).map((o) => `${o.nombre}, <a href="${o.foto.credito.ficha}" rel="noopener">${o.foto.credito.autor}</a> (${o.foto.credito.licencia}), Wikimedia Commons`).join(' · ')}.</p>`;
  arbol.push(seccion([col([h('h2', 'Fuentes'), t(fuentes + (d.obras?.some((o) => o.foto.credito) ? creditos : ''))])], ' nueva-fuentes'));
  }

  const pagina = {
    slug: d.slug, id: 'nueva', title: d.titulo, titulo_seo: d.titulo_seo, url: `https://dearquitectura.info/${d.slug}/`, nueva: true,
    meta_description: d.descripcion, palabra_clave: d.palabra_clave, menu: d.menu ?? '', logo: '',
    foto_destacada: d.foto.src, fecha: d.fecha, modificada: d.fecha, fecha_gmt: d.fecha, modificada_gmt: d.fecha,
    h1_es_titulo: false, fondos: [], blocks, elementor: arbol,
  };
  fs.writeFileSync(path.join(DESTINO, `${d.slug}.json`), JSON.stringify(pagina, null, 1));
  total++;
}
console.log(`Páginas nuevas: ${total}`);

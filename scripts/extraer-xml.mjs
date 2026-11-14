// Fase 1: saca del export de WordPress (Elementor) la estructura y el contenido
// de cada página. Repetible: si llega un export nuevo, se vuelve a ejecutar.
//   node scripts/extraer-xml.mjs [origen/fichero.xml]
// Escribe:
//   src/content/pages/<slug>.json  (una por página, con bloques en orden)
//   estructura-viva.json           (secuencia de encabezados por página)
//   contenido-vivo.json            (bloques por página)
//   legales-vivos.json             (páginas sin Elementor: legales)
//   informes/extraccion.md         (resumen)
// Integra desde el principio lo que en contenedoresmaritimos se hizo después:
// HTML de los textos (negritas, listas, enlaces) y enlaces de titulares,
// imágenes y botones (settings.link.url).
import fs from 'node:fs';
import path from 'node:path';

const XML = process.argv[2] || 'origen/dearquitecturainfo.WordPress.2026-11-14.xml';
const DOMINIO = /^https?:\/\/(www\.)?dearquitectura\.info/i;
const xml = fs.readFileSync(XML, 'utf8');

const cd = (s = '') => s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
const tag = (s, t) => { const m = s.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return m ? cd(m[1]) : ''; };
const metas = (s) => {
  const o = {};
  for (const m of s.matchAll(/<wp:postmeta>\s*<wp:meta_key>([\s\S]*?)<\/wp:meta_key>\s*<wp:meta_value>([\s\S]*?)<\/wp:meta_value>/g)) o[cd(m[1])] = cd(m[2]);
  return o;
};
const ent = (s = '') => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&#8217;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const plano = (s = '') => ent(s.replace(/<br\s*\/?>/gi, ' ').replace(/<\/(p|li|h\d|div)>/gi, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
// Fotos: /wp-content/uploads/... -> /img/... (D8, con 301 en la Fase 7)
const foto = (u = '') => u.replace(DOMINIO, '').replace(/^\/wp-content\/uploads\//, '/img/');
// Enlaces internos relativos; los externos tal cual
const enlace = (u = '') => { const r = u.trim(); if (!r) return undefined; return DOMINIO.test(r) ? (r.replace(DOMINIO, '') || '/') : r; };

const items = xml.split('<item>').slice(1).map((r) => r.slice(0, r.indexOf('</item>')));
const menuPorId = {};
for (const m of xml.matchAll(/<wp:term><wp:term_id>(\d+)<\/wp:term_id><wp:term_taxonomy>nav_menu<\/wp:term_taxonomy><wp:term_slug><!\[CDATA\[([^\]]*)\]\]>/g)) menuPorId[m[1]] = m[2];
const adjuntos = {};
// El alt que pinta WordPress es el de la biblioteca de medios (_wp_attachment_image_alt),
// no el que guarda el bloque de Elementor (casi siempre vacío).
const altDe = {};
for (const it of items) if (tag(it, 'wp:post_type') === 'attachment') {
  const id = tag(it, 'wp:post_id');
  adjuntos[id] = tag(it, 'wp:attachment_url');
  altDe[id] = ent(metas(it)._wp_attachment_image_alt || '');
}
const alt = (img = {}) => (img.id && altDe[img.id] !== undefined ? altDe[img.id] : ent(img.alt || ''));

const outDir = 'src/content/pages';
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync('informes', { recursive: true });

const estructura = {}, contenido = {}, legales = {};
const resumen_otros = {};
const desconocidos = {}, fotos = new Set(), resumen = { paginas: 0, bloques: {}, sinH1: [], variosH1: [], vacias: [] };

for (const it of items) {
  if (tag(it, 'wp:post_type') !== 'page' || tag(it, 'wp:status') !== 'publish') continue;
  const meta = metas(it);
  const slugWp = tag(it, 'wp:post_name');
  const url = tag(it, 'link');
  const ruta = url.replace(DOMINIO, '') || '/';
  const slug = ruta === '/' ? 'index' : ruta.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  const title = ent(tag(it, 'title'));
  const base = {
    slug, slug_wp: slugWp, id: tag(it, 'wp:post_id'), title, url,
    meta_title_yoast: meta._yoast_wpseo_title || '', meta_description: ent(meta._yoast_wpseo_metadesc || ''),
    palabra_clave: meta._yoast_wpseo_focuskw || '',
    menu: menuPorId[meta.ocean_header_custom_menu] || '',
    foto_destacada: meta._thumbnail_id && adjuntos[meta._thumbnail_id] ? foto(adjuntos[meta._thumbnail_id]) : '',
    fecha: tag(it, 'wp:post_date'), modificada: tag(it, 'wp:post_modified'),
  };
  if (base.foto_destacada) fotos.add(base.foto_destacada);

  let arbol = [];
  try { arbol = JSON.parse(meta._elementor_data || '[]'); } catch { arbol = []; }
  if (!arbol.length) {
    const html = tag(it, 'content:encoded');
    legales[slug] = { title, url, html };
    if (!plano(html)) resumen.vacias.push(ruta);
    fs.writeFileSync(path.join(outDir, slug + '.json'), JSON.stringify({ ...base, legal: true, blocks: [], html }, null, 1) + '\n');
    continue;
  }

  const blocks = [], fondos = [];
  const add = (b, s) => { b.s = s; blocks.push(b); resumen.bloques[b.type] = (resumen.bloques[b.type] || 0) + 1; };
  const walk = (e, s) => {
    const st = e.settings || {};
    if (e.elType !== 'widget') {
      const bg = st.background_image?.url;
      if (bg) { fondos.push(foto(bg)); fotos.add(foto(bg)); }
      for (const h of e.elements || []) walk(h, s);
      return;
    }
    switch (e.widgetType) {
      case 'heading': {
        const html = st.title || '';
        if (!plano(html)) break;
        const b = { type: 'heading', tag: st.header_size || 'h2', text: plano(html) };
        if (/<[a-z]/i.test(html)) b.html = html;
        const href = enlace(st.link?.url); if (href) b.href = href;
        add(b, s); break;
      }
      case 'text-editor': {
        const html = st.editor || '';
        if (!plano(html)) break;
        add({ type: 'text', text: plano(html), html }, s); break;
      }
      case 'image': {
        const u = st.image?.url; if (!u) break;
        const b = { type: 'image', src: foto(u), alt: alt(st.image) };
        fotos.add(b.src);
        if (st.link_to === 'custom') { const href = enlace(st.link?.url); if (href) b.href = href; }
        else if (st.link_to === 'file') b.href = foto(u);
        if (st.caption_source === 'custom' && st.caption) b.caption = st.caption;
        add(b, s); break;
      }
      case 'button': {
        const b = { type: 'button', text: plano(st.text || 'Click here') };
        const href = enlace(st.link?.url); if (href) b.href = href;
        add(b, s); break;
      }
      case 'toggle': case 'accordion': {
        const items = (st.tabs || []).map((t) => ({ title: plano(t.tab_title || ''), html: t.tab_content || '' }));
        if (items.length) add({ type: 'toggle', items }, s); break;
      }
      case 'google_maps': add({ type: 'map', address: st.address || '' }, s); break;
      case 'video': {
        const tipo = st.video_type || 'youtube';
        if (tipo === 'hosted') { // vídeo subido a la propia web (mp4): se copia como las fotos
          const u = foto(st.hosted_url?.url || ''); if (u) fotos.add(u);
          add({ type: 'video', proveedor: 'hosted', url: u }, s); break;
        }
        const u = st[`${tipo}_url`] || st.youtube_url || '';
        add({ type: 'video', proveedor: tipo, url: typeof u === 'string' ? u : '' }, s); break;
      }
      case 'image-gallery': {
        const imgs = (st.wp_gallery || []).map((g) => ({ src: foto(g.url), alt: alt(g) }));
        imgs.forEach((g) => fotos.add(g.src));
        if (imgs.length) add({ type: 'gallery', images: imgs }, s); break;
      }
      case 'eael-contact-form-7': add({ type: 'contact_form', cf7: st.contact_form_list || '' }, s); break;
      case 'shortcode': add({ type: 'shortcode', code: st.shortcode || '' }, s); break;
      case 'contentviews_widget_list1': add({ type: 'lista_paginas', widget: e.widgetType }, s); break;
      case 'spacer': case 'divider': break; // solo decoración
      default:
        desconocidos[e.widgetType] = (desconocidos[e.widgetType] || 0) + 1;
        add({ type: 'desconocido', widget: e.widgetType }, s);
    }
  };
  arbol.forEach((e, i) => walk(e, i));

  const h1 = blocks.filter((b) => b.type === 'heading' && b.tag === 'h1').length;
  if (!h1) resumen.sinH1.push(ruta);
  if (h1 > 1) resumen.variosH1.push(ruta);
  // Caja «Resumen» del plugin de fichas (All In One Schema, tipo 11 = servicio):
  // en la web viva sale al final del contenido en 7 páginas de estudio por ciudad.
  let ficha;
  if (meta._bsf_post_type === '11' && meta._bsf_service_type) {
    ficha = { imagen: foto(meta._bsf_service_image || ''), tipo: ent(meta._bsf_service_type), proveedor: ent(meta._bsf_service_provider || ''), area: ent(meta._bsf_service_area || ''), descripcion: ent(meta._bsf_service_desc || '') };
    if (ficha.imagen) fotos.add(ficha.imagen);
  } else if (meta._bsf_post_type && meta._bsf_post_type !== '0') resumen_otros[meta._bsf_post_type] = (resumen_otros[meta._bsf_post_type] || 0) + 1;
  const pag = { ...base, h1_es_titulo: !h1, fondos, ...(ficha ? { resumen: ficha } : {}), blocks };
  fs.writeFileSync(path.join(outDir, slug + '.json'), JSON.stringify(pag, null, 1) + '\n');
  estructura[slug] = { title, url, headings: blocks.filter((b) => b.type === 'heading').map((b) => ({ tag: b.tag, text: b.text })) };
  contenido[slug] = { title, url, blocks };
  resumen.paginas++;
}

fs.writeFileSync('estructura-viva.json', JSON.stringify(estructura, null, 1) + '\n');
fs.writeFileSync('contenido-vivo.json', JSON.stringify(contenido, null, 1) + '\n');
fs.writeFileSync('legales-vivos.json', JSON.stringify(legales, null, 1) + '\n');
fs.writeFileSync('informes/fotos-usadas.json', JSON.stringify([...fotos].sort(), null, 1));

const md = `# Extracción del XML (Fase 1)

Fichero: ${path.basename(XML)}
- Páginas con Elementor: ${resumen.paginas} · sin Elementor (legales): ${Object.keys(legales).length} (vacías: ${resumen.vacias.join(', ') || 'ninguna'})
- Bloques: ${Object.entries(resumen.bloques).map(([k, v]) => `${k} ${v}`).join(' · ')}
- Sin H1 (D7, el H1 será el título): ${resumen.sinH1.length} → ${resumen.sinH1.join(' ')}
- Con más de un H1: ${resumen.variosH1.join(' ') || 'ninguna'}
- Widgets desconocidos: ${JSON.stringify(desconocidos)}
- Cajas «Resumen» (servicio): ${Object.values(contenido).length ? fs.readdirSync(outDir).filter((f) => JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8')).resumen).length : 0} · otros tipos de ficha sin pintar: ${JSON.stringify(resumen_otros)}
- Fotos distintas usadas: ${fotos.size}
`;
fs.writeFileSync('informes/extraccion.md', md);
console.log(md);

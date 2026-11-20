// Secciones nuevas en páginas de WordPress (20-11-2026, sección «Estudio de arquitectura» por
// lugares). De cada src/data/anadidos/<slug>.json (texto aprobado por Yama) se añaden secciones a
// src/content/pages/<slug>.json, sin tocar las de WordPress:
// - van detrás de la sección «despues_de» (por defecto la 2: portada y su desplegable);
// - llevan la marca «anadido» y un id que empieza por «x», así las comprobaciones con la web
//   viva (encabezados, contenido y maquetación) siguen comparando solo lo de WordPress;
// - se pueden volver a generar sin duplicarse (se quitan las anteriores antes de poner las nuevas).
// Va en `npm run generar` después de extraer y antes de las páginas nuevas.
// Uso: node scripts/anadidos.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ORIGEN = 'src/data/anadidos';
const PAGINAS = 'src/content/pages';
const LUGARES = JSON.parse(fs.readFileSync('src/data/estudio-lugares.json', 'utf8'));

const tabla = (filas) => `<table class="datos-clave"><tbody>${filas.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>`;

let total = 0;
for (const f of fs.existsSync(ORIGEN) ? fs.readdirSync(ORIGEN).filter((x) => x.endsWith('.json')) : []) {
  const d = JSON.parse(fs.readFileSync(path.join(ORIGEN, f), 'utf8'));
  const destino = path.join(PAGINAS, `${d.slug}.json`);
  if (!fs.existsSync(destino)) { console.error(`anadidos: no existe la página ${d.slug}`); process.exitCode = 1; continue; }
  const p = JSON.parse(fs.readFileSync(destino, 'utf8'));
  // Volver a generar sin duplicar: fuera lo añadido antes
  if (p.bloques_wordpress !== undefined) p.blocks = p.blocks.slice(0, p.bloques_wordpress);
  p.elementor = p.elementor.filter((s) => !s.anadido);
  p.bloques_wordpress = p.blocks.length;

  let n = 0;
  const id = () => 'x' + crypto.createHash('md5').update(`${d.slug}-anadido-${n++}`).digest('hex').slice(0, 6);
  const blocks = p.blocks;
  const b = (x) => { blocks.push({ ...x, anadido: true }); return blocks.length - 1; };
  const w = (wt, extra = {}) => ({ t: 'w', id: id(), wt, cls: `elementor-widget elementor-widget-${wt}`, ...extra });
  const h = (tag, text) => w('heading', { tag, size: 'default', b: b({ type: 'heading', tag, text }) });
  const t = (html) => w('text-editor', { b: b({ type: 'text', html }) });
  const boton = (texto, href) => w('button', { b: b({ type: 'button', text: texto, href, size: 'sm' }) });
  const col = (hijos) => ({ t: 'c', id: id(), cls: 'e-con-full e-flex e-con e-child', hijos });
  const seccion = (hijos, extra = '') => ({ t: 'c', id: id(), cls: `e-flex e-con-boxed e-con e-parent anadido${extra}`, anadido: true, hijos: [col(hijos)] });

  const nuevas = [];
  if (d.resumen) nuevas.push(seccion([h('h2', d.resumen_titulo || 'En resumen'), t(`<p>${d.resumen}</p>`), ...(d.datos ? [t(tabla(d.datos))] : [])], ' nueva-resumen'));
  for (const s of d.secciones ?? []) {
    const hijos = [h('h2', s.h2), ...(s.html ? [t(s.html)] : [])];
    for (const sub of s.sub ?? []) hijos.push(h('h3', sub.h3), t(sub.html));
    if (s.boton) hijos.push(boton(s.boton.texto, s.boton.url));
    nuevas.push(seccion(hijos));
  }
  // Lugares donde trabaja el estudio, por país (src/data/estudio-lugares.json)
  if (d.lugares) {
    const hijos = [h('h2', d.lugares.h2), ...(d.lugares.html ? [t(d.lugares.html)] : [])];
    for (const pais of LUGARES.paises) {
      hijos.push(h('h3', pais.nombre));
      hijos.push(t(`<ul class="lista-lugares">${pais.lugares.map((l) => `<li><a href="${l.url}" title="${l.nombre}">${l.nombre.replace(/^Estudio de arquitectura en /, '')}</a></li>`).join('')}</ul>`));
    }
    nuevas.push(seccion(hijos, ' estudio-lugares'));
  }
  if (d.faq?.length) nuevas.push(seccion([h('h2', d.faq_titulo || 'Preguntas frecuentes'), w('toggle', { tag: 'div', b: b({ type: 'toggle', items: d.faq.map((x) => ({ title: x.q, html: `<p>${x.a}</p>` })) }) })]));
  if (d.fuentes?.length) nuevas.push(seccion([h('h2', 'Fuentes'), t(`<ul>${d.fuentes.map((x) => `<li><a href="${x.url}" rel="noopener">${x.texto}</a></li>`).join('')}</ul>`)], ' nueva-fuentes'));

  const pos = d.despues_de ?? 2;
  p.elementor.splice(pos, 0, ...nuevas);
  p.anadidos = true;
  if (d.fecha) p.modificada = p.modificada_gmt = `${d.fecha} 12:00:00`;
  fs.writeFileSync(destino, JSON.stringify(p, null, 1) + '\n');
  total++;
}
console.log(`Páginas con secciones añadidas: ${total}`);

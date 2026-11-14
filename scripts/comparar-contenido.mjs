// C2: el contenido visible de cada página en referencia/ (HTML vivo de WordPress)
// contra dist/. Cada párrafo, titular, botón y enlace del original tiene que
// estar en la nueva, en el mismo orden; también las fotos (nombre y alt), el
// formulario, los mapas y el menú. Lo que WordPress cambia al publicar
// (comillas «», …) se normaliza. Las 17 páginas que dan error en la web viva no
// tienen con qué compararse: se avisan aparte (su contenido sale del XML).
import fs from 'node:fs';
import path from 'node:path';
import { aplicarErratas, sinReferencia } from './erratas.mjs';

const viva = JSON.parse(fs.readFileSync('estructura-viva.json', 'utf8'));
const norm = (s) =>
  s.replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;|&#038;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/[«»“”„"″]/g, '"').replace(/[‘’´`′]/g, "'").replace(/…/g, '...').replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ').trim().toLowerCase();
const rel = (u) => u.replace(/^https?:\/\/(?:www\.)?dearquitectura\.info(?=\/|$)/i, '') || '/';

// Zona de contenido: en la web vieja, el <article>; en la nueva, el <main>.
function zona(html) {
  return html.match(/<article class="single-page-article[\s\S]*?<\/article>/i)?.[0]
    || html.match(/<main id="contenido">[\s\S]*?<\/main>/i)?.[0] || html;
}
// Los botones del original sin destino (href="#") en la nueva son <span class="boton">: cuentan como botón.
const sinRuido = (h) => zona(h).replace(/<span class="boton">([\s\S]*?)<\/span>/g, '<a>$1</a>').replace(/<form[\s\S]*?<\/form>/gi, '').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>|<template[\s\S]*?<\/template>/g, '');
// Los títulos de los desplegables: en WordPress son <a>, en la nueva <summary>.
const bloquesDe = (html) => [...sinRuido(html).matchAll(/<(p|h[1-6]|li|a|summary)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((x) => norm(x[2])).filter((t) => t.length > 1);
const enlacesDe = (html) => [...sinRuido(html).matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map((x) => rel(x[1].replace(/&#038;|&amp;/g, '&'))).filter((h) => !h.startsWith('#') && !/^javascript:/i.test(h));
const camposDe = (html) => {
  const f = zona(html).match(/<form[\s\S]*?<\/form>/i);
  // Un <form> sin ningún texto (en 2 páginas hay restos de HTML pegado de ChatGPT) no es un formulario.
  const t = f ? norm(f[0].replace(/<input[^>]*>/gi, ' ').replace(/<button[\s\S]*?<\/button>/gi, ' ').replace(/<textarea[\s\S]*?<\/textarea>/gi, ' ')) : '';
  return t ? [t] : [];
};
// Fotos: mismo fichero (sin el sufijo de tamaño de WordPress, -1024x727) y mismo alt, en orden.
const imagenesDe = (html) => [...sinRuido(html).matchAll(/<img\b[^>]*>/gi)].map((m) => {
  const src = (m[0].match(/\ssrc="([^"]+)"/i) || [])[1] || '';
  const alt = norm((m[0].match(/\salt="([^"]*)"/i) || [])[1] || '');
  return decodeURI(src.split('?')[0].split('/').pop()).replace(/-\d+x\d+(?=\.\w+$)/, '') + ' | ' + alt;
});
const mapasDe = (html) => [...zona(html).matchAll(/<iframe\b[^>]*>/gi)].filter((m) => /maps\.google/.test(m[0])).map((m) => {
  const q = (m[0].match(/maps\?q=([^&"]+)/i) || [])[1] || '';
  return decodeURIComponent(q.replace(/\+/g, ' ')).trim();
});
const menuDe = (html) => {
  const n = html.match(/<nav[^>]*id="site-navigation"[\s\S]*?<\/nav>/)?.[0] || '';
  return [...n.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => rel(m[1]) + ' | ' + norm(m[2])).filter((e) => !/b[uú]squeda/.test(e));
};
const enOrden = (a, b) => { let k = 0; for (const x of a) { const i = b.indexOf(x, k); if (i < 0) return x; k = i + 1; } return null; };

const dif = []; const sinRef = [];
let comparadas = 0;
for (const p of Object.values(viva)) {
  const ruta = new URL(p.url).pathname.replace(/^\/|\/$/g, '');
  const ref = path.join('referencia', (ruta || 'index').replace(/\//g, '__') + '.html');
  const nueva = path.join('dist', ruta, 'index.html');
  if (!fs.existsSync(nueva)) { dif.push(`${p.url}: falta en dist`); continue; }
  if (!fs.existsSync(ref)) { if (sinReferencia.has(ruta)) sinRef.push(ruta); else dif.push(`${p.url}: falta referencia`); continue; }
  comparadas++;
  const original = aplicarErratas(fs.readFileSync(ref, 'utf8'));
  const nuevoHtml = fs.readFileSync(nueva, 'utf8');
  const b = bloquesDe(nuevoHtml).join(' | ');
  let pos = 0;
  for (const t of bloquesDe(original)) {
    const i = b.indexOf(t, pos);
    if (i < 0) dif.push(`${p.url}: falta texto «${t.slice(0, 80)}»`); else pos = i + t.length;
  }
  const ca = camposDe(original), cb = camposDe(nuevoHtml);
  if (JSON.stringify(ca) !== JSON.stringify(cb)) dif.push(`${p.url}: formulario distinto (${ca.join(' / ')}) vs (${cb.join(' / ')})`);
  const fi = enOrden(imagenesDe(original), imagenesDe(nuevoHtml)); if (fi) dif.push(`${p.url}: falta imagen ${fi}`);
  const fm = enOrden(menuDe(original), menuDe(nuevoHtml)); if (fm) dif.push(`${p.url}: menú distinto: falta «${fm}»`);
  const ma = mapasDe(original), mb = mapasDe(nuevoHtml);
  if (JSON.stringify(ma) !== JSON.stringify(mb)) dif.push(`${p.url}: mapa distinto (${ma}) vs (${mb})`);
  const fe = enOrden(enlacesDe(original), enlacesDe(nuevoHtml)); if (fe) dif.push(`${p.url}: falta enlace ${fe}`);
}
fs.mkdirSync('informes', { recursive: true });
fs.writeFileSync('informes/contenido.json', JSON.stringify({ comparadas, sin_referencia: sinRef, diferencias: dif }, null, 1));
console.log(`Contenido: ${comparadas} páginas comparadas, ${dif.length} diferencias (sin web viva con que comparar: ${sinRef.length})`);
dif.slice(0, 15).forEach((x) => console.log('  ' + x));
process.exit(dif.length ? 1 : 0);

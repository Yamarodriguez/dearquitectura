// Fase 1: baja las fotos a public/img/ (misma ruta que en /wp-content/uploads/,
// para poder hacer la 301 de la Fase 7 con una sola regla).
// Qué baja:
//   1. las fotos que usa el contenido (informes/fotos-usadas.json, sale de extraer-xml)
//   2. las que la web viva enseña en src= / og:image / fondos (referencia/*.html),
//      que suelen ser los tamaños reducidos (-1024x727…) que Google tiene indexados
//   3. las fotos con impresiones en Search Console (origen/sc/Páginas.csv)
// Despacio (3 hilos, 250 ms), con reintentos; no repite lo que ya está.
import fs from 'node:fs';
import path from 'node:path';

const ORIGEN = 'https://dearquitectura.info/wp-content/uploads/';
const rutas = new Set();
const anadir = (u) => {
  if (!u) return;
  const m = u.replace(/&amp;/g, '&').match(/(?:https?:)?\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/([^"'\s?#)]+\.(?:jpe?g|png|webp|gif|svg|avif|mp4|webm))/i)
    || u.match(/^\/img\/([^"'\s?#)]+)$/);
  if (m) rutas.add(decodeURIComponent(m[1]));
};

JSON.parse(fs.readFileSync('informes/fotos-usadas.json', 'utf8')).forEach(anadir);
let deReferencia = 0;
if (fs.existsSync('referencia')) {
  for (const f of fs.readdirSync('referencia')) {
    const h = fs.readFileSync(path.join('referencia', f), 'utf8');
    const antes = rutas.size;
    for (const m of h.matchAll(/(?:src|data-src|content|href)=["']([^"']+)["']/g)) anadir(m[1]);
    for (const m of h.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) anadir(m[1]);
    deReferencia += rutas.size - antes;
  }
}
// 5. Las fotos de fondo que piden los estilos de Elementor de cada página (a veces un tamaño
//    reducido distinto para el móvil). Hay que haber bajado los estilos (bajar-estilos.mjs).
const dirCss = 'public/estilos/uploads/elementor/css';
if (fs.existsSync(dirCss)) for (const f of fs.readdirSync(dirCss)) {
  for (const m of fs.readFileSync(path.join(dirCss, f), 'utf8').matchAll(/url\(\s*['"]?(\/img\/[^'")]+)['"]?\s*\)/g)) anadir(m[1]);
}
// 4. Las fotos metidas dentro de los textos (también en las 17 páginas rotas en vivo, que no tienen referencia)
for (const f of fs.readdirSync('src/content/pages')) {
  const t = fs.readFileSync(path.join('src/content/pages', f), 'utf8').replace(/\\\//g, '/');
  for (const m of t.matchAll(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/[^"'\s?#),\\]+/g)) anadir(m[0]);
}
const sc = fs.readdirSync('origen/sc').find((f) => /^P.*ginas\.csv$/.test(f));
if (sc) fs.readFileSync(path.join('origen/sc', sc), 'utf8').split('\n').forEach((l) => anadir(l.split(',')[0]));

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
const cola = [...rutas].sort();
const fallos = [];
let hechas = 0, bajadas = 0, bytes = 0;
async function bajar(ruta) {
  const destino = path.join('public/img', ruta);
  if (fs.existsSync(destino) && fs.statSync(destino).size > 0) return 'ya';
  const url = ORIGEN + ruta.split('/').map(encodeURIComponent).join('/');
  for (let i = 1; i <= 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (migracion)' } });
      if (r.status === 404) return 'no';
      if (r.ok) {
        const b = Buffer.from(await r.arrayBuffer());
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.writeFileSync(destino, b); bytes += b.length; return 'ok';
      }
    } catch {}
    await pausa(1000 * i);
  }
  return 'no';
}
async function hilo() {
  while (cola.length) {
    const r = cola.shift();
    const res = await bajar(r);
    if (res === 'ok') bajadas++;
    if (res === 'no') fallos.push(r);
    if (++hechas % 100 === 0) console.log(`${hechas}/${rutas.size}`);
    if (res !== 'ya') await pausa(250);
  }
}
await Promise.all([hilo(), hilo(), hilo()]);
fs.writeFileSync('informes/fallos-fotos.json', JSON.stringify(fallos, null, 1));
console.log(`Fotos: ${rutas.size} (de la web viva además del contenido: ${deReferencia}). Bajadas ahora: ${bajadas} (${(bytes / 1048576).toFixed(0)} MB). Fallos: ${fallos.length}`);

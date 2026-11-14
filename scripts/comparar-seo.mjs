// SEO: título y descripción de cada página nueva iguales a los de la web viva
// (src/data/seo.json, sacado de referencia/; para las 17 con error 500, los de
// Yoast), etiquetas para compartir presentes y todas las URL en sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';

const decode = (s = '') => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
const titulo = (h) => decode((h.match(/<title>([^<]*)<\/title>/i) || [])[1]);
const descripcion = (h) => decode((h.match(/<meta name="description" content="([^"]*)"/i) || [])[1]);

const seo = JSON.parse(fs.readFileSync('src/data/seo.json', 'utf8'));
const paginas = fs.readdirSync('src/content/pages').map((f) => JSON.parse(fs.readFileSync(path.join('src/content/pages', f), 'utf8')));
const dif = [];
let comparadas = 0;
for (const p of paginas) {
  const ruta = new URL(p.url).pathname.replace(/^\/|\/$/g, '');
  const nueva = path.join('dist', ruta, 'index.html');
  if (!fs.existsSync(nueva)) { dif.push(`${p.url}: falta en dist`); continue; }
  const s = seo[p.slug];
  if (!s) { dif.push(`${p.url}: sin datos en seo.json`); continue; }
  comparadas++;
  const b = fs.readFileSync(nueva, 'utf8');
  if (s.titulo !== titulo(b)) dif.push(`${p.url}: título «${titulo(b)}» (original «${s.titulo}»)`);
  if ((s.descripcion || '') !== descripcion(b)) dif.push(`${p.url}: descripción distinta`);
  for (const t of ['og:title', 'og:url', 'og:type']) if (!b.includes(`property="${t}"`)) dif.push(`${p.url}: falta ${t}`);
}
const mapa = fs.readFileSync('dist/sitemap.xml', 'utf8');
const enMapa = new Set([...mapa.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const p of paginas) {
  const debe = !p.legal; // las legales llevan noindex en el original y no van al mapa
  if (debe && !enMapa.has(p.url)) dif.push(`${p.url}: no está en sitemap.xml`);
  if (!debe && enMapa.has(p.url)) dif.push(`${p.url}: está en sitemap.xml y lleva noindex`);
}
fs.mkdirSync('informes', { recursive: true });
fs.writeFileSync('informes/seo.json', JSON.stringify({ comparadas, enMapa: enMapa.size, diferencias: dif }, null, 1));
console.log(`SEO: ${comparadas} páginas comparadas, ${enMapa.size} en el mapa, ${dif.length} diferencias`);
dif.slice(0, 12).forEach((x) => console.log('  ' + x));
process.exit(dif.length ? 1 : 0);

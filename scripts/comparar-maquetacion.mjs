// Cada elemento de Elementor de la web viva (por su data-id) tiene que estar en la
// nueva, en el mismo orden y con las mismas clases: así la colocación de cada página
// (public/diseno/post-<id>.css, sacada de Elementor) se aplica igual.
// (Desde el rediseño del 16-11-2026 ya no se comparan las clases del <body> de OceanWP.)
import fs from 'node:fs';
import path from 'node:path';
import { sinReferencia } from './erratas.mjs';

const elementos = (h) => [...h.matchAll(/<div class="elementor-element elementor-element-([0-9a-f]+) ([^"]*)"/g)].map((m) => [m[1], m[2].trim().split(/\s+/).sort().join(' ')]);
const viva = JSON.parse(fs.readFileSync('estructura-viva.json', 'utf8'));
const dif = []; let comparadas = 0, elementosOk = 0;
for (const p of Object.values(viva)) {
  const ruta = new URL(p.url).pathname.replace(/^\/|\/$/g, '');
  const ref = path.join('referencia', (ruta || 'index').replace(/\//g, '__') + '.html');
  const nueva = path.join('dist', ruta, 'index.html');
  if (!fs.existsSync(ref)) { if (!sinReferencia.has(ruta)) dif.push(`${p.url}: falta referencia`); continue; }
  if (!fs.existsSync(nueva)) { dif.push(`${p.url}: falta en dist`); continue; }
  comparadas++;
  const a = fs.readFileSync(ref, 'utf8'), b = fs.readFileSync(nueva, 'utf8');
  const ea = elementos(a), eb = elementos(b);
  const mb = new Map(eb);
  if (ea.map((e) => e[0]).join() !== eb.map((e) => e[0]).join()) {
    const falta = ea.find(([id]) => !mb.has(id)); const sobra = eb.find(([id]) => !new Map(ea).has(id));
    dif.push(`${p.url}: estructura distinta (${ea.length} elementos en la viva, ${eb.length} en la nueva${falta ? `; falta ${falta[0]}` : ''}${sobra ? `; sobra ${sobra[0]}` : ''})`);
  }
  for (const [id, cls] of ea) {
    if (!mb.has(id)) continue;
    if (mb.get(id) !== cls) dif.push(`${p.url}: ${id} clases «${mb.get(id)}» (viva «${cls}»)`); else elementosOk++;
  }
}
fs.mkdirSync('informes', { recursive: true });
fs.writeFileSync('informes/maquetacion.json', JSON.stringify({ comparadas, elementosOk, diferencias: dif }, null, 1));
console.log(`Maquetación: ${comparadas} páginas, ${elementosOk} elementos iguales, ${dif.length} diferencias`);
dif.slice(0, 12).forEach((x) => console.log('  ' + x));
process.exit(dif.length ? 1 : 0);

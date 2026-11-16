// Fase 3 («cópiala igual»): baja los estilos de la web viva para pintar la copia
// con los mismos: tema OceanWP, Elementor (general, widgets, kit post-7 y el
// fichero propio de cada página post-<id>.css), tipografías locales e iconos.
// Se guardan en estilos-wordpress/ (no se publican; de ahí sale la colocación de cada página) con la misma ruta que tenían bajo /wp-content/,
// para que las referencias relativas (../fonts/…) sigan funcionando.
// También guarda los <style> en línea comunes en estilos-wordpress/en-linea.css.
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://dearquitectura.info';
const DEST = 'estilos-wordpress';
const fuera = /\/panorama\/|complianz|content-views|swiper|e-swiper|jquery\.rating/; // no hacen falta en la copia
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
const local = (ruta) => path.join(DEST, ruta.replace(/^\/wp-content\//, '').replace(/^\/wp-includes\//, 'includes/'));

async function bajar(url, binario = false) {
  for (let i = 1; i <= 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (migracion)' } });
      if (r.status === 404) return null;
      if (r.ok) return binario ? Buffer.from(await r.arrayBuffer()) : await r.text();
    } catch {}
    await pausa(800 * i);
  }
  return null;
}

// 1. Hojas de estilo enlazadas en cualquier página de referencia/
const hojas = new Set();
for (const f of fs.readdirSync('referencia')) {
  const h = fs.readFileSync(path.join('referencia', f), 'utf8');
  for (const m of h.matchAll(/<link[^>]*rel=['"]stylesheet['"][^>]*href=['"]([^'"]+)/g)) {
    const u = m[1].split('?')[0];
    if (u.startsWith(BASE) && !fuera.test(u) && !/\/post-\d+\.css$/.test(u)) hojas.add(u.slice(BASE.length));
  }
}
// 2. El fichero de Elementor de cada página (también de las 17 rotas) y el del kit (post-7)
const ids = fs.readdirSync('src/content/pages').map((f) => JSON.parse(fs.readFileSync(path.join('src/content/pages', f), 'utf8')).id);
for (const id of ['7', ...ids]) hojas.add(`/wp-content/uploads/elementor/css/post-${id}.css`);

const recursos = new Set(); const fallos = []; let n = 0;
for (const ruta of [...hojas].sort()) {
  const destino = local(ruta);
  let css = fs.existsSync(destino) ? fs.readFileSync(destino, 'utf8') : await bajar(BASE + ruta);
  if (css === null) { fallos.push(ruta); continue; }
  // Las fotos de fondo que apuntan a uploads pasan a /img/ (D8)
  css = css.replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/(?!elementor\/)/g, '/img/');
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, css);
  // Recursos que usa (tipografías, iconos): url(...) relativas
  for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const u = m[1];
    if (/^(data:|#|\/img\/)/.test(u)) continue;
    const abs = new URL(u, BASE + ruta).href.split(/[?#]/)[0];
    if (abs.startsWith(BASE)) recursos.add(abs.slice(BASE.length));
  }
  if (++n % 50 === 0) console.log(`${n}/${hojas.size}`);
  await pausa(150);
}
let bajados = 0;
for (const ruta of recursos) {
  const destino = local(ruta);
  if (fs.existsSync(destino)) continue;
  const b = await bajar(BASE + ruta, true);
  if (!b) { fallos.push(ruta); continue; }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, b); bajados++;
  await pausa(150);
}
// 3. Estilos en línea comunes (iguales en todas las páginas): los de WordPress y el del tema
const h = fs.readFileSync('referencia/arquitectura-bizantina.html', 'utf8');
const enLinea = [...h.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)]
  .filter((m) => !/panorama|psb-product|wp-emoji/.test(m[1]))
  .map((m) => `/* ${m[1].trim() || 'sin id'} */\n${m[2].trim()}`).join('\n\n')
  .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/(?!elementor\/)/g, '/img/');
fs.writeFileSync(path.join(DEST, 'en-linea.css'), enLinea + '\n');
fs.writeFileSync('informes/fallos-estilos.json', JSON.stringify(fallos, null, 1));
console.log(`Hojas: ${hojas.size} · recursos (tipografías, iconos): ${recursos.size}, bajados ahora ${bajados} · fallos: ${fallos.length}`);
fallos.slice(0, 10).forEach((f) => console.log('  ' + f));

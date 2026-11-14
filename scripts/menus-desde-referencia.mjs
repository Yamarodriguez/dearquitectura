// Fase 2: menús reales (orden y anidado) desde el HTML vivo (referencia/).
// En WordPress cada página elige su menú (OceanWP «ocean_header_custom_menu»,
// guardado en el campo «menu» de cada página; vacío = menú por defecto).
// Para cada menú se toma el que pinta la primera página que lo usa.
// Escribe src/data/menus.json { <menu>: [...], pie: [...] }.
import fs from 'node:fs';
import path from 'node:path';

const decode = (s) => s.replace(/&amp;|&#038;/g, '&').replace(/&#8211;/g, '–').replace(/&#039;|&#8217;/g, '’').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const rel = (u) => u.replace(/^https?:\/\/(?:www\.)?dearquitectura\.info(?=\/|$)/i, '') || '/';

function arbol(nav) {
  const raiz = { hijos: [] }; const pila = [raiz];
  const re = /<li\b[^>]*>|<\/li>|<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const m of nav.matchAll(re)) {
    const t = m[0].toLowerCase();
    if (t.startsWith('<li')) { const n = { hijos: [] }; pila[pila.length - 1].hijos.push(n); pila.push(n); }
    else if (t.startsWith('</li')) { if (pila.length > 1) pila.pop(); }
    else { const n = pila[pila.length - 1]; if (!n.label) { n.url = rel(m[1]); n.label = decode(m[2].replace(/<[^>]+>/g, '')); } }
  }
  const limpia = (n) => ({ label: n.label, url: n.url, children: n.hijos.filter((h) => h.label).map(limpia) });
  // Fuera el botón de búsqueda del tema («Alternar búsqueda de la web»): no es una página
  return raiz.hijos.filter((h) => h.label && !/b[uú]squeda/i.test(h.label)).map(limpia);
}

const paginas = fs.readdirSync('src/content/pages').map((f) => JSON.parse(fs.readFileSync(path.join('src/content/pages', f), 'utf8')));
const menus = {}; const huellas = {}; const distintos = [];
for (const p of paginas) {
  const nombre = p.menu || 'principal';
  const f = path.join('referencia', p.slug + '.html');
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  const nav = h.match(/<nav[^>]*id="site-navigation"[\s\S]*?<\/nav>/)?.[0];
  if (!nav) continue;
  const m = arbol(nav); const huella = JSON.stringify(m);
  if (!menus[nombre]) { menus[nombre] = m; huellas[nombre] = huella; }
  else if (huellas[nombre] !== huella) distintos.push(`${p.slug} (${nombre})`);
  if (!menus.pie) {
    const pie = h.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '';
    const enlaces = [...pie.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map((x) => ({ label: decode(x[2].replace(/<[^>]+>/g, '')), url: rel(x[1]) })).filter((x) => x.label);
    menus.pie = enlaces;
  }
}
const usados = [...new Set(paginas.map((p) => p.menu || 'principal'))];
const faltan = usados.filter((u) => !menus[u]);
fs.writeFileSync('src/data/menus.json', JSON.stringify(menus, null, 1) + '\n');
const cuenta = (l) => l.reduce((s, i) => s + 1 + cuenta(i.children || []), 0);
console.log('Menús:', Object.entries(menus).map(([k, v]) => `${k} ${v.length} arriba / ${cuenta(v)} en total`).join(' · '));
console.log('Menús sin muestra en la web viva:', faltan.join(', ') || 'ninguno');
console.log('Páginas cuyo menú no coincide con el de su grupo:', distintos.length, distintos.slice(0, 5).join(' '));

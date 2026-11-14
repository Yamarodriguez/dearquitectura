// Fase 2: el SEO que ya tiene cada página en la web viva (título, descripción,
// imagen para compartir) de referencia/ -> src/data/seo.json. Se conserva tal
// cual: es lo que Google ya conoce de cada URL.
// Las páginas que dan error en la web viva (sin referencia) toman el título y
// la descripción de Yoast del export, con las variables resueltas igual que
// las resuelve la web (%%sep%% = «-», %%sitename%% = DEARQUITECTURA.INFO).
import fs from 'node:fs';
import path from 'node:path';

const decode = (s = '') => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
const meta = (h, attr, nombre) => {
  const m = h.match(new RegExp(`<meta[^>]+${attr}="${nombre}"[^>]*content="([^"]*)"`, 'i'))
    || h.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${nombre}"`, 'i'));
  return m ? decode(m[1]) : '';
};
const SITIO = 'DEARQUITECTURA.INFO';
const yoast = (t, p) => (t || '%%title%% %%page%% %%sep%% %%sitename%%')
  .replace(/%%sep%%/g, '-').replace(/%%sitename%%/g, SITIO).replace(/%%title%%/g, p.title)
  .replace(/%%[a-z_]+%%/g, '').replace(/\s+/g, ' ').trim();

const salida = {}; const sinDescripcion = []; const deYoast = [];
for (const f of fs.readdirSync('src/content/pages').sort()) {
  const p = JSON.parse(fs.readFileSync(path.join('src/content/pages', f), 'utf8'));
  const ref = path.join('referencia', p.slug + '.html');
  if (fs.existsSync(ref)) {
    const h = fs.readFileSync(ref, 'utf8');
    const titulo = decode((h.match(/<title>([^<]*)<\/title>/i) || [])[1]);
    const descripcion = meta(h, 'name', 'description');
    const robots = meta(h, 'name', 'robots');
    const og = { titulo: meta(h, 'property', 'og:title'), descripcion: meta(h, 'property', 'og:description'), imagen: meta(h, 'property', 'og:image') };
    salida[p.slug] = { titulo, descripcion, robots, og };
    if (!descripcion) sinDescripcion.push(p.slug);
  } else {
    const titulo = yoast(p.meta_title_yoast, p);
    salida[p.slug] = { titulo, descripcion: p.meta_description, robots: '', og: { titulo, descripcion: p.meta_description, imagen: p.foto_destacada ? `https://dearquitectura.info${p.foto_destacada.replace('/img/', '/wp-content/uploads/')}` : '' }, deYoast: true };
    deYoast.push(p.slug);
  }
}
fs.writeFileSync('src/data/seo.json', JSON.stringify(salida, null, 1) + '\n');
console.log(`SEO: ${Object.keys(salida).length} páginas · de Yoast (sin web viva): ${deYoast.length} · sin descripción: ${sinDescripcion.join(', ') || 'ninguna'}`);
console.log('noindex en la web viva:', Object.entries(salida).filter(([, v]) => /noindex/.test(v.robots)).map(([k]) => k).join(', ') || 'ninguna');
console.log('Ejemplo:', JSON.stringify(salida['arquitectura-bizantina']).slice(0, 400));

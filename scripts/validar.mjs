// C3: el validador sobre dist/: un H1, canonical, imágenes que existen y con
// medidas (también los webp), sin shortcodes publicados como texto, datos
// estructurados válidos, noindex donde toca y sin restos del kit.
import fs from 'node:fs';
import path from 'node:path';
import { variosH1Permitidos } from './erratas.mjs';

const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'));
const DOMINIO = `https://${site.dominio}`;
const legales = new Set(fs.readdirSync('src/content/pages').map((f) => JSON.parse(fs.readFileSync(path.join('src/content/pages', f), 'utf8'))).filter((p) => p.legal).map((p) => new URL(p.url).pathname));
const fallos = [], avisos = [];
const paginas = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? paginas(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []);

const config = fs.readFileSync('astro.config.mjs', 'utf8');
if (!/trailingSlash:\s*'always'/.test(config)) fallos.push('astro.config.mjs sin trailingSlash: always');
if (!/format:\s*'directory'/.test(config)) fallos.push("astro.config.mjs sin build.format: 'directory'");
const existe = (u) => fs.existsSync(path.join('dist', decodeURI(u.split('?')[0])));

const ficheros = paginas('dist');
for (const f of ficheros) {
  const rel = path.relative('dist', f).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const es404 = rel === '404.html';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (!es404 && h1 !== 1 && !(h1 > 1 && variosH1Permitidos.has(url))) fallos.push(`${rel}: ${h1} H1 (debe haber 1)`);
  const texto = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
  const sc = texto.match(/\[[a-z_-]+(?: [^\]]*)?\]/i);
  if (sc) avisos.push(`${rel}: posible shortcode literal ${sc[0].slice(0, 60)}`);
  if (!es404) {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!m) fallos.push(`${rel}: sin canonical`);
    else if (m[1] !== `${DOMINIO}${url}`) fallos.push(`${rel}: canonical ${m[1]} (esperado ${DOMINIO}${url})`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/ width="\d+"/.test(m[0]) || !/ height="\d+"/.test(m[0])) fallos.push(`${rel}: imagen sin medidas ${m[0].slice(0, 100)}`);
    const src = (m[0].match(/ src="([^"]+)"/) || [])[1] || '';
    if (/^https?:\/\//.test(src)) fallos.push(`${rel}: imagen externa ${src}`);
    else if (src && !existe(src)) fallos.push(`${rel}: falta imagen ${src}`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const parte of m[1].split(',')) {
    const u = parte.trim().split(/\s+/)[0];
    if (u && !existe(u)) fallos.push(`${rel}: falta imagen webp ${u}`);
  }
  if (!es404) {
    const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    if (!bloques.length) fallos.push(`${rel}: sin datos estructurados`);
    for (const b of bloques) {
      try {
        const tipos = (JSON.parse(b)['@graph'] ?? []).map((n) => n['@type']);
        for (const t of ['Organization', 'WebSite', 'WebPage']) if (!tipos.includes(t)) fallos.push(`${rel}: falta ${t} en los datos estructurados`);
        if (rel !== 'index.html' && !tipos.includes('BreadcrumbList')) fallos.push(`${rel}: faltan las migas en los datos estructurados`);
      } catch { fallos.push(`${rel}: datos estructurados con JSON roto`); }
    }
  }
  // Hasta la Fase 7 (site.indexar = false), todo con noindex. Después, solo legales, gracias y 404.
  const sinIndice = /<meta name="robots" content="noindex/.test(html);
  const debeIndexarse = site.indexar && !es404 && url !== '/gracias/' && !legales.has(url);
  if (debeIndexarse && sinIndice) fallos.push(`${rel}: lleva noindex y debería indexarse`);
  if (!debeIndexarse && !sinIndice) fallos.push(`${rel}: debería llevar noindex`);
  if (/contenedores ?mar[ií]timos|casascontenedores/i.test(texto)) {
    const ref = path.join('referencia', (url.replace(/^\/|\/$/g, '') || 'index').replace(/\//g, '__') + '.html');
    if (!(fs.existsSync(ref) && /contenedores ?mar[ií]timos|casascontenedores/i.test(fs.readFileSync(ref, 'utf8')))) fallos.push(`${rel}: resto de otra web (contenedores) que no estaba en el original`);
  }
}
fs.mkdirSync('informes', { recursive: true });
fs.writeFileSync('informes/validador.json', JSON.stringify({ paginas: ficheros.length, fallos, avisos }, null, 1));
console.log(`Validador: ${ficheros.length} páginas, ${fallos.length} fallos, ${avisos.length} avisos`);
fallos.slice(0, 15).forEach((x) => console.log('  FALLO ' + x));
avisos.slice(0, 5).forEach((x) => console.log('  AVISO ' + x));
process.exit(fallos.length ? 1 : 0);

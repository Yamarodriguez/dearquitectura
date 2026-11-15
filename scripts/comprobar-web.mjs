// Comprueba una web publicada como la ve Google: cada dirección que Search Console
// conoce (páginas y fotos), cada URL del sitemap, las redirecciones de netlify.toml,
// robots.txt, ads.txt y que una página inexistente dé 404.
//   npm run comprobar:web                         -> sirve dist/ en local (sin redirecciones)
//   npm run comprobar:web -- https://xxx.netlify.app  (o https://dearquitectura.info)
// Sirve para la Fase 7 (antes y después de cambiar los DNS) y la Fase 8 (revisión).
// Informe en informes/comprobar-web.json.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';

const argBase = process.argv[2]?.replace(/\/$/, '');
let servidor = null, BASE = argBase;
if (!BASE) {
  const puerto = await new Promise((ok) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => ok(p)); }); });
  BASE = `http://localhost:${puerto}`;
  servidor = spawn('npx', ['astro', 'preview', '--port', String(puerto)], { shell: true, stdio: 'ignore' });
  for (let i = 0; ; i++) { try { if ((await fetch(BASE + '/')).ok) break; } catch {} if (i > 60) throw new Error('El servidor no arrancó'); await new Promise((r) => setTimeout(r, 500)); }
}
const local = BASE.startsWith('http://localhost');

const fallos = [];
const pedir = async (ruta, metodo = 'HEAD') => {
  for (let intento = 0; intento < 3; intento++) {
    try { return await fetch(BASE + ruta, { method: metodo, redirect: 'manual' }); }
    catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  return { status: 0, headers: new Headers() };
};
const destino = (r) => { const l = r.headers.get('location') || ''; try { return new URL(l, BASE).pathname; } catch { return l; } };
// Pocas peticiones a la vez para no saturar el servidor
const enTandas = async (lista, fn, n = 8) => { for (let i = 0; i < lista.length; i += n) await Promise.all(lista.slice(i, i + n).map(fn)); };

// 1. Direcciones que Search Console conoce
const csv = fs.readdirSync('origen/sc').find((x) => /^P.*ginas\.csv$/.test(x));
const deGoogle = fs.readFileSync(`origen/sc/${csv}`, 'utf8').trim().split(/\r?\n/).slice(1).map((l) => new URL(l.split(',')[0]))
  .filter((u) => u.hostname === 'dearquitectura.info' && !u.search && !u.hash).map((u) => u.pathname);
let paginas = 0, fotos = 0;
await enTandas(deGoogle, async (ruta) => {
  const foto = ruta.startsWith('/wp-content/uploads/');
  if (foto) {
    fotos++;
    const nueva = ruta.replace('/wp-content/uploads/', '/img/');
    if (!local) {
      const r = await pedir(ruta);
      if (r.status !== 301 || destino(r) !== nueva) return fallos.push(`${ruta}: debería redirigir (301) a ${nueva} y da ${r.status} ${destino(r)}`);
    }
    const r = await pedir(nueva);
    if (r.status !== 200) fallos.push(`${nueva}: da ${r.status} (foto conocida por Google)`);
  } else {
    paginas++;
    const r = await pedir(ruta);
    if (r.status !== 200) fallos.push(`${ruta}: da ${r.status} (página conocida por Google)`);
  }
});

// 2. Todo lo del sitemap
const mapa = await (await fetch(BASE + '/sitemap.xml')).text();
const delMapa = [...mapa.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (delMapa.length < 100) fallos.push(`sitemap.xml: solo ${delMapa.length} direcciones`);
await enTandas(delMapa, async (ruta) => { const r = await pedir(ruta); if (r.status !== 200) fallos.push(`${ruta}: da ${r.status} (está en el sitemap)`); });

// 3. Redirecciones de netlify.toml (solo existen en Netlify)
let redirecciones = 0;
if (!local) {
  const toml = fs.readFileSync('netlify.toml', 'utf8');
  for (const m of toml.matchAll(/^\[\[redirects\]\]\s*\n\s*from = "([^"]+)"\s*\n\s*to = "([^"]+)"/gm)) {
    const [, de, a] = m;
    if (/^https?:/.test(de)) continue;
    const prueba = de.replace('*', 'prueba/');
    const esperado = a.replace(':splat', 'prueba/');
    const r = await pedir(prueba);
    redirecciones++;
    if (r.status !== 301 || destino(r) !== esperado) fallos.push(`${prueba}: debería redirigir (301) a ${esperado} y da ${r.status} ${destino(r)}`);
  }
}

// 4. robots.txt, ads.txt y 404
const robots = await pedir('/robots.txt', 'GET');
if (robots.status !== 200) fallos.push(`robots.txt: da ${robots.status}`);
const textoRobots = robots.status === 200 ? await robots.text() : '';
const ads = await pedir('/ads.txt', 'GET');
if (ads.status !== 200 || !(await ads.text()).includes('pub-7333712322602518')) fallos.push('ads.txt: no está o no tiene la cuenta de AdSense');
const no = await pedir('/esta-pagina-no-existe-' + Date.now() + '/');
if (no.status !== 404) fallos.push(`una página inexistente da ${no.status} (debería dar 404)`);

if (servidor) { servidor.kill(); if (process.platform === 'win32') spawn('taskkill', ['/pid', String(servidor.pid), '/t', '/f'], { stdio: 'ignore' }); }
const resumen = { base: BASE, fecha: new Date().toISOString(), paginasDeGoogle: paginas, fotosDeGoogle: fotos, sitemap: delMapa.length, redirecciones, robotsConSitemap: /Sitemap:/.test(textoRobots), fallos };
fs.mkdirSync('informes', { recursive: true });
fs.writeFileSync('informes/comprobar-web.json', JSON.stringify(resumen, null, 1));
console.log(`${BASE}: ${paginas} páginas y ${fotos} fotos de Google, ${delMapa.length} del sitemap, ${redirecciones} redirecciones${local ? ' (en local no se prueban)' : ''} · robots con sitemap: ${resumen.robotsConSitemap ? 'sí' : 'no'} · ${fallos.length} fallos`);
fallos.slice(0, 20).forEach((f) => console.log('  FALLO ' + f));
process.exit(fallos.length ? 1 : 0);

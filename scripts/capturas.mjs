// Capturas de pantalla de unas páginas (ancho 1400 y 390), en tramos de una pantalla:
//   node scripts/capturas.mjs <base> <carpeta> [--tramos N] [--ancho 1400|390] /ruta/ ...
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const base = args.shift(), out = args.shift();
let tramos = 1, anchos = [1400, 390];
const rutas = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tramos') tramos = +args[++i];
  else if (args[i] === '--ancho') anchos = [+args[++i]];
  else rutas.push(args[i]);
}
const nav = await chromium.launch({ channel: 'chrome' });
for (const ancho of anchos) {
  const alto = ancho > 500 ? 900 : 800;
  const p = await nav.newPage({ viewport: { width: ancho, height: alto } });
  for (const r of rutas) {
    await p.goto(base + r, { waitUntil: 'load' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((ok) => setTimeout(ok, 60)); } await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((ok) => { i.onload = i.onerror = ok; setTimeout(ok, 4000); }))); window.scrollTo(0, 0); });
    await p.waitForTimeout(400);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.evaluate(() => window.scrollTo(0, 0));
    for (let t = 0; t < tramos && t * alto < h; t++) {
      await p.screenshot({ path: `${out}/${(r.replace(/\//g, '') || 'portada')}-${ancho}${tramos > 1 ? '-' + (t + 1) : ''}.png`, ...(t ? { fullPage: true } : {}), clip: { x: 0, y: t * alto, width: ancho, height: Math.min(alto, h - t * alto) } });
    }
    console.log(r, ancho, 'alto total', h);
  }
  await p.close();
}
await nav.close();

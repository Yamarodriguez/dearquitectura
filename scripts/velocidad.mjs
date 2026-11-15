// Fase 6: mide la velocidad de unas páginas tipo como las ve un móvil con 4G
// (CPU 4 veces más lenta, ~9 Mbit/s, 150 ms de latencia): LCP (cuándo se ve lo
// principal), CLS (si la página «salta»), peso descargado y número de peticiones.
// Sirve dist/ con astro preview (hay que haber compilado). Informe en informes/velocidad.json.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import { chromium } from 'playwright';

const PUERTO = await new Promise((ok) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => ok(p)); }); });
const BASE = `http://localhost:${PUERTO}`;
const PAGINAS = ['/', '/arquitectura-bizantina/', '/renders-madrid/', '/contacto/', '/valencia/'];
const servidor = spawn('npx', ['astro', 'preview', '--port', String(PUERTO)], { shell: true, stdio: 'ignore' });
const esperar = async () => { for (let i = 0; i < 60; i++) { try { if ((await fetch(BASE + '/')).ok) return; } catch {} await new Promise((r) => setTimeout(r, 500)); } throw new Error('El servidor no arrancó'); };

try {
  await esperar();
  const nav = await chromium.launch({ channel: 'chrome' });
  const salida = {};
  for (const ruta of PAGINAS) {
    const ctx = await nav.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (1.5 * 1024 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    let bytes = 0, peticiones = 0; const porTipo = {};
    cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; peticiones++; });
    cdp.on('Network.responseReceived', (e) => { const t = e.type; porTipo[t] = (porTipo[t] || 0) + 1; });
    await p.addInitScript(() => {
      window.__lcp = 0; window.__cls = 0; window.__lcpEl = '';
      new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__lcp = e.startTime; window.__lcpEl = (e.element?.tagName || '') + ' ' + (e.url || '').split('/').pop(); } }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    const t0 = Date.now();
    await p.goto(BASE + ruta, { waitUntil: 'load', timeout: 120000 });
    const carga = Date.now() - t0;
    await p.waitForTimeout(1500);
    const m = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), lcpEl: window.__lcpEl }));
    salida[ruta] = { ...m, cargaMs: carga, kb: Math.round(bytes / 1024), peticiones, porTipo };
    await ctx.close();
  }
  await nav.close();
  fs.mkdirSync('informes', { recursive: true });
  fs.writeFileSync('informes/velocidad.json', JSON.stringify(salida, null, 1));
  for (const [r, v] of Object.entries(salida)) console.log(`${r.padEnd(26)} LCP ${(v.lcp / 1000).toFixed(1)} s · CLS ${v.cls} · ${v.kb} KB · ${v.peticiones} peticiones · LCP: ${v.lcpEl}`);
} finally {
  servidor.kill();
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(servidor.pid), '/t', '/f'], { stdio: 'ignore' });
}

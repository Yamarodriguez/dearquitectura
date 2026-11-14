// Fase 3: junta los estilos comunes de la web viva en dos ficheros, en el mismo
// orden en que los carga WordPress (el orden decide qué regla gana):
//   public/estilos/antes.css   → todo lo que va antes del fichero propio de cada página
//   public/estilos/despues.css → lo que va después (tipografías y CSS del tema)
// Entre los dos, cada página enlaza su /estilos/uploads/elementor/css/post-<id>.css.
// Las url(...) relativas se pasan a rutas absolutas de /estilos/ para que sigan
// funcionando al juntar los ficheros. Requiere haber ejecutado bajar-estilos.mjs.
import fs from 'node:fs';
import path from 'node:path';

const DEST = 'public/estilos';
const h = fs.readFileSync('referencia/arquitectura-bizantina.html', 'utf8');
const enLinea = (id) => (h.match(new RegExp(`<style[^>]*id=['"]${id}['"][^>]*>([\\s\\S]*?)</style>`)) || [])[1] || '';
const sinId = [...h.slice(0, h.indexOf('</head>')).matchAll(/<style(?![^>]*id=)([^>]*)>([\s\S]*?)<\/style>/g)].map((m) => m[2]);

const fichero = (ruta) => {
  const local = path.join(DEST, ruta.replace(/^\/wp-content\//, '').replace(/^\/wp-includes\//, 'includes/'));
  if (!fs.existsSync(local)) { console.log('  falta', ruta); return ''; }
  const base = '/estilos/' + path.dirname(ruta.replace(/^\/wp-content\//, '').replace(/^\/wp-includes\//, 'includes/')).split(path.sep).join('/') + '/';
  return fs.readFileSync(local, 'utf8').replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, u) => {
    if (/^(data:|#|\/|https?:)/.test(u)) return m;
    return `url(${q}${new URL(u, 'https://x' + base).pathname}${q})`;
  });
};
const web = (css) => css
  .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/(?!elementor\/)/g, '/img/')
  .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\//g, '/estilos/');

const antes = [
  enLinea('wp-img-auto-sizes-contain-inline-css'),
  enLinea('classic-theme-styles-inline-css'),
  enLinea('global-styles-inline-css'),
  fichero('/wp-content/plugins/contact-form-7/includes/css/styles.css'),
  fichero('/wp-content/themes/oceanwp/assets/fonts/fontawesome/css/all.min.css'),
  fichero('/wp-content/themes/oceanwp/assets/css/third/simple-line-icons.min.css'),
  fichero('/wp-content/themes/oceanwp/assets/css/style.min.css'),
  fichero('/wp-content/plugins/elementor/assets/css/frontend.min.css'),
  fichero('/wp-content/uploads/elementor/css/post-7.css'),
  ...['image', 'spacer', 'heading', 'divider', 'video', 'toggle', 'google_maps', 'image-gallery'].map((w) => fichero(`/wp-content/plugins/elementor/assets/css/widget-${w}.min.css`)),
];
const despues = [
  fichero('/wp-content/plugins/essential-addons-for-elementor-lite/assets/front-end/css/view/general.min.css'),
  fichero('/wp-content/uploads/essential-addons-elementor/eael-923.css'),
  fichero('/wp-content/plugins/ocean-extra/assets/css/widgets.css'),
  fichero('/wp-content/plugins/all-in-one-schemaorg-rich-snippets/css/style.css'),
  fichero('/wp-content/uploads/elementor/google-fonts/css/roboto.css'),
  fichero('/wp-content/uploads/elementor/google-fonts/css/robotoslab.css'),
  fichero('/wp-content/uploads/elementor/google-fonts/css/mulish.css'),
  ...sinId, // el CSS propio del tema (OceanWP) va el último, como en la web viva
];
fs.writeFileSync(path.join(DEST, 'antes.css'), web(antes.join('\n')) + '\n');
fs.writeFileSync(path.join(DEST, 'despues.css'), web(despues.join('\n')) + '\n');
// El fichero de cada página: también con las rutas pasadas a la web nueva
let n = 0;
const dir = path.join(DEST, 'uploads/elementor/css');
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f); const css = fs.readFileSync(p, 'utf8'); const nuevo = web(css);
  if (nuevo !== css) { fs.writeFileSync(p, nuevo); n++; }
}
const kb = (f) => Math.round(fs.statSync(path.join(DEST, f)).size / 1024);
console.log(`Estilos: antes.css ${kb('antes.css')} KB · despues.css ${kb('despues.css')} KB · ficheros de página retocados: ${n}`);

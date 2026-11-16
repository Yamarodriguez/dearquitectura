// Rediseño: de cada post-<id>.css de Elementor se queda SOLO la colocación
// (columnas, anchos, cuadrículas, alineación, separaciones entre elementos y fotos
// de fondo). Colores, letras, bordes, sombras y márgenes los pone el diseño nuevo
// (public/diseno/base.css), igual en toda la web.
// Entrada: estilos-wordpress/uploads/elementor/css/post-*.css · Salida: public/diseno/post-*.css
import fs from 'node:fs';
import path from 'node:path';

const ORIGEN = 'estilos-wordpress/uploads/elementor/css';
const DESTINO = 'public/diseno';
const VARS = /^--(display|flex-direction|container-widget-(width|height|flex-grow|align-self)|flex-wrap(-mobile)?|gap|row-gap|column-gap|width|content-width|flex-grow|flex-shrink|flex-basis|justify-content|justify-items|align-items|align-self|align-content|e-con-grid-template-(columns|rows)|grid-auto-flow|video-aspect-ratio|min-height|spacer-size)$/;
const PROPS = /^(width|max-width|display|grid-template-columns|text-align|background-(image|position|size|repeat))$/;

// Trocea una hoja en reglas { media, sel, decl } (Elementor solo anida un nivel: @media)
function reglas(css) {
  const out = [];
  let i = 0;
  const leerBloque = (desde) => { let d = 0; for (let j = desde; j < css.length; j++) { if (css[j] === '{') d++; else if (css[j] === '}') { d--; if (d === 0) return j; } } return css.length; };
  while (i < css.length) {
    const a = css.indexOf('{', i);
    if (a < 0) break;
    const cabeza = css.slice(i, a).trim();
    const fin = leerBloque(a);
    const cuerpo = css.slice(a + 1, fin);
    if (cabeza.startsWith('@media')) {
      for (const r of reglas(cuerpo)) out.push({ media: cabeza, sel: r.sel, decl: r.decl });
    } else if (!cabeza.startsWith('@')) out.push({ media: '', sel: cabeza, decl: cuerpo });
    i = fin + 1;
  }
  return out;
}

// .elementor-123 .elementor-element.elementor-element-abc → .elementor-123 .elementor-element-abc (misma prioridad sobre base.css)
const corto = (sel) => sel.replace(/\.elementor-element\.elementor-element-/g, '.elementor-element-');

fs.mkdirSync(DESTINO, { recursive: true });
let antes = 0, despues = 0, conFondo = 0;
for (const f of fs.readdirSync(ORIGEN).filter((x) => /^post-\d+\.css$/.test(x))) {
  const css = fs.readFileSync(path.join(ORIGEN, f), 'utf8');
  antes += css.length;
  const porMedia = new Map();
  const fondos = new Set();
  for (const { media, sel, decl } of reglas(css)) {
    if (!sel.includes('.elementor-element-')) continue;
    // La raya separadora: solo interesa hacia dónde va (izquierda, centro, derecha)
    // Rayas largas del original (más del 60 % de ancho): línea fina a todo lo ancho
    const larga = sel.match(/^(.*\.elementor-element-[0-9a-f]+)\s+\.elementor-divider-separator\s*$/);
    if (larga) {
      const ancho = +(decl.match(/width:\s*(\d+)%/)?.[1] ?? 0);
      if (ancho >= 60) {
        const lista = porMedia.get(media) ?? [];
        lista.push(`${corto(larga[1])} .elementor-divider-separator{width:100%;border-top:1px solid var(--linea)}`);
        porMedia.set(media, lista);
      }
      continue;
    }
    const raya = sel.match(/^(.*\.elementor-element-[0-9a-f]+)\s+\.elementor-divider\s*$/);
    if (raya) {
      const al = decl.match(/text-align:\s*(center|right|end|left|start)/)?.[1];
      if (al) {
        const lista = porMedia.get(media) ?? [];
        lista.push(`${corto(raya[1])}{--divider-align:${al === 'center' ? 'center' : /right|end/.test(al) ? 'flex-end' : 'flex-start'}}`);
        porMedia.set(media, lista);
      }
      continue;
    }
    // Los estados (:hover, ::before…) y los textos interiores son decoración
    if (/:hover|:focus|::?before|::?after|\.elementor-button|\.elementor-heading-title|\.elementor-divider|\.elementor-toggle|\.elementor-tab|\.elementor-icon|svg|\.elementor-image-gallery|\.gallery/.test(sel)) continue;
    const ok = decl.split(';').map((d) => d.trim()).filter((d) => {
      const p = d.slice(0, d.indexOf(':')).trim();
      return p && (VARS.test(p) || PROPS.test(p));
    }).filter((d) => !/^background-image:\s*none/.test(d));
    // Fuera de @media, lo que ya es el valor por defecto de un contenedor sobra
    const sobra = new Set(['--display:flex', '--flex-direction:column', '--container-widget-width:100%', '--container-widget-height:initial', '--container-widget-flex-grow:0', '--container-widget-align-self:initial', '--flex-wrap-mobile:wrap']);
    const final = media ? ok : ok.filter((d) => !sobra.has(d.replace(/\s+/g, '')));
    if (!final.length) continue;
    // Contenedores con foto de fondo: se oscurecen y el texto va en blanco
    if (ok.some((d) => d.startsWith('background-image')) && !/\.elementor-widget|img/.test(sel)) {
      const base = sel.split(',')[0].trim().replace(/:not\(\.e-lazyloaded\)|\.e-lazyloaded/g, '');
      fondos.add(corto(base).replace(/\s*>\s*\.e-con-inner$/, ''));
    }
    const lista = porMedia.get(media) ?? [];
    lista.push(`${corto(sel)}{${final.join(';')}}`);
    // Textos y separadores centrados: la columna de lectura (76ch) y la raya, también al centro
    const alineado = final.find((d) => /^text-align:\s*(center|right|end)/.test(d));
    if (alineado && /\.elementor-element-[0-9a-f]+$/.test(sel.trim())) {
      const centro = /center/.test(alineado);
      lista.push(`${corto(sel)}{--divider-align:${centro ? 'center' : 'flex-end'}}${corto(sel)}>.elementor-widget-container{margin-inline:${centro ? 'auto' : 'auto 0'}}`);
    }
    porMedia.set(media, lista);
  }
  let salida = '';
  for (const [media, lista] of porMedia) salida += media ? `${media}{${lista.join('')}}` : lista.join('');
  for (const s of fondos) {
    conFondo++;
    // Solo si encima hay texto: entonces la foto se oscurece y el texto va en blanco
    const t = `${s}:has(.elementor-widget-heading,.elementor-widget-text-editor)`;
    salida += `${s}{position:relative;background-size:cover;background-position:center}${t}{color:#fff}${t}::before{content:"";position:absolute;inset:0;background:rgba(14,16,18,.62);z-index:0}${t}>*{position:relative;z-index:1}${t} :is(h1,h2,h3,h4,h5,h6,p,li,a:not(.elementor-button)){color:#fff}`;
  }
  despues += salida.length;
  fs.writeFileSync(path.join(DESTINO, f), salida);
}
console.log(`Colocación por página: ${Math.round(antes / 1024)} KB → ${Math.round(despues / 1024)} KB · ${conFondo} contenedores con foto de fondo`);

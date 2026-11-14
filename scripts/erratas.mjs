// Cambios del original aprobados por Yama (src/data/fallos-original.json).
// Los comprobadores los aplican al original antes de comparar, para que un
// cambio pedido no cuente como fallo. De momento no hay ninguno aprobado.
import fs from 'node:fs';

export const fallos = JSON.parse(fs.readFileSync('src/data/fallos-original.json', 'utf8'));

// HTML del original con los cambios ya aplicados.
// Las fotos que ya no existen en el servidor no se pintan en la nueva (ver fotos_que_no_existen).
const fotosRotas = new Set((fallos.fotos_que_no_existen?.fotos ?? []).map((f) => f.split('/').pop()));
const nombre = (src) => decodeURI(src.split('?')[0].split('/').pop()).replace(/-\d+x\d+(?=\.\w+$)/, '');
export const aplicarErratas = (html) => html.replace(/<img\b[^>]*>/gi, (m) => (fotosRotas.has(nombre((m.match(/\ssrc="([^"]+)"/i) || [])[1] || '')) ? '' : m));

// Cambios aprobados por Yama (src/data/cambios-aprobados.json), aplicados al original
// para comparar: los botones rotos llevan a su nueva página y los textos quitados
// (código pegado por error) desaparecen también del original.
const CAMBIOS = JSON.parse(fs.readFileSync('src/data/cambios-aprobados.json', 'utf8'));
const rotos = Object.entries(CAMBIOS.enlaces_rotos?.cambios ?? {});
const quitados = CAMBIOS.quitar_textos?.bloques ?? [];
const escapar = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const aplicarCambios = (html, slug) => {
  let h = html;
  for (const [de, a] of rotos) h = h.split(`dearquitectura.info${de}"`).join(`dearquitectura.info${a}"`);
  for (const q of quitados.filter((x) => x.pagina === slug)) h = h.replace(new RegExp(`<h1>\\s*${escapar(q.empieza)}\\s*</h1>`, 'g'), '');
  return h;
};

// Páginas que en el original tienen más de un H1 y se dejan así hasta que Yama decida.
export const variosH1Permitidos = new Set(Object.keys(fallos.varios_h1?.paginas ?? {}));

// Páginas que dan error en la web viva: no hay HTML con el que comparar.
export const sinReferencia = new Set(fallos.paginas_con_error_500?.paginas ?? []);

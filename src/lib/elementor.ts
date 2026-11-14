// Ayudas para pintar el contenido de Elementor igual que WordPress.

const DOMINIO = /https?:\/\/(?:www\.)?dearquitectura\.info(?=\/|["'\s]|$)/gi;

// Enlaces y fotos del propio dominio → rutas de la web nueva (fotos en /img/, D8).
export function rutasNuevas(html = ''): string {
  return html
    .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\//gi, '/img/')
    .replace(/(href=["'])https?:\/\/(?:www\.)?dearquitectura\.info(["'])/gi, '$1/$2')
    .replace(DOMINIO, '');
}

// Igual que hace WordPress con el texto de los widgets (wpautop, simplificado):
// si el texto no trae párrafos ni bloques, las líneas en blanco separan párrafos
// y los saltos sueltos son <br />.
const BLOQUES = /<(p|div|ul|ol|h[1-6]|table|blockquote|figure|pre|section|form|hr)\b/i;
export function autop(html = ''): string {
  const t = html.trim();
  if (!t || BLOQUES.test(t)) return t;
  return t.split(/\n\s*\n/).map((p) => `<p>${p.trim().replace(/\n/g, '<br />\n')}</p>`).join('\n');
}

// HTML de un widget de texto o de un desplegable: se conserva tal cual (clases y
// estilos incluidos, para que se vea igual), quitando solo lo que no debe
// publicarse: scripts, estilos, formularios pegados (restos de ChatGPT en 2
// páginas) y la etiqueta del plugin de resaltado.
export function htmlElementor(html = ''): string {
  const limpio = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<form\b[\s\S]*?<\/form>/gi, '')
    .replace(/<\/?elsnr-highlight[^>]*>/gi, '')
    .replace(/<a\b([^>]*)target=["']_blank["']([^>]*)>/gi, (m, a, b) => (/rel=/.test(m) ? m : `<a${a}target="_blank" rel="noopener"${b}>`));
  return autop(rutasNuevas(limpio));
}

// Titular: se permite el marcado en línea que trae (negritas, saltos, spans con estilo).
export function htmlTitular(html = ''): string {
  return rutasNuevas(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ''));
}

export const enlaceInterno = (u = '') => rutasNuevas(u) || '/';

// Para comparar a ojo: copia unas páginas de referencia/ (HTML de la web viva) a
// dist/_original/<slug>.html, cambiando sus estilos y fotos por las copias locales
// (/estilos/ y /img/) y quitando los scripts. Así se ven igual que en WordPress sin
// tener que abrir la web viva. Solo para revisar: dist/ se borra en cada compilación.
//   node scripts/original-local.mjs index arquitectura-bizantina renders-madrid
import fs from 'node:fs';
import path from 'node:path';

const slugs = process.argv.slice(2);
fs.mkdirSync('dist/_original', { recursive: true });
const existe = (u) => fs.existsSync(path.join('public', decodeURI(u)));
// Las tipografías: las hojas originales apuntan a la web viva; se usan las copias locales.
const fuentes = (fs.readFileSync('public/estilos/despues.css', 'utf8').match(/@font-face\s*{[^}]*}/g) || []).join('\n');
for (const slug of slugs) {
  let h = fs.readFileSync(path.join('referencia', slug + '.html'), 'utf8');
  h = h.replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/(['"])https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\/(elementor|essential-addons-elementor)\//g, '$1/estilos/uploads/$2/')
    .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\/uploads\//g, '/img/')
    .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-content\//g, '/estilos/')
    .replace(/https?:\/\/(?:www\.)?dearquitectura\.info\/wp-includes\//g, '/estilos/includes/')
    .replace(/\s(srcset|sizes)="[^"]*"/g, '')
    .replace(/\/img\/[^"' )]+/g, (u) => (existe(u) ? u : u.replace(/-\d+x\d+(?=\.\w+$)/, '')))
    .replace(/(href|src)=(['"])\/estilos\/([^'"?]+)\?[^'"]*\2/g, '$1=$2/estilos/$3$2')
    .replace(/<\/head>/, () => `<style>${fuentes}</style></head>`)
    .replace(/<\/body>/, '<script src="/estilos/propio.js"></script></body>');
  fs.writeFileSync(path.join('dist/_original', slug + '.html'), h);
}
console.log(`Originales locales: ${slugs.map((s) => `/_original/${s}.html`).join(' ')}`);

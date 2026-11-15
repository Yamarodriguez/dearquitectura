// robots.txt: las mismas reglas que tenía WordPress (Yoast), con el mapa nuevo.
// Mientras site.indexar sea false (hasta la Fase 7) no se anuncia el mapa: las
// páginas llevan noindex y Google tiene que poder leerlas para verlo, así que no
// se bloquea nada.
import site from '../data/site.json';

export function GET() {
  const lineas = [
    'User-agent: *',
    'Disallow:',
    '',
    'User-agent: AdsBot',
    'Disallow: /',
  ];
  if (site.indexar) lineas.push('', `Sitemap: https://${site.dominio}/sitemap.xml`);
  return new Response(lineas.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

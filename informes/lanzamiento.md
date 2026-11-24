# Lanzamiento (Fase 7): guion del día del cambio

Preparado el 15-11-2026, sin Netlify todavía. Los registros de OVH son los que hay
publicados hoy (consultados en internet, no en el panel de OVH).

## Lo que ya está listo (en GitHub)
- `robots.txt`: las mismas reglas que tenía Yoast. El mapa del sitio solo aparece cuando se enciende Google.
- Interruptor en `src/data/site.json`: `indexar: true` y pasar los códigos de `confirmados` a `ga4` y `adsense`. Con eso se quita el noindex (salvo legales, /gracias/, 404 y las 86 ciudades aprobadas), se pone el mapa en robots.txt y se activan GA4 y AdSense.
- El comprobador no deja subir la web con Google encendido y sin GA4 o AdSense (ensayado: lo frena; con todo puesto pasa a 0).
- `npm run comprobar:web -- <dirección>`: revisa una web publicada como la ve Google. Comprueba las 317 páginas y 297 fotos que Google conoce, las 240 del mapa, las redirecciones de netlify.toml, robots.txt, ads.txt y el 404. En local, a 0 (en local no se pueden probar las redirecciones).

## Antes del día
0. Análisis final hecho el 20-11-2026: informes/analisis-final.md (lista para migrar; verificación de Bing puesta, mapa con fechas y fotos, consentimiento de Google para Europa).
1. Yama conecta Netlify. Claude pasa `comprobar:web` a la dirección netlify.app, ya con redirecciones.
2. Prueba real del formulario (Fase 5).
3. Search Console: verificado con Google Analytics (Yama, 20-11-2026). La etiqueta G-SWJY3P4YRP va al principio de la cabecera y se activa con el interruptor: no hay que hacer nada. Opcional: propiedad de dominio con un TXT en OVH (no toca el correo).
4. Mensaje de privacidad de Google para Europa: ya sale en la web viva (visto el 16-11-2026); comprobar que sale también en la nueva al activar AdSense.

## El día
1. **Claude**: interruptor de `site.json` a «encendido»; descomentar en `netlify.toml` la redirección netlify.app → dominio, con el nombre real del sitio (dearquitectura.netlify.app); `npm run todo` a 0; subir.
2. **Yama en Netlify**: Domain management → Add a domain → `dearquitectura.info`, y elegir **DNS externo** (los DNS se quedan en OVH, D4). Netlify añade `www` y lo redirige solo al dominio sin www.
3. **Yama en OVH** (Dominios → dearquitectura.info → Zona DNS). Solo estos cuatro cambios:

| Registro | Ahora | Qué hacer |
|---|---|---|
| A, dominio sin nada delante | 54.36.145.173 | Cambiar por el número que dé Netlify (hoy 75.2.60.5) |
| AAAA, dominio sin nada delante | 2001:41d0:301:4::28 | Borrar |
| A, www | 54.36.145.173 | Borrar |
| AAAA, www | 2001:41d0:301:4::28 | Borrar y crear **CNAME www → NOMBRE-DEL-SITIO.netlify.app** |

   **No se toca nada más** (es el correo y otras verificaciones):
   - MX: mx1, mx2 y mx3.mail.ovh.net.
   - TXT: `v=spf1 include:mx.ovh.com ~all`, `openai-domain-verification=…` y `1|www.dearquitectura.info`.
   - CNAME: mail, smtp, imap y pop3 → ssl0.ovh.net; autodiscover y autoconfig → mailconfig.ovh.net; ftp.
   - Servidores DNS (NS): dns16.ovh.net y ns16.ovh.net.

4. **Esperar** de 1 a 24 horas. Netlify pone el candado (HTTPS) solo cuando ve el cambio.
5. **Claude**: `npm run comprobar:web -- https://dearquitectura.info` a 0.
6. **Yama**: mandar un correo a arquitectura@dearquitectura.info desde otra cuenta, y contestarlo, para ver que el correo sigue funcionando.
7. **Search Console**: enviar `https://dearquitectura.info/sitemap.xml`. **Bing Webmaster**: importar desde Search Console.
8. El hosting de OVH se mantiene **un mes más** sin tocar, por si hay que volver atrás. Volver atrás es poner el A de antes.

## Fase 8 (a las dos semanas)
`npm run comprobar:web -- https://dearquitectura.info` y Search Console: clics de las páginas con tráfico (bizantina, incaica, urbana, maya, renders-guatemala, -paraguay, -uruguay), antes y después.

## URGENTE: estado real visto el 24-11-2026
- **El dominio ya apunta a Netlify** (cambio en el registro del 22-11-2026) y la web nueva está publicada. `comprobar:web` da 0 fallos: 317 páginas y 297 fotos que Google conoce, 276 del mapa y 8 redirecciones.
- **El interruptor sigue apagado** (`indexar: false`). Todas las páginas miradas en vivo llevan `noindex, follow`, robots.txt no anuncia el mapa y no están GA4 ni AdSense. Cuando Google pase, puede sacar la web de los resultados. Sin la etiqueta GA4, Search Console también puede perder la verificación.
- **El correo no tiene registros.** Los DNS no se quedaron en OVH (D4): ahora son los de Netlify (dns1 a dns4.p04.nsone.net), y ahí no hay MX ni SPF. Los correos a arquitectura@dearquitectura.info no tienen adónde llegar. La zona de OVH sigue guardada.
- **Registros que faltan en Netlify** (Domain management → DNS → Add record), copiados de la zona de OVH. Los MX, el SPF y el SRV se han consultado hoy; los CNAME salen de la lista del 15-11-2026, porque hoy OVH no ha contestado a esa consulta:

| Tipo | Nombre | Valor | Prioridad |
|---|---|---|---|
| MX | @ | mx1.mail.ovh.net | 1 |
| MX | @ | mx2.mail.ovh.net | 5 |
| MX | @ | mx3.mail.ovh.net | 100 |
| TXT | @ | v=spf1 include:mx.ovh.com ~all | |
| CNAME | mail, smtp, imap, pop3 (uno por cada uno) | ssl0.ovh.net | |
| CNAME | autodiscover, autoconfig (uno por cada uno) | mailconfig.ovh.net | |
| SRV | _autodiscover._tcp | mailconfig.ovh.net, puerto 443 | 0 |

- **La copia dearquitectura.netlify.app sigue abierta.** Al encender Google hay que activar su redirección al dominio en netlify.toml.
- **Sin comprobar:** si Google ya ha quitado páginas, y el envío real del formulario.

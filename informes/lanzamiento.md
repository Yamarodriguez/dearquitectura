# Lanzamiento (Fase 7): guion del día del cambio

Preparado el 15-11-2026, sin Netlify todavía. Los registros de OVH son los que hay
publicados hoy (consultados en internet, no en el panel de OVH).

## Lo que ya está listo (en GitHub)
- `robots.txt`: las mismas reglas que tenía Yoast. El mapa del sitio solo aparece cuando se enciende Google.
- Interruptor en `src/data/site.json`: `indexar: true` y pasar los códigos de `confirmados` a `ga4` y `adsense`. Con eso se quita el noindex (salvo legales, /gracias/, 404 y las 86 ciudades aprobadas), se pone el mapa en robots.txt y se activan GA4 y AdSense.
- El comprobador no deja subir la web con Google encendido y sin GA4 o AdSense (ensayado: lo frena; con todo puesto pasa a 0).
- `npm run comprobar:web -- <dirección>`: revisa una web publicada como la ve Google. Comprueba las 317 páginas y 297 fotos que Google conoce, las 240 del mapa, las redirecciones de netlify.toml, robots.txt, ads.txt y el 404. En local, a 0 (en local no se pueden probar las redirecciones).

## Antes del día
1. Yama conecta Netlify. Claude pasa `comprobar:web` a la dirección netlify.app, ya con redirecciones.
2. Prueba real del formulario (Fase 5).
3. Yama activa en AdSense el mensaje de privacidad de Google para Europa (Privacidad y mensajes).

## El día
1. **Claude**: interruptor de `site.json` a «encendido»; descomentar en `netlify.toml` la redirección netlify.app → dominio, con el nombre real del sitio; `npm run todo` a 0; subir.
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

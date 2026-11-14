# Inventario de dearquitectura.info (Fase 0)

Fecha: 14-11-2026. Solo lectura: no se ha cambiado nada de la web.

## Entorno
- Node 24.18 (el método pide 22; vale igual) · git 2.54 · **`gh` (GitHub) no instalado** · Playwright sin instalar (se instala en la Fase 1 con `npm`).
- La web responde bien desde aquí (curl). Navegador de Claude: pendiente de que Yama permita el dominio.
- Carpeta preparada: `PROMPT-MIGRACION-V7.md` y `kit/` copiados de contenedoresmaritimos; `origen/` con los 3 XML (Descargas), el ZIP de Search Console (estaba suelto en la carpeta principal) descomprimido en `origen/sc/`, y una zona DNS parcial de 2024.

## El export de WordPress
- Fecha: **24-03-2025** (tiene 20 meses). WordPress 6.7.2, tema OceanWP.
- 3 ficheros: el grande es el export completo; `(1)` = solo páginas (las mismas 330); `(2)` = solo la página /renders/.
- **330 páginas, 0 entradas de blog.** 326 hechas con Elementor; las 4 legales (aviso legal, privacidad, cookies, personalizar cookies) **vacías** y en `noindex`.
- Todas las URL cuelgan de la raíz (`/slug/`), ninguna anidada.
- Comparado con la web de hoy: **las mismas 326 URL**, ninguna nueva. **10 páginas se han editado después del export**: /render-360/ (may-2026), /renders-interiores/, /santa-fe/, /renders-santa-fe/, /servicios-de-arquitectura/, /renders/ (ene-2026), /estudio-de-arquitectura-avila/, /gandia/, /sagunto/ (jun-2025), /arquitectura-industrial/ (may-2025).
- 845 imágenes adjuntas.

### Tipos de página
| Grupo | Nº | Ejemplos |
|---|---|---|
| `renders-<ciudad/país/tipo>` | 241 | renders-madrid, renders-mexico, renders-guatemala, renders-oficinas |
| `render-*` | 8 | render-360, render-online, render-casa |
| `arquitectura-<estilo>` | 14 | bizantina, incaica, maya, urbana, barroca |
| Otras (oficios, servicios, ciudades, recursos) | 63 | arquitectos, planos, maquetas, valencia, home-staging, contacto |
| Legales | 4 | vacías |

### Elementor
- Widgets: títulos 28.243, imágenes 25.190, textos 15.075, botones 12.707, desplegables (FAQ) 1.061, **mapas de Google en 239 páginas**, vídeos 76, galerías 21.
- **H1**: 17 páginas sin H1 (arquitectos, arquitecto-tecnico, renderista, interiorista…) → regla D7. 1 página con 2 H1 (agencia-de-diseno).
- **Botones rotos del original**: 5 botones que salen en ~269 páginas cada uno llevan a páginas que no existen (dan 404 hoy en la web): Construcción → /construccion/, Reformas → /reformas/, Diseños → /disenos-arquitectonicos/, Interiorismo → /interiorismo/, IA → /inteligencia-artificial-arquitectura/. Unos 1.340 enlaces rotos.
- Enlaces internos sin barra final: 0. Enlaces a otras webs: 0.
- Shortcodes: `[panorama]` en 2 páginas (visor 360, plugin «panorama» + `/panorama-viewer/salon/`), `[Megaestructuras]` en 1 (probablemente texto suelto).

### Plugins vistos
Elementor, Essential Addons, OceanWP + Ocean Extra, Yoast SEO, Easy Table of Contents (índice en 330 páginas), Contact Form 7, Complianz (cookies), Content Views, Panorama, BSF (reseñas/schema).

### Menús (12, 1.358 elementos)
renders (316), renders-espana (246), renders-argentina (120), renders-mexico (100), arquitectura (99), renders-colombia (94), renders-ecuador (91), renders-espana-sin-ciudades (88), estudio (71), estudio-con-provincias-abajo (70), sin-provincias (59), pie-de-pagina (4). El orden y anidado reales se sacarán de la web en vivo (Fase 2).

### Formulario
Uno (Contact Form 7, en /contacto/): nombre, correo, zona, teléfono, mensaje, casilla de privacidad. Avisa a **arquitectura@dearquitectura.info**.

### SEO
Yoast: título y descripción propios en las 326 páginas con contenido. Título de portada: «DE Arquitectura - Arquitectura y Diseño - Arquitectura - DEARQUITECTURA.INFO».

## Datos encontrados en la web en vivo
- AdSense: **ca-pub-7333712322602518** (también en ads.txt) · GA4: **G-SWJY3P4YRP**.
- Sin teléfono, WhatsApp ni correo visibles en la portada.
- robots.txt bloquea `AdsBot` (el robot de anuncios de Google, no el de búsqueda).
- Sin `noindex` ni problemas de canonical en las páginas probadas.

## DNS y correo (consultado hoy)
- Dominio y DNS en **OVH** (ns16/dns16.ovh.net). Web en 54.36.145.173 (+ IPv6).
- **Correo en OVH**: MX mx1/mx2/mx3.mail.ovh.net · SPF `v=spf1 include:mx.ovh.com ~all` · CNAME mail/smtp/imap/pop3 → ssl0.ovh.net, autoconfig/autodiscover → mailconfig.ovh.net, ftp → dominio.
- Otros TXT: verificación de OpenAI, `1|www.dearquitectura.info`.
- La zona de 2024 en `origen/` está incompleta (no trae los MX). Si se mantienen los DNS en OVH (D4), el correo no se toca.

## Search Console (últimos 16 meses)
- 3.283 clics y 651.000 impresiones. Ordenador 59 %, móvil 40 %.
- Países: México 926 · Argentina 366 · Colombia 312 · Perú 305 · España 257 · Ecuador 141 · Guatemala 130 · Venezuela 98.
- Páginas top: arquitectura-bizantina 402 · arquitectura-incaica 171 · arquitectura-urbana 133 · arquitectura-maya 115 · renders-guatemala 86 · renders-paraguay 82 · renders-uruguay 76. Las `renders-*` suman 1.718 clics; las `arquitectura-*`, 1.133.
- Todas las URL de página con tráfico están en el export. Las que no, son fotos (2 clics en total).
- **Caída fuerte**: clics por mes 287 (jul-25) → 607 (oct-25) → 189 (dic-25) → 57 (abr-26) → 6-9 (sep/oct-26). Impresiones de ~80.000/mes a ~2.500/mes. No hay bloqueo técnico visible (robots, noindex, canonical correctos).

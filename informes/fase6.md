# Fase 6 — Velocidad (15-11-2026)

Medido con `node scripts/velocidad.mjs` (móvil 390 px, CPU ×4 más lenta, 4G ~9 Mbit/s, 150 ms de latencia), sobre dist/ en local (sin compresión; Netlify sirve con brotli y los estilos pesan ~8 veces menos):

| Página | LCP antes | LCP ahora | CLS | Peso | Peticiones |
|---|---|---|---|---|---|
| / | 1,1 s | 1,0 s | 0 | 500 KB | 15 |
| /arquitectura-bizantina/ | 1,7 s | 1,1 s | 0 | 535 KB | 13 |
| /renders-madrid/ | 1,4 s | 1,2 s | 0 | 367 KB | 10 |
| /contacto/ | 1,0 s | 1,0 s | 0 | 438 KB | 13 |
| /valencia/ | 1,0 s | 1,1 s | 0 | 412 KB | 12 |

(Google da por bueno un LCP de menos de 2,5 s y un CLS de menos de 0,1.)

Ya estaba de antes: webp a 400/800 px y al ancho original en `<picture>` con la foto original en `<img>`; medidas en todas las imágenes (por eso CLS 0); tipografías en local; fotos con `loading="lazy"`; visor 360 y mapas cargados solo al llegar a ellos.

Nuevo: la primera foto del contenido de cada página se carga con prioridad (`loading="eager"` + `fetchpriority="high"`).

No hecho: los 2 vídeos mp4 (75-76 MB) siguen sin comprimir porque no hay programa para ello en este ordenador. Solo se descargan si alguien pulsa «play» (preload="metadata"), así que no afectan a la carga de la página.

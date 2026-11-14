# Fase 5 — Formulario (14-11-2026)

- `src/components/Formulario.astro`: mismo marcado, campos y textos que el Contact Form 7 original, enviado con **Netlify Forms** sin salir de la página (`fetch` a `/` con `form-name=contacto`).
- Validación y avisos como Contact Form 7, con sus mismos estilos y textos en español: campos obligatorios, correo y teléfono válidos, casilla de privacidad; recuadro amarillo (error), verde (enviado) o rojo (fallo).
- Antispam: campo trampa `campo-trampa` (`netlify-honeypot`) + filtro de spam de Netlify.
- Sin JavaScript: `required` en los campos y envío normal a `/gracias/` (noindex).
- Se envía también la página desde la que se escribe (`pagina`).
- `netlify.toml`: compilación, caché de estilos y fotos, y redirecciones de WordPress (fotos de `/wp-content/uploads/`, sitemaps de Yoast, visor 360, feed). La redirección de netlify.app al dominio queda comentada hasta la Fase 7.

## Probado en local
Vacío → 4 avisos «Por favor, rellena este campo.» · correo mal → aviso de correo · sin aceptar → aviso de términos · envío en local → «Hubo un error…» (normal: no hay Netlify) · envío simulado correcto → «Gracias por tu mensaje. Ha sido enviado.» y los datos que se mandan: `form-name, pagina, campo-trampa, your-name, your-email, tel-477, Zona, your-message, Polticadeprivacidad`.

## Falta (necesita Netlify)
Prueba real: publicar en Netlify, configurar el aviso por correo a arquitectura@dearquitectura.info, enviar uno y comprobar que llega.

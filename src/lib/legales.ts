// Textos de las 4 páginas legales, que en la web original están vacías.
// Redactados para esta web (14-11-2026) a partir de lo que de verdad hace:
// formulario de contacto (nombre, correo, teléfono, zona, mensaje), anuncios de
// Google AdSense, Google Analytics, mapas de Google Maps, vídeos de YouTube y
// alojamiento en Netlify. Los {{marcadores}} se rellenan con site.json.
// Si faltan los datos del titular, NO se publica el texto (se ve «pendiente»):
// un aviso legal sin titular no cumple la LSSI.
// Pendiente de revisión por el titular.
import site from '../data/site.json';

const FECHA = '14 de noviembre de 2026';

const AVISO = `
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), te informamos de los datos del titular de este sitio web.</p>
<h2>1. Titular del sitio web</h2>
<ul>
<li><strong>Titular:</strong> {{nombre}}</li>
<li><strong>NIF/NIE:</strong> {{nif}}</li>
<li><strong>Domicilio:</strong> {{direccion}}</li>
<li><strong>Correo electrónico:</strong> {{correo}}</li>
<li><strong>Sitio web:</strong> {{dominio}}</li>
</ul>
<h2>2. Objeto</h2>
<p>{{dominio}} es una web informativa sobre arquitectura (estilos, profesiones, recursos y proyectos) que, además, presenta servicios de arquitectura, renders, planos y modelado 3D. El acceso es gratuito y no exige registro.</p>
<h2>3. Uso del sitio</h2>
<p>Al usar este sitio te comprometes a hacerlo de forma lícita y a no dañar su funcionamiento ni los derechos de terceros. Los contenidos tienen carácter informativo y no sustituyen el asesoramiento de un profesional para un proyecto concreto.</p>
<h2>4. Propiedad intelectual</h2>
<p>Los textos, imágenes, renders, logotipos y diseño de este sitio pertenecen a su titular o se usan con permiso. No se permite reproducirlos, distribuirlos ni transformarlos sin autorización, salvo para uso personal y privado.</p>
<h2>5. Responsabilidad y enlaces</h2>
<p>Procuramos que la información sea correcta y esté actualizada, pero no podemos garantizar que no contenga errores. Los enlaces a otros sitios web se ofrecen como referencia: no somos responsables de su contenido.</p>
<h2>6. Protección de datos y cookies</h2>
<p>El tratamiento de tus datos personales se explica en la <a href="/politica-de-privacidad/">Política de Privacidad</a> y el uso de cookies en la <a href="/politica-de-cookies/">Política de Cookies</a>.</p>
<h2>7. Legislación aplicable</h2>
<p>Este aviso legal se rige por la legislación española.</p>
<p><em>Última actualización: {{fecha}}.</em></p>
`;

const PRIVACIDAD = `
<p>Esta Política de Privacidad explica qué datos personales recoge <strong>{{dominio}}</strong>, para qué los usa y qué derechos tienes sobre ellos, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
<h2>1. Responsable</h2>
<ul>
<li><strong>Responsable:</strong> {{nombre}}</li>
<li><strong>NIF/NIE:</strong> {{nif}}</li>
<li><strong>Domicilio:</strong> {{direccion}}</li>
<li><strong>Correo electrónico:</strong> {{correo}}</li>
</ul>
<h2>2. Qué datos recogemos</h2>
<p>Solo los que nos das al rellenar el formulario de contacto: tu nombre, tu correo electrónico, tu teléfono, tu zona o provincia y, si quieres, tu mensaje. Además, como cualquier web, el servidor registra datos técnicos (como la dirección IP y la fecha de la visita) necesarios para que funcione y sea segura.</p>
<h2>3. Para qué los usamos y con qué base legal</h2>
<p>Para <strong>responder a tu consulta</strong> y, si nos lo pides, enviarte información o un presupuesto de nuestros servicios. La base legal es <strong>tu consentimiento</strong> (artículo 6.1.a del RGPD), que das al marcar la casilla de aceptación y enviar el formulario. Puedes retirarlo cuando quieras escribiéndonos.</p>
<h2>4. Cuánto tiempo los conservamos</h2>
<p>Mientras sean necesarios para atender tu consulta y, después, durante los plazos legales para atender posibles responsabilidades. Pasado ese tiempo, los eliminamos.</p>
<h2>5. Quién más puede tratarlos</h2>
<p>No vendemos tus datos. Para que la web funcione intervienen proveedores que actúan por nuestra cuenta: el alojamiento de la web y el envío del formulario (Netlify, con servidores fuera del Espacio Económico Europeo, con las garantías que exige el RGPD para estas transferencias). En la web se muestran anuncios de Google AdSense y se mide el uso con Google Analytics; Google puede usar cookies según lo que elijas en su mensaje de privacidad (ver la <a href="/politica-de-cookies/">Política de Cookies</a>). Solo comunicaremos tus datos a otros si la ley nos obliga o si tú nos lo pides.</p>
<h2>6. Tus derechos</h2>
<p>Puedes ejercer tus derechos de <strong>acceso, rectificación, supresión, oposición, limitación y portabilidad</strong> escribiendo a {{correo}}. Podemos pedirte que acredites tu identidad. Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es">www.aepd.es</a>).</p>
<h2>7. Seguridad</h2>
<p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración.</p>
<p><em>Última actualización: {{fecha}}.</em></p>
`;

const COOKIES = `
<p>Esta Política de Cookies explica qué cookies puede instalar <strong>{{dominio}}</strong> y cómo controlarlas, conforme a la LSSI y al RGPD.</p>
<h2>1. Qué es una cookie</h2>
<p>Un pequeño archivo que una web guarda en tu dispositivo para recordar preferencias o medir cómo se usa.</p>
<h2>2. Qué cookies usa este sitio</h2>
<ul>
<li><strong>Propias:</strong> esta web no instala cookies propias de seguimiento ni de publicidad.</li>
<li><strong>Google AdSense (publicidad):</strong> Google y sus socios pueden usar cookies para mostrar y medir anuncios y, si lo aceptas, para personalizarlos. Puedes aceptarlas, rechazarlas o configurarlas en el mensaje de privacidad de Google que aparece al entrar. Más información: <a href="https://policies.google.com/technologies/ads">cómo usa Google las cookies en publicidad</a>.</li>
<li><strong>Google Analytics (estadísticas):</strong> si lo aceptas, Google Analytics usa cookies para saber, de forma agregada, cuántas personas visitan la web y qué páginas leen.</li>
<li><strong>Google Maps:</strong> algunas páginas incluyen un mapa incrustado; al cargarlo, Google puede instalar cookies para prestar ese servicio.</li>
<li><strong>YouTube:</strong> los vídeos se incrustan en modo de privacidad mejorada (youtube-nocookie.com); al reproducirlos, YouTube puede instalar cookies.</li>
</ul>
<h2>3. Cómo controlarlas</h2>
<p>Puedes cambiar tu elección en cualquier momento desde <a href="/personalizar-cookies/">Personalizar cookies</a>, y también permitir, bloquear o borrar cookies desde la configuración de tu navegador. Si bloqueas las de terceros, los mapas y vídeos podrían no verse.</p>
<p>Más información en la <a href="/politica-de-privacidad/">Política de Privacidad</a> y el <a href="/aviso-legal/">Aviso Legal</a>.</p>
<p><em>Última actualización: {{fecha}}.</em></p>
`;

const PERSONALIZAR = `
<p>Aquí puedes cambiar qué cookies aceptas en <strong>{{dominio}}</strong>.</p>
<p><button type="button" class="elementor-button elementor-size-sm" data-revisar-cookies>Cambiar mis preferencias de cookies</button></p>
<p>El botón vuelve a abrir el mensaje de privacidad de Google, donde puedes aceptar, rechazar o configurar las cookies de publicidad y estadísticas. También puedes borrarlas o bloquearlas desde los ajustes de tu navegador.</p>
<p>Detalles en la <a href="/politica-de-cookies/">Política de Cookies</a>.</p>
<p><em>Última actualización: {{fecha}}.</em></p>
`;

const TEXTOS: Record<string, string> = { 'aviso-legal': AVISO, 'politica-de-privacidad': PRIVACIDAD, 'politica-de-cookies': COOKIES, 'personalizar-cookies': PERSONALIZAR };

export const titularCompleto = () => !!(site.titular.nombre && site.titular.nif && site.titular.direccion);

export function textoLegal(slug: string): string | null {
  const t = TEXTOS[slug];
  if (!t || !titularCompleto()) return null;
  const datos: Record<string, string> = { nombre: site.titular.nombre, nif: site.titular.nif, direccion: site.titular.direccion, correo: site.correo, dominio: site.dominio, fecha: FECHA };
  return t.trim().replace(/\{\{(\w+)\}\}/g, (_m, k) => datos[k] ?? '');
}

// Menú del móvil, desplegables de preguntas, fotos de fondo que se cargan al
// acercarse, botón de subir y «Personalizar cookies».
(function () {
  // Menú del móvil
  var boton = document.querySelector('.boton-menu');
  var menu = document.getElementById('menu-movil');
  var cabecera = document.querySelector('.cabecera');
  if (boton && menu) {
    var cambiar = function (abrir) {
      if (cabecera) document.documentElement.style.setProperty('--alto-cabecera', cabecera.getBoundingClientRect().bottom + 'px');
      menu.classList.toggle('abierto', abrir);
      document.body.classList.toggle('menu-abierto', abrir);
      boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      boton.querySelector('span').textContent = abrir ? 'Cerrar' : 'Menú';
    };
    boton.addEventListener('click', function () { cambiar(!menu.classList.contains('abierto')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('abierto')) { cambiar(false); boton.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1240 && menu.classList.contains('abierto')) cambiar(false); });
    menu.querySelectorAll('.abrir').forEach(function (b) {
      b.addEventListener('click', function () {
        var li = b.closest('li');
        var abierto = li.classList.toggle('abierto');
        b.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      });
    });
  }

  // Desplegables de preguntas (toggle de Elementor)
  document.querySelectorAll('.elementor-toggle .elementor-tab-title').forEach(function (t) {
    var cambiar = function (e) {
      if (e) e.preventDefault();
      var activo = t.classList.toggle('elementor-active');
      t.setAttribute('aria-expanded', activo ? 'true' : 'false');
      var c = t.nextElementSibling; if (c) c.classList.toggle('elementor-active', activo);
    };
    t.addEventListener('click', cambiar);
    t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') cambiar(e); });
  });

  // Fotos de fondo de las secciones: se cargan cuando se acercan a la pantalla
  var fondos = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('e-lazyloaded'); obs.unobserve(e.target); } });
    }, { rootMargin: '200px 0px 200px 0px' });
    fondos.forEach(function (f) { obs.observe(f); });
  } else fondos.forEach(function (f) { f.classList.add('e-lazyloaded'); });

  // «Personalizar cookies»: vuelve a abrir el mensaje de privacidad de Google (cuando esté activo)
  document.querySelectorAll('[data-revisar-cookies]').forEach(function (b) {
    b.addEventListener('click', function () {
      window.googlefc = window.googlefc || {}; window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
      if (window.googlefc.showRevocationMessage) window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
      else alert('El mensaje de privacidad aún no está disponible. Puedes gestionar las cookies desde los ajustes de tu navegador.');
    });
  });

  // Botón de subir
  var arriba = document.querySelector('.subir');
  if (arriba) {
    window.addEventListener('scroll', function () { arriba.classList.toggle('visible', window.scrollY > 600); }, { passive: true });
    arriba.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();

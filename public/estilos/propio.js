// Lo que en WordPress hacían jQuery, OceanWP y Elementor, en JavaScript simple:
// menú de móvil, desplegables de Elementor, fondos que se cargan al verse y el
// botón de subir arriba.
(function () {
  // Menú de móvil
  var boton = document.querySelector('.oceanwp-mobile-menu-icon a.mobile-menu');
  var menu = document.getElementById('mobile-dropdown');
  if (boton && menu) {
    boton.addEventListener('click', function (e) {
      e.preventDefault();
      var abierto = menu.classList.toggle('abierto');
      boton.classList.toggle('opened', abierto);
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    menu.querySelectorAll('.dropdown-toggle').forEach(function (t) {
      var abrir = function (e) {
        e.preventDefault(); e.stopPropagation();
        t.closest('li').classList.toggle('active');
      };
      t.addEventListener('click', abrir);
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') abrir(e); });
    });
  }

  // Desplegables (toggle) de Elementor
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

  // Fondos de los contenedores: Elementor los carga cuando se acercan a la pantalla
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

  // Botón de subir arriba
  var arriba = document.getElementById('scroll-top');
  if (arriba) {
    window.addEventListener('scroll', function () { arriba.classList.toggle('visible', window.scrollY > 100); }, { passive: true });
    arriba.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();

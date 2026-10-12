// Boreal · interacciones. Sin dependencias.
(() => {
  const html = document.documentElement;
  html.classList.add('js');
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento) html.classList.add('no-anim');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const TEL = '34615641086';
  const EMAIL = 'borealfloristas@hotmail.es';

  /* ---------- Horario y estado (hora de Dénia, sea cual sea la zona del visitante) ---------- */
  // Horario publicado en Google Maps. Minutos desde las 00:00.
  const HORARIO = { 0: [], 1: [[570, 810], [1020, 1200]], 2: [[570, 810], [1020, 1200]], 3: [[570, 810], [1020, 1200]], 4: [[570, 810], [1020, 1200]], 5: [[570, 810], [1020, 1200]], 6: [[600, 840]] };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const hhmm = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;

  function ahoraEnDenia() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { dia, min: (+p.hour % 24) * 60 + +p.minute };
  }

  function estado() {
    const { dia, min } = ahoraEnDenia();
    const tramo = HORARIO[dia].find(([a, b]) => min >= a && min < b);
    if (tramo) return { abierto: true, corto: `Abierto · hasta ${hhmm(tramo[1])}`, largo: `Abierto ahora · cierra a las ${hhmm(tramo[1])}`, dia };
    const hoy = HORARIO[dia].find(([a]) => a > min);
    if (hoy) return { abierto: false, corto: `Cerrado · abre a las ${hhmm(hoy[0])}`, largo: `Cerrado ahora · abre hoy a las ${hhmm(hoy[0])}`, dia };
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7;
      if (HORARIO[d].length) {
        const cuando = i === 1 ? 'mañana' : `el ${DIAS[d]}`;
        return { abierto: false, corto: `Cerrado · abre ${cuando}`, largo: `Cerrado ahora · abre ${cuando} a las ${hhmm(HORARIO[d][0][0])}`, dia };
      }
    }
  }

  function pintarEstado() {
    const e = estado();
    if (!e) return;
    const t = $('[data-estado-texto]'); if (t) t.textContent = e.corto;
    $('[data-estado]')?.classList.toggle('is-abierto-ahora', e.abierto);
    const l = $('[data-estado-largo]'); if (l) l.textContent = e.largo;
    $('[data-estado-punto]')?.classList.toggle('is-on', e.abierto);
    const l2 = $('[data-estado-largo-2]');
    if (l2) l2.innerHTML = `<span class="estado__punto${e.abierto ? ' is-on' : ''}" aria-hidden="true"></span>${e.largo}`;
    $$('[data-horario] tr').forEach((tr) => tr.classList.toggle('is-hoy', +tr.dataset.dia === e.dia));
  }
  pintarEstado();
  setInterval(pintarEstado, 60_000);

  /* ---------- Menú móvil ---------- */
  const menuBtn = $('[data-menu-btn]');
  const menu = $('#menu');
  menuBtn?.addEventListener('click', () => {
    const abierto = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!abierto));
    menu.classList.toggle('is-abierto', !abierto);
  });
  menu?.addEventListener('click', (e) => {
    if (e.target.closest('a')) { menuBtn.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-abierto'); }
  });

  /* ---------- Revelados ---------- */
  if ('IntersectionObserver' in window && !sinMovimiento) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visto'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-visto'));
  }

  /* ---------- Scroll: cabecera, cambio, modo noche ---------- */
  const top = $('[data-top]');
  const cambio = $('[data-cambio]');
  const bodas = $('#bodas');
  let pendiente = false;

  function alScroll() {
    pendiente = false;
    const y = scrollY;
    const vh = innerHeight;
    top.classList.toggle('is-solida', y > 24);

    let p = 0;
    if (cambio && !sinMovimiento) {
      const r = cambio.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      cambio.style.setProperty('--p', p.toFixed(3));
      cambio.classList.toggle('is-boda', p > 0.48);
    }
    // La cabecera pasa a modo noche sobre la zona oscura
    const rb = bodas.getBoundingClientRect();
    const ra = cambio.getBoundingClientRect();
    const noche = (rb.top <= 40 && rb.bottom > 40) || (ra.top <= 0 && ra.bottom > 40 && (sinMovimiento || p > 0.55));
    top.classList.toggle('is-noche', noche);
    html.classList.toggle('is-noche-ui', noche);
  }
  addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(alScroll); } }, { passive: true });
  addEventListener('resize', alScroll);
  alScroll();

  /* ---------- Índice de encargos: imagen que sigue al cursor ---------- */
  const indice = $('[data-indice]');
  const caja = $('[data-preview-box]');
  if (indice && caja && matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
    const label = $('[data-preview-label]', caja);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const mover = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      caja.style.setProperty('--x', `${cx}px`); caja.style.setProperty('--y', `${cy}px`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(mover) : 0;
    };
    indice.addEventListener('mousemove', (e) => {
      tx = e.clientX + 28; ty = e.clientY - 150;
      if (sinMovimiento) { cx = tx; cy = ty; caja.style.setProperty('--x', `${cx}px`); caja.style.setProperty('--y', `${cy}px`); }
      else if (!raf) raf = requestAnimationFrame(mover);
    });
    $$('.indice__item', indice).forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        // Si se entra por scroll (sin mover el ratón) no habrá mousemove: colocar ya
        tx = e.clientX + 28; ty = e.clientY - 150;
        if (!caja.classList.contains('is-on')) { cx = tx; cy = ty; caja.style.setProperty('--x', `${cx}px`); caja.style.setProperty('--y', `${cy}px`); }
        const n = item.dataset.preview;
        $$('img', caja).forEach((img) => img.classList.toggle('is-on', img.dataset.previewSrc === n));
        const real = ['interior', 'centro-tienda', 'navidad-interior'].includes(n);
        label.textContent = `${item.querySelector('.indice__num').textContent} ${real ? '● foto real' : 'ambiente'}`;
        caja.classList.add('is-on');
      });
    });
    indice.addEventListener('mouseleave', () => caja.classList.remove('is-on'));
  }

  /* ---------- Fechas legibles ---------- */
  const fechaLarga = (v) => {
    if (!v) return '';
    const [a, m, d] = v.split('-').map(Number);
    return new Date(a, m - 1, d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  /* ---------- Tarjeta dedicatoria → WhatsApp / email ---------- */
  const form = $('[data-compositor]');
  if (form) {
    const tarjeta = $('[data-tarjeta]');
    const t = (k) => $(`[data-t-${k}]`, tarjeta);
    const cuenta = $('[data-cuenta]');
    const wa = $('[data-enviar-wa]');
    const mail = $('[data-enviar-mail]');
    const EJEMPLO = 'Que este ramo te diga lo que yo no sé escribir.';
    const etiquetaDe = (name) => form.querySelector(`input[name="${name}"]:checked`)?.nextElementSibling.textContent.trim() || '';

    const pintar = () => {
      const d = Object.fromEntries(new FormData(form));
      t('ocasion').textContent = etiquetaDe('ocasion');
      t('tonos').textContent = etiquetaDe('tonos');
      t('para').textContent = d.para ? `Para ${d.para},` : 'Para ti,';
      t('texto').textContent = d.dedicatoria || EJEMPLO;
      t('texto').style.opacity = d.dedicatoria ? 1 : 0.5;
      t('firma').textContent = d.firma ? `— ${d.firma}` : '— Con cariño';
      cuenta.textContent = `${(d.dedicatoria || '').length}/160`;

      const lineas = [
        `Hola, Boreal. Quería encargar un ramo para ${d.ocasion}.`,
        `· Tonos: ${d.tonos}`,
        `· Tamaño: ${d.tamano}`,
        `· Entrega: ${d.entrega}${d.fecha ? `, para el ${fechaLarga(d.fecha)}` : ''}`,
        d.para && `· Para: ${d.para}`,
        d.dedicatoria && `· Tarjeta: «${d.dedicatoria}»`,
        d.firma && `· Firma: ${d.firma}`,
        '¿Me confirmáis disponibilidad y precio? ¡Gracias!',
      ].filter(Boolean).join('\n');
      wa.href = `https://wa.me/${TEL}?text=${encodeURIComponent(lineas)}`;
      mail.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Encargo de ramo')}&body=${encodeURIComponent(lineas)}`;
    };
    let latido;
    form.addEventListener('input', () => {
      pintar();
      if (sinMovimiento) return;
      tarjeta.classList.add('is-latido'); clearTimeout(latido);
      latido = setTimeout(() => tarjeta.classList.remove('is-latido'), 260);
    });
    form.addEventListener('submit', (e) => e.preventDefault());
    pintar();
  }

  /* ---------- Presupuesto de boda → WhatsApp / email ---------- */
  const boda = $('[data-boda]');
  if (boda) {
    const wa = $('[data-boda-wa]');
    const mail = $('[data-boda-mail]');
    const pintar = () => {
      const d = Object.fromEntries(new FormData(boda));
      const msg = [
        'Hola, Boreal. Nos casamos y nos gustaría hablar de las flores.',
        d.fecha && `· Fecha: ${fechaLarga(d.fecha)}`,
        d.lugar && `· Lugar: ${d.lugar}`,
        d.invitados && `· Invitados: unos ${d.invitados}`,
        d.idea && `· La idea: ${d.idea}`,
        '¿Podemos ver ideas y presupuesto? ¡Gracias!',
      ].filter(Boolean).join('\n');
      wa.href = `https://wa.me/${TEL}?text=${encodeURIComponent(msg)}`;
      mail.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Flores para nuestra boda')}&body=${encodeURIComponent(msg)}`;
    };
    boda.addEventListener('input', pintar);
    boda.addEventListener('submit', (e) => e.preventDefault());
    pintar();
  }

  /* ---------- Cuaderno de bodas: controles de la tira ---------- */
  const tira = $('[data-tira]');
  if (tira) {
    const items = $$('li', tira);
    const pos = $('[data-tira-pos]');
    const actual = () => {
      const x = tira.scrollLeft + 1;
      let i = items.findIndex((li) => li.offsetLeft - tira.offsetLeft + li.offsetWidth / 2 > x);
      if (tira.scrollLeft + tira.clientWidth >= tira.scrollWidth - 4) i = items.length - 1;
      return Math.max(0, i);
    };
    const ir = (d) => {
      const i = Math.min(items.length - 1, Math.max(0, actual() + d));
      tira.scrollTo({ left: items[i].offsetLeft - tira.offsetLeft - parseFloat(getComputedStyle(tira).paddingLeft), behavior: sinMovimiento ? 'auto' : 'smooth' });
    };
    $('[data-tira-prev]')?.addEventListener('click', () => ir(-1));
    $('[data-tira-next]')?.addEventListener('click', () => ir(1));
    tira.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1); }
    });
    tira.addEventListener('scroll', () => {
      if (pos) pos.textContent = `${String(actual() + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    }, { passive: true });
  }
})();

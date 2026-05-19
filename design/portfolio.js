/* ─────────────────────────────────────────────────────────────────────────
   Amir Rojas — Portfolio · scroll-telling controller (vanilla JS)
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Reveal on enter ──────────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ── Hero icons — gentle mouse parallax ───────────────────────
  const hero = document.querySelector('.hero');
  const icons = Array.from(document.querySelectorAll('.float-icon'));
  if (hero && icons.length) {
    let raf = null;
    let tx = 0, ty = 0;
    hero.addEventListener('mousemove', (ev) => {
      const r = hero.getBoundingClientRect();
      tx = (ev.clientX - r.left - r.width / 2) / r.width;
      ty = (ev.clientY - r.top - r.height / 2) / r.height;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });

    function apply() {
      raf = null;
      icons.forEach((el, i) => {
        const depth = 18 + (i % 4) * 8;
        const x = -tx * depth;
        const y = -ty * depth;
        el.style.setProperty('--mx', x.toFixed(2) + 'px');
        el.style.setProperty('--my', y.toFixed(2) + 'px');
        // Compose with the float animation by piggy-backing on transform via translate
        el.style.translate = x + 'px ' + y + 'px';
      });
    }
  }

  // ── P1 — Unboxing pinned scrub ───────────────────────────────
  const p1Pin   = document.querySelector('.p1-pin');
  const p1Stack = document.querySelector('.p1-stack');
  const p1Steps = Array.from(document.querySelectorAll('.p1-step'));

  function updateP1() {
    if (!p1Pin || !p1Stack) return;
    const r = p1Pin.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height - vh; // distance the section will scroll
    const passed = Math.min(Math.max(-r.top, 0), total);
    const p = total > 0 ? passed / total : 0; // 0..1

    // 4 stages: 0..0.18 = idle, 0.18..0.42 = stage 1, 0.42..0.7 = stage 2, 0.7..1 = stage 3
    let stage = 0;
    if (p >= 0.7) stage = 3;
    else if (p >= 0.42) stage = 2;
    else if (p >= 0.18) stage = 1;

    p1Stack.dataset.stage = String(stage);
    p1Stack.classList.toggle('is-exploded', stage > 0);

    p1Steps.forEach((el, idx) => el.classList.toggle('is-active', idx === stage));
  }

  // ── P2 — BarQuito vector draw ────────────────────────────────
  const p2Pin = document.querySelector('.p2-pin');
  const p2DrawEls = Array.from(document.querySelectorAll('.p2-draw'));
  const p2PopEls = Array.from(document.querySelectorAll('.p2-pop'));

  // measure path lengths up front
  p2DrawEls.forEach((path) => {
    try {
      const len = path.getTotalLength ? path.getTotalLength() : null;
      if (len) path.style.setProperty('--len', Math.ceil(len));
    } catch (_) {}
  });

  function updateP2() {
    if (!p2Pin) return;
    const r = p2Pin.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height - vh;
    const passed = Math.min(Math.max(-r.top, 0), total);
    const p = total > 0 ? passed / total : 0;

    // Sequence:
    //   0   - 0.30 : draw walls + bar
    //   0.20 - 0.55 : tables appear
    //   0.45 - 0.80 : flow lines draw + door + stools
    //   0.70 - 1.0  : badges + labels pop
    const wallsP = clamp((p - 0.00) / 0.30);
    const tablesP = clamp((p - 0.20) / 0.35);
    const flowP   = clamp((p - 0.45) / 0.35);
    const badgesP = clamp((p - 0.70) / 0.30);

    setVar('#bq-walls', '--p', wallsP);
    setVar('#bq-bar',   '--p', wallsP);
    setVar('#bq-flow',  '--p', flowP);

    p2PopEls.forEach((el) => {
      const tbl = el.dataset.tbl ? parseInt(el.dataset.tbl, 10) : null;
      let v;
      if (tbl != null) {
        // staggered table reveal
        const stagger = (tbl - 1) / 10;
        v = clamp((tablesP - stagger * 0.6) * 2.4);
      } else {
        // stools, door, labels, badges — split between tables and badges
        if (el.querySelector('.p2-stool')) v = clamp((tablesP - 0.4) * 2);
        else v = badgesP;
      }
      el.style.setProperty('--pop', v.toFixed(3));
    });
  }

  function setVar(sel, prop, v) {
    const el = document.querySelector(sel);
    if (el) el.style.setProperty(prop, v.toFixed(3));
  }
  function clamp(v, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

  // ── About: code/runner crossfade based on view progress ──────
  const aboutVis = document.getElementById('aboutVis');
  function updateAbout() {
    if (!aboutVis) return;
    const r = aboutVis.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when below viewport, 1 when centered, hold thereafter
    const visible = clamp(1 - (r.top - vh * 0.2) / (vh * 0.6));
    // code fades from 0.6 -> 0.12 as visibility grows
    const codeOp = 0.6 - visible * 0.48;
    aboutVis.style.setProperty('--code-op', codeOp.toFixed(2));
  }

  // ── Scroll loop ──────────────────────────────────────────────
  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateP1();
      updateP2();
      updateAbout();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // ── Smooth scroll for in-page anchors ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

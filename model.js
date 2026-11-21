/* Model sahifasi: ma'lumotni data.js dan oladi, DOM ni to'ldiradi,
   animatsiyalarni window.__pageIntro orqali script.js ishga tushiradi. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const models = window.BMW_MODELS || [];
  if (!models.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const animate = hasGSAP && !reduce;

  const id = new URLSearchParams(location.search).get('id');
  let idx = models.findIndex((m) => m.id === id);
  if (idx < 0) idx = 0;
  const m = models[idx];
  const next = models[(idx + 1) % models.length];
  const IMG = (f) => 'media/img/' + f;
  const VID = (f) => 'media/video/' + f;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- meta ---------- */
  document.title = `BMW ${m.name} — Muzaffar Toyirov`;
  const md = $('meta[name="description"]');
  if (md) md.setAttribute('content', `BMW ${m.name}: ${m.lead}`);
  const og = $('meta[property="og:image"]');
  if (og) og.setAttribute('content', IMG(m.img));
  // script.js's applyLang sets document.title from the dictionary; keep the model title
  document.documentElement.dataset.pageTitle = document.title;

  /* ---------- hero ---------- */
  const hv = $('.m-hero__video');
  hv.poster = IMG(m.img);
  if (!reduce) hv.src = VID(m.heroVideo);
  else hv.removeAttribute('autoplay');

  $('.m-tag').textContent = `${m.tag} · BMW`;
  const title = $('.m-hero__title');
  title.setAttribute('aria-label', 'BMW ' + m.name);
  title.innerHTML = m.name.split(' ').map((w) =>
    `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="char">${esc(c)}</span>`).join('')}</span>`
  ).join(' ');
  $('.m-hero__tagline').textContent = m.tagline;

  const setCount = (el, v, dec) => { el.dataset.count = v; el.textContent = Number(v).toFixed(dec || 0); };
  setCount($('.m-hp'), m.hp);
  setCount($('.m-acc'), m.acc, 1);
  setCount($('.m-top'), m.top);

  /* ---------- intro ---------- */
  const lead = $('.m-intro__lead');
  lead.innerHTML = m.lead.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const introImg = $('.m-intro__img img');
  introImg.src = IMG(m.gallery.find((g) => !g.startsWith('v:') && g !== m.img) || m.img);
  introImg.alt = `BMW ${m.name}`;
  $('.m-intro__text').textContent = m.text;

  /* ---------- specs ---------- */
  $('.m-specs__title').textContent = `BMW ${m.name}`;
  $('.spec-table').innerHTML = m.specs.map(([k, v]) =>
    `<div class="spec-row reveal"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  /* ---------- highlights ---------- */
  $('.m-high__grid').innerHTML = m.highlights.map(([t, p], i) => `
    <article class="m-card reveal">
      <span class="m-card__n">0${i + 1}</span>
      <h3>${esc(t)}</h3>
      <p>${esc(p)}</p>
    </article>`).join('');

  /* ---------- film ---------- */
  const fv = $('.m-film__video');
  fv.src = VID(m.filmVideo);
  fv.poster = IMG(m.gallery[1] && !m.gallery[1].startsWith('v:') ? m.gallery[1] : m.img);
  $('.m-film__name').textContent = m.name;

  /* ---------- gallery ---------- */
  const layout = ['g-item--wide', 'g-item--tall', '', '', 'g-item--wide', '', 'g-item--wide'];
  $('.m-gallery').innerHTML = m.gallery.map((g, i) => {
    const cls = layout[i % layout.length];
    if (g.startsWith('v:')) {
      const f = VID(g.slice(2));
      return `<button type="button" class="g-item g-item--wide" data-type="video" data-src="${f}" data-cursor="view" aria-label="Video">
        <video muted loop playsinline preload="none" poster="${IMG(m.img)}" data-autoplay><source src="${f}" type="video/mp4"></video>
        <span class="g-item__tag">Video</span></button>`;
    }
    return `<button type="button" class="g-item ${cls}" data-type="image" data-src="${IMG(g)}" data-cursor="view">
      <img src="${IMG(g)}" alt="BMW ${esc(m.name)} — ${i + 1}" loading="lazy"></button>`;
  }).join('');

  /* ---------- next ---------- */
  const nx = $('.m-next');
  nx.href = `model.html?id=${next.id}`;
  $('.m-next__img').src = IMG(next.img);
  $('.m-next__name').textContent = next.name;

  /* ---------- film video plays only when visible ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { const p = fv.play(); if (p && p.catch) p.catch(() => {}); } else fv.pause();
    }), { threshold: 0.2 }).observe(fv);
  }

  /* ---------- animations (called by script.js after Lenis is ready) ---------- */
  const count = (el, d) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    gsap.to(o, { v: target, duration: d, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
  };

  window.__pageIntro = () => {
    if (!animate) return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.m-hero__video', { scale: 1.35 }, { scale: 1.05, duration: 2.4, ease: 'power3.out' }, 0)
      .from('.back-link', { x: -30, opacity: 0, duration: 1 }, 0.2)
      .from('.m-hero__eyebrow', { y: 20, opacity: 0, duration: 1 }, 0.3)
      .from('.m-hero__title .char', { yPercent: 120, rotate: 8, opacity: 0, duration: 1.3, stagger: 0.06 }, 0.2)
      .from('.m-hero__tagline', { y: 24, opacity: 0, duration: 1 }, 0.6)
      .from('.m-spec', { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.7)
      .add(() => $$('.m-hero__specs [data-count]').forEach((el, i) => count(el, 1.8 + i * 0.2)), 0.8)
      .from('.scroll-ind', { opacity: 0, duration: 1 }, 1.1);

    gsap.to('.m-hero__media', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.m-hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.m-hero__content', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.m-hero', start: '35% top', end: 'bottom top', scrub: true } });

    // lead text lights up word by word while scrolling
    gsap.fromTo('.m-intro__lead .w', { opacity: 0.15 }, {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: '.m-intro__lead', start: 'top 85%', end: 'bottom 45%', scrub: true }
    });

    gsap.fromTo('.m-intro__img', { clipPath: 'inset(18% 10% 18% 10%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '.m-intro__img', start: 'top 95%', end: 'center 55%', scrub: true }
    });
    gsap.fromTo('.m-intro__img img', { scale: 1.3, yPercent: -6 }, {
      scale: 1, yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: '.m-intro__img', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    gsap.fromTo('.m-film__frame', { clipPath: 'inset(8% 6% 8% 6% round 24px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: '.m-film', start: 'top 90%', end: 'top 15%', scrub: true }
    });
    gsap.fromTo('.m-film__video', { scale: 1.25 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.m-film', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.from('.m-film__name', {
      yPercent: 100, opacity: 0, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: '.m-film', start: 'top 40%', once: true }
    });

    gsap.from('.m-next__name', {
      x: -60, opacity: 0, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: '.m-next', start: 'top 85%', once: true }
    });
    gsap.fromTo('.m-next__img', { scale: 1.25 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.m-next', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    ScrollTrigger.refresh();
  };
})();

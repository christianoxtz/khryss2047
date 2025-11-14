/**
 * FILE: js/script.js
 * PURPOSE: interatividade (menu mobile, carousel, lightbox, form validation, countdown)
 * Author: Christiano
 * Note: vanilla JS, small, documented with lightweight helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Header: Mobile menu toggle (accessible) ---
  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        mobileMenu.hidden = true;
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.focus();
      } else {
        mobileMenu.hidden = false;
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        // move focus into menu for keyboard users
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  }

  // --- Smooth scroll for internal anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth', block: 'start' });
        // close mobile menu if open
        if (mobileMenu && !mobileMenu.hidden) {
          mobileMenu.hidden = true;
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // --- Countdown (days to ceremony) ---
  (function initCountdown(){
    const el = $('#count-days');
    if (!el) return;
    // Set target date (example: replace with real event date)
    const eventDate = new Date();
    eventDate.setMonth(11); // December (0-based)
    eventDate.setDate(20);
    eventDate.setFullYear(new Date().getFullYear());
    function update() {
      const now = new Date();
      const diff = Math.max(0, eventDate - now);
      const days = Math.floor(diff / (1000*60*60*24));
      el.textContent = String(days);
    }
    update();
    // update every hour (days don't need per-second updates)
    setInterval(update, 1000 * 60 * 60);
  })();

  // --- Carousel: basic accessible carousel with keyboard support ---
  (function initCarousel(){
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const items = $$('.carousel-item', track);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const indicators = carousel.querySelector('.carousel-indicators');

    let current = 0;
    const count = items.length;

    // Create indicators
    const indicatorButtons = [];
    items.forEach((it, i) => {
      const btn = document.createElement('button');
      btn.className = 'indicator';
      btn.setAttribute('aria-label', `Ir para slide ${i+1}`);
      btn.setAttribute('data-index', String(i));
      indicators.appendChild(btn);
      indicatorButtons.push(btn);
      btn.addEventListener('click', () => goTo(i));
    });

    function updateIndicators(){
      indicatorButtons.forEach((b,i)=> b.classList.toggle('active', i===current));
    }

    function goTo(index){
      current = (index + count) % count;
      const target = items[current];
      target.scrollIntoView({behavior: isReducedMotion ? 'auto' : 'smooth', inline:'center'});
      updateIndicators();
    }

    prevBtn.addEventListener('click', ()=> goTo(current-1));
    nextBtn.addEventListener('click', ()=> goTo(current+1));

    // Keyboard navigation
    track.addEventListener('keydown', (e)=>{
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current+1); }
    });

    // Autoplay
    let autoplay = carousel.dataset.autoplay === 'true';
    let autoplayId = null;
    const startAutoplay = () => {
      if (!autoplay || isReducedMotion) return;
      autoplayId = setInterval(()=> goTo(current+1), 4000);
    };
    const stopAutoplay = () => {
      if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
    };
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Initialize
    goTo(0);
    startAutoplay();

    // Clicking thumbnail opens lightbox (handled below)
    items.forEach((it, i)=>{
      const img = it.querySelector('img');
      if (!img) return;
      img.addEventListener('click', ()=> openLightbox(i));
      img.addEventListener('keydown', (e)=> {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
      img.tabIndex = 0;
    });
  })();

  // --- Lightbox (modal) with focus trap ---
  const lightbox = $('#lightbox');
  const lbImg = $('#lightbox-img');
  const lbCaption = $('#lightbox-caption');
  const lbClose = $('#lightbox-close');
  const lbPrev = $('#lightbox-prev');
  const lbNext = $('#lightbox-next');
  let lbIndex = 0;
  const galleryItems = $$('.carousel-item img');
  function openLightbox(index){
    lbIndex = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[lbIndex];
    const src = img.dataset.full || img.src;
    const alt = img.alt || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = alt;
    lightbox.setAttribute('aria-hidden', 'false');
    // Save focussed element to return focus later
    lightbox._previouslyFocused = document.activeElement;
    lbClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lightbox._previouslyFocused) lightbox._previouslyFocused.focus();
  }
  function lbShowNext(delta){
    lbIndex = (lbIndex + delta + galleryItems.length) % galleryItems.length;
    const img = galleryItems[lbIndex];
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = lbImg.alt;
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', ()=> lbShowNext(-1));
  if (lbNext) lbNext.addEventListener('click', ()=> lbShowNext(1));

  // Close on overlay click (but ignore clicks inside inner)
  lightbox?.addEventListener('click', (e)=>{
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard handling for lightbox
  document.addEventListener('keydown', (e)=>{
    if (!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbShowNext(1);
    if (e.key === 'ArrowLeft') lbShowNext(-1);
  });

  // --- Simple form validation (front-end) ---
  const form = $('#contact-form');
  if (form) {
    const nameF = $('#name');
    const emailF = $('#email');
    const messageF = $('#message');
    const status = $('#form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // reset errors
      $$('#contact-form .field-error').forEach(el => {
        el.textContent = ''; el.classList.add('visually-hidden');
      });

      if (!nameF.value.trim()) {
        $('#error-name').textContent = 'Por favor, insira seu nome.'; $('#error-name').classList.remove('visually-hidden');
        valid = false;
      }
      if (!emailF.value.trim() || !/^\S+@\S+\.\S+$/.test(emailF.value)) {
        $('#error-email').textContent = 'E-mail inválido.'; $('#error-email').classList.remove('visually-hidden');
        valid = false;
      }
      if (!messageF.value.trim()) {
        $('#error-message').textContent = 'Escreva uma mensagem.'; $('#error-message').classList.remove('visually-hidden');
        valid = false;
      }

      if (!valid) {
        status.textContent = 'Corrija os erros acima.'; status.classList.remove('visually-hidden');
        return;
      }

      // Simulate successful send (no backend)
      status.textContent = 'Mensagem enviada. Obrigado!'; status.classList.remove('visually-hidden');
      form.reset();
      console.info('Form data (simulated):', {name:nameF.value, email:emailF.value, message:messageF.value});
    });
  }

  // --- Footer year auto-update ---
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- focus visible polyfill hint (very small) ---
  (function focusOutline(){
    // Add class to body when keyboard used (for :focus-visible like effect)
    function handleKey(e){
      if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleKey);
    }
    window.addEventListener('keydown', handleKey);
  })();

  // --- Developer note ---
  console.log('Template initialized — Christiano. Replace assets/img/* with optimized images.');
});

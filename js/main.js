/* ============================================================
   TBEETECH PORTFOLIO — QUANTUM INTERFACE v2.0
   Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility ──────────────────────────────────────────────── */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Preloader ────────────────────────────────────────────── */
  window.addEventListener('load', () => {
    const loader = qs('#preloader');
    if (loader) {
      setTimeout(() => loader.classList.add('done'), 1440);
    }
  });

  /* ── Copyright Year ───────────────────────────────────────── */
  const yearEl = qs('#copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Custom Cursor ────────────────────────────────────────── */
  const dot     = qs('#cursorDot');
  const outline = qs('#cursorOutline');
  if (dot && outline) {
    let ox = 0, oy = 0;
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      ox += (e.clientX - ox) * 0.12;
      oy += (e.clientY - oy) * 0.12;
      outline.style.left = e.clientX + 'px';
      outline.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .project-card, .skill-card, .engage-card, .solution-card').forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
    });
  }

  /* ── Neural Network Canvas ────────────────────────────────── */
  const canvas = qs('#neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [];
    const NODE_COUNT = 56;
    const MAX_DIST = 128;
    const COLORS = ['rgba(0,229,255,', 'rgba(167,139,250,', 'rgba(240,180,41,'];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r:  Math.random() * 2 + 1,
        c:  COLORS[Math.floor(Math.random() * COLORS.length)]
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.c + '0.7)';
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].c + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    createNodes();
    draw();
    window.addEventListener('resize', () => { resize(); createNodes(); });
  }

  /* ── Promo Bar ────────────────────────────────────────────── */
  const promoBar   = qs('#promoBar');
  const promoClose = qs('#promoClose');
  const promoCountdown = qs('#promoCountdown');
  const mainNav    = qs('#mainNav');

  if (promoBar && promoClose) {
    promoClose.addEventListener('click', () => {
      promoBar.classList.add('hidden');
      if (mainNav) mainNav.classList.add('promo-gone');
    });
  }

  if (promoCountdown) {
    const end = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    function updateCountdown() {
      const diff = end - Date.now();
      if (diff <= 0) { promoBar && promoBar.classList.add('hidden'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      promoCountdown.textContent = `${d}d ${h}h ${m}m ${s}s remaining`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ── Navigation Scroll ────────────────────────────────────── */
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── Mobile Menu ──────────────────────────────────────────── */
  const burger     = qs('#navBurger');
  const mobileMenu = qs('#mobileMenu');

  function closeMobile() {
    burger && burger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    qsa('a', mobileMenu).forEach(a => a.addEventListener('click', closeMobile));
  }

  /* ── Smooth Scroll ────────────────────────────────────────── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = qs(id);
    if (!target) return;
    e.preventDefault();
    closeMobile();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });

  /* ── Active Nav Link ──────────────────────────────────────── */
  const sections = qsa('section[id]');
  const navLinks  = qsa('.nav-link[data-section]');

  function setActiveNav() {
    const scroll = window.scrollY + 120;
    sections.forEach(sec => {
      if (scroll >= sec.offsetTop && scroll < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === sec.id));
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ── Hero Typed Text ──────────────────────────────────────── */
  const typedEl = qs('#heroTyped');
  if (typedEl) {
    const phrases = [
      'Software Engineer',
      'AI Specialist',
      'Founder & CEO',
      'Full-Stack Developer',
      'Cloud Architect',
      'CTO-as-a-Service'
    ];
    let pi = 0, ci = 0, deleting = false;
    function type() {
      const phrase = phrases[pi];
      typedEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
      if (!deleting && ci > phrase.length)   { deleting = true; setTimeout(type, 1800); return; }
      if (deleting && ci < 0)               { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, deleting ? 50 : 85);
    }
    setTimeout(type, 1000);
  }

  /* ── About Tabs ───────────────────────────────────────────── */
  qsa('.about-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.about-tab').forEach(t => t.classList.remove('active'));
      qsa('.about-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = qs('#tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Project Tabs ─────────────────────────────────────────── */
  qsa('.project-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      qsa('.project-tab').forEach(t => t.classList.remove('active'));
      qsa('.project-category').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const cat = qs('#' + tab.dataset.category);
      if (cat) cat.classList.add('active');
    });
  });

  /* ── Stats Counter ────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = Date.now();
    function step() {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ── Intersection Observer (reveal + counters) ────────────── */
  let countersRun = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  qsa('.reveal').forEach(el => observer.observe(el));

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersRun) {
      countersRun = true;
      qsa('.count').forEach(animateCounter);
    }
  }, { threshold: 0.4 });
  const statsSection = qs('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ── Testimonials Slider ──────────────────────────────────── */
  const track   = qs('#testimonialsTrack');
  const tPrev   = qs('#tPrev');
  const tNext   = qs('#tNext');
  const dotsWrap = qs('#tDots');

  if (track) {
    const cards = qsa('.testimonial-card', track);
    let current = 0;
    const total = cards.length;

    // Build dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap && dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(calc(-${current * 100}% - ${current * 1.5}rem))`;
      qsa('.t-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === current));
    }

    tPrev && tPrev.addEventListener('click', () => goTo(current - 1));
    tNext && tNext.addEventListener('click', () => goTo(current + 1));

    let autoPlay = setInterval(() => goTo(current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => { autoPlay = setInterval(() => goTo(current + 1), 5000); });
  }

  /* ── Contact Form ─────────────────────────────────────────── */
  const form = qs('#emailForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email   = qs('#email', form).value.trim();
      const subject = qs('#subject', form).value.trim();
      const message = qs('#message', form).value.trim();
      const btn     = qs('#submitBtn', form);

      if (!email || !subject || !message) return;

      btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      setTimeout(() => {
        const mailto = `mailto:tobirammar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailto;
        form.reset();
        btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
      }, 1000);
    });
  }

  /* ── Back to Top ──────────────────────────────────────────── */
  const backTop = qs('#back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 400), { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

})();

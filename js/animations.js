/* ============================================================
   AURA — animations.js
   Clean, bug-free animation system.

   Core rule: any element whose transform/opacity is updated
   by a JS scroll/rAF loop must have  transition: none  set
   both in CSS AND forced here in JS. CSS transitions fight
   rAF updates every frame and cause rubber-band "returning."
   ============================================================ */
(function () {

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────────────────────────────────────────
     1. SCROLL PROGRESS BAR (top of viewport)
  ─────────────────────────────────────────────────────────── */
  function initScrollBar() {
    if (document.querySelector('.scroll-progress')) return;

    const bar  = document.createElement('div');
    bar.className = 'scroll-progress';
    const fill = document.createElement('div');
    fill.className = 'scroll-progress-fill';
    bar.appendChild(fill);
    document.body.appendChild(bar);

    // The fill uses scaleX — a compositor-only property, zero layout cost.
    let raf = 0;
    function tick() {
      const doc = document.documentElement;
      const pct = Math.min(1, doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight));
      fill.style.transform = 'scaleX(' + pct + ')';
      raf = 0;
    }
    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    tick();
  }

  /* ───────────────────────────────────────────────────────────
     2. HERO TITLE — word-by-word clip reveal
  ─────────────────────────────────────────────────────────── */
  function initWordReveal() {
    document.querySelectorAll('.hero-title:not([data-words-split])').forEach(function (el) {
      el.setAttribute('data-words-split', '1');

      var html = [];
      el.childNodes.forEach(function (node) {
        if (node.nodeType === 3) {
          // Text node — split on whitespace, wrap each word
          node.textContent.split(/(\s+)/).forEach(function (chunk) {
            if (!chunk.trim()) { html.push(chunk); return; }
            html.push('<span class="word-wrap"><span class="word">' + chunk + '</span></span>');
          });
        } else if (node.nodeType === 1) {
          // Element node (e.g. <em>) — wrap as a single word unit
          var tag = node.tagName.toLowerCase();
          html.push(
            '<span class="word-wrap"><span class="word">' +
            '<' + tag + '>' + node.innerHTML + '</' + tag + '>' +
            '</span></span>'
          );
        }
      });
      el.innerHTML = html.join('');

      if (REDUCED) {
        el.querySelectorAll('.word').forEach(function (w) { w.classList.add('word-in'); });
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     3. HERO ENTRANCE — staggered rise for sub-elements
  ─────────────────────────────────────────────────────────── */
  function initHeroEntrance() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    hero.querySelectorAll('.eyebrow, .hero-actions, .hero-visual').forEach(function (el, i) {
      el.classList.add('hero-rise');
      if (!REDUCED) el.style.animationDelay = (60 + i * 80) + 'ms';
    });
  }

  /* ───────────────────────────────────────────────────────────
     4. SCROLL REVEAL — IntersectionObserver-based fade/slide
  ─────────────────────────────────────────────────────────── */
  function initReveal() {
    var selector = '.anim-fade-up, .anim-fade-in, .anim-scale-in, .anim-slide-left, .anim-slide-right';
    var els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    // If no IO support or reduced motion — reveal everything immediately
    if (REDUCED || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Elements already in the viewport get revealed without waiting for IO
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-visible');
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var stag = parseFloat(e.target.dataset.stagger);
        if (stag) {
          Array.from(e.target.children).forEach(function (child, i) {
            child.style.transitionDelay = (i * stag) + 'ms';
            child.classList.add('stagger-in');
          });
        }
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      if (!el.classList.contains('is-visible')) obs.observe(el);
    });
  }

  /* ───────────────────────────────────────────────────────────
     5. STYLE CARDS — staggered grid entrance
  ─────────────────────────────────────────────────────────── */
  function initStyleCards() {
    var grid = document.querySelector('.styles-grid');
    if (!grid) return;
    var cards = Array.from(grid.querySelectorAll('.style-card'));
    if (!cards.length) return;

    cards.forEach(function (c, i) {
      c.classList.add('card-pre');
      c.style.transitionDelay = (i * 55) + 'ms';
    });

    if (REDUCED || !('IntersectionObserver' in window)) {
      cards.forEach(function (c) { c.classList.add('card-in'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cards.forEach(function (c) { c.classList.add('card-in'); });
      obs.disconnect();
    }, { threshold: 0.05 });
    obs.observe(grid);
  }

  /* ───────────────────────────────────────────────────────────
     6. QUOTE BUBBLES — pop-in on scroll
  ─────────────────────────────────────────────────────────── */
  function initQuoteBubbles() {
    var stage = document.querySelector('.quotes-cloud-stage');
    if (!stage) return;
    var bubbles = Array.from(stage.querySelectorAll('.quote-bubble'));
    bubbles.forEach(function (b, i) {
      b.classList.add('bubble-pre');
      b.style.transitionDelay = (i * 55) + 'ms';
    });

    if (REDUCED || !('IntersectionObserver' in window)) {
      bubbles.forEach(function (b) { b.classList.add('bubble-in'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      bubbles.forEach(function (b) { b.classList.add('bubble-in'); });
      obs.disconnect();
    }, { threshold: 0.08 });
    obs.observe(stage);
  }

  /* ───────────────────────────────────────────────────────────
     7. MAGNETIC BUTTONS — subtle cursor-follow effect
  ─────────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (REDUCED) return;
    document.querySelectorAll('.btn-large, .nav-cta').forEach(function (btn) {
      if (btn._magnetic) return;
      btn._magnetic = true;
      btn.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

      var rect = null;
      btn.addEventListener('mouseenter', function () { rect = btn.getBoundingClientRect(); });
      btn.addEventListener('mousemove', function (e) {
        if (!rect) return;
        btn.style.transform =
          'translate(' +
          ((e.clientX - rect.left - rect.width  / 2) * 0.09) + 'px,' +
          ((e.clientY - rect.top  - rect.height / 2) * 0.11) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { rect = null; btn.style.transform = ''; });
    });
  }

  /* ───────────────────────────────────────────────────────────
     8. HERO CURSOR GLOW — radial light follows mouse
  ─────────────────────────────────────────────────────────── */
  function initCursorGlow() {
    if (REDUCED) return;
    var hero = document.querySelector('.hero');
    if (!hero || hero._glow) return;
    hero._glow = true;
    hero.classList.add('has-cursor-light');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--cursor-x', ((e.clientX - r.left) / r.width  * 100) + '%');
      hero.style.setProperty('--cursor-y', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  }

  /* ───────────────────────────────────────────────────────────
     9. WINDOW PARALLAX — elements drift on page scroll
        Usage: <div data-parallax="0.08"> — 0 = static, 0.2 = fast
        CRITICAL: transition is forced to 'none' here in JS, not
        only in CSS, so there is zero rubber-banding.
  ─────────────────────────────────────────────────────────── */
  function initWindowParallax() {
    if (REDUCED) return;
    var layers = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!layers.length) return;

    // Force transition off — rAF drives every frame, CSS transition would fight it
    layers.forEach(function (el) {
      el.style.transition = 'none';
      el.style.willChange  = 'transform';
    });

    var raf = 0;
    function tick() {
      var sy = window.scrollY;
      layers.forEach(function (el) {
        var spd = parseFloat(el.dataset.parallax) || 0;
        el.style.transform = 'translate3d(0,' + (sy * spd * -1) + 'px,0)';
      });
      raf = 0;
    }
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    tick();
  }

  /* ───────────────────────────────────────────────────────────
     10. IMAGE PARALLAX — images drift inside clipped containers
         Each .parallax-img drifts as its wrapper scrolls through
         the viewport. CRITICAL: transition is forced to 'none'
         in JS as well as CSS — no rubber-banding possible.
  ─────────────────────────────────────────────────────────── */
  function initImageParallax() {
    if (REDUCED) return;
    var imgs = Array.from(document.querySelectorAll('.parallax-img'));
    if (!imgs.length) return;

    imgs.forEach(function (img) {
      // Force off any CSS transition — even if a rule adds one later
      img.style.transition = 'none';
      img.style.willChange  = 'transform';
      // Ensure the parent clips so the scale-up drift never shows edges
      var wrap = img.parentElement;
      if (wrap && !wrap.classList.contains('parallax-wrap')) {
        wrap.classList.add('parallax-wrap');
      }
    });

    var raf = 0;
    function tick() {
      var vh = window.innerHeight;

      // Read phase first — all getBoundingClientRect calls together
      var data = imgs.map(function (img) {
        var wrap = img.parentElement;
        if (!wrap) return null;
        var r = wrap.getBoundingClientRect();
        // Skip elements far off-screen (saves GPU work)
        if (r.bottom < -80 || r.top > vh + 80) return { img: img, skip: true };
        var center   = r.top + r.height / 2;
        var progress = (center - vh / 2) / (vh / 2 + r.height / 2);
        var strength = parseFloat(wrap.dataset.parallaxStrength) || 12;
        return { img: img, offset: Math.max(-1, Math.min(1, progress)) * strength };
      });

      // Write phase — all transforms after all reads
      data.forEach(function (d) {
        if (!d) return;
        // scale(1.03) overscan ensures drift never reveals the image edge
        d.img.style.transform = d.skip
          ? 'translate3d(0,0px,0) scale(1.03)'
          : 'translate3d(0,' + d.offset + 'px,0) scale(1.03)';
      });

      raf = 0;
    }

    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    window.addEventListener('resize', function () { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    tick();
  }

  /* ───────────────────────────────────────────────────────────
     11. AUTO-TAG PARALLAX CANDIDATES
         Style-page images are built dynamically by style-page.js
         before animations.js init() runs — tagging them here.
  ─────────────────────────────────────────────────────────── */
  function autoTagParallax() {
    document.querySelectorAll(
      '.ssec-overview-img img, .ssec-breakdown-img img, .ssec-inspo-cell img'
    ).forEach(function (img) {
      if (!img.classList.contains('parallax-img')) img.classList.add('parallax-img');
    });
    document.querySelectorAll('.combo-card-img img').forEach(function (img) {
      if (!img.classList.contains('parallax-img')) img.classList.add('parallax-img');
    });
  }

  /* ───────────────────────────────────────────────────────────
     12. AUTO-TAG SECTIONS for fade-up reveal
  ─────────────────────────────────────────────────────────── */
  function autoTagSections() {
    document.querySelectorAll('main section, section.ssec, section.quotes-cloud').forEach(function (sec) {
      if (sec.classList.contains('hero')) return;
      if (!sec.matches('.anim-fade-up, .anim-fade-in, .anim-scale-in')) {
        sec.classList.add('anim-fade-up');
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     13. HOMEPAGE REVEAL
         Fires after intro ends or auth gate dismisses.
         Coordinates hero title and rise animations so users
         actually see them, not a pre-played static state.
  ─────────────────────────────────────────────────────────── */
  var _revealed = false;

  function revealHomepage() {
    if (_revealed) return;
    _revealed = true;

    // Re-animate hero title words with a double-rAF reset
    var words = Array.from(document.querySelectorAll('.hero-title .word'));
    if (words.length && !REDUCED) {
      words.forEach(function (w) { w.classList.remove('word-in'); w.style.transitionDelay = ''; });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          words.forEach(function (w, i) {
            w.style.transitionDelay = (i * 42) + 'ms';
            w.classList.add('word-in');
          });
        });
      });
    }

    // Trigger hero rise animations
    initHeroEntrance();

    // Force-reveal any scroll-anim elements already in the viewport
    // (layout shifted when intro spacer was removed — observer may have missed them)
    var vh = window.innerHeight;
    document.querySelectorAll(
      '.anim-fade-up, .anim-fade-in, .anim-scale-in, .anim-slide-left, .anim-slide-right'
    ).forEach(function (el) {
      if (el.classList.contains('is-visible')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-visible');
    });
  }

  /* ───────────────────────────────────────────────────────────
     INIT
  ─────────────────────────────────────────────────────────── */
  /* ───────────────────────────────────────────────────────────
     SPECIAL — Rose-gold cursor (desktop only)
  ─────────────────────────────────────────────────────────── */
  function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = -100, my = -100;   // mouse position
    var rx = -100, ry = -100;   // ring position (lags behind)
    var raf = 0;

    function loop() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform  = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      raf = requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mousedown', function () { document.body.classList.add('cursor-clicking'); });
    document.addEventListener('mouseup',   function () { document.body.classList.remove('cursor-clicking'); });

    // Expand ring when hovering links/buttons
    var hoverEls = 'a, button, .style-card, .quiz-option, .atelier-chip, .filter-chip, .btn, .nav-logo, .nav-links a';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  }

  /* ───────────────────────────────────────────────────────────
     SPECIAL — Rotating editorial quote strip
  ─────────────────────────────────────────────────────────── */
  function initQuoteStrip() {
    var strip = document.querySelector('.quote-strip-inner');
    if (!strip) return;

    var QUOTES = [
      { text: 'Elegance is not about being noticed — it\'s about being remembered.', src: '— Giorgio Armani' },
      { text: 'Style is a way to say who you are without having to speak.', src: '— Rachel Zoe' },
      { text: 'Fashion is the armour to survive the reality of everyday life.', src: '— Bill Cunningham' },
      { text: 'The most beautiful thing a woman can wear is confidence.', src: '— Blake Lively' },
      { text: 'Fashion is not something that exists in dresses only. It is in the sky, in the street.', src: '— Coco Chanel' },
      { text: 'Dress shabbily and they remember the dress; dress impeccably and they remember the woman.', src: '— Coco Chanel' },
      { text: 'Your style is your autobiography written in fabric.', src: '— AURA' },
    ];

    var idx = 0;
    QUOTES.forEach(function (q, i) {
      var el = document.createElement('div');
      el.className = 'quote-strip-item' + (i === 0 ? ' qs-active' : '');
      el.innerHTML = q.text + '<span class="quote-strip-source">' + q.src + '</span>';
      strip.appendChild(el);
    });

    setInterval(function () {
      var items = strip.querySelectorAll('.quote-strip-item');
      items[idx].classList.remove('qs-active');
      items[idx].classList.add('qs-out');
      var prev = idx;
      idx = (idx + 1) % QUOTES.length;
      items[idx].classList.add('qs-active');
      setTimeout(function () { items[prev].classList.remove('qs-out'); }, 1000);
    }, 5000);
  }

  function init() {
    initScrollBar();
    initWordReveal();        // Splits words — actual animation fires via revealHomepage()
    initStyleCards();
    autoTagSections();
    autoTagParallax();
    initReveal();
    initQuoteBubbles();
    initMagnetic();
    initCursorGlow();
    initWindowParallax();
    initImageParallax();
    initCustomCursor();
    initQuoteStrip();

    // Listen for auth gate or intro to signal ready
    window.addEventListener('aura:homepage-reveal', revealHomepage, { once: true });

    // Fallback: if neither intro nor auth gate is present, reveal immediately
    if (!document.getElementById('intro') && !document.getElementById('aura-signin')) {
      setTimeout(revealHomepage, 80);
    }
  }

  /* ───────────────────────────────────────────────────────────
     SMOOTH SCROLL — in-page anchor links
     (CSS scroll-behavior:smooth is disabled globally to avoid
      fighting scroll-driven animations; we restore it here
      selectively for anchor clicks only.)
  ─────────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

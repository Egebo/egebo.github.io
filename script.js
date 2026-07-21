/* ============================================================
   Egemen Bozca · Portfolio v8 — script.js
   ============================================================ */

/* ---------- initScrollProgress ---------- */
function initScrollProgress() {
  var bar = document.getElementById('scrollProg');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });
}

/* ---------- initNav ---------- */
function initNav() {
  var nav = document.getElementById('mainNav');
  if (!nav) return;
  var THRESHOLD = 60;
  function update() {
    nav.classList.toggle('scrolled', window.scrollY > THRESHOLD);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- initCursor ---------- */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.body.classList.add('has-cursor');
  var dot  = document.querySelector('.c-dot');
  var ring = document.querySelector('.c-ring');
  var cursor = document.querySelector('.cursor');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });

  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() { if (cursor) cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function() { if (cursor) cursor.classList.remove('hover'); });
  });

  function tick() {
    if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------- initHeroCanvas ---------- */
function initHeroCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  var nodes = [
    { x: 0.50, y: 0.50, label: 'React Native', t: 0.0 },
    { x: 0.18, y: 0.22, label: 'Gemini',        t: 1.2 },
    { x: 0.80, y: 0.18, label: 'Firebase',       t: 0.7 },
    { x: 0.82, y: 0.70, label: 'ChromaDB',       t: 2.1 },
    { x: 0.28, y: 0.80, label: 'FastAPI',         t: 1.5 },
    { x: 0.65, y: 0.42, label: 'Flutter',         t: 0.3 },
    { x: 0.16, y: 0.60, label: 'Python',          t: 0.9 },
  ];
  var edges = [[0,1],[0,2],[0,5],[1,3],[1,6],[2,5],[3,4],[4,6],[5,3]];
  var frame = 0;

  function draw() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    function nx(n) { return n.x * W + (reduced ? 0 : Math.sin(frame * 0.007 + n.t) * 14); }
    function ny(n) { return n.y * H + (reduced ? 0 : Math.cos(frame * 0.005 + n.t) * 10); }

    edges.forEach(function(e) {
      var a = nodes[e[0]], b = nodes[e[1]];
      ctx.beginPath(); ctx.moveTo(nx(a), ny(a)); ctx.lineTo(nx(b), ny(b));
      ctx.strokeStyle = 'rgba(212,32,32,0.14)'; ctx.lineWidth = 1; ctx.stroke();
    });

    nodes.forEach(function(n) {
      var x = nx(n), y = ny(n);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#1f1d1a'; ctx.fill();
      ctx.strokeStyle = 'rgba(212,32,32,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = '10px "Geist Mono", monospace';
      ctx.fillStyle = 'rgba(90,88,84,0.9)'; ctx.textAlign = 'center';
      ctx.fillText(n.label, x, y + 17);
    });

    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- initLookedScroll ---------- */
function initLookedScroll() {
  var outer = document.querySelector('.feat-looked-outer');
  if (!outer) return;
  if (window.matchMedia('(max-width: 780px)').matches) return;

  var screens = outer.querySelectorAll('.phone-screen');
  var feats   = outer.querySelectorAll('.looked-feat');

  function setActive(idx) {
    screens.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
    feats.forEach(function(f, i)   { f.classList.toggle('active', i === idx); });
  }

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var rect = outer.getBoundingClientRect();
      var scrollable = outer.offsetHeight - window.innerHeight;
      if (scrollable <= 0) { ticking = false; return; }
      var progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setActive(Math.min(3, Math.floor(progress * 4)));
      ticking = false;
    });
  }, { passive: true });
}

/* ---------- initRagDiagram ---------- */
function initRagDiagram() {
  var nodes   = document.querySelectorAll('.rag-node-g');
  var lines   = document.querySelectorAll('.rag-spoke-line');
  var tooltip = document.getElementById('rag-tooltip');
  if (!nodes.length) return;

  nodes.forEach(function(node) {
    var idx = parseInt(node.dataset.idx, 10);
    var tip = node.dataset.tip || '';

    node.addEventListener('mouseenter', function() {
      node.classList.add('active');
      if (lines[idx]) lines[idx].classList.add('active');
      if (tooltip) { tooltip.textContent = tip; tooltip.classList.add('visible'); }
    });
    node.addEventListener('mouseleave', function() {
      node.classList.remove('active');
      if (lines[idx]) lines[idx].classList.remove('active');
      if (tooltip) tooltip.classList.remove('visible');
    });
    node.addEventListener('focus', function() { node.dispatchEvent(new Event('mouseenter')); });
    node.addEventListener('blur',  function() { node.dispatchEvent(new Event('mouseleave')); });
  });
}

/* ---------- Project canvas draw helpers ---------- */
function drawJarvisCanvas(canvas, ctx) {
  var bars = 48, t = 0;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    var bw = W / bars - 1;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < bars; i++) {
      var h = (Math.sin(i * 0.38 + t) * 0.38 + 0.52) * H * 0.55;
      var alpha = 0.25 + Math.sin(i * 0.38 + t) * 0.18;
      ctx.fillStyle = 'rgba(212,32,32,' + Math.max(0.07, alpha) + ')';
      ctx.fillRect(i * (bw + 1), (H - h) / 2, Math.max(1, bw), h);
    }
    t += 0.07;
  };
}

function drawOpturaCanvas(canvas, ctx) {
  var items = ['🧅  Onion × 2', '🍅  Tomato × 3', '🥛  Milk × 1', '🍞  Bread × 1'];
  var scanY = -20;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);
    var sy = scanY % (H + 60) - 20;
    ctx.shadowColor = 'rgba(212,32,32,0.6)';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = 'rgba(212,32,32,0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    ctx.shadowBlur = 0;
    items.forEach(function(item, i) {
      var iy = 48 + i * 30;
      if (sy > iy) {
        var alpha = Math.min(1, (sy - iy) / 24);
        ctx.font = '11px "Geist Mono", monospace';
        ctx.fillStyle = 'rgba(240,237,232,' + (alpha * 0.65) + ')';
        ctx.fillText(item, 20, iy);
      }
    });
    scanY += 1.4;
  };
}

function drawPocoCanvas(canvas, ctx) {
  var steps = ['Cart', 'Order', 'Pay', 'Done'];
  var xs    = [0.14, 0.38, 0.62, 0.86];
  var dash  = 0;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    var cy = H * 0.48;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < steps.length - 1; i++) {
      var x1 = xs[i] * W + 14, x2 = xs[i + 1] * W - 14;
      ctx.setLineDash([5, 4]);
      ctx.lineDashOffset = -dash;
      ctx.strokeStyle = 'rgba(212,32,32,0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x1, cy); ctx.lineTo(x2, cy); ctx.stroke();
    }
    ctx.setLineDash([]);
    steps.forEach(function(step, i) {
      var x = xs[i] * W;
      ctx.beginPath(); ctx.arc(x, cy, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#1f1d1a'; ctx.fill();
      ctx.strokeStyle = 'rgba(212,32,32,0.65)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = '9px "Geist Mono", monospace';
      ctx.fillStyle = 'rgba(154,150,144,0.8)'; ctx.textAlign = 'center';
      ctx.fillText(step, x, cy + 24);
    });
    dash += 0.5;
  };
}

/* ---------- initProjectCanvases ---------- */
function initProjectCanvases() {
  var cards = [
    { sel: '.proj-jarvis', draw: drawJarvisCanvas },
    { sel: '.proj-optura', draw: drawOpturaCanvas },
    { sel: '.proj-poco',   draw: drawPocoCanvas   },
  ];

  cards.forEach(function(c) {
    var card = document.querySelector(c.sel);
    if (!card) return;
    var canvas = card.querySelector('canvas');
    if (!canvas) return;

    var dpr = window.devicePixelRatio || 1;
    canvas.width  = card.offsetWidth  * dpr;
    canvas.height = card.offsetHeight * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var tick = c.draw(canvas, ctx);
    var raf  = null;

    card.addEventListener('mouseenter', function() {
      function loop() { tick(); raf = requestAnimationFrame(loop); }
      loop();
    });
    card.addEventListener('mouseleave', function() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    });
  });
}

/* ---------- initReveal ---------- */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
}

/* ---------- initLang ---------- */
function initLang() {
  var LANG_KEY = 'eb-lang';
  var lang = localStorage.getItem(LANG_KEY) || 'en';

  function applyLang(l) {
    lang = l;
    var dict = window.I18N[l] || window.I18N.en;
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    localStorage.setItem(LANG_KEY, l);
    document.querySelectorAll('[data-i18n-lang]').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.i18nLang === l);
    });
  }

  document.querySelectorAll('[data-i18n-lang]').forEach(function(btn) {
    btn.addEventListener('click', function() { applyLang(btn.dataset.i18nLang); });
  });

  applyLang(lang);
}

/* ---------- initContact ---------- */
function initContact() {
  if (typeof emailjs !== 'undefined') emailjs.init('mzmL-J9Z59jECtnhm');

  /* Email copy */
  var copyBtn = document.getElementById('emailCopy');
  var status  = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText('bozcaegemen@gmail.com').then(function() {
        if (status) { status.textContent = '✓'; setTimeout(function() { status.textContent = '↗'; }, 2000); }
      });
    });
  }

  /* EmailJS form */
  var form      = document.getElementById('contactForm');
  var errorEl   = document.getElementById('formError');
  var successEl = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (errorEl) errorEl.classList.add('show');
      return;
    }
    if (errorEl) errorEl.classList.remove('show');

    if (typeof emailjs === 'undefined') {
      if (errorEl) { errorEl.textContent = 'Send failed — please email directly.'; errorEl.classList.add('show'); }
      return;
    }

    var templateParams = {
      from_name:  document.getElementById('cf-name').value,
      from_email: document.getElementById('cf-email').value,
      message:    document.getElementById('cf-msg').value,
    };

    emailjs.send('service_2qwunoe', 'template_60sla98', templateParams)
      .then(function() {
        form.style.display = 'none';
        if (successEl) successEl.classList.add('show');
      })
      .catch(function() {
        if (errorEl) {
          errorEl.textContent = 'Send failed — please email directly.';
          errorEl.classList.add('show');
        }
      });
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', function() {
  initScrollProgress();
  initNav();
  initCursor();
  initHeroCanvas();
  initLookedScroll();
  initRagDiagram();
  initProjectCanvases();
  initReveal();
  if (window.I18N) initLang();
  initContact();
});

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
    { x: 0.18, y: 0.20, label: 'Gemini',        t: 1.2 },
    { x: 0.80, y: 0.16, label: 'Firebase',       t: 0.7 },
    { x: 0.86, y: 0.68, label: 'ChromaDB',       t: 2.1 },
    { x: 0.26, y: 0.82, label: 'FastAPI',        t: 1.5 },
    { x: 0.66, y: 0.40, label: 'Flutter',        t: 0.3 },
    { x: 0.14, y: 0.58, label: 'Python',         t: 0.9 },
    { x: 0.46, y: 0.14, label: 'LangChain',      t: 1.8 },
    { x: 0.90, y: 0.42, label: 'GPT-4o',         t: 0.5 },
    { x: 0.34, y: 0.58, label: 'Expo',           t: 2.4 },
  ];
  var edges = [
    [0,1],[0,2],[0,5],[1,3],[1,6],[2,5],[3,4],[4,6],[5,3],
    [0,7],[7,2],[7,1],[5,8],[8,3],[0,9],[9,6],[9,4],[6,4]
  ];
  var frame = 0;

  /* particles: light pulses traveling along a few edges */
  var particles = edges.slice(0, 6).map(function(e, i) {
    return { edge: e, p: (i / 6), speed: 0.0035 + (i % 3) * 0.0008 };
  });

  function draw() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    function nx(n) { return n.x * W + (reduced ? 0 : Math.sin(frame * 0.007 + n.t) * 14); }
    function ny(n) { return n.y * H + (reduced ? 0 : Math.cos(frame * 0.005 + n.t) * 10); }

    edges.forEach(function(e) {
      var a = nodes[e[0]], b = nodes[e[1]];
      ctx.beginPath(); ctx.moveTo(nx(a), ny(a)); ctx.lineTo(nx(b), ny(b));
      ctx.strokeStyle = 'rgba(212,32,32,0.26)'; ctx.lineWidth = 1; ctx.stroke();
    });

    if (!reduced) {
      particles.forEach(function(pt) {
        var a = nodes[pt.edge[0]], b = nodes[pt.edge[1]];
        var ax = nx(a), ay = ny(a), bx = nx(b), by = ny(b);
        var px = ax + (bx - ax) * pt.p;
        var py = ay + (by - ay) * pt.p;
        ctx.shadowColor = 'rgba(212,32,32,0.9)';
        ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,90,90,0.95)'; ctx.fill();
        ctx.shadowBlur = 0;
        pt.p += pt.speed;
        if (pt.p > 1) pt.p = 0;
      });
    }

    nodes.forEach(function(n) {
      var x = nx(n), y = ny(n);
      var pulse = reduced ? 0 : Math.sin(frame * 0.03 + n.t) * 0.8;
      ctx.shadowColor = 'rgba(212,32,32,0.5)';
      ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(x, y, 4 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#1f1d1a'; ctx.fill();
      ctx.strokeStyle = 'rgba(212,32,32,0.65)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.font = '10px "Geist Mono", monospace';
      ctx.fillStyle = 'rgba(154,150,144,0.95)'; ctx.textAlign = 'center';
      ctx.fillText(n.label, x, y + 17);
    });

    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- initLookedFan ---------- */
function initLookedFan() {
  var tabs  = document.querySelectorAll('.fan-tab');
  var cards = document.querySelectorAll('.fan-card');
  if (!tabs.length) return;
  var n = cards.length;

  function setActive(idx) {
    tabs.forEach(function(t, i) { t.classList.toggle('active', i === idx); });
    cards.forEach(function(card, i) {
      card.classList.remove('fan-front', 'fan-back-left', 'fan-back-right');
      var rel = (i - idx + n) % n;
      if (rel === 0)      card.classList.add('fan-front');
      else if (rel === 1) card.classList.add('fan-back-right');
      else                card.classList.add('fan-back-left');
    });
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      setActive(parseInt(tab.dataset.fan, 10));
    });
  });

  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      setActive(parseInt(card.dataset.fan, 10));
    });
  });
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
      if (tooltip) { tooltip.textContent = node.dataset.tip || ''; tooltip.classList.add('visible'); }
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
  var scanY = -20;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);
    var sy = scanY % (H + 60) - 20;
    /* glow trail */
    var grad = ctx.createLinearGradient(0, sy - 24, 0, sy + 24);
    grad.addColorStop(0,   'rgba(212,32,32,0)');
    grad.addColorStop(0.5, 'rgba(212,32,32,0.18)');
    grad.addColorStop(1,   'rgba(212,32,32,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, sy - 24, W, 48);
    /* scan line */
    ctx.shadowColor = 'rgba(212,32,32,0.7)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgba(212,32,32,0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    ctx.shadowBlur = 0;
    scanY += 1.4;
  };
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawPocoCanvas(canvas, ctx) {
  var t = 0;
  var particles = [];
  for (var i = 0; i < 7; i++) {
    particles.push({ x: Math.random(), y: Math.random(), speed: 0.15 + Math.random() * 0.25, size: 1 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2 });
  }
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    var cx = W * 0.5, cy = H * 0.56;
    var bagW = Math.min(W, H) * 0.36;
    var bagH = bagW * 1.05;
    var top  = cy - bagH / 2, bottom = cy + bagH / 2;
    var left = cx - bagW / 2, right  = cx + bagW / 2;
    var bodyTop = top + 12;

    /* rising fill level inside the bag */
    var fill  = Math.sin(t * 0.018) * 0.5 + 0.5;
    var fillY = bottom - (bagH - 12) * fill;

    ctx.save();
    roundRectPath(ctx, left, bodyTop, bagW, bottom - bodyTop, 10);
    ctx.clip();
    var grad = ctx.createLinearGradient(0, bottom, 0, bodyTop);
    grad.addColorStop(0, 'rgba(212,32,32,0.5)');
    grad.addColorStop(1, 'rgba(212,32,32,0.04)');
    ctx.fillStyle = grad;
    ctx.fillRect(left, fillY, bagW, bottom - fillY);
    ctx.restore();

    /* bag outline + handles */
    ctx.strokeStyle = 'rgba(212,32,32,0.75)';
    ctx.lineWidth = 1.5;
    roundRectPath(ctx, left, bodyTop, bagW, bottom - bodyTop, 10);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(left + bagW * 0.28, bodyTop, bagW * 0.15, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(left + bagW * 0.72, bodyTop, bagW * 0.15, Math.PI, 0); ctx.stroke();

    /* particles rising inside the bag, like items being added */
    particles.forEach(function(p) {
      p.y -= p.speed * 0.01;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      var px = left + p.x * bagW;
      var py = bodyTop + p.y * (bottom - bodyTop);
      if (py > bodyTop && py < bottom) {
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,120,120,' + (0.45 + Math.sin(t * 0.05 + p.phase) * 0.3) + ')';
        ctx.fill();
      }
    });

    /* periodic "order complete" checkmark badge */
    var cycle = t % 260;
    if (cycle > 210) {
      var a = Math.sin(((cycle - 210) / 50) * Math.PI);
      var bx = right - 8, by = top + 6;
      ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20,18,16,' + a + ')'; ctx.fill();
      ctx.strokeStyle = 'rgba(212,32,32,' + a + ')'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bx - 5, by); ctx.lineTo(bx - 1, by + 4); ctx.lineTo(bx + 5, by - 5);
      ctx.strokeStyle = 'rgba(240,237,232,' + a + ')'; ctx.lineWidth = 2; ctx.stroke();
    }

    t++;
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
    document.querySelectorAll('[data-i18n-tip]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-tip');
      if (dict[key] != null) el.dataset.tip = dict[key];
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
  initLookedFan();
  initRagDiagram();
  initProjectCanvases();
  initReveal();
  if (window.I18N) initLang();
  initContact();
});

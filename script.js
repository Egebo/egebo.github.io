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

  /* center hub + 9 outer nodes evenly spaced on a circle, for a symmetric wheel layout */
  var nodes = [
    { x: 0.500, y: 0.500, label: 'React Native', t: 0.0 },
    { x: 0.500, y: 0.140, label: 'LangChain',     t: 1.2 },
    { x: 0.731, y: 0.224, label: 'Gemini',        t: 0.7 },
    { x: 0.855, y: 0.437, label: 'Firebase',      t: 2.1 },
    { x: 0.812, y: 0.680, label: 'GPT-4o',        t: 1.5 },
    { x: 0.623, y: 0.838, label: 'ChromaDB',      t: 0.3 },
    { x: 0.377, y: 0.838, label: 'FastAPI',       t: 0.9 },
    { x: 0.188, y: 0.680, label: 'Flutter',       t: 1.8 },
    { x: 0.145, y: 0.437, label: 'Python',        t: 0.5 },
    { x: 0.269, y: 0.224, label: 'Expo',          t: 2.4 },
  ];
  /* edges reflect real stack pairings, not a mechanical hub+ring:
     Looked = React Native + Firebase + Gemini; Jarvis = Python + FastAPI + Gemini;
     AkademikChatbot = Python + LangChain + ChromaDB; Optura = Flutter + GPT-4o */
  var edges = [
    [0,9], [0,3], [0,2],   // React Native - Expo / Firebase / Gemini
    [8,6], [8,2], [8,1],   // Python - FastAPI / Gemini / LangChain
    [1,5], [1,4],          // LangChain - ChromaDB / GPT-4o
    [7,4],                 // Flutter - GPT-4o
  ];
  var frame = 0;

  /* particles: light pulses traveling along every real connection */
  var particles = edges.map(function(e, i) {
    return { edge: e, p: (i / edges.length), speed: 0.0035 + (i % 3) * 0.0008 };
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

function bezierPoint(t, p0, p1, p2, p3) {
  var mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function drawBoxIcon(ctx, x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#1f1d1a';
  ctx.strokeStyle = 'rgba(212,32,32,0.8)';
  ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.rect(-s / 2, -s / 2, s, s); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-s / 2, -s / 2); ctx.lineTo(0, -s / 2 - s * 0.3); ctx.lineTo(s / 2, -s / 2);
  ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -s / 2 - s * 0.3); ctx.lineTo(0, s / 2); ctx.stroke();
  ctx.restore();
}

function drawHouseIcon(ctx, x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#1f1d1a';
  ctx.strokeStyle = 'rgba(212,32,32,0.8)';
  ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.rect(-s / 2, -s * 0.1, s, s * 0.6); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-s * 0.65, -s * 0.1); ctx.lineTo(0, -s * 0.6); ctx.lineTo(s * 0.65, -s * 0.1); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawPocoCanvas(canvas, ctx) {
  var t = 0, hold = 0;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    var p0 = { x: W * 0.14, y: H * 0.64 };
    var p1 = { x: W * 0.40, y: H * 0.86 };
    var p2 = { x: W * 0.62, y: H * 0.14 };
    var p3 = { x: W * 0.86, y: H * 0.38 };

    /* faint full route */
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = 'rgba(212,32,32,0.22)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();
    ctx.setLineDash([]);

    /* traveled portion, solid */
    var steps = 40;
    ctx.strokeStyle = 'rgba(212,32,32,0.7)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (var i = 0; i <= steps; i++) {
      var pt = bezierPoint((i / steps) * t, p0, p1, p2, p3);
      if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    var iconSize = Math.min(W, H) * 0.11;
    drawBoxIcon(ctx, p0.x, p0.y, iconSize);
    drawHouseIcon(ctx, p3.x, p3.y, iconSize * 1.1);

    /* moving parcel dot */
    var cur = bezierPoint(t, p0, p1, p2, p3);
    ctx.shadowColor = 'rgba(212,32,32,0.9)';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(cur.x, cur.y, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,90,90,0.95)'; ctx.fill();
    ctx.shadowBlur = 0;

    /* arrival pulse rings at the doorstep */
    if (hold > 0) {
      var ringP = 1 - hold / 50;
      ctx.beginPath();
      ctx.arc(p3.x, p3.y, iconSize * (0.7 + ringP * 1.6), 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212,32,32,' + (0.5 * (1 - ringP)) + ')';
      ctx.lineWidth = 1.2; ctx.stroke();
      hold--;
      if (hold === 0) t = 0;
    } else {
      t += 0.009;
      if (t >= 1) { t = 1; hold = 50; }
    }
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] != null) el.placeholder = dict[key];
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

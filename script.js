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
  var seeds = [];
  for (var i = 0; i < bars; i++) {
    seeds.push({
      f1: 0.6 + Math.random() * 1.4, p1: Math.random() * Math.PI * 2,
      f2: 1.8 + Math.random() * 2.6, p2: Math.random() * Math.PI * 2,
      envP: Math.random() * Math.PI * 2,
    });
  }
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    var bw = W / bars - 1;
    ctx.clearRect(0, 0, W, H);
    for (var j = 0; j < bars; j++) {
      var s = seeds[j];
      /* two mismatched frequencies per bar avoid a uniform traveling wave */
      var wave = Math.sin(t * 0.05 * s.f1 + s.p1) * 0.6 + Math.sin(t * 0.05 * s.f2 + s.p2) * 0.4;
      /* slow envelope mimics loud/quiet passages in real audio */
      var envelope = 0.35 + 0.65 * (Math.sin(t * 0.014 + s.envP) * 0.5 + 0.5);
      var amp = Math.max(0, wave * 0.5 + 0.5) * envelope;
      var h = amp * H * 0.62 + H * 0.02;
      var alpha = 0.16 + amp * 0.38;
      ctx.fillStyle = 'rgba(212,32,32,' + alpha + ')';
      ctx.fillRect(j * (bw + 1), (H - h) / 2, Math.max(1, bw), h);
    }
    t++;
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

function drawSparkle(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(255,150,150,' + alpha + ')';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-size, 0); ctx.lineTo(size, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(0, size); ctx.stroke();
  ctx.restore();
}

function drawPocoCanvas(canvas, ctx) {
  var t = 0;
  var sparkles = [];
  for (var i = 0; i < 5; i++) {
    sparkles.push({ phase: Math.random() * Math.PI * 2, speed: 0.015 + Math.random() * 0.015, ang: Math.random() * Math.PI * 2 });
  }
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    var cx = W * 0.5, cy = H * 0.56;
    var bagW = Math.min(W, H) * 0.4;
    var bagH = bagW * 1.05;
    var sway = Math.sin(t * 0.015) * 0.05;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(sway);

    var left = -bagW / 2, right = bagW / 2, bodyTop = -bagH / 2 + 14, bottom = bagH / 2;

    /* bag body + handles */
    ctx.fillStyle = '#1f1d1a';
    ctx.strokeStyle = 'rgba(212,32,32,0.8)';
    ctx.lineWidth = 1.6;
    roundRectPath(ctx, left, bodyTop, bagW, bottom - bodyTop, 14);
    ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(left + bagW * 0.28, bodyTop, bagW * 0.16, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(left + bagW * 0.72, bodyTop, bagW * 0.16, Math.PI, 0); ctx.stroke();

    /* clasp detail */
    ctx.strokeStyle = 'rgba(212,32,32,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-bagW * 0.14, bodyTop + 8); ctx.lineTo(bagW * 0.14, bodyTop + 8); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, bodyTop + 8, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212,32,32,0.6)'; ctx.fill();

    /* diagonal shine sweep, clipped to the bag body */
    ctx.save();
    roundRectPath(ctx, left, bodyTop, bagW, bottom - bodyTop, 14);
    ctx.clip();
    var sweep = (t % 220) / 220;
    var sx = left - bagW * 0.5 + sweep * (bagW * 2);
    var grad = ctx.createLinearGradient(sx - 26, 0, sx + 26, 0);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.16)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(left, bodyTop, bagW, bottom - bodyTop);
    ctx.restore();

    ctx.restore();

    /* boutique sparkles floating around the bag */
    sparkles.forEach(function(s) {
      var life = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
      if (life > 0.72) {
        var alpha = (life - 0.72) / 0.28;
        var sxp = cx + Math.cos(s.ang) * bagW * 0.62;
        var syp = cy + Math.sin(s.ang) * bagH * 0.55 - bagH * 0.08;
        drawSparkle(ctx, sxp, syp, 4 * alpha, alpha * 0.85);
      }
    });

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

/* ============================================================
   SCRIPT.JS - Egemen Bozca Portfolio
   · i18n (TR/EN)
   · counters
   · nav scroll + progress bar
   · rotating hero word
   · hero canvas (drone flight path)
   · manifesto sequential reveal
   · custom cursor (desktop only)
   · magnetic buttons
   · 3-D card tilt
   · projects expand/collapse
   · contact form (EmailJS) + email copy-to-clipboard
   ============================================================ */

/* ---------- EmailJS init (key moved from head inline script) ---------- */
if (typeof emailjs !== 'undefined') { emailjs.init('mzmL-J9Z59jECtnhm'); }

/* ---------- Nav v8 functions ---------- */
function initScrollProgress() {
  var bar = document.getElementById('scrollProg');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });
}

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

// Hamburger menu (v7 — no-op once #burger removed)
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

(function () {
  "use strict";

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  })();

  var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- i18n ---------- */
  var LANG_KEY = "eb-lang";
  var lang = localStorage.getItem(LANG_KEY) || "en";
  var rotWordCtrl = null;

  function applyLang(l) {
    lang = l;
    var dict = window.I18N[l] || window.I18N.tr;
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.lang === l);
    });
    if (rotWordCtrl) rotWordCtrl.setLang(l);
    localStorage.setItem(LANG_KEY, l);
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.dataset.lang); });
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseFloat(el.dataset.count);
    var pad = el.dataset.pad === "1";
    function fmt(v) { var n = Math.round(v); return pad && n < 10 ? "0" + n : String(n); }
    if (prefersReduce) { el.textContent = fmt(target); return; }
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  (function () {
    var els = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.5 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(animateCount);
    }
  })();

  /* ---------- Nav + scroll progress ---------- */
  var nav = document.querySelector(".nav");
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var prog = document.querySelector(".scroll-prog");

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 24);
    if (prog) {
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = dh > 0 ? (window.scrollY / dh * 100) + "%" : "0%";
    }
    var pos = window.scrollY + window.innerHeight * 0.32;
    var cur = null;
    sections.forEach(function (s) { if (s.offsetTop <= pos) cur = s.id; });
    navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
  }, { passive: true });

  /* ---------- Contact form (EmailJS) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var submitBtn = document.getElementById("submit-btn");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dict = window.I18N[lang] || window.I18N.tr;
      var submitText = submitBtn ? submitBtn.querySelector(".submit-text") : null;
      var originalLabel = submitText ? submitText.textContent : null;

      var errEl = document.getElementById("formError");
      if (errEl) errEl.classList.remove("show");
      submitBtn.setAttribute("disabled", "disabled");
      if (submitText && dict["form.sending"]) submitText.textContent = dict["form.sending"];

      var templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      emailjs.send("service_2qwunoe", "template_60sla98", templateParams).then(function () {
        var ff = form.querySelector(".form-fields");
        var fs = document.getElementById("formSuccess");
        if (ff) ff.style.display = "none";
        if (fs) fs.classList.add("show");
      }, function (err) {
        console.error("EmailJS error:", err);
        submitBtn.removeAttribute("disabled");
        if (submitText) submitText.textContent = originalLabel;
        var errEl2 = document.getElementById("formError");
        if (errEl2) { errEl2.textContent = dict["form.error"] || "Something went wrong, please try again later."; errEl2.classList.add("show"); }
      });
    });
  }

  /* ---------- Email copy-to-clipboard ---------- */
  var emailBtn = document.getElementById("emailCopy");
  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      var email = document.getElementById("email-address").innerText;
      var status = document.getElementById("copy-status");
      var dict = window.I18N[lang] || window.I18N.tr;
      navigator.clipboard.writeText(email).then(function () {
        var original = status.textContent;
        status.textContent = dict["social.email.copy"] || "Copied!";
        status.style.color = "#36b37e";
        setTimeout(function () { status.textContent = original; status.style.color = ""; }, 2000);
      }).catch(function () {
        window.location.href = "mailto:" + email;
      });
    });
  }

  /* ---------- Year ---------- */
  var yEl = document.getElementById("year");
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- Rotating word ---------- */
  rotWordCtrl = (function () {
    var el = document.getElementById("rotWord");
    if (!el) return null;
    var words = { tr: ["fikirden", "sıfırdan", "hızla"], en: ["from idea", "from zero", "fast"] };
    var curLang = lang, idx = 0;
    function cycle() {
      el.classList.add("exit");
      setTimeout(function () {
        var list = words[curLang] || words.tr;
        el.textContent = list[idx];
        idx = (idx + 1) % list.length;
        el.classList.remove("exit");
        el.classList.add("enter");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.remove("enter"); });
        });
      }, 270);
    }
    function setLang(l) {
      curLang = l; idx = 0;
      el.textContent = (words[l] || words.tr)[0]; idx = 1;
    }
    if (!prefersReduce) setInterval(cycle, 2700);
    return { setLang: setLang };
  })();


  /* ==============================================================
     INTERACTIVE EFFECTS (skip if prefers-reduced-motion)
     ============================================================== */
  if (prefersReduce) { applyLang(lang); return; }

  /* ---------- Custom cursor ---------- */
  (function () {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    var cursor = document.getElementById("cursor");
    if (!cursor) return;
    var dot = cursor.querySelector(".c-dot");
    var ring = cursor.querySelector(".c-ring");
    var mx = -200, my = -200, rx = -200, ry = -200;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });

    (function tick() {
      rx += (mx - rx) * 0.095;
      ry += (my - ry) * 0.095;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll("a, button, .proj-card, .ach-card, .social, .tag").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("hover"); });
    });
    document.body.classList.add("has-cursor");
  })();

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll(".btn--accent, .btn--primary").forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      var r = btn.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width * 0.5)) * 0.28;
      var dy = (e.clientY - (r.top + r.height * 0.5)) * 0.28;
      btn.style.transform = "translate(" + dx + "px," + dy + "px)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
      btn.style.transform = "";
      setTimeout(function () { btn.style.transition = ""; }, 560);
    });
  });

  /* ---------- 3-D card tilt ---------- */
  document.querySelectorAll(".proj-card, .ach-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var rx2 = ((e.clientX - r.left) / r.width - 0.5) * 11;
      var ry2 = ((e.clientY - r.top) / r.height - 0.5) * -11;
      card.style.transform = "perspective(700px) rotateX(" + ry2 + "deg) rotateY(" + rx2 + "deg) translateY(-5px)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
      card.style.transform = "";
      setTimeout(function () { card.style.transition = ""; }, 660);
    });
  });

  /* ---------- init ---------- */
  applyLang(lang);

})();

/* ---------- Hero canvas (node graph) ---------- */
function initHeroCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
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

/* ---------- Custom cursor v8 ---------- */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.body.classList.add('has-cursor');
  var dot = document.querySelector('.c-dot');
  var ring = document.querySelector('.c-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.querySelector('.cursor').classList.add('hover'); });
    el.addEventListener('mouseleave', function() { document.querySelector('.cursor').classList.remove('hover'); });
  });
  function tick() {
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------- Looked sticky scroll ---------- */
function initLookedScroll() {
  var outer = document.querySelector('.feat-looked-outer');
  if (!outer) return;
  if (window.matchMedia('(max-width: 780px)').matches) return;

  var screens = outer.querySelectorAll('.phone-screen');
  var feats = outer.querySelectorAll('.looked-feat');

  function setActive(idx) {
    screens.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
    feats.forEach(function(f, i) { f.classList.toggle('active', i === idx); });
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

/* ---------- Nav v8 init ---------- */
initScrollProgress();
initNav();
initHeroCanvas();
initCursor();
initLookedScroll();

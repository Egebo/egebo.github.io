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

// Hamburger menu
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

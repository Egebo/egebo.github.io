# Portfolio Redesign: Light Theme, Work-First, Linear Scroll

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark bento grid portfolio with a light-themed, linear-scroll, work-first design that makes Looked and AkademikChatbot the visual focus.

**Architecture:** `index.html` restructured from bento grid to linear vertical sections. `style.css` fully rewritten with a light token system. `script.js` gains an IntersectionObserver for scroll-triggered reveals (replaces the CSS animation-on-parse approach). Executed task-by-task, each task removes one or more old bento cards and adds the new HTML + CSS.

**Tech Stack:** Vanilla HTML / CSS / JS · Plus Jakarta Sans + Inter (Google Fonts) · EmailJS · GitHub Pages

## Global Constraints

- Preserve all `data-i18n`, `data-i18n-ph`, `data-count` attributes exactly as-is
- EmailJS: service `service_2qwunoe`, template `template_60sla98`, key `mzmL-J9Z59jECtnhm` — do not touch
- Case study pages `projects/*.html` — do not touch
- Accent color: `#E8442A` (warm red)
- Display font: Plus Jakarta Sans 700/800
- Body font: Inter 400/500/600
- Light background: `#ffffff`, dark text: `#111111`
- Do not add new JS dependencies
- IDs script.js depends on — must survive: `cursor`, `navLinks`, `burger`, `emailCopy`, `email-address`, `contactForm`, `formError`, `formSuccess`, `submit-btn`, `year`, `copy-status`, `rotWord`
- CSS version string in index.html: bump on every task that changes style.css
- strings.js: add one missing key to TR dict only (documented in Task 3)

---

### Task 1: CSS Foundation — Tokens, Reset, Utilities, Buttons, Tags

**Files:**
- Rewrite: `style.css` (full replacement)
- Modify: `index.html` line 41 (Google Fonts link) and line 9 (favicon)

**Interfaces:**
- Produces: `--bg`, `--fg`, `--accent`, `--display`, `--sans`, `--mono`, `.wrap`, `.mono`, `.accent`, `.tag`, `.tags`, `.section-label`, `.btn`, `.btn--accent`, `.btn--ghost`, `.reveal` (observer-driven), `.scroll-prog`, cursor classes

- [ ] **Step 1: Update Google Fonts link in index.html (line 41)**

Replace:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```
With:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update favicon (line 9)**

Replace:
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%2300D4AA'/><text x='50' y='72' font-family='system-ui,sans-serif' font-weight='700' font-size='62' fill='%230D0D12' text-anchor='middle'>E</text></svg>">
```
With:
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23E8442A'/><text x='50' y='72' font-family='system-ui,sans-serif' font-weight='700' font-size='62' fill='%23ffffff' text-anchor='middle'>E</text></svg>">
```

- [ ] **Step 3: Bump CSS version in index.html (line 42)**

Change `style.css?v=31` to `style.css?v=32`.

- [ ] **Step 4: Overwrite style.css with new foundation**

```css
/* ============================================================
   Egemen Bozca · Portfolio — style.css v7
   Light Minimal · Warm Red Accent (#E8442A)
   Plus Jakarta Sans (display) + Inter (body)
   ============================================================ */

/* ---------- Tokens ---------- */
:root {
  --bg:          #ffffff;
  --bg-2:        #f8f8f6;
  --bg-3:        #f1f1ef;
  --fg:          #111111;
  --fg-2:        #555555;
  --fg-3:        #999999;
  --line:        #e8e8e8;
  --line-2:      #d4d4d4;
  --accent:      #E8442A;
  --accent-dim:  #d13a22;
  --accent-rgb:  232, 68, 42;

  --display: "Plus Jakarta Sans", system-ui, sans-serif;
  --sans:    "Inter", system-ui, -apple-system, sans-serif;
  --mono:    "Geist Mono", ui-monospace, "SF Mono", Consolas, monospace;

  --gutter:    clamp(1.2rem, 4vw, 2.5rem);
  --maxw:      1200px;
  --radius:    6px;
  --radius-lg: 12px;
  --ease:      cubic-bezier(0.22, 1, 0.36, 1);
}

/* ---------- Reset ---------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 100%; -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--fg);
  line-height: 1.6;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }
::selection { background: var(--accent); color: #fff; }

/* ---------- Utility ---------- */
.wrap { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }
.mono { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-3); }
.accent { color: var(--accent); }

/* ---------- Section label ---------- */
.section-label {
  display: inline-block;
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.14em;
  color: var(--accent); text-transform: uppercase; margin-bottom: 0.6rem;
}

/* ---------- Scroll progress ---------- */
.scroll-prog { position: fixed; top: 0; left: 0; height: 2px; background: var(--accent); width: 0%; z-index: 200; pointer-events: none; }

/* ---------- Custom cursor ---------- */
.c-dot { position: fixed; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 10000; }
.c-ring { position: fixed; width: 28px; height: 28px; border: 1.5px solid var(--accent); border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 9999; opacity: 0.20; transition: width 0.3s var(--ease), height 0.3s var(--ease), opacity 0.3s; }
.cursor.hover .c-ring { width: 44px; height: 44px; opacity: 0.40; }
body:not(.has-cursor) .cursor { display: none; }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--sans); font-size: 0.875rem; font-weight: 600; letter-spacing: -0.01em;
  padding: 0.7rem 1.4rem;
  border: 1.5px solid transparent; border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}
.btn .arr { transition: transform 0.2s var(--ease); }
.btn:hover .arr { transform: translateX(4px); }
.btn--accent { background: var(--accent); color: #fff; font-weight: 700; border-color: var(--accent); }
.btn--accent:hover { background: var(--accent-dim); border-color: var(--accent-dim); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.28); }
.btn--ghost { background: transparent; color: var(--fg-2); border-color: var(--line-2); }
.btn--ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

/* ---------- Tags ---------- */
.tag {
  font-family: var(--mono); font-size: 0.58rem; padding: 0.22rem 0.6rem;
  border: 1px solid var(--line-2); color: var(--fg-3);
  letter-spacing: 0.04em; border-radius: 999px; background: var(--bg-2);
}
.tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

/* ---------- Scroll reveal (IntersectionObserver-driven) ---------- */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.reveal.in-view { opacity: 1; transform: translateY(0); }
.reveal[data-d="1"] { transition-delay: 0.08s; }
.reveal[data-d="2"] { transition-delay: 0.16s; }
.reveal[data-d="3"] { transition-delay: 0.24s; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .status-dot, .marquee-track { animation: none !important; }
}
```

- [ ] **Step 5: Verify in browser**

Open index.html. Page will mostly be unstyled (bento cards have no styles now). Confirm:
- White background, dark text
- Nav area has red "Get in touch" button
- No console errors

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "style: v7 foundation — light tokens, Plus Jakarta Sans, warm red #E8442A"
```

---

### Task 2: Nav

**Files:**
- Modify: `index.html` lines 58–77
- Append to: `style.css`

**Interfaces:**
- Produces: `.nav`, `.brand`, `.nav-links` (script.js toggles `.scrolled` on `.nav`, `.active` on `a` inside `.nav-links`, `#burger` click)

- [ ] **Step 1: Replace nav HTML**

Replace the `<header class="nav" id="nav">…</header>` block with:

```html
<header class="nav" id="nav">
  <a href="#top" class="brand">Egemen Bozca</a>
  <nav class="nav-links" id="navLinks" aria-label="Page navigation">
    <a href="#projects" data-i18n="nav.projects">Projects</a>
    <a href="#about" data-i18n="nav.about">About</a>
    <a href="#work" data-i18n="nav.work">Awards</a>
    <a href="#contact" data-i18n="nav.contact">Contact</a>
  </nav>
  <div class="nav-right">
    <div class="lang-toggle" role="group" aria-label="Language">
      <button data-lang="en" class="on">EN</button>
      <button data-lang="tr">TR</button>
    </div>
    <a href="#contact" class="btn btn--accent" style="font-size:0.8rem;padding:0.45rem 1rem;" data-i18n="nav.cta">Get in touch</a>
    <button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

- [ ] **Step 2: Append nav CSS**

```css
/* ============================================================
   NAV
   ============================================================ */
.nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  padding: 0 var(--gutter); height: 60px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  transition: background 0.3s, box-shadow 0.3s;
}
.nav.scrolled { background: rgba(255,255,255,0.97); box-shadow: 0 1px 24px rgba(0,0,0,0.08); }
.brand { font-family: var(--display); font-size: 1rem; font-weight: 800; letter-spacing: -0.03em; color: var(--fg); transition: color 0.15s; }
.brand:hover { color: var(--accent); }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { font-size: 0.82rem; color: var(--fg-2); transition: color 0.15s; font-weight: 500; }
.nav-links a:hover { color: var(--fg); }
.nav-links a.active { color: var(--accent); }
.nav-right { display: flex; align-items: center; gap: 0.8rem; }
.lang-toggle { display: flex; border: 1.5px solid var(--line-2); border-radius: var(--radius); overflow: hidden; }
.lang-toggle button { font-family: var(--mono); font-size: 0.62rem; padding: 0.3rem 0.65rem; color: var(--fg-3); letter-spacing: 0.06em; transition: color 0.15s, background 0.15s; }
.lang-toggle button.on { background: var(--accent); color: #fff; font-weight: 700; }
.lang-toggle button:hover:not(.on) { color: var(--fg); }
.burger { display: none; flex-direction: column; gap: 5px; padding: 4px; border-radius: var(--radius); }
.burger span { display: block; width: 22px; height: 1.5px; background: var(--fg); border-radius: 2px; transition: transform 0.25s var(--ease), opacity 0.2s; }
.burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (max-width: 720px) {
  .nav-links {
    display: none; flex-direction: column; gap: 0;
    position: absolute; top: 60px; left: 0; right: 0;
    background: var(--bg); border-bottom: 1.5px solid var(--line);
    box-shadow: 0 8px 32px rgba(0,0,0,0.07); padding: 0.5rem 0; z-index: 99;
  }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 0.85rem var(--gutter); font-size: 0.95rem; border-bottom: 1px solid var(--line); }
  .nav-links a:last-child { border-bottom: none; }
  .burger { display: flex; }
}
```

- [ ] **Step 3: Verify in browser**

Confirm: white sticky nav, brand on left, 4 nav links centered, red CTA + hamburger on right. Scroll down slightly — nav picks up shadow.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "style: nav — light glass, warm red CTA, 4-link structure"
```

---

### Task 3: Hero Section + Main Wrapper

**Files:**
- Modify: `index.html` — change `<main class="bento" id="top">` to `<main id="top">`, replace hero bento card
- Modify: `strings.js` — add `hero.h1` key to TR dict
- Append to: `style.css`

**Interfaces:**
- Produces: `.hero`, `.hero-inner`, `.hero-eyebrow`, `.status-dot`, `.hero-sub`, `.hero-cta`, `h1` rule, `#hero` section ID

- [ ] **Step 1: Change main wrapper (index.html line 110)**

Change:
```html
<main class="bento" id="top">
```
To:
```html
<main id="top">
```

- [ ] **Step 2: Replace hero bento card**

Remove the entire `<section class="b-card b-hero" id="hero">…</section>` block (lines 113–147). Replace with:

```html
  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-inner wrap">
      <div class="hero-eyebrow reveal">
        <span class="status-dot"></span>
        <span class="mono" data-i18n="hero.eyebrow">React Native & AI Developer · Available for freelance</span>
      </div>
      <h1 class="reveal" data-d="1" data-i18n="hero.h1">I build mobile apps<br><span class="accent">people actually use.</span></h1>
      <p class="hero-sub reveal" data-d="2" data-i18n="hero.sub">React Native developer based in Turkey. I've shipped 4 apps to the Play Store and App Store, built AI-powered systems, and I'm open to new projects.</p>
      <div class="hero-cta reveal" data-d="3">
        <a href="#projects" class="btn btn--accent"><span data-i18n="hero.cta1">See my work</span><span class="arr">→</span></a>
        <a href="#contact" class="btn btn--ghost"><span data-i18n="hero.cta2">Get in touch</span></a>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Add missing TR key to strings.js**

In `strings.js`, inside the `tr:` object, after the line `"hero.h1c": "yayına taşıyorum.",` add:
```js
"hero.h1": "Mobil ürünleri<br><span class=\"accent\">yayına taşıyorum.</span>",
```

- [ ] **Step 4: Append hero CSS**

```css
/* ============================================================
   HERO
   ============================================================ */
.hero {
  padding: clamp(5rem, 12vw, 9rem) var(--gutter) clamp(4rem, 8vw, 7rem);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.hero-inner { max-width: 820px; }

.status-dot {
  display: inline-block; width: 7px; height: 7px;
  background: var(--accent); border-radius: 50%; flex-shrink: 0;
  animation: pulse-dot 2.4s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(var(--accent-rgb), 0.4); }
  50%      { opacity: 0.7; box-shadow: 0 0 0 6px rgba(var(--accent-rgb), 0); }
}
.hero-eyebrow { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.6rem; }

h1 {
  font-family: var(--display);
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--fg);
  margin-bottom: 1.6rem;
}
h1 .accent { color: var(--accent); }

.hero-sub {
  font-size: clamp(1rem, 1.5vw, 1.08rem);
  color: var(--fg-2); max-width: 52ch; line-height: 1.82;
  margin-bottom: 2.2rem;
}
.hero-cta { display: flex; gap: 0.75rem; flex-wrap: wrap; }
```

- [ ] **Step 5: Verify in browser**

Large white section with generous top/bottom padding. Giant Plus Jakarta Sans heading, warm-red second line, grey sub text, two buttons. No photo, no stats bar.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css strings.js
git commit -m "feat: hero — full-width light, no photo/stats, warm red h1 accent"
```

---

### Task 4: Marquee Band (light theme)

**Files:**
- Append to: `style.css` only (marquee HTML stays exactly as-is)

**Interfaces:**
- Produces: `.marquee-band`, `.marquee-track`, `.marquee-item` light-theme styles

- [ ] **Step 1: Append marquee CSS**

```css
/* ============================================================
   MARQUEE
   ============================================================ */
.marquee-band {
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--bg-2);
  padding: 0.75rem 0;
}
.marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.marquee-item { display: flex; align-items: center; white-space: nowrap; }
.marquee-item .ms { font-family: var(--sans); font-size: 0.71rem; color: var(--fg-3); padding: 0 1.2rem; letter-spacing: 0.01em; }
.marquee-item .mx { color: var(--accent); font-size: 0.5rem; opacity: 0.5; }
```

- [ ] **Step 2: Verify in browser**

Marquee band: warm-grey background, dark-grey text, red dot separators, scrolling left continuously.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: marquee — light theme colors"
```

---

### Task 5: Projects Heading + Looked Featured Section

**Files:**
- Modify: `index.html` — remove `<article class="b-card b-looked …">` block, insert projects heading + Looked feat-row
- Append to: `style.css`

**Interfaces:**
- Produces: `.projects-head`, `.feat-row`, `.feat-inner`, `.feat-copy`, `.feat-visual`, `.feat-title`, `.feat-desc`, `.feat-tags`, `.feat-cta`, `.feat-shot`, `.f-tag` — all reused by Task 6 for AkademikChatbot

- [ ] **Step 1: Replace Looked bento card**

Remove the `<article class="b-card b-looked proj-card" id="projects">…</article>` block. Replace with:

```html
  <!-- PROJECTS SECTION HEADING -->
  <div class="projects-head" id="projects">
    <div class="wrap">
      <span class="section-label reveal" data-i18n="proj.idx">04</span>
      <h2 class="ph-title reveal" data-d="1" data-i18n="proj.title">Projects</h2>
    </div>
  </div>

  <!-- LOOKED — featured -->
  <article class="feat-row">
    <div class="feat-inner wrap">
      <div class="feat-copy">
        <span class="f-tag reveal"><span class="status-dot"></span><span data-i18n="proj.featured.tag">Featured product</span></span>
        <h2 class="feat-title reveal" data-d="1" data-i18n="proj.featured.name">Looked</h2>
        <p class="feat-desc reveal" data-d="2" data-i18n="proj.featured.desc">AI-powered personal style assistant. Upload a photo, get instant outfit feedback; add your wardrobe and discover combinations the AI — or you — create. Built with React Native, Firebase, and Google Sign-In.</p>
        <div class="feat-tags tags reveal" data-d="2">
          <span class="tag">React Native</span>
          <span class="tag">AI Styling</span>
          <span class="tag">Firebase</span>
        </div>
        <div class="feat-cta reveal" data-d="3">
          <a href="https://play.google.com/store/apps/details?id=com.egebo.looked&pcampaignid=web_share" target="_blank" rel="noopener" class="btn btn--accent"><span data-i18n="proj.featured.cta">Google Play</span><span class="arr">→</span></a>
          <a href="https://apps.apple.com/us/app/looked-dijital-stil-asistan%C4%B1/id6776430564" target="_blank" rel="noopener" class="btn btn--ghost">App Store<span class="arr">→</span></a>
          <a href="projects/looked.html" class="btn btn--ghost">Case study<span class="arr">→</span></a>
        </div>
      </div>
      <div class="feat-visual">
        <img src="looked_ss/play_1.png" alt="Looked AI stylist screen" class="feat-shot" style="object-position:center 48%">
        <img src="looked_ss/play_2.png" alt="Looked style analysis screen" class="feat-shot feat-shot--offset" style="object-position:center 42%">
      </div>
    </div>
  </article>
```

- [ ] **Step 2: Append featured section CSS**

```css
/* ============================================================
   PROJECTS HEADING
   ============================================================ */
.projects-head {
  padding: clamp(3.5rem, 7vw, 5.5rem) var(--gutter) clamp(1.5rem, 3vw, 2.5rem);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.ph-title {
  font-family: var(--display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800; letter-spacing: -0.04em; color: var(--fg);
}

/* ============================================================
   FEATURED PROJECT ROW
   ============================================================ */
.feat-row {
  padding: clamp(3.5rem, 7vw, 6rem) var(--gutter);
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
}
.feat-row + .feat-row { background: var(--bg); }

.feat-inner {
  display: grid;
  grid-template-columns: 44fr 56fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}
.feat-copy { display: flex; flex-direction: column; gap: 1.2rem; }

.f-tag {
  font-family: var(--mono); font-size: 0.62rem; color: var(--accent);
  letter-spacing: 0.10em; text-transform: uppercase;
  display: flex; align-items: center; gap: 0.5rem;
}
.feat-title {
  font-family: var(--display);
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; color: var(--fg);
}
.feat-desc {
  font-size: clamp(0.93rem, 1.3vw, 1.05rem);
  color: var(--fg-2); line-height: 1.82; max-width: 44ch;
}
.feat-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.feat-cta { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.2rem; }

.feat-visual {
  display: flex; gap: 1rem;
  justify-content: center; align-items: flex-end;
}
.feat-shot {
  width: 46%; aspect-ratio: 9/19.5;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
}
.feat-shot--offset { margin-top: 2.5rem; }

@media (max-width: 800px) {
  .feat-inner { grid-template-columns: 1fr; gap: 2rem; }
  .feat-visual { order: -1; }
  .feat-shot { width: 38%; max-width: 170px; }
  .feat-desc { max-width: none; }
}
```

- [ ] **Step 3: Verify in browser**

Projects heading: large "Projects" title on white. Then grey-tint Looked row: big title left, two phone screenshots right (second one slightly lower). Three buttons below description.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: Looked featured row — full-width text-left visual-right"
```

---

### Task 6: AkademikChatbot Featured Section + Remove About & Skills Bento Cards

**Files:**
- Modify: `index.html` — replace `<article class="b-card b-rag …">`, `<section class="b-card b-about …">`, `<section class="b-card b-skills …">`
- Append to: `style.css`

**Interfaces:**
- Consumes: `.feat-row`, `.feat-inner`, `.feat-copy`, `.feat-visual` from Task 5
- Produces: `.rag-visual`, `.rag-arch`, `.ra-node`, `.ra-arr`, `.ra-split`, `.rag-caption`, `.el-badge`

- [ ] **Step 1: Replace AkademikChatbot bento card**

Remove `<article class="b-card b-rag proj-card">…</article>`. Replace with:

```html
  <!-- AKADEMIKCHATBOT — featured -->
  <article class="feat-row">
    <div class="feat-inner wrap">
      <div class="feat-copy">
        <div class="br-meta reveal">
          <span class="f-tag"><span class="status-dot"></span><span data-i18n="proj.1.type">Python · RAG</span></span>
          <span class="el-badge" data-i18n="proj.status.done">Completed · Graduation Project</span>
        </div>
        <h2 class="feat-title reveal" data-d="1" data-i18n="proj.1.name">AkademikChatbot</h2>
        <p class="feat-desc reveal" data-d="2" data-i18n="proj.1.desc">Education-focused RAG-based academic advisor. An intent-routing engine directs each query to SQL, vector search, or web crawl. Built with GPT-4o-mini, ChromaDB, and LangChain. Technically the most complex project in this portfolio.</p>
        <div class="feat-tags tags reveal" data-d="2">
          <span class="tag">GPT-4o-mini</span>
          <span class="tag">ChromaDB</span>
          <span class="tag">LangChain</span>
          <span class="tag">FastAPI</span>
          <span class="tag">RAG</span>
        </div>
        <a href="projects/rag.html" class="btn btn--ghost reveal" data-d="3" style="width:fit-content">Case study <span class="arr">→</span></a>
      </div>
      <div class="feat-visual rag-visual">
        <div class="rag-arch reveal">
          <div class="ra-node ra-node--in">Query</div>
          <div class="ra-arr">→</div>
          <div class="ra-node ra-node--accent">Intent Router</div>
          <div class="ra-arr">→</div>
          <div class="ra-split">
            <div class="ra-node">SQL</div>
            <div class="ra-node">Vector</div>
            <div class="ra-node">Web</div>
          </div>
        </div>
        <p class="rag-caption">Intent-routing architecture</p>
      </div>
    </div>
  </article>
```

- [ ] **Step 2: Remove About and Skills bento cards**

Remove these two blocks entirely from index.html:
- `<section class="b-card b-about" id="about">…</section>`
- `<section class="b-card b-skills" id="skills">…</section>`

They will be replaced in Task 8.

- [ ] **Step 3: Append RAG visual CSS**

```css
/* ============================================================
   RAG ARCHITECTURE VISUAL
   ============================================================ */
.rag-visual {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 1.5rem; padding: 3rem 2rem;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  min-height: 240px;
}
.rag-arch { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
.ra-node {
  font-family: var(--mono); font-size: 0.62rem; padding: 0.55rem 1rem;
  border: 1.5px solid var(--line-2); border-radius: var(--radius);
  background: var(--bg); color: var(--fg-2); letter-spacing: 0.04em;
}
.ra-node--accent { border-color: var(--accent); color: var(--accent); background: rgba(var(--accent-rgb), 0.06); }
.ra-node--in { color: var(--fg); }
.ra-arr { color: var(--fg-3); font-size: 0.9rem; flex-shrink: 0; }
.ra-split { display: flex; flex-direction: column; gap: 0.4rem; }
.rag-caption { font-family: var(--mono); font-size: 0.54rem; color: var(--fg-3); letter-spacing: 0.08em; text-transform: uppercase; }
.el-badge { font-family: var(--mono); font-size: 0.56rem; letter-spacing: 0.06em; color: var(--fg-3); text-transform: uppercase; }
.br-meta { display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; }
```

- [ ] **Step 4: Verify in browser**

AkademikChatbot on white (alternates from Looked's grey-tint): left shows title + stack tags + case study link; right shows a light box with the architecture flow diagram. Looks clean and technical.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: AkademikChatbot featured row — architecture visual, alternating bg"
```

---

### Task 7: Other Projects Grid (Optura, Jarvis, Poco Loco)

**Files:**
- Modify: `index.html` — remove three `b-mini` cards, add `.pg-section`
- Append to: `style.css`

**Interfaces:**
- Produces: `.pg-section`, `.pg-grid`, `.pg-card`, `.pg-thumb`, `.pg-badge`, `.pg-body`, `.pa`

- [ ] **Step 1: Remove three mini bento cards, replace with grid section**

Remove:
- `<article class="b-card b-mini proj-card" onclick="…">Optura…</article>`
- `<article class="b-card b-mini proj-card" onclick="…">Jarvis…</article>`
- `<article class="b-card b-mini proj-card" onclick="…">Poco Loco…</article>`

Replace with:

```html
  <!-- OTHER PROJECTS GRID -->
  <section class="pg-section">
    <div class="wrap">
      <div class="pg-grid">

        <article class="pg-card reveal" onclick="location.href='projects/optura.html'" style="cursor:pointer">
          <div class="pg-thumb has-thumb">
            <img src="looked_ss/optura_1.png" alt="Optura app screen" class="thumb-img" style="object-fit:cover;object-position:center top">
            <span class="pg-badge status" data-i18n="proj.status.progress">In progress</span>
          </div>
          <div class="pg-body">
            <div class="pg-type"><span data-i18n="proj.3.type">Mobile · AI</span></div>
            <h3><span data-i18n="proj.3.name">Optura</span><span class="pa">↗</span></h3>
            <p data-i18n="proj.3.desc">Scans grocery receipts to track household inventory and predicts expiry dates — alerting you before food goes bad.</p>
            <div class="tags"><span class="tag">Flutter</span><span class="tag">OCR</span><span class="tag">AI</span></div>
          </div>
        </article>

        <article class="pg-card reveal" data-d="1" onclick="location.href='projects/jarvis.html'" style="cursor:pointer">
          <div class="pg-thumb pg-thumb--voice">
            <span class="pg-badge status" data-i18n="proj.status.progress">In progress</span>
          </div>
          <div class="pg-body">
            <div class="pg-type"><span data-i18n="proj.4.type">AI · Voice</span></div>
            <h3><span data-i18n="proj.4.name">Jarvis</span><span class="pa">↗</span></h3>
            <p data-i18n="proj.4.desc">Iron Man-inspired voice assistant. Whisper → speech-to-text, Gemini function-calling → reasoning, TTS → response. Cross-platform.</p>
            <div class="tags"><span class="tag">Python</span><span class="tag">Whisper</span><span class="tag">Gemini</span></div>
          </div>
        </article>

        <article class="pg-card reveal" data-d="2" onclick="location.href='projects/poco-loco.html'" style="cursor:pointer">
          <div class="pg-thumb has-thumb">
            <img src="looked_ss/poco_loco_logo.jpg" alt="Poco Loco logo" class="thumb-img" style="object-fit:contain;background:var(--bg-3);padding:12%">
            <span class="pg-badge pg-live"><span class="ld"></span><span data-i18n="proj.live">Live</span></span>
          </div>
          <div class="pg-body">
            <div class="pg-type"><span data-i18n="proj.2.type">Web · E-Commerce</span></div>
            <h3><span data-i18n="proj.2.name">Poco Loco</span><span class="pa">↗</span></h3>
            <p data-i18n="proj.2.desc">Full e-commerce site for a bag brand — product catalog, cart, wishlist, auth. Designed and built end-to-end.</p>
            <div class="tags"><span class="tag">Web</span><span class="tag">E-Commerce</span><span class="tag">UI/UX</span></div>
            <a href="https://poco--loco.com" target="_blank" rel="noopener" class="proj-live-btn" onclick="event.stopPropagation()">Visit site ↗</a>
          </div>
        </article>

      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append project grid CSS**

```css
/* ============================================================
   OTHER PROJECTS GRID
   ============================================================ */
.pg-section {
  padding: clamp(3rem, 6vw, 5rem) var(--gutter);
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
}
.pg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 0;
}
.pg-card {
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex; flex-direction: column;
  cursor: pointer;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), transform 0.2s var(--ease);
}
.pg-card:hover { border-color: var(--accent); box-shadow: 0 8px 32px rgba(var(--accent-rgb), 0.10); transform: translateY(-3px); }
.pg-thumb {
  aspect-ratio: 16/10; background: var(--bg-3); position: relative;
  overflow: hidden; display: grid; place-items: center; flex-shrink: 0;
}
.pg-thumb--voice::after {
  content: "STT → LLM → TTS";
  font-family: var(--mono); font-size: 0.68rem; font-weight: 600;
  color: var(--fg-3); opacity: 0.5; letter-spacing: 0.06em;
}
.has-thumb .thumb-img { width: 100%; height: 100%; display: block; }
.pg-badge {
  position: absolute; bottom: 0.6rem; left: 0.6rem;
  font-family: var(--mono); font-size: 0.52rem;
  background: rgba(255,255,255,0.92); border: 1px solid var(--line-2); color: var(--fg-3);
  padding: 0.2rem 0.5rem; display: flex; align-items: center; gap: 0.3rem;
  letter-spacing: 0.06em; z-index: 2; border-radius: 999px; backdrop-filter: blur(4px);
}
.pg-live { color: var(--fg) !important; }
.pg-live .ld { width: 5px; height: 5px; background: #22c55e; border-radius: 50%; flex-shrink: 0; }
.pg-body { padding: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.pg-type { font-family: var(--mono); font-size: 0.54rem; color: var(--fg-3); letter-spacing: 0.08em; }
.pg-body h3 { font-family: var(--display); font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; color: var(--fg); display: flex; align-items: center; gap: 0.35rem; }
.pa { color: var(--fg-3); font-size: 0.8em; transition: color 0.15s; }
.pg-card:hover .pa { color: var(--accent); }
.pg-body p { font-size: 0.84rem; color: var(--fg-2); line-height: 1.65; flex: 1; }
.proj-live-btn { display: inline-flex; align-items: center; gap: 0.3rem; font-family: var(--mono); font-size: 0.58rem; color: var(--accent); opacity: 0.6; transition: opacity 0.2s; margin-top: 0.3rem; }
.proj-live-btn:hover { opacity: 1; }

@media (max-width: 720px) { .pg-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .pg-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify in browser**

Three equal cards on grey-tint background. White cards with light border; hover brings warm-red border and 3px lift. Optura and Poco Loco have image thumbnails. Jarvis has the monospace label.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: other projects grid — 3-col cards, hover-red border"
```

---

### Task 8: About Section

**Files:**
- Modify: `index.html` — add new About section after the projects grid (the old About bento card was already removed in Task 6)
- Append to: `style.css`

**Interfaces:**
- Produces: `.about-section`, `.about-inner`, `.about-bio`, `.about-lead`, `.stack-group`, `.stack-name`, `.about-cv`, `.about-meta`, `.meta-list`, `.meta-row`

- [ ] **Step 1: Add About section HTML after the pg-section closing tag**

After `</section>` that closes the `.pg-section`, insert:

```html
  <!-- ABOUT -->
  <section class="about-section" id="about">
    <div class="about-inner wrap">
      <div class="about-bio">
        <span class="section-label reveal" data-i18n="about.idx">01</span>
        <p class="about-lead reveal" data-d="1" data-i18n="about.lead">I'm not just someone who writes code. While I build mobile and web products, my real interest is <strong>AI systems</strong>: from LLM integrations to RAG architectures. Turning an idea into a working system is what drives me.</p>
        <div class="stack-list reveal" data-d="2">
          <div class="stack-group">
            <span class="stack-name" data-i18n="skills.m.title">Mobile</span>
            <div class="tags"><span class="tag">React Native</span><span class="tag">Expo</span><span class="tag">Firebase</span><span class="tag">Flutter</span></div>
          </div>
          <div class="stack-group">
            <span class="stack-name" data-i18n="skills.ai.title">AI / ML</span>
            <div class="tags"><span class="tag">Python</span><span class="tag">LLM</span><span class="tag">RAG</span><span class="tag">LangChain</span><span class="tag">GPT-4o</span></div>
          </div>
        </div>
        <div class="about-cv reveal" data-d="3">
          <a href="cv-en.pdf" download class="btn btn--ghost" style="font-size:0.8rem;padding:0.5rem 1rem;">CV · EN ↓</a>
          <a href="cv-tr.pdf" download class="btn btn--ghost" style="font-size:0.8rem;padding:0.5rem 1rem;">CV · TR ↓</a>
        </div>
      </div>
      <div class="about-meta reveal" data-d="1">
        <div class="meta-list">
          <div class="meta-row">
            <span class="mk" data-i18n="meta.edu.k">Education</span>
            <span class="mv"><span data-i18n="meta.edu.v">Computer Engineering</span><small data-i18n="meta.edu.s">Sakarya University · 2026</small></span>
          </div>
          <div class="meta-row">
            <span class="mk" data-i18n="meta.loc.k">Location</span>
            <span class="mv"><span data-i18n="meta.loc.v">Turkey</span><small data-i18n="meta.loc.s">Open to remote work</small></span>
          </div>
          <div class="meta-row">
            <span class="mk" data-i18n="meta.lang.k">Languages</span>
            <span class="mv"><span data-i18n="meta.lang.v">Turkish (native)</span><small data-i18n="meta.lang.s">English, Spanish</small></span>
          </div>
          <div class="meta-row">
            <span class="mk" data-i18n="meta.lic.k">License</span>
            <span class="mv"><span data-i18n="meta.lic.v">UAV0 & UAV1</span><small data-i18n="meta.lic.s">Licensed drone pilot</small></span>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append About CSS**

```css
/* ============================================================
   ABOUT
   ============================================================ */
.about-section {
  padding: clamp(3.5rem, 7vw, 6rem) var(--gutter);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.about-inner {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}
.about-bio { display: flex; flex-direction: column; gap: 1.5rem; }
.about-lead {
  font-size: clamp(1rem, 1.4vw, 1.08rem);
  color: var(--fg); line-height: 1.82;
}
.about-lead strong { color: var(--accent); font-weight: 600; }
.stack-list { display: flex; flex-direction: column; gap: 1rem; }
.stack-group { display: flex; flex-direction: column; gap: 0.5rem; }
.stack-name { font-family: var(--display); font-size: 0.82rem; font-weight: 700; color: var(--fg); letter-spacing: -0.01em; }
.about-cv { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.about-meta { padding-top: 1.6rem; }
.meta-list { border: 1.5px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; }
.meta-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: 0.9rem 1.2rem; border-bottom: 1px solid var(--line); font-size: 0.82rem; }
.meta-row:last-child { border-bottom: none; }
.mk { color: var(--fg-3); font-size: 0.62rem; font-family: var(--mono); letter-spacing: 0.06em; text-transform: uppercase; flex-shrink: 0; padding-top: 0.15rem; }
.mv { color: var(--fg); text-align: right; display: flex; flex-direction: column; gap: 0.15rem; font-weight: 500; font-size: 0.82rem; }
.mv small { color: var(--fg-2); font-size: 0.88em; font-weight: 400; }

@media (max-width: 720px) {
  .about-inner { grid-template-columns: 1fr; }
  .about-meta { padding-top: 0; }
}
```

- [ ] **Step 3: Verify in browser**

Two-column About: left has label, bio paragraph, tech tags grouped by category, two CV download buttons. Right has a bordered table with four meta rows (edu, location, languages, license).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: about section — 2-col bio+meta, stack tags, CV downloads"
```

---

### Task 9: Awards + Experience Sections

**Files:**
- Modify: `index.html` — remove `b-awards` and `b-exp` bento cards, add new sections
- Append to: `style.css`

**Interfaces:**
- Produces: `.awards-section`, `.aw-grid`, `.ach-card`, `.exp-section`, `.timeline`, `.tl-item`

- [ ] **Step 1: Remove awards and experience bento cards, add new sections**

Remove:
- `<section class="b-card b-awards" id="work">…</section>`
- `<section class="b-card b-exp" id="path">…</section>`

Replace with:

```html
  <!-- AWARDS -->
  <section class="awards-section" id="work">
    <div class="wrap">
      <span class="section-label reveal" data-i18n="ach.idx">03</span>
      <div class="aw-grid">
        <article class="ach-card reveal">
          <span class="ach-year">2022</span>
          <div class="ach-rank" data-i18n="ach.1.rank">1st in World</div>
          <div class="ach-medal">01<span class="sm">/ World</span></div>
          <h3 data-i18n="ach.1.title">RoboChallenge AirRace</h3>
          <p data-i18n="ach.1.desc">Romania, 2022. Took first place globally with autonomous drone software that follows dashed lines between two poles.</p>
        </article>
        <article class="ach-card reveal" data-d="1">
          <span class="ach-year">2021–22</span>
          <div class="ach-rank" data-i18n="ach.2.rank">Turkey 2nd</div>
          <div class="ach-medal">02<span class="sm">/ TR</span></div>
          <h3 data-i18n="ach.2.title">Teknofest UAV Competition</h3>
          <p data-i18n="ach.2.desc">Placed 2nd in Turkey at the Inter-High School Unmanned Aerial Vehicles competition.</p>
        </article>
        <article class="ach-card reveal" data-d="2">
          <span class="ach-year">2019</span>
          <div class="ach-rank" data-i18n="ach.3.rank">Turkey 3rd</div>
          <div class="ach-medal">03<span class="sm">/ TR</span></div>
          <h3 data-i18n="ach.3.title">TÜBİTAK: Smart Child Lock</h3>
          <p data-i18n="ach.3.desc">Won 3rd place in Turkey at TÜBİTAK with an automotive child-lock control project.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section class="exp-section" id="path">
    <div class="wrap">
      <span class="section-label reveal" data-i18n="path.idx">05</span>
      <div class="timeline">
        <div class="tl-item reveal">
          <div class="tl-when" data-i18n="path.2.when">2026 / Now</div>
          <div class="tl-body">
            <span class="tl-kind" data-i18n="path.2.kind">Product</span>
            <div class="tl-role" data-i18n="path.2.role">Dev, Looked</div>
            <div class="tl-org" data-i18n="path.2.org">Personal</div>
          </div>
        </div>
        <div class="tl-item reveal" data-d="1">
          <div class="tl-when" data-i18n="path.1.when">2025 / Now</div>
          <div class="tl-body">
            <span class="tl-kind" data-i18n="path.1.kind">Work</span>
            <div class="tl-role" data-i18n="path.1.role">Freelance Mobile Dev</div>
            <div class="tl-org" data-i18n="path.1.org">Independent</div>
          </div>
        </div>
        <div class="tl-item reveal" data-d="2">
          <div class="tl-when" data-i18n="path.3.when">2019 / 2022</div>
          <div class="tl-body">
            <span class="tl-kind" data-i18n="path.3.kind">Competition</span>
            <div class="tl-role" data-i18n="path.3.role">Autonomous Drone Team</div>
            <div class="tl-org" data-i18n="path.3.org">International & TÜBİTAK</div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append awards + experience CSS**

```css
/* ============================================================
   AWARDS
   ============================================================ */
.awards-section {
  padding: clamp(3.5rem, 7vw, 6rem) var(--gutter);
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
}
.aw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 1.5rem; border: 1.5px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; }
.ach-card {
  padding: 1.8rem 1.5rem;
  border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.4rem;
  transition: background 0.2s;
}
.ach-card:last-child { border-right: none; }
.ach-card:hover { background: var(--bg-3); }
.ach-year { font-family: var(--mono); font-size: 0.56rem; color: var(--fg-3); letter-spacing: 0.06em; }
.ach-rank { font-family: var(--mono); font-size: 0.56rem; color: var(--accent); letter-spacing: 0.08em; }
.ach-medal { font-family: var(--display); font-size: 2.2rem; font-weight: 800; color: var(--fg); letter-spacing: -0.05em; line-height: 1; margin: 0.4rem 0 0.2rem; }
.ach-medal .sm { font-size: 0.38em; color: var(--fg-3); margin-left: 0.3em; font-weight: 500; }
.ach-card h3 { font-family: var(--display); font-size: 0.92rem; font-weight: 700; letter-spacing: -0.02em; color: var(--fg); }
.ach-card p { font-size: 0.81rem; color: var(--fg-2); line-height: 1.62; }

@media (max-width: 600px) {
  .aw-grid { grid-template-columns: 1fr; }
  .ach-card { border-right: none; border-bottom: 1px solid var(--line); }
  .ach-card:last-child { border-bottom: none; }
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
.exp-section {
  padding: clamp(3rem, 6vw, 5rem) var(--gutter);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.timeline { display: flex; flex-direction: column; border-left: 1.5px solid var(--line-2); margin-left: 4px; margin-top: 1.2rem; }
.tl-item { display: flex; gap: 1.5rem; padding: 0 0 1.8rem 1.8rem; position: relative; }
.tl-item:last-child { padding-bottom: 0; }
.tl-item::before { content: ""; position: absolute; left: -5px; top: 5px; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; border: 2px solid var(--bg); box-shadow: 0 0 0 1.5px var(--accent); }
.tl-when { font-family: var(--mono); font-size: 0.56rem; color: var(--accent); letter-spacing: 0.06em; flex-shrink: 0; padding-top: 0.2rem; min-width: 90px; }
.tl-body { flex: 1; }
.tl-kind { font-family: var(--mono); font-size: 0.52rem; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.12em; display: inline-block; margin-bottom: 0.25rem; }
.tl-role { font-family: var(--display); font-size: 0.92rem; font-weight: 700; letter-spacing: -0.02em; color: var(--fg); margin-bottom: 0.15rem; }
.tl-org { font-size: 0.75rem; color: var(--accent); font-weight: 500; }
```

- [ ] **Step 3: Verify in browser**

Awards: grey-tint section with a bordered 3-col table of achievements. Large medal numbers (01, 02, 03). Experience: white section with red left-border timeline, accent dots and dates.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: awards + experience sections — light theme, bordered grid, timeline"
```

---

### Task 10: Contact Section + Footer

**Files:**
- Modify: `index.html` — remove `b-contact` bento card, add new contact section; update footer
- Append to: `style.css`

**Interfaces:**
- Consumes: EmailJS IDs `contactForm`, `formError`, `formSuccess`, `submit-btn`, `emailCopy`, `email-address`, `copy-status` — must keep exactly
- Produces: `.contact-section`, `.bc-left`, `.bc-heading`, `.social-list`, `.social`, `.form`, `.footer`

- [ ] **Step 1: Remove contact bento card, add new contact section**

Remove `<section class="b-card b-contact" id="contact">…</section>`. Replace with:

```html
  <!-- CONTACT -->
  <section class="contact-section" id="contact">
    <div class="contact-inner wrap">
      <div class="bc-left">
        <span class="section-label reveal" data-i18n="contact.idx">06</span>
        <h2 class="bc-heading reveal" data-d="1" data-i18n="contact.title">Drop me a line</h2>
        <p class="bc-sub reveal" data-d="2" data-i18n="contact.lead">Got an idea, or a freelance project in mind? Email gets the fastest reply.</p>
        <div class="social-list reveal" data-d="2">
          <button type="button" class="social" id="emailCopy">
            <span class="s-left"><span class="s-ic">@</span><span><span class="s-name" data-i18n="social.email">Email</span><br><span class="s-handle" id="email-address">bozcaegemen@gmail.com</span></span></span>
            <span class="s-arr" id="copy-status">↗</span>
          </button>
          <a href="https://www.linkedin.com/in/egemen-bozca/" target="_blank" rel="noopener" class="social">
            <span class="s-left"><span class="s-ic">in</span><span><span class="s-name" data-i18n="social.linkedin">LinkedIn</span><br><span class="s-handle">/in/egemen-bozca</span></span></span>
            <span class="s-arr">↗</span>
          </a>
          <a href="https://www.upwork.com/freelancers/~01e61b4aa3e01ecbdf" target="_blank" rel="noopener" class="social">
            <span class="s-left"><span class="s-ic">up</span><span><span class="s-name" data-i18n="social.upwork">Upwork</span><br><span class="s-handle">Egemen Bozca</span></span></span>
            <span class="s-arr">↗</span>
          </a>
          <a href="https://github.com/Egebo" target="_blank" rel="noopener" class="social">
            <span class="s-left"><span class="s-ic">gh</span><span><span class="s-name" data-i18n="social.github">GitHub</span><br><span class="s-handle">@Egebo</span></span></span>
            <span class="s-arr">↗</span>
          </a>
        </div>
      </div>
      <form class="form reveal" data-d="1" id="contactForm">
        <div class="form-fields">
          <div class="field">
            <label data-i18n="form.name">Name</label>
            <input type="text" id="name" name="name" required autocomplete="name" data-i18n-ph="form.name.ph" placeholder="Your name">
          </div>
          <div class="field">
            <label data-i18n="form.email">Email</label>
            <input type="email" id="email" name="email" required autocomplete="email" data-i18n-ph="form.email.ph" placeholder="you@example.com">
          </div>
          <div class="field">
            <label data-i18n="form.msg">Message</label>
            <textarea id="message" name="message" rows="4" required data-i18n-ph="form.msg.ph" placeholder="Tell me about your project…"></textarea>
          </div>
          <button type="submit" class="btn btn--accent" id="submit-btn"><span class="submit-text" data-i18n="form.send">Send message</span><span class="arr">→</span></button>
          <div class="form-error-msg" id="formError"></div>
        </div>
        <div class="form-success" id="formSuccess">
          <div class="check">✓</div>
          <h3 data-i18n="form.ok.title">Thank you!</h3>
          <p style="margin:0.5rem auto 0;text-align:center;font-size:0.9rem;color:var(--fg-2)" data-i18n="form.ok.body">Your message has been received. I'll get back to you soon.</p>
        </div>
      </form>
    </div>
  </section>
```

- [ ] **Step 2: Also close the `</main>` tag**

After the contact section closing `</section>`, confirm `</main>` follows immediately.

- [ ] **Step 3: Update footer**

Replace the existing `<footer class="footer">` block with:

```html
<footer class="footer">
  <div class="footer-inner wrap">
    <span class="f-brand">Egemen Bozca</span>
    <span class="f-meta"><span data-i18n="foot.tag">Made with coffee, from Türkiye.</span> · © <span id="year">2026</span></span>
    <a href="#top" class="to-top"><span data-i18n="foot.top">Back to top</span> ↑</a>
  </div>
</footer>
```

- [ ] **Step 4: Append contact + footer CSS**

```css
/* ============================================================
   CONTACT
   ============================================================ */
.contact-section {
  padding: clamp(3.5rem, 7vw, 6rem) var(--gutter);
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
}
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: start;
}
.bc-left { display: flex; flex-direction: column; gap: 1.2rem; }
.bc-heading { font-family: var(--display); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.08; color: var(--fg); }
.bc-sub { font-size: 0.95rem; color: var(--fg-2); line-height: 1.76; }
.social-list { display: flex; flex-direction: column; border: 1.5px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; }
.social { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.1rem; border-bottom: 1px solid var(--line); color: var(--fg); background: none; cursor: pointer; transition: background 0.15s; width: 100%; text-align: left; }
.social:last-child { border-bottom: none; }
.social:hover { background: var(--bg-3); }
.social:hover .s-arr { color: var(--accent); transform: translateX(2px) translateY(-2px); }
.social .s-left { display: flex; align-items: center; gap: 0.8rem; }
.social .s-ic { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: var(--bg-3); border: 1px solid var(--line-2); font-size: 0.6rem; color: var(--fg-3); flex-shrink: 0; border-radius: var(--radius); font-family: var(--mono); }
.social .s-name { font-size: 0.82rem; font-weight: 500; display: block; color: var(--fg); }
.social .s-handle { font-size: 0.68rem; color: var(--fg-2); }
.social .s-arr { color: var(--fg-3); transition: transform 0.2s var(--ease), color 0.15s; }

/* Form */
.form { display: flex; flex-direction: column; gap: 0.75rem; }
.form-fields { display: flex; flex-direction: column; gap: 0.75rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.62rem; font-weight: 500; color: var(--fg-3); letter-spacing: 0.06em; font-family: var(--mono); text-transform: uppercase; }
.field input, .field textarea {
  background: var(--bg); border: 1.5px solid var(--line-2); border-radius: var(--radius);
  color: var(--fg); padding: 0.7rem 0.95rem; font-size: 0.87rem; font-family: var(--sans);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.10); }
.field input::placeholder, .field textarea::placeholder { color: var(--fg-3); }
.field textarea { resize: vertical; min-height: 100px; }
.form-error-msg { font-family: var(--mono); font-size: 0.65rem; color: #dc2626; display: none; }
.form-error-msg.show { display: block; }
.form-success { display: none; flex-direction: column; align-items: center; gap: 0.8rem; padding: 2.5rem; text-align: center; }
.form-success.show { display: flex; }
.form-success .check { font-size: 2rem; color: var(--accent); }
.form-success h3 { font-family: var(--display); font-size: 1.1rem; font-weight: 700; }

@media (max-width: 720px) {
  .contact-inner { grid-template-columns: 1fr; }
}

/* ============================================================
   FOOTER
   ============================================================ */
.footer { border-top: 1px solid var(--line); background: var(--bg); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; padding-block: 1.6rem; font-size: 0.73rem; color: var(--fg-3); }
.f-brand { color: var(--fg); font-family: var(--display); font-weight: 700; font-size: 0.9rem; letter-spacing: -0.02em; }
.to-top { color: var(--fg-3); transition: color 0.15s; }
.to-top:hover { color: var(--accent); }
```

- [ ] **Step 5: Verify in browser**

Grey-tint contact section: left has heading, lead text, 4 social rows. Right has 3-field form with red focus rings. Footer: single line with brand, tagline, year, "Back to top" link.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "feat: contact section + footer — light theme, social list, EmailJS form"
```

---

### Task 11: Scroll Reveal (IntersectionObserver)

**Files:**
- Modify: `script.js` — add IntersectionObserver for `.reveal` elements

**Interfaces:**
- Consumes: `.reveal` elements in index.html (added by all previous tasks), `.in-view` CSS class from Task 1
- Produces: IntersectionObserver that adds `.in-view` to `.reveal` elements as they enter the viewport

Note: The old bento layout used CSS `animation: rise` which fired immediately on parse. The new linear-scroll layout needs observer-triggered reveal so sections below the fold don't animate until scrolled to.

- [ ] **Step 1: Add IntersectionObserver to script.js**

At the top of the IIFE (after line 33 `"use strict";`, before line 35 `var prefersReduce`), insert:

```js
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
```

- [ ] **Step 2: Bump script.js version in index.html**

On the last line before `</body>` (scripts block), change:
```html
<script src="strings.js?v=27"></script>
<script src="script.js?v=27"></script>
```
To:
```html
<script src="strings.js?v=28"></script>
<script src="script.js?v=28"></script>
```

- [ ] **Step 3: Verify in browser**

Hard-refresh (Ctrl+Shift+R). Scroll from top slowly. Confirm:
- Hero elements are immediately visible (already in viewport on load)
- Projects heading, Looked section fade+rise in as you scroll to them
- AkademikChatbot, project cards, About, Awards, Experience, Contact all reveal on scroll
- No elements flicker or stay invisible permanently

- [ ] **Step 4: Commit**

```bash
git add script.js index.html
git commit -m "feat: scroll reveal — IntersectionObserver replaces CSS animation-on-parse"
```

---

### Task 12: Final Polish — Meta, Cursor, Grain Overlay, Cache Bust, Push

**Files:**
- Modify: `index.html` — remove grain-overlay div (light theme doesn't need grain), update title/meta description
- Modify: `style.css` — remove `.grain-overlay` rule if present (Task 1 CSS didn't include it, but confirm it's gone)

**Interfaces:**
- Produces: clean final build ready for GitHub Pages

- [ ] **Step 1: Update page title and meta description (index.html lines 6–7)**

Change:
```html
<title>Egemen Bozca | Geliştirici & Yapay Zekâ Sistemleri</title>
<meta name="description" content="Egemen Bozca: Web & mobil freelancer, yapay zekâ sistemleri meraklısı. React Native ile Google Play'de 4 uygulama, RAG tabanlı AI sistemleri, otonom drone dünya birincisi.">
```
To:
```html
<title>Egemen Bozca | React Native & AI Developer</title>
<meta name="description" content="Egemen Bozca: React Native & AI developer. Shipped 4 apps to Google Play & App Store, built RAG-based AI systems, world champion with autonomous drone software. Open to freelance.">
```

- [ ] **Step 2: Remove grain-overlay div (index.html)**

Remove the line:
```html
<div class="grain-overlay" aria-hidden="true"></div>
```

- [ ] **Step 3: Verify cursor still works**

Confirm `<div class="cursor" id="cursor" ...>` block is still present. script.js initializes cursor on `#cursor` — it must remain.

- [ ] **Step 4: Full browser QA checklist**

Open index.html, test:
- [ ] White background throughout, no dark sections
- [ ] Nav sticks, glass effect on scroll, hamburger works on mobile width
- [ ] Hero heading in Plus Jakarta Sans, red accent on second line
- [ ] Marquee scrolls left, light grey background
- [ ] Looked screenshots load, two buttons work (Play Store / App Store open in new tab)
- [ ] AkademikChatbot "Case study →" links to projects/rag.html
- [ ] 3 project cards — clicking Optura, Jarvis, Poco Loco links work; Poco Loco "Visit site" opens poco--loco.com without navigating away
- [ ] About section: bio visible, tech tags present, CV downloads triggered
- [ ] Awards: 3 columns, medal numbers 01/02/03
- [ ] Contact form: fill all fields → submit → success state shows
- [ ] TR/EN toggle: all text switches, no missing keys
- [ ] Custom red cursor visible on desktop hover
- [ ] Scroll progress bar (2px red bar at top) fills as you scroll
- [ ] Year in footer shows 2026

- [ ] **Step 5: Commit and push**

```bash
git add index.html
git commit -m "chore: final polish — title, meta, remove grain overlay"
git push
```

Wait 1–3 minutes for GitHub Pages to deploy, then verify at `https://egebo.github.io` with Ctrl+Shift+R.
```

---

## Self-Review

**Spec coverage:**
- ✅ Light theme (#ffffff)
- ✅ Warm red accent (#E8442A)
- ✅ Plus Jakarta Sans display + Inter body
- ✅ Sticky nav with glass blur
- ✅ Hero: no stats, no photo, 2 CTAs
- ✅ Looked full-width text-left/visual-right
- ✅ AkademikChatbot full-width text-left/visual-right
- ✅ 3-col project cards grid
- ✅ About 2-col: bio left, meta right
- ✅ Awards section preserved
- ✅ Experience section preserved
- ✅ Contact: social list + EmailJS form
- ✅ Footer: single line
- ✅ All i18n preserved
- ✅ EmailJS untouched
- ✅ Custom cursor preserved
- ✅ Scroll progress bar preserved
- ✅ Hamburger menu preserved
- ✅ Case study pages untouched

**Placeholder scan:** None found. All code blocks contain real code.

**Type consistency:** Class names consistent across tasks — `.feat-row`/`.feat-inner`/`.feat-copy`/`.feat-visual` defined in Task 5 and reused in Task 6; `.pg-card`/`.pg-thumb`/`.pg-body` defined in Task 7; `.mk`/`.mv` defined in Task 8; `.tl-role`/`.tl-org` defined in Task 9.

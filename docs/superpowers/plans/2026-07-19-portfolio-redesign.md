# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign egebo.github.io from terminal/dark aesthetic to bold/personal light aesthetic — English primary, hamburger nav, Looked + AkademikChatbot featured prominently, developer photo in hero.

**Architecture:** Static HTML/CSS/JS single page. `style.css` is a complete rewrite. `index.html` has structural surgery (manifesto removed, hero restructured, AkademikChatbot elevated, hamburger added). `script.js` gets hamburger logic and manifesto code removed. `strings.js` switches default language to English.

**Tech Stack:** HTML5, CSS3 custom properties, Vanilla JS, Geist + Geist Mono (Google Fonts, already loaded), EmailJS (unchanged)

## Global Constraints

- No framework, no build step — plain HTML/CSS/JS
- Google Fonts: `family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600` already in `<head>`
- EmailJS init (`mzmL-J9Z59jECtnhm`) must remain functional — do not touch it
- Cache-bust: every asset reference in `index.html` must end with `?v=27`
- English is the default language; `strings.js` must init with `'en'`
- Accent color: `#3B5BDB` (indigo blue)
- No rounded corners on photo — photo is `border-radius: 0`; other UI elements use `--radius: 6px`
- `--sans` must use `"Geist"` as first family; `--mono` keeps `"Geist Mono"`

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `index.html` | Modify | Remove manifesto section, restructure hero (photo + new copy), add hamburger button, elevate AkademikChatbot to featured card, update cache-bust version to 27, remove coord-label, remove heroCanvas |
| `style.css` | Rewrite | New light theme tokens, new typographic scale, all component styles for new aesthetic |
| `script.js` | Modify | Add hamburger menu logic, remove manifesto IntersectionObserver, remove heroCanvas init |
| `strings.js` | Modify | Switch default lang to `'en'`, update hero headline/sub/eyebrow to English, update nav labels |
| `egemen.jpg` | Add | Developer photo (user saves their photo to project root with this filename) |

---

## Task 1: Add developer photo

**Files:**
- Add: `egemen.jpg` (project root)

- [ ] **Step 1: Save photo to project root**

Save the developer photo as `egemen.jpg` in `c:\Users\bozca\Desktop\Projelerim\PersonalWebsite\egemen.jpg`.
The photo shared in chat (white background headshot) is the one to use.
Crop to approximately 3:4 ratio focused on face + upper chest.

- [ ] **Step 2: Verify file exists**

```
dir c:\Users\bozca\Desktop\Projelerim\PersonalWebsite\egemen.jpg
```
Expected: file listed, size > 0 bytes.

- [ ] **Step 3: Commit**

```bash
git add egemen.jpg
git commit -m "add developer photo"
```

---

## Task 2: CSS — Design tokens, typography, base reset

**Files:**
- Rewrite: `style.css` (start fresh — delete all content, write new)

This task writes everything that isn't component-specific: tokens, reset, layout helpers, typography scale, buttons, tags.

- [ ] **Step 1: Write new style.css — tokens + reset**

Replace the entire content of `style.css` with the following as a starting point, then continue adding sections per subsequent tasks:

```css
/* ============================================================
   Egemen Bozca / Portfolio · style.css v3
   Bold/Personal · Light · Indigo accent
   ============================================================ */

/* ---------- Tokens ---------- */
:root {
  --bg:          #FAFAF8;
  --bg-2:        #F3F3F0;
  --bg-3:        #EAEAE6;
  --fg:          #111110;
  --fg-2:        #6B6B6B;
  --line:        #E2E2DC;
  --line-2:      #D5D5CE;
  --accent:      #3B5BDB;
  --accent-dim:  #2F4AC0;
  --accent-tint: #EEF2FF;

  --sans:  "Geist", -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;
  --mono:  "Geist Mono", ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace;

  --gutter:    clamp(1.25rem, 4vw, 3rem);
  --maxw:      1240px;
  --section-y: clamp(4rem, 8vw, 6.5rem);
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

/* ---------- Layout ---------- */
.wrap { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: var(--section-y); position: relative; }
.section--alt { background: var(--bg-2); }

/* ---------- Type scale ---------- */
.mono { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-2); }
.accent { color: var(--accent); }

/* ---------- Section heads ---------- */
.sec-head { display: flex; align-items: baseline; gap: 1rem; margin-bottom: clamp(2rem, 5vw, 3.2rem); }
.sec-head .idx { font-family: var(--mono); font-size: 0.65rem; color: var(--fg-2); letter-spacing: 0.14em; }
.sec-head h2 { font-family: var(--sans); font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; letter-spacing: -0.02em; }
.sec-head .rule { flex: 1; height: 1px; background: var(--line); align-self: center; }

/* ---------- Scroll progress ---------- */
.scroll-prog { position: fixed; top: 0; left: 0; height: 2px; background: var(--accent); width: 0%; z-index: 200; pointer-events: none; }

/* ---------- Custom cursor ---------- */
.c-dot { position: fixed; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 10000; transition: opacity 0.2s; }
.c-ring { position: fixed; width: 28px; height: 28px; border: 1px solid var(--accent); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; transition: width 0.3s var(--ease), height 0.3s var(--ease), opacity 0.3s; opacity: 0.4; }
.cursor.hover .c-ring { width: 44px; height: 44px; opacity: 0.8; }
body:not(.has-cursor) .cursor { display: none; }

/* ---------- Buttons ---------- */
.btn { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--sans); font-size: 0.9rem; font-weight: 600; letter-spacing: -0.01em; padding: 0.75rem 1.4rem; transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s; cursor: pointer; border: 1.5px solid transparent; border-radius: var(--radius); }
.btn .arr { transition: transform 0.2s var(--ease); }
.btn:hover .arr { transform: translateX(4px); }
.btn--accent { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn--accent:hover { background: var(--accent-dim); border-color: var(--accent-dim); }
.btn--ghost { background: transparent; color: var(--fg); border-color: var(--line); }
.btn--ghost:hover { border-color: var(--accent); color: var(--accent); }
.btn--primary { background: transparent; color: var(--fg-2); border-color: var(--line); font-size: 0.78rem; padding: 0.45rem 0.9rem; }
.btn--primary:hover { border-color: var(--accent); color: var(--accent); }

/* ---------- Tags ---------- */
.tag { font-family: var(--mono); font-size: 0.63rem; padding: 0.28rem 0.6rem; border: 1px solid var(--line); color: var(--fg-2); letter-spacing: 0.04em; border-radius: var(--radius); background: var(--bg); }

/* ---------- Scroll reveal ---------- */
@keyframes rise { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
.reveal { opacity: 0; animation: rise 0.6s var(--ease) both; }
.reveal[data-d="1"] { animation-delay: 0.08s; }
.reveal[data-d="2"] { animation-delay: 0.16s; }
.reveal[data-d="3"] { animation-delay: 0.24s; }
.reveal[data-d="4"] { animation-delay: 0.32s; }

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .reveal { animation: none; opacity: 1; }
  .status-dot, .marquee-track { animation: none; }
}
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Background should be `#FAFAF8` (warm white), text near-black. Buttons may look unstyled — that's expected since component CSS comes in later tasks.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: new design tokens and base reset"
```

---

## Task 3: Navigation + Hamburger menu

**Files:**
- Modify: `index.html` (nav section, lines 66–82)
- Modify: `style.css` (append nav styles)
- Modify: `script.js` (append hamburger logic)

- [ ] **Step 1: Update nav HTML in index.html**

Replace the `<header class="nav" ...>` block with:

```html
<header class="nav" id="nav">
  <a href="#top" class="brand">Egemen Bozca</a>
  <nav class="nav-links" id="navLinks" aria-label="Page navigation">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#work">Awards</a>
    <a href="#projects">Projects</a>
    <a href="#path">Experience</a>
  </nav>
  <div class="nav-right">
    <div class="lang-toggle" role="group" aria-label="Language">
      <button data-lang="en" class="on">EN</button>
      <button data-lang="tr">TR</button>
    </div>
    <a href="#contact" class="btn btn--accent" style="font-size:0.8rem;padding:0.45rem 1rem;">Get in touch</a>
    <button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

- [ ] **Step 2: Append nav styles to style.css**

```css
/* ============================================================
   NAV
   ============================================================ */
.nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding: 0 var(--gutter); height: 60px; background: rgba(250,250,248,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); transition: border-color 0.3s; }
.brand { font-family: var(--sans); font-size: 0.95rem; font-weight: 700; letter-spacing: -0.02em; color: var(--fg); }
.nav-links { display: flex; gap: 1.8rem; }
.nav-links a { font-size: 0.85rem; color: var(--fg-2); transition: color 0.15s; font-weight: 500; }
.nav-links a:hover, .nav-links a.active { color: var(--fg); }
.nav-right { display: flex; align-items: center; gap: 0.8rem; }
.lang-toggle { display: flex; border: 1.5px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.lang-toggle button { font-family: var(--mono); font-size: 0.65rem; padding: 0.3rem 0.6rem; color: var(--fg-2); transition: color 0.15s, background 0.15s; letter-spacing: 0.06em; }
.lang-toggle button.on { background: var(--accent); color: #fff; }
.lang-toggle button:hover:not(.on) { color: var(--fg); }

/* Hamburger */
.burger { display: none; flex-direction: column; gap: 5px; padding: 4px; border-radius: var(--radius); }
.burger span { display: block; width: 22px; height: 2px; background: var(--fg); border-radius: 2px; transition: transform 0.25s var(--ease), opacity 0.2s; }
.burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 720px) {
  .nav-links { display: none; flex-direction: column; gap: 0; position: absolute; top: 60px; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--line); padding: 0.5rem 0; z-index: 99; }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 0.8rem var(--gutter); font-size: 1rem; border-bottom: 1px solid var(--line); }
  .nav-links a:last-child { border-bottom: none; }
  .burger { display: flex; }
}
```

- [ ] **Step 3: Add hamburger JS to script.js**

Find the `// --- Scroll progress` comment (or top of file). Add before it:

```js
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
```

- [ ] **Step 4: Verify in browser**

Open browser. Desktop: nav links visible, no hamburger. Mobile (resize to <720px): nav links hidden, hamburger appears, tap opens/closes menu.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: new nav design + hamburger menu for mobile"
```

---

## Task 4: Hero section

**Files:**
- Modify: `index.html` (hero section, lines 87–141)
- Modify: `style.css` (append hero styles)

The hero canvas background and coord-label are removed. The photo `egemen.jpg` must exist from Task 1.

- [ ] **Step 1: Replace hero HTML**

Replace the `<section class="hero" ...>` block through `</section>` (ends at line 141) with:

```html
<section class="hero" id="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="hero-eyebrow reveal">
          <span class="status-dot"></span>
          <span class="mono" data-i18n="hero.eyebrow">React Native & AI Developer · Available for freelance</span>
        </div>
        <h1 class="reveal" data-d="1" data-i18n="hero.h1">
          I build mobile apps<br><span class="accent">people actually use.</span>
        </h1>
        <p class="hero-sub reveal" data-d="2" data-i18n="hero.sub">
          React Native developer based in Turkey. I've shipped 4 apps to the Play Store and App Store, built AI-powered systems, and I'm open to new projects.
        </p>
        <div class="hero-cta reveal" data-d="3">
          <a href="#projects" class="btn btn--accent"><span data-i18n="hero.cta1">See my work</span><span class="arr">→</span></a>
          <a href="#contact" class="btn btn--ghost"><span data-i18n="hero.cta2">Get in touch</span></a>
        </div>
      </div>

      <div class="hero-photo reveal" data-d="2">
        <img src="egemen.jpg" alt="Egemen Bozca" class="photo-img">
        <p class="photo-caption mono" data-i18n="hero.caption">4 apps live on Play Store · Open to projects</p>
      </div>
    </div>

    <div class="hero-stats">
      <div class="stat reveal" data-d="1">
        <div class="num"><span data-count="4" data-pad="1">4</span></div>
        <div class="lbl" data-i18n="stat.apps">Apps on Play Store</div>
      </div>
      <div class="stat reveal" data-d="2">
        <div class="num"><span data-count="5">5</span><span class="suf">+</span></div>
        <div class="lbl" data-i18n="stat.years">Years of experience</div>
      </div>
      <div class="stat reveal" data-d="3">
        <div class="num"><span data-count="3">3</span><span class="suf">+</span></div>
        <div class="lbl" data-i18n="stat.awards">Competition awards</div>
      </div>
      <div class="stat reveal" data-d="4">
        <div class="num"><span data-count="10">10</span><span class="suf">+</span></div>
        <div class="lbl" data-i18n="stat.projects">Projects shipped</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles to style.css**

```css
/* ============================================================
   HERO
   ============================================================ */
.hero { position: relative; background: var(--bg); padding-block: clamp(5rem, 12vw, 9rem) clamp(2rem, 4vw, 3.5rem); }
.hero-grid { display: grid; grid-template-columns: 1fr 420px; gap: 4rem; align-items: center; margin-bottom: clamp(3rem, 7vw, 5rem); }

/* Status dot */
.status-dot { display: inline-block; width: 7px; height: 7px; background: #22c55e; border-radius: 50%; flex-shrink: 0; animation: pulse-dot 2.4s ease-in-out infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

.hero-eyebrow { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.4rem; }
h1 { font-family: var(--sans); font-size: clamp(2.6rem, 6vw, 5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1.4rem; }
.hero-sub { font-size: clamp(1rem, 1.6vw, 1.12rem); color: var(--fg-2); max-width: 48ch; line-height: 1.7; margin-bottom: 2rem; }
.hero-cta { display: flex; gap: 0.8rem; flex-wrap: wrap; }

/* Photo */
.hero-photo { display: flex; flex-direction: column; align-items: flex-end; gap: 0.8rem; }
.photo-img { width: 100%; max-width: 360px; aspect-ratio: 3/4; object-fit: cover; object-position: center top; border-radius: 0; filter: grayscale(8%); }
.photo-caption { font-size: 0.62rem; color: var(--fg-2); text-align: right; }

/* Stats */
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
.stat { padding: 1.6rem 0; padding-right: 1.4rem; padding-left: 1.4rem; border-right: 1px solid var(--line); }
.stat:last-child { border-right: none; }
.stat .num { font-family: var(--sans); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: var(--fg); letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.35rem; }
.stat .num .suf { font-size: 0.55em; color: var(--accent); }
.stat .lbl { font-size: 0.78rem; color: var(--fg-2); line-height: 1.4; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .hero-photo { align-items: center; }
  .photo-img { max-width: 260px; aspect-ratio: 1/1; object-position: center 15%; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
  .stat:nth-child(2) { border-right: none; }
  .stat:nth-child(3) { border-top: 1px solid var(--line); }
}
@media (max-width: 480px) {
  .hero-photo { order: -1; }
}
```

- [ ] **Step 3: Remove heroCanvas from script.js**

Find and delete the canvas init block in `script.js` — the section that does `const canvas = document.getElementById('heroCanvas')` and everything it initializes. Replace with nothing.

- [ ] **Step 4: Verify in browser**

Hero should show: left copy + big h1 + CTA buttons, right side shows photo. On mobile, stacks vertically.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: new hero section with photo and updated copy"
```

---

## Task 5: Marquee band

**Files:**
- Modify: `style.css` (append marquee styles)
- Marquee HTML stays — just restyle

- [ ] **Step 1: Append marquee styles to style.css**

```css
/* ============================================================
   MARQUEE
   ============================================================ */
.marquee-band { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--bg-2); padding: 0.8rem 0; }
.marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.marquee-item { display: flex; align-items: center; white-space: nowrap; }
.marquee-item .ms { font-family: var(--sans); font-size: 0.75rem; font-weight: 500; color: var(--fg-2); padding: 0 1.2rem; }
.marquee-item .mx { color: var(--accent); font-size: 0.6rem; }
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle marquee band"
```

---

## Task 6: About section

**Files:**
- Modify: `style.css` (append about styles)
- About HTML stays (minor: update `data-i18n` keys are handled in Task 10)

- [ ] **Step 1: Append about styles to style.css**

```css
/* ============================================================
   ABOUT
   ============================================================ */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.about-lead { font-size: clamp(1.05rem, 1.8vw, 1.25rem); line-height: 1.72; margin-bottom: 1.4rem; font-weight: 400; }
.about-lead strong { color: var(--fg); font-weight: 600; }
.about-body { font-size: 0.97rem; color: var(--fg-2); line-height: 1.75; }
.meta-list { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.meta-row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.9rem 1.2rem; border-bottom: 1px solid var(--line); font-size: 0.82rem; }
.meta-row:last-child { border-bottom: none; }
.meta-row .k { color: var(--fg-2); font-weight: 500; flex-shrink: 0; font-size: 0.78rem; }
.meta-row .v { color: var(--fg); text-align: right; display: flex; flex-direction: column; gap: 0.2rem; font-weight: 500; }
.meta-row small { color: var(--fg-2); font-size: 0.88em; font-weight: 400; }
@media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle about section"
```

---

## Task 7: Remove manifesto section

**Files:**
- Modify: `index.html` (delete manifesto block, lines 207–217)
- Modify: `script.js` (remove manifesto observer)

- [ ] **Step 1: Delete manifesto HTML from index.html**

Remove the entire block:
```html
<!-- ============ MANIFESTO ============ -->
<section class="manifesto" id="mf">
  ...
</section>
```
(approximately lines 207–217 in the original file)

- [ ] **Step 2: Remove manifesto JS from script.js**

Find and delete the manifesto IntersectionObserver block — the section that observes `.mf-line` and `.mf-coda` elements and adds the `lit` class. Delete that entire block.

- [ ] **Step 3: Verify**

Page loads without console errors. Scroll through — no manifesto section visible.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js
git commit -m "remove manifesto section"
```

---

## Task 8: Skills section

**Files:**
- Modify: `style.css` (append skills styles)

- [ ] **Step 1: Append skills styles to style.css**

```css
/* ============================================================
   SKILLS
   ============================================================ */
.skill-block { display: flex; gap: clamp(1.5rem, 4vw, 3rem); align-items: start; padding: 1.8rem 0; border-bottom: 1px solid var(--line); }
.skill-block:first-of-type { border-top: 1px solid var(--line); }
.skill-block > div:first-child { flex: 0 0 200px; }
.sb-num { font-family: var(--mono); font-size: 0.6rem; color: var(--fg-2); letter-spacing: 0.08em; display: block; margin-bottom: 0.5rem; }
.sb-title { font-family: var(--sans); font-size: 1rem; font-weight: 700; color: var(--accent); letter-spacing: -0.01em; }
.tags { display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.3rem; }
@media (max-width: 600px) { .skill-block { flex-direction: column; gap: 1rem; } .skill-block > div:first-child { flex: none; } }
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle skills section"
```

---

## Task 9: Projects — Looked featured + AkademikChatbot elevated

**Files:**
- Modify: `index.html` (projects section restructure)
- Modify: `style.css` (append project styles)

AkademikChatbot moves from the regular 2×2 grid to its own featured row between Looked and the remaining grid.

- [ ] **Step 1: Update projects HTML in index.html**

Replace the entire `<!-- ============ PROJECTS ============ -->` section with:

```html
<!-- ============ PROJECTS ============ -->
<section class="section section--alt" id="projects">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="idx mono" data-i18n="proj.idx">04</span>
      <h2 data-i18n="proj.title">Projects</h2>
      <span class="rule"></span>
    </div>

    <!-- Featured: Looked -->
    <article class="featured reveal">
      <div class="f-copy">
        <span class="f-tag"><span class="status-dot"></span><span data-i18n="proj.featured.tag">Featured product</span></span>
        <h3 data-i18n="proj.featured.name">Looked</h3>
        <p data-i18n="proj.featured.desc">AI-powered personal style assistant. Upload a photo, get instant outfit feedback; add your wardrobe and discover combinations the AI — or you — create. Built with React Native, Firebase, and Google Sign-In.</p>
        <div class="f-meta">
          <span class="tag">React Native</span><span class="tag">AI Styling</span><span class="tag">Firebase</span>
        </div>
        <div class="f-cta-row">
          <a href="https://play.google.com/store/apps/details?id=com.egebo.looked&pcampaignid=web_share" target="_blank" rel="noopener" class="btn btn--accent"><span data-i18n="proj.featured.cta">Google Play</span><span class="arr">→</span></a>
          <a href="https://apps.apple.com/us/app/looked-dijital-stil-asistan%C4%B1/id6776430564" target="_blank" rel="noopener" class="btn btn--ghost">App Store<span class="arr">→</span></a>
          <a href="projects/looked.html" class="btn btn--ghost">Case study <span class="arr">→</span></a>
        </div>
      </div>
      <div class="f-visual">
        <img src="looked_ss/play_1.png" alt="Looked AI stylist screen" class="f-shot" style="object-position:center 48%">
        <img src="looked_ss/play_2.png" alt="Looked style analysis screen" class="f-shot" style="object-position:center 42%">
      </div>
    </article>

    <!-- Elevated: AkademikChatbot -->
    <article class="elevated reveal">
      <div class="el-copy">
        <div class="el-meta">
          <span class="tag">Python · RAG</span>
          <span class="el-badge" data-i18n="proj.status.done">Completed · Graduation Project</span>
        </div>
        <h3 data-i18n="proj.1.name">AkademikChatbot</h3>
        <p data-i18n="proj.1.desc">Education-focused RAG-based academic advisor. An intent-routing engine directs each query to SQL, vector search, or web crawl. Built with GPT-4o-mini, ChromaDB, and LangChain. Technically the most complex project in this portfolio.</p>
        <div class="el-stack">
          <span class="tag">GPT-4o-mini</span><span class="tag">ChromaDB</span><span class="tag">LangChain</span><span class="tag">FastAPI</span><span class="tag">RAG</span>
        </div>
        <a href="projects/rag.html" class="btn btn--ghost" style="margin-top:0.5rem;">View project <span class="arr">→</span></a>
      </div>
      <div class="el-visual">
        <div class="el-arch">
          <div class="arch-node">Query</div>
          <div class="arch-arr">→</div>
          <div class="arch-node arch-node--accent">Intent Router</div>
          <div class="arch-arr">→</div>
          <div class="arch-node">SQL / Vector / Web</div>
        </div>
        <p class="el-caption mono">Intent-routing architecture</p>
      </div>
    </article>

    <!-- Regular grid: Optura, Jarvis, Poco Loco -->
    <div class="proj-grid">
      <article class="proj-card reveal" onclick="location.href='projects/optura.html'" style="cursor:pointer">
        <div class="proj-thumb has-thumb">
          <img src="looked_ss/optura_1.png" alt="Optura app screen" class="thumb-img" style="object-fit:cover;object-position:center top">
          <span class="live status" data-i18n="proj.status.progress">In progress</span>
        </div>
        <div class="proj-body">
          <div class="proj-meta"><span class="proj-num">01</span><span class="proj-type-tag" data-i18n="proj.3.type">Mobile · AI</span></div>
          <h4><span data-i18n="proj.3.name">Optura</span><span class="pa">↗</span></h4>
          <p data-i18n="proj.3.desc">Scans grocery receipts to track household inventory and predicts expiry dates — alerting you before food goes bad.</p>
          <div class="pstack"><span class="tag">Flutter</span><span class="tag">OCR</span><span class="tag">AI</span></div>
        </div>
      </article>
      <article class="proj-card reveal" data-d="1" onclick="location.href='projects/jarvis.html'" style="cursor:pointer">
        <div class="proj-thumb proj-thumb--voice">
          <span class="live status" data-i18n="proj.status.progress">In progress</span>
        </div>
        <div class="proj-body">
          <div class="proj-meta"><span class="proj-num">02</span><span class="proj-type-tag" data-i18n="proj.4.type">AI · Voice</span></div>
          <h4><span data-i18n="proj.4.name">Jarvis</span><span class="pa">↗</span></h4>
          <p data-i18n="proj.4.desc">Iron Man-inspired voice assistant. Whisper → speech-to-text, Gemini function-calling → reasoning, TTS → response. Cross-platform: Windows + React Native.</p>
          <div class="pstack"><span class="tag">Python</span><span class="tag">Whisper</span><span class="tag">Gemini</span></div>
        </div>
      </article>
      <article class="proj-card reveal" data-d="2" onclick="location.href='projects/poco-loco.html'" style="cursor:pointer">
        <div class="proj-thumb has-thumb">
          <img src="looked_ss/poco_loco_logo.jpg" alt="Poco Loco logo" class="thumb-img" style="object-fit:contain;background:var(--bg-2);padding:10%;">
          <span class="live"><span class="ld"></span><span data-i18n="proj.live">Live</span></span>
        </div>
        <div class="proj-body">
          <div class="proj-meta"><span class="proj-num">03</span><span class="proj-type-tag" data-i18n="proj.2.type">Web · E-Commerce</span></div>
          <h4><span data-i18n="proj.2.name">Poco Loco</span><span class="pa">↗</span></h4>
          <p data-i18n="proj.2.desc">Full e-commerce site for a bag brand — product catalog, cart, wishlist, auth. Designed and built end-to-end.</p>
          <div class="pstack"><span class="tag">Web</span><span class="tag">E-Commerce</span><span class="tag">UI/UX</span></div>
          <a href="https://poco--loco.com" target="_blank" rel="noopener" class="proj-live-btn" onclick="event.stopPropagation()">Visit site ↗</a>
        </div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append project styles to style.css**

```css
/* ============================================================
   PROJECTS: FEATURED (Looked)
   ============================================================ */
.featured { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.2rem; background: var(--bg); }
.f-copy { padding: clamp(2rem, 4vw, 3rem); display: flex; flex-direction: column; justify-content: center; gap: 1rem; border-right: 1px solid var(--line); }
.f-tag { font-family: var(--mono); font-size: 0.62rem; color: var(--accent); letter-spacing: 0.10em; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; }
.f-copy h3 { font-family: var(--sans); font-size: clamp(1.6rem, 3.2vw, 2.4rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
.f-copy p { font-size: 0.95rem; color: var(--fg-2); line-height: 1.7; }
.f-meta { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.f-cta-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.4rem; }
.f-visual { min-height: 280px; overflow: hidden; display: flex; align-items: stretch; gap: 1px; background: var(--bg-3); }
.f-visual .f-shot { flex: 1; width: auto; height: 100%; object-fit: cover; object-position: center 35%; }

/* ============================================================
   PROJECTS: ELEVATED (AkademikChatbot)
   ============================================================ */
.elevated { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.2rem; background: var(--accent-tint); gap: 0; }
.el-copy { padding: clamp(2rem, 4vw, 2.8rem); display: flex; flex-direction: column; gap: 1rem; border-right: 1px solid var(--line); }
.el-meta { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.el-badge { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.08em; color: var(--accent); text-transform: uppercase; }
.el-copy h3 { font-family: var(--sans); font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
.el-copy p { font-size: 0.93rem; color: var(--fg-2); line-height: 1.7; }
.el-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.el-visual { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 2rem; background: var(--bg); }
.el-arch { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
.arch-node { font-family: var(--mono); font-size: 0.65rem; padding: 0.4rem 0.8rem; border: 1px solid var(--line); border-radius: var(--radius); background: var(--bg-2); color: var(--fg); letter-spacing: 0.04em; }
.arch-node--accent { border-color: var(--accent); color: var(--accent); background: var(--accent-tint); }
.arch-arr { color: var(--fg-2); font-size: 0.8rem; }
.el-caption { font-size: 0.6rem; color: var(--fg-2); text-align: center; }

/* ============================================================
   PROJECTS: GRID
   ============================================================ */
.proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; }
.proj-card { background: var(--bg); display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: background 0.2s; cursor: pointer; }
.proj-card:hover { background: var(--bg-2); }
.proj-thumb { aspect-ratio: 4/3; background: var(--bg-2); position: relative; overflow: hidden; display: grid; place-items: center; }
.proj-thumb--voice { background: var(--bg-2); }
.proj-thumb--voice::after { content: "STT→LLM→TTS"; font-family: var(--mono); font-size: 0.75rem; font-weight: 700; color: var(--accent); opacity: 0.3; letter-spacing: 0.08em; }
.has-thumb .thumb-img { width: 100%; height: 100%; display: block; }
.proj-body { padding: 1.2rem 1.4rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.proj-meta { display: flex; align-items: center; justify-content: space-between; }
.proj-num { font-family: var(--mono); font-size: 0.58rem; color: var(--accent); letter-spacing: 0.08em; }
.proj-type-tag { font-family: var(--mono); font-size: 0.58rem; color: var(--fg-2); letter-spacing: 0.08em; }
.proj-body h4 { font-family: var(--sans); font-size: 1rem; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.4rem; }
.proj-body .pa { color: var(--accent); font-size: 0.8em; }
.proj-body p { font-size: 0.84rem; color: var(--fg-2); line-height: 1.6; flex: 1; }
.proj-body .pstack { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.proj-live-btn { display: inline-flex; align-items: center; gap: 0.3rem; font-family: var(--mono); font-size: 0.62rem; color: var(--accent); margin-top: 0.5rem; transition: opacity 0.2s; }
.proj-live-btn:hover { opacity: 0.7; }

/* Live badges */
.live { position: absolute; bottom: 0.7rem; left: 0.7rem; font-family: var(--mono); font-size: 0.58rem; background: var(--bg); border: 1px solid var(--line); color: var(--fg-2); padding: 0.22rem 0.5rem; display: flex; align-items: center; gap: 0.35rem; letter-spacing: 0.06em; z-index: 2; border-radius: var(--radius); }
.live .ld { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; flex-shrink: 0; }
.live.status { color: var(--fg-2); }

@media (max-width: 900px) {
  .featured { grid-template-columns: 1fr; }
  .featured .f-copy { border-right: none; border-bottom: 1px solid var(--line); }
  .featured .f-visual { order: -1; min-height: 180px; }
  .elevated { grid-template-columns: 1fr; }
  .elevated .el-copy { border-right: none; border-bottom: 1px solid var(--line); }
  .proj-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .proj-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify in browser**

Projects section shows: Looked (large featured), AkademikChatbot (elevated with arch diagram), then 3-col grid with Optura/Jarvis/Poco Loco.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: elevate AkademikChatbot, new projects section layout"
```

---

## Task 10: Achievements section

**Files:**
- Modify: `style.css` (append achievements styles)

- [ ] **Step 1: Append achievements styles to style.css**

```css
/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
.ach-grid { display: flex; flex-direction: column; border-top: 1px solid var(--line); }
.ach-card { display: grid; grid-template-columns: 72px 1fr 2fr; gap: 1.5rem; align-items: start; padding: 1.8rem 0; border-bottom: 1px solid var(--line); transition: background 0.2s; border-radius: 0; }
.ach-card:hover { background: var(--bg-2); padding-inline: 1rem; margin-inline: -1rem; border-radius: var(--radius); }
.ach-year { font-family: var(--mono); font-size: 0.62rem; color: var(--fg-2); padding-top: 0.2rem; }
.ach-medal { font-family: var(--sans); font-size: 1.3rem; font-weight: 800; color: var(--accent); letter-spacing: -0.03em; line-height: 1; }
.ach-medal .sm { font-size: 0.45em; color: var(--fg-2); margin-left: 0.3em; font-weight: 500; }
.ach-card h3 { font-family: var(--sans); font-size: 0.95rem; font-weight: 700; margin-top: 0.4rem; letter-spacing: -0.01em; }
.ach-card p { font-size: 0.88rem; color: var(--fg-2); line-height: 1.65; padding-top: 0.2rem; }
@media (max-width: 720px) {
  .ach-card { grid-template-columns: 48px 1fr; }
  .ach-card p { grid-column: 1 / -1; }
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle achievements section"
```

---

## Task 11: Experience section

**Files:**
- Modify: `style.css` (append timeline styles)

- [ ] **Step 1: Append timeline styles to style.css**

```css
/* ============================================================
   EXPERIENCE / TIMELINE
   ============================================================ */
.timeline { display: flex; flex-direction: column; border-left: 2px solid var(--line); margin-left: 6px; }
.tl-item { display: flex; gap: 1.8rem; padding: 0 0 2.6rem 2.2rem; position: relative; }
.tl-item::before { content: ""; position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; background: var(--accent); border-radius: 50%; border: 2px solid var(--bg); }
.tl-when { font-family: var(--mono); font-size: 0.62rem; color: var(--accent); letter-spacing: 0.06em; flex-shrink: 0; padding-top: 0.2rem; min-width: 110px; }
.tl-body { flex: 1; }
.tl-kind { font-family: var(--mono); font-size: 0.58rem; color: var(--fg-2); text-transform: uppercase; letter-spacing: 0.12em; display: inline-block; margin-bottom: 0.4rem; }
.tl-body .role { font-family: var(--sans); font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem; letter-spacing: -0.01em; }
.tl-body .org { font-size: 0.82rem; color: var(--accent); margin-bottom: 0.5rem; font-weight: 500; }
.tl-body .desc { font-size: 0.88rem; color: var(--fg-2); line-height: 1.65; }
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle experience timeline"
```

---

## Task 12: Contact + Footer

**Files:**
- Modify: `style.css` (append contact + footer styles)

- [ ] **Step 1: Append contact and footer styles to style.css**

```css
/* ============================================================
   CONTACT
   ============================================================ */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.social-list { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: var(--radius-lg); overflow: hidden; }
.social { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.3rem; border-bottom: 1px solid var(--line); text-decoration: none; color: var(--fg); font-size: 0.88rem; background: none; cursor: pointer; transition: background 0.15s; width: 100%; text-align: left; }
.social:last-child { border-bottom: none; }
.social:hover { background: var(--bg-2); color: var(--accent); }
.social .s-left { display: flex; align-items: center; gap: 0.9rem; }
.social .s-ic { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: var(--bg-2); border: 1px solid var(--line); font-size: 0.65rem; color: var(--fg-2); flex-shrink: 0; border-radius: var(--radius); font-family: var(--mono); }
.social .s-name { font-size: 0.82rem; font-weight: 600; display: block; }
.social .s-handle { font-size: 0.72rem; color: var(--fg-2); }
.social .s-arr { color: var(--accent); transition: transform 0.2s var(--ease); }
.social:hover .s-arr { transform: translateX(4px) translateY(-4px); }

/* Form */
.form { display: flex; flex-direction: column; gap: 0.8rem; }
.form-fields { display: flex; flex-direction: column; gap: 0.8rem; }
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field label { font-size: 0.75rem; font-weight: 600; color: var(--fg-2); letter-spacing: 0.02em; }
.field input, .field textarea { background: var(--bg); border: 1.5px solid var(--line); border-radius: var(--radius); color: var(--fg); padding: 0.75rem 1rem; font-size: 0.9rem; font-family: var(--sans); transition: border-color 0.2s; }
.field input:focus, .field textarea:focus { outline: none; border-color: var(--accent); }
.field input::placeholder, .field textarea::placeholder { color: var(--fg-2); opacity: 0.5; }
.field textarea { resize: vertical; min-height: 100px; }
.form-error-msg { font-family: var(--mono); font-size: 0.7rem; color: #dc2626; display: none; }
.form-error-msg.show { display: block; }
.form-success { display: none; flex-direction: column; align-items: center; gap: 0.8rem; padding: 3rem; border: 1.5px solid var(--line); border-radius: var(--radius-lg); text-align: center; }
.form-success.show { display: flex; }
.form-success .check { font-size: 2rem; color: #22c55e; }
.form-success h3 { font-size: 1.1rem; font-weight: 700; }

@media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr; } }

/* ============================================================
   FOOTER
   ============================================================ */
.footer { border-top: 1px solid var(--line); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; padding-block: 1.6rem; font-size: 0.78rem; color: var(--fg-2); }
.f-brand { color: var(--fg); font-weight: 700; font-size: 0.9rem; letter-spacing: -0.01em; }
.to-top { color: var(--fg-2); transition: color 0.15s; }
.to-top:hover { color: var(--accent); }
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: restyle contact and footer"
```

---

## Task 13: English strings — make English the default language

**Files:**
- Modify: `strings.js`

- [ ] **Step 1: Change default language in strings.js**

Find the line that sets the initial language (likely `setLang('tr')` or `window.currentLang = 'tr'` near the bottom of `strings.js`). Change `'tr'` to `'en'`.

Also find the lang-toggle init logic that marks TR as `.on` — it now needs to mark EN as `.on` by default. This matches the HTML already changed in Task 3.

- [ ] **Step 2: Update English hero strings in strings.js**

Find the `en:` object in strings.js. Update these keys:

```js
'hero.eyebrow': 'React Native & AI Developer · Available for freelance',
'hero.h1': 'I build mobile apps<br><span class="accent">people actually use.</span>',
'hero.sub': "React Native developer based in Turkey. I've shipped 4 apps to the Play Store and App Store, built AI-powered systems, and I'm open to new projects.",
'hero.cta1': 'See my work',
'hero.cta2': 'Get in touch',
'hero.caption': '4 apps live on Play Store · Open to projects',
'nav.about': 'About',
'nav.skills': 'Skills',
'nav.work': 'Awards',
'nav.projects': 'Projects',
'nav.path': 'Experience',
'nav.cta': 'Get in touch',
'proj.featured.tag': 'Featured product',
'proj.featured.name': 'Looked',
'proj.1.name': 'AkademikChatbot',
'proj.status.done': 'Completed',
'proj.status.progress': 'In progress',
'proj.live': 'Live',
```

- [ ] **Step 3: Verify TR/EN toggle works**

Open in browser. Default language should be English. Click TR — page switches to Turkish. Click EN — back to English.

- [ ] **Step 4: Commit**

```bash
git add strings.js
git commit -m "feat: English as primary language"
```

---

## Task 14: Cache bust + final check

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update cache-bust version**

In `index.html`, change all `?v=26` references to `?v=27`:
- `href="style.css?v=26"` → `href="style.css?v=27"`
- `src="strings.js?v=26"` → `src="strings.js?v=27"`
- `src="script.js?v=26"` → `src="script.js?v=27"`

- [ ] **Step 2: Full visual review**

Open `index.html` in browser. Check:
- [ ] Desktop: hero photo visible, large headline, nav clean
- [ ] Mobile (480px): hamburger works, sections stack, photo smaller
- [ ] Projects: Looked featured, AkademikChatbot elevated, 3 cards in grid
- [ ] Contact form: send a test message — confirm EmailJS still works
- [ ] Language toggle: EN default, TR switch works
- [ ] No console errors

- [ ] **Step 3: Commit and push**

```bash
git add index.html
git commit -m "chore: bump asset cache version to v27"
git push
```

---

## Self-Review Notes

- **Spec coverage:** All 9 page sections implemented. Manifesto removed. Hamburger added. AkademikChatbot elevated. English primary. Photo in hero. ✓
- **Placeholders:** None — all CSS values, HTML, and JS are explicit. ✓
- **Type consistency:** No shared function interfaces across tasks — each task is self-contained HTML/CSS/JS. ✓
- **Known decision left open in spec:** Hero canvas animation removed per spec ("add back only if it fits new aesthetic") — decision: removed. ✓

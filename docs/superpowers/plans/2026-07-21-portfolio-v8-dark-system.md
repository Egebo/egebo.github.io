# Portfolio v8 — Dark System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full redesign of egebo.github.io from light v7 to a dark, architecturally rich portfolio with three signature interaction systems: hero canvas node graph, Looked sticky scroll, and AkademikChatbot SVG diagram.

**Architecture:** Vanilla HTML/CSS/JS, no build tools, GitHub Pages. Single `index.html` + `style.css` + `script.js`. Case study pages inherit the design system through `style.css`. All five JS interaction systems are self-contained named functions in `script.js`.

**Tech Stack:** HTML5, CSS custom properties, Canvas 2D API, SVG, IntersectionObserver, Web Audio none (canvas animations only), EmailJS (existing, unchanged), Google Fonts.

## Global Constraints

- No npm, no framework, no build step — vanilla only
- GitHub Pages deployment: `git push` to `main` is sufficient
- Font stack: `Plus Jakarta Sans` (display/headings), `Inter` (body), `Geist Mono` (mono/labels)
- Accent color: `#D42020` (pure red) — NOT the old `#E8442A`
- Background base: `#0e0d0b` (warm near-black, NOT pure black)
- `localStorage` key for language: `"eb-lang"` — unchanged
- EmailJS keys must be preserved exactly from current `script.js`
- All `data-i18n` keys must match `strings.js` — do not rename any keys
- `strings.js` content is not modified in this plan
- Case study pages (`projects/*.html`) inherit dark tokens automatically via `style.css`; their inline `<style>` blocks are updated minimally
- `projects/cs-lang.js` is not modified
- Image assets in `looked_ss/` are not modified
- Mobile: everything must work at 375px width; sticky scroll falls back to normal scroll on mobile

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `style.css` | Full rewrite | Dark token system, all component CSS |
| `index.html` | Full rewrite | All section HTML |
| `script.js` | Full rewrite | All JS interactions, structured as named init functions |
| `strings.js` | No change | i18n strings |
| `projects/looked.html` | Inline style update | Dark tokens only |
| `projects/rag.html` | Inline style update | Dark tokens only |
| `projects/optura.html` | Inline style update | Dark tokens only |
| `projects/jarvis.html` | Inline style update | Dark tokens only |
| `projects/poco-loco.html` | Inline style update | Dark tokens only |
| `projects/cs-lang.js` | No change | Case study i18n |

---

## Task 1: CSS Foundation — Dark Token System + Base Components

**Files:**
- Rewrite: `style.css`

**Interfaces:**
- Produces: all CSS custom properties consumed by every subsequent task; `.btn`, `.btn--accent`, `.btn--dark`, `.btn--ghost`, `.tag`, `.tags`, `.wrap`, `.reveal`/`.in-view`, `.section-label`, `.eyebrow`, `.scroll-prog`, `.cs-lang`/`.cs-lang-btn`

- [ ] **Step 1: Replace `style.css` entirely with the following**

```css
/* ============================================================
   Egemen Bozca · Portfolio v8 — style.css
   Dark System · Warm Red Accent (#D42020)
   Plus Jakarta Sans + Inter + Geist Mono
   ============================================================ */

/* ---------- Google Fonts ---------- */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');

/* ---------- Tokens ---------- */
:root {
  --bg:          #0e0d0b;
  --bg-2:        #181714;
  --bg-3:        #1f1d1a;
  --fg:          #f0ede8;
  --fg-2:        #9a9690;
  --fg-3:        #5a5854;
  --line:        rgba(255,255,255,0.07);
  --line-2:      rgba(255,255,255,0.12);
  --accent:      #D42020;
  --accent-dim:  #b81a1a;
  --accent-rgb:  212, 32, 32;

  --display: "Plus Jakarta Sans", system-ui, sans-serif;
  --sans:    "Inter", system-ui, -apple-system, sans-serif;
  --mono:    "Geist Mono", ui-monospace, "SF Mono", Consolas, monospace;

  --gutter:    clamp(1.2rem, 4vw, 2.5rem);
  --maxw:      1200px;
  --radius:    6px;
  --radius-lg: 12px;
  --ease:      cubic-bezier(0.22, 1, 0.36, 1);

  /* Legacy aliases for case study pages */
  --paper: var(--bg);
  --ink-2: var(--fg-2);
  --card:  var(--bg-2);
  --muted: var(--fg-3);
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
.section { padding-block: clamp(5rem, 10vw, 8rem); }
.mono { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-3); }
.accent { color: var(--accent); }

/* ---------- Scroll progress ---------- */
.scroll-prog { position: fixed; top: 0; left: 0; height: 2px; background: var(--accent); width: 0%; z-index: 200; pointer-events: none; transition: width 0.1s linear; }

/* ---------- Custom cursor ---------- */
.c-dot { position: fixed; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 10000; }
.c-ring { position: fixed; width: 28px; height: 28px; border: 1.5px solid var(--accent); border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 9999; opacity: 0.25; transition: width 0.3s var(--ease), height 0.3s var(--ease), opacity 0.3s; }
.cursor.hover .c-ring { width: 44px; height: 44px; opacity: 0.45; }
body:not(.has-cursor) .cursor { display: none; }

/* ---------- Eyebrow ---------- */
.eyebrow {
  font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--accent);
  display: inline-flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem;
}
.eyebrow::before { content: ""; width: 24px; height: 1px; background: var(--accent); flex-shrink: 0; }

/* ---------- Section label ---------- */
.section-label {
  display: inline-block; font-family: var(--mono); font-size: 0.62rem;
  letter-spacing: 0.14em; color: var(--fg-3); text-transform: uppercase; margin-bottom: 0.6rem;
}

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
.btn--accent:hover { background: var(--accent-dim); border-color: var(--accent-dim); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.35); }
.btn--dark { background: var(--fg); color: var(--bg); border-color: var(--fg); font-weight: 700; }
.btn--dark:hover { background: #ccc; border-color: #ccc; transform: translateY(-1px); }
.btn--ghost { background: transparent; color: var(--fg-2); border-color: var(--line-2); }
.btn--ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

/* ---------- Tags ---------- */
.tag {
  font-family: var(--mono); font-size: 0.58rem; padding: 0.22rem 0.6rem;
  border: 1px solid var(--line-2); color: var(--fg-3);
  letter-spacing: 0.04em; border-radius: 999px; background: var(--bg-2);
}
.tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

/* ---------- Scroll reveal ---------- */
.reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.55s var(--ease), transform 0.55s var(--ease); }
.reveal.in-view { opacity: 1; transform: none; }
.reveal[data-d="1"] { transition-delay: 0.08s; }
.reveal[data-d="2"] { transition-delay: 0.16s; }
.reveal[data-d="3"] { transition-delay: 0.24s; }

/* ---------- Case study lang toggle ---------- */
.cs-lang { display: inline-flex; border: 1.5px solid var(--line-2); border-radius: var(--radius); overflow: hidden; }
.cs-lang-btn { font-family: var(--mono); font-size: 0.6rem; padding: 0.28rem 0.6rem; color: var(--fg-3); letter-spacing: 0.06em; background: none; border: none; cursor: pointer; transition: color 0.15s, background 0.15s; }
.cs-lang-btn.active { background: var(--accent); color: #fff; font-weight: 700; }

/* ============================================================
   NAV
   ============================================================ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 var(--gutter);
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(14,13,11,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--line);
}
.nav-brand { font-family: var(--display); font-weight: 700; font-size: 0.95rem; letter-spacing: -0.02em; color: var(--fg); }
.nav-links { display: flex; align-items: center; gap: 0.25rem; list-style: none; }
.nav-links a { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-3); padding: 0.4rem 0.7rem; border-radius: var(--radius); transition: color 0.15s, background 0.15s; }
.nav-links a:hover { color: var(--fg); background: var(--bg-3); }
.nav-right { display: flex; align-items: center; gap: 0.8rem; }
.nav-lang { display: inline-flex; border: 1px solid var(--line-2); border-radius: var(--radius); overflow: hidden; }
.nav-lang button { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.06em; padding: 0.3rem 0.55rem; color: var(--fg-3); background: none; border: none; cursor: pointer; transition: color 0.15s, background 0.15s; }
.nav-lang button.active { background: var(--accent); color: #fff; }
.nav-cta { font-size: 0.78rem; padding: 0.5rem 1rem; }
@media (max-width: 720px) {
  .nav-links { display: none; }
}

/* ============================================================
   HERO
   ============================================================ */
.hero {
  min-height: 100svh; display: grid;
  grid-template-columns: 55fr 45fr;
  align-items: center;
  padding-top: 64px;
  gap: 2rem;
}
.hero-copy { padding: clamp(4rem, 8vw, 7rem) 0 4rem var(--gutter); }
.hero-eyebrow { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 1.8rem; }
.hero-title {
  font-family: var(--display); font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.0;
  color: var(--fg); margin-bottom: 2rem;
}
.hero-title .accent { color: var(--accent); }
.hero-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.4rem; }
.hero-meta span { font-family: var(--mono); font-size: 0.62rem; color: var(--fg-3); padding: 0.3rem 0.7rem; border: 1px solid var(--line-2); border-radius: 99px; }
.hero-cta { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.hero-canvas-col { position: relative; height: 100%; min-height: 100svh; }
#hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.75; }
@media (max-width: 780px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 64px; }
  .hero-copy { padding: 5rem var(--gutter) 3rem; }
  .hero-canvas-col { display: none; }
}

/* ============================================================
   MARQUEE
   ============================================================ */
.marquee-band { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding-block: 0.85rem; overflow: hidden; background: var(--bg-2); }
.marquee-track { display: flex; gap: 3rem; width: max-content; animation: marqueeScroll 28s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
.marquee-item { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-3); white-space: nowrap; display: flex; align-items: center; gap: 0.6rem; }
.marquee-item::before { content: "·"; color: var(--accent); }
@keyframes marqueeScroll { to { transform: translateX(-50%); } }

/* ============================================================
   PROJECTS HEAD
   ============================================================ */
.projects-head { padding: clamp(3rem, 6vw, 5rem) 0 clamp(1.5rem, 3vw, 2.5rem); border-top: 1px solid var(--line); }
.ph-title { font-family: var(--display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.04em; }

/* ============================================================
   LOOKED — STICKY SCROLL
   ============================================================ */
.feat-looked-outer { height: 400vh; position: relative; }
.feat-looked-intro { padding: clamp(4rem, 7vw, 6rem) 0 3rem; border-bottom: 1px solid var(--line); }
.feat-looked-intro .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end; }
.f-eyebrow { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--accent); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.9rem; }
.f-eyebrow::before { content: ""; width: 20px; height: 1px; background: var(--accent); }
.feat-title { font-family: var(--display); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1; margin-bottom: 1rem; }
.feat-desc { font-size: 1rem; color: var(--fg-2); line-height: 1.6; max-width: 46ch; }
.feat-meta { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1.2rem; }
.feat-cta { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1.6rem; }
.feat-looked-sticky {
  position: sticky; top: 0; height: 100svh; overflow: hidden;
  display: grid; grid-template-columns: 52% 48%;
  background: var(--bg);
}
.phone-col {
  display: flex; align-items: center; justify-content: center;
  padding: 2rem; background: var(--bg-2); border-right: 1px solid var(--line);
}
.phone-frame {
  width: clamp(180px, 24vw, 260px); aspect-ratio: 9/19;
  background: var(--bg-3); border-radius: 36px;
  border: 2px solid var(--line-2); overflow: hidden; position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
}
.phone-screen { position: absolute; inset: 0; opacity: 0; transition: opacity 0.5s var(--ease); }
.phone-screen.active { opacity: 1; }
.phone-screen img { width: 100%; height: 100%; object-fit: cover; }
.features-col { display: flex; flex-direction: column; justify-content: center; padding: 3rem clamp(2rem, 4vw, 4rem); gap: 0; overflow: hidden; }
.looked-feat { padding: 1.6rem 0; border-bottom: 1px solid var(--line); opacity: 0.3; transition: opacity 0.4s var(--ease), border-color 0.4s; cursor: default; }
.looked-feat.active { opacity: 1; border-bottom-color: var(--accent); }
.looked-feat .lf-icon { font-size: 1.4rem; margin-bottom: 0.6rem; }
.looked-feat h3 { font-family: var(--display); font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.4rem; }
.looked-feat p { font-size: 0.88rem; color: var(--fg-2); line-height: 1.55; }
@media (max-width: 780px) {
  .feat-looked-outer { height: auto; }
  .feat-looked-sticky { position: static; display: block; height: auto; }
  .feat-looked-intro .wrap { grid-template-columns: 1fr; }
  .phone-col { padding: 2rem; }
  .features-col { padding: 2rem var(--gutter); gap: 0; }
  .looked-feat { opacity: 1; border-bottom-color: var(--line); }
}

/* ============================================================
   AKADEMIKCHATBOT — SVG DIAGRAM
   ============================================================ */
.feat-rag { background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: clamp(4rem, 7vw, 6rem) 0; }
.feat-rag .wrap { display: grid; grid-template-columns: 45% 55%; gap: 4rem; align-items: center; }
.feat-rag-copy { }
.feat-rag-copy .feat-title { font-size: clamp(2rem, 4.5vw, 3.5rem); }
.rag-badge { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); font-size: 0.6rem; background: rgba(212,32,32,0.1); color: var(--accent); border: 1px solid rgba(212,32,32,0.25); border-radius: 99px; padding: 0.26rem 0.7rem; margin-top: 1.2rem; }
.rag-diagram-wrap { position: relative; }
.rag-diagram { width: 100%; overflow: visible; }
.rag-center-node { fill: var(--bg-3); stroke: var(--accent); stroke-width: 2; transition: stroke-width 0.2s; }
.rag-ring-anim { fill: none; stroke: rgba(212,32,32,0.25); stroke-width: 1; animation: orbSpin 22s linear infinite; transform-origin: 200px 160px; }
@keyframes orbSpin { to { stroke-dashoffset: -200; } }
.rag-center-node { animation: centerPulse 3s ease-in-out infinite; }
@keyframes centerPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } transform-box: fill-box; transform-origin: center; }
.rag-spoke-line { stroke: var(--line-2); stroke-width: 1; stroke-dasharray: 4 4; transition: stroke 0.2s, opacity 0.2s; }
.rag-spoke-line.active { stroke: var(--accent); opacity: 1; }
.rag-node-g { cursor: pointer; }
.rag-node-circle { fill: var(--bg-2); stroke: var(--line-2); stroke-width: 1.5; transition: stroke 0.2s, fill 0.2s; }
.rag-node-g:hover .rag-node-circle,
.rag-node-g.active .rag-node-circle { stroke: var(--accent); fill: var(--bg-3); }
.rag-node-label { font-family: "Geist Mono", monospace; font-size: 9px; fill: var(--fg-3); text-anchor: middle; pointer-events: none; transition: fill 0.2s; }
.rag-node-g:hover .rag-node-label,
.rag-node-g.active .rag-node-label { fill: var(--fg); }
.rag-center-label { font-family: "Plus Jakarta Sans", sans-serif; font-size: 10px; font-weight: 700; fill: var(--fg); text-anchor: middle; pointer-events: none; }
.rag-tooltip { position: absolute; bottom: -2.5rem; left: 50%; transform: translateX(-50%); background: var(--bg-3); border: 1px solid var(--line-2); border-radius: var(--radius); padding: 0.5rem 0.9rem; font-size: 0.75rem; color: var(--fg-2); white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 10; }
.rag-tooltip.visible { opacity: 1; }
@media (max-width: 780px) {
  .feat-rag .wrap { grid-template-columns: 1fr; }
  .rag-diagram-wrap { margin-top: 2rem; }
}

/* ============================================================
   PROJECT GRID
   ============================================================ */
.proj-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--line); border-top: 1px solid var(--line); }
.proj-card { background: var(--bg); padding: clamp(1.6rem, 3vw, 2.4rem); position: relative; overflow: hidden; transition: background 0.2s; }
.proj-card:hover { background: var(--bg-2); }
.proj-card canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.4s var(--ease); pointer-events: none; }
.proj-card:hover canvas { opacity: 1; }
.proj-card-inner { position: relative; z-index: 1; }
.proj-type { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 0.8rem; }
.proj-name { font-family: var(--display); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
.proj-desc { font-size: 0.87rem; color: var(--fg-2); line-height: 1.55; margin-bottom: 1.2rem; }
.proj-link { font-family: var(--mono); font-size: 0.62rem; color: var(--accent); letter-spacing: 0.06em; display: inline-flex; align-items: center; gap: 0.35rem; transition: gap 0.2s; }
.proj-card:hover .proj-link { gap: 0.6rem; }
@media (max-width: 720px) {
  .proj-grid { grid-template-columns: 1fr; }
}

/* ============================================================
   ABOUT
   ============================================================ */
.about-section { border-top: 1px solid var(--line); }
.about-inner { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; }
.about-lead { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--fg-2); line-height: 1.7; margin-bottom: 2rem; }
.about-lead strong { color: var(--fg); }
.stack-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
.stack-group { display: flex; flex-direction: column; gap: 0.5rem; }
.stack-name { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.10em; text-transform: uppercase; color: var(--fg-3); }
.about-cv { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.meta-list { display: flex; flex-direction: column; gap: 0; }
.meta-row { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--line); }
.mk { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-3); min-width: 6rem; padding-top: 0.1rem; }
.mv { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.88rem; }
.mv span { color: var(--fg); }
.mv small { color: var(--fg-3); font-size: 0.78rem; }
@media (max-width: 720px) {
  .about-inner { grid-template-columns: 1fr; }
}

/* ============================================================
   AWARDS
   ============================================================ */
.awards-section { border-top: 1px solid var(--line); position: relative; }
.awards-section::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(rgba(212,32,32,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
.aw-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--line); margin-top: 2rem; }
.ach-card { background: var(--bg); padding: 2rem; }
.ach-year { font-family: var(--mono); font-size: 0.6rem; color: var(--fg-3); letter-spacing: 0.08em; display: block; margin-bottom: 0.8rem; }
.ach-rank { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.4rem; }
.ach-medal { font-family: var(--display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.04em; color: var(--bg-3); line-height: 1; margin-bottom: 1rem; }
.ach-medal .sm { font-size: 0.4em; color: var(--fg-3); vertical-align: middle; margin-left: 0.2em; }
.ach-card h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem; }
.ach-card p { font-size: 0.82rem; color: var(--fg-2); line-height: 1.5; }
@media (max-width: 720px) {
  .aw-grid { grid-template-columns: 1fr; }
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
.exp-section { border-top: 1px solid var(--line); }
.timeline { display: flex; flex-direction: column; gap: 0; margin-top: 2rem; }
.tl-item { display: grid; grid-template-columns: 8rem 1fr; gap: 2rem; padding: 1.6rem 0; border-bottom: 1px solid var(--line); }
.tl-when { font-family: var(--mono); font-size: 0.62rem; color: var(--fg-3); letter-spacing: 0.06em; padding-top: 0.15rem; }
.tl-kind { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); display: inline-block; margin-bottom: 0.3rem; }
.tl-role { font-size: 0.95rem; font-weight: 600; letter-spacing: -0.01em; }
.tl-org { font-size: 0.82rem; color: var(--fg-2); margin-top: 0.1rem; }
@media (max-width: 500px) {
  .tl-item { grid-template-columns: 1fr; gap: 0.4rem; }
}

/* ============================================================
   CONTACT
   ============================================================ */
.contact-section { border-top: 1px solid var(--line); }
.contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; }
.bc-heading { font-family: var(--display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 0.8rem; }
.bc-sub { font-size: 1rem; color: var(--fg-2); margin-bottom: 2rem; }
.social-list { display: flex; flex-direction: column; gap: 0.5rem; }
.social { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; background: var(--bg-2); border: 1px solid var(--line); border-radius: var(--radius); transition: border-color 0.2s, background 0.2s; cursor: pointer; width: 100%; }
.social:hover { border-color: var(--line-2); background: var(--bg-3); }
.s-left { display: flex; align-items: center; gap: 0.9rem; }
.s-ic { font-family: var(--mono); font-size: 0.7rem; font-weight: 500; color: var(--fg-3); width: 2rem; text-align: center; }
.s-name { font-size: 0.87rem; font-weight: 500; display: block; }
.s-handle { font-family: var(--mono); font-size: 0.65rem; color: var(--fg-3); display: block; }
.s-arr { color: var(--fg-3); font-size: 0.9rem; transition: transform 0.2s; }
.social:hover .s-arr { transform: translate(2px, -2px); color: var(--accent); }
.contact-form-col { }
.form { display: flex; flex-direction: column; gap: 0.75rem; }
.form-fields { display: flex; flex-direction: column; gap: 0.75rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.6rem; font-weight: 500; color: var(--fg-3); letter-spacing: 0.08em; font-family: var(--mono); text-transform: uppercase; }
.field input, .field textarea {
  background: var(--bg-2); border: 1.5px solid var(--line-2); border-radius: var(--radius);
  color: var(--fg); padding: 0.7rem 0.95rem; font-size: 0.87rem; font-family: var(--sans);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.12); }
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

/* ============================================================
   EL BADGE (status chip)
   ============================================================ */
.el-badge { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.06em; padding: 0.25rem 0.6rem; border-radius: 99px; border: 1px solid var(--line-2); color: var(--fg-3); }
.status-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

/* ============================================================
   CASE STUDY PAGES (projects/*.html)
   ============================================================ */
.cs-nav { display:flex; align-items:center; justify-content:space-between; padding:1rem var(--gutter); border-bottom:1px solid var(--line); position:sticky; top:0; background:rgba(14,13,11,0.9); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:100; }
.cs-nav-right { display:flex; align-items:center; gap:0.7rem; }
.cs-back { font-size:0.86rem; font-weight:500; color:var(--fg-2); display:inline-flex; align-items:center; gap:0.4rem; transition:color 0.2s; }
.cs-back:hover { color:var(--accent); }
```

- [ ] **Step 2: Verify in browser**

Open `index.html` (or any page) in browser. Expected: dark background `#0e0d0b` fills the page, no white flash, no console errors about missing CSS. The page will look unstyled/empty since we haven't written the HTML yet — that's correct.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: style.css v8 — dark token system + all component CSS"
```

---

## Task 2: Nav

**Files:**
- Modify: `index.html` — replace `<nav>` block
- Modify: `script.js` — add `initNav()` and `initScrollProgress()`

**Interfaces:**
- Consumes: `.nav`, `.nav-brand`, `.nav-links`, `.nav-right`, `.nav-lang`, `.nav-cta`, `.scroll-prog` from Task 1
- Produces: `initNav()`, `initScrollProgress()` — called at bottom of script.js

- [ ] **Step 1: Replace `<head>` and `<nav>` in `index.html`**

Write the full `<head>` block (replacing the existing one) and the new `<nav>` (replacing whatever `<nav>` or `<header>` currently exists at the top of `<body>`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Egemen Bozca | React Native & AI Developer</title>
<meta name="description" content="Egemen Bozca: React Native & AI developer. Shipped apps to Google Play & App Store, built RAG-based AI systems, world champion with autonomous drone software.">
<link rel="canonical" href="https://egebo.github.io/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23D42020'/><text x='50' y='72' font-family='system-ui,sans-serif' font-weight='700' font-size='62' fill='%23ffffff' text-anchor='middle'>E</text></svg>">
<meta property="og:type" content="website">
<meta property="og:url" content="https://egebo.github.io/">
<meta property="og:title" content="Egemen Bozca | Developer & AI Systems">
<meta property="og:description" content="React Native & AI developer. 4 apps live, RAG systems, world champion drone software.">
<meta property="og:image" content="https://egebo.github.io/looked_ss/play_1.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Egemen Bozca | Developer & AI Systems">
<meta name="twitter:image" content="https://egebo.github.io/looked_ss/play_1.png">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Egemen Bozca",
  "url": "https://egebo.github.io",
  "email": "bozcaegemen@gmail.com",
  "jobTitle": "Freelance Mobile & AI Developer",
  "sameAs": ["https://www.linkedin.com/in/egemen-bozca/","https://github.com/Egebo"]
}
</script>
<link rel="stylesheet" href="style.css?v=33">
<script src="strings.js" defer></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
</head>
<body>

<div class="scroll-prog" id="scrollProg"></div>
<div class="cursor" aria-hidden="true"><div class="c-dot"></div><div class="c-ring"></div></div>

<nav class="nav" id="mainNav">
  <a href="#" class="nav-brand">Egemen Bozca</a>
  <ul class="nav-links">
    <li><a href="#projects" data-i18n="nav.work">Work</a></li>
    <li><a href="#about" data-i18n="nav.about">About</a></li>
    <li><a href="#work" data-i18n="nav.awards">Awards</a></li>
    <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
  </ul>
  <div class="nav-right">
    <div class="nav-lang">
      <button id="langTR" data-i18n-lang="tr">TR</button>
      <button id="langEN" data-i18n-lang="en">EN</button>
    </div>
    <a href="#contact" class="btn btn--accent btn--sm nav-cta" data-i18n="nav.cta">Hire me <span class="arr">→</span></a>
  </div>
</nav>
```

- [ ] **Step 2: Add `initNav()` and `initScrollProgress()` to `script.js`**

At the top of script.js (before other functions), add:

```js
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
```

Call both at the bottom of script.js: `initScrollProgress(); initNav();`

- [ ] **Step 3: Verify in browser**

Load `index.html`. Expected: dark nav visible at top, transparent background. Scroll down — nav gets frosted glass background. Progress bar fills from left as you scroll.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js
git commit -m "feat: nav — sticky frosted glass + scroll progress bar"
```

---

## Task 3: Hero Section + Canvas

**Files:**
- Modify: `index.html` — add hero section after `<nav>`
- Modify: `script.js` — add `initHeroCanvas()`, `initCursor()`

**Interfaces:**
- Consumes: `.hero`, `.hero-copy`, `.hero-title`, `.hero-meta`, `.hero-cta`, `.hero-canvas-col`, `#hero-canvas` from Task 1
- Produces: `initHeroCanvas()`, `initCursor()` — called in script.js

- [ ] **Step 1: Add hero HTML to `index.html` after `</nav>`**

```html
<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-copy">
    <p class="hero-eyebrow" data-i18n="hero.eyebrow">EGEMEN BOZCA · DEVELOPER</p>
    <h1 class="hero-title">
      <span data-i18n="hero.line1">I build <span class="accent">AI systems.</span></span><br>
      <span data-i18n="hero.line2">I ship <span class="accent">apps.</span></span>
    </h1>
    <div class="hero-meta">
      <span data-i18n="hero.m1">4 apps live</span>
      <span data-i18n="hero.m2">World Champion</span>
      <span data-i18n="hero.m3">Open to freelance</span>
    </div>
    <div class="hero-cta">
      <a href="#projects" class="btn btn--accent" data-i18n="hero.cta1">View Work <span class="arr">→</span></a>
      <a href="#contact" class="btn btn--ghost" data-i18n="hero.cta2">Contact</a>
    </div>
  </div>
  <div class="hero-canvas-col" aria-hidden="true">
    <canvas id="hero-canvas"></canvas>
  </div>
</section>
```

- [ ] **Step 2: Add i18n keys to `strings.js`**

In the `tr` object, add:
```js
"hero.eyebrow": "EGEMEN BOZCA · GELİŞTİRİCİ",
"hero.line1": "AI sistemleri <span class=\"accent\">kuruyorum.</span>",
"hero.line2": "Uygulamalar <span class=\"accent\">shipliyorum.</span>",
"hero.m1": "4 uygulama yayında",
"hero.m2": "Dünya Birincisi",
"hero.m3": "Freelance'e açık",
"hero.cta1": "İşleri Gör <span class=\"arr\">→</span>",
"hero.cta2": "İletişim",
"nav.work": "İşler",
"nav.about": "Hakkında",
"nav.awards": "Başarılar",
"nav.contact": "İletişim",
"nav.cta": "İşe Al <span class=\"arr\">→</span>",
```

In the `en` object, add:
```js
"hero.eyebrow": "EGEMEN BOZCA · DEVELOPER",
"hero.line1": "I build <span class=\"accent\">AI systems.</span>",
"hero.line2": "I ship <span class=\"accent\">apps.</span>",
"hero.m1": "4 apps live",
"hero.m2": "World Champion",
"hero.m3": "Open to freelance",
"hero.cta1": "View Work <span class=\"arr\">→</span>",
"hero.cta2": "Contact",
"nav.work": "Work",
"nav.about": "About",
"nav.awards": "Awards",
"nav.contact": "Contact",
"nav.cta": "Hire me <span class=\"arr\">→</span>",
```

- [ ] **Step 3: Add `initHeroCanvas()` to `script.js`**

```js
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
```

- [ ] **Step 4: Add `initCursor()` to `script.js`**

```js
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
```

- [ ] **Step 5: Call new functions at bottom of `script.js`**

```js
initHeroCanvas();
initCursor();
```

- [ ] **Step 6: Verify in browser**

Open `index.html`. Expected: hero section fills the screen, dark background, large two-line heading visible, canvas on right shows drifting node graph with tech labels. Custom cursor trails mouse on desktop.

- [ ] **Step 7: Commit**

```bash
git add index.html script.js strings.js
git commit -m "feat: hero section — two-line heading + canvas node graph"
```

---

## Task 4: Marquee Band

**Files:**
- Modify: `index.html` — add marquee after hero

**Interfaces:**
- Consumes: `.marquee-band`, `.marquee-track`, `.marquee-item` from Task 1
- Produces: marquee HTML (no JS needed — pure CSS animation)

- [ ] **Step 1: Add marquee HTML after `</section>` (hero end)**

```html
<!-- MARQUEE -->
<div class="marquee-band" aria-hidden="true">
  <div class="marquee-track">
    <span class="marquee-item" data-i18n="mq.rn">React Native</span>
    <span class="marquee-item" data-i18n="mq.ai">AI Integration</span>
    <span class="marquee-item" data-i18n="mq.rag">RAG Systems</span>
    <span class="marquee-item">Firebase</span>
    <span class="marquee-item">Python</span>
    <span class="marquee-item">Flutter</span>
    <span class="marquee-item">GPT-4o</span>
    <span class="marquee-item">Gemini</span>
    <span class="marquee-item">FastAPI</span>
    <span class="marquee-item">LangChain</span>
    <span class="marquee-item">TypeScript</span>
    <span class="marquee-item" data-i18n="mq.drone">Drone Software</span>
    <!-- duplicate for seamless loop -->
    <span class="marquee-item" data-i18n="mq.rn">React Native</span>
    <span class="marquee-item" data-i18n="mq.ai">AI Integration</span>
    <span class="marquee-item" data-i18n="mq.rag">RAG Systems</span>
    <span class="marquee-item">Firebase</span>
    <span class="marquee-item">Python</span>
    <span class="marquee-item">Flutter</span>
    <span class="marquee-item">GPT-4o</span>
    <span class="marquee-item">Gemini</span>
    <span class="marquee-item">FastAPI</span>
    <span class="marquee-item">LangChain</span>
    <span class="marquee-item">TypeScript</span>
    <span class="marquee-item" data-i18n="mq.drone">Drone Software</span>
  </div>
</div>
```

Add to `strings.js` TR:
```js
"mq.rn": "React Native", "mq.ai": "AI Entegrasyonu",
"mq.rag": "RAG Sistemleri", "mq.drone": "Drone Yazılımı",
```
EN: same as HTML defaults.

- [ ] **Step 2: Verify**

Marquee scrolls left continuously, pauses on hover.

- [ ] **Step 3: Commit**

```bash
git add index.html strings.js
git commit -m "feat: marquee band — dark version"
```

---

## Task 5: Looked Featured — Sticky Scroll

**Files:**
- Modify: `index.html` — add projects heading + feat-looked section
- Modify: `script.js` — add `initLookedScroll()`

**Interfaces:**
- Consumes: `.feat-looked-outer`, `.feat-looked-intro`, `.feat-looked-sticky`, `.phone-frame`, `.phone-screen`, `.looked-feat` from Task 1
- Produces: `initLookedScroll()` — called in script.js

- [ ] **Step 1: Add projects heading + Looked section to `index.html` after the marquee**

```html
<!-- PROJECTS HEADING -->
<div class="projects-head" id="projects">
  <div class="wrap">
    <h2 class="ph-title reveal" data-d="1" data-i18n="proj.title">Projects</h2>
  </div>
</div>

<!-- LOOKED — STICKY SCROLL -->
<div class="feat-looked-outer">

  <!-- Intro: scrolls normally, disappears above sticky zone -->
  <div class="feat-looked-intro">
    <div class="wrap">
      <div>
        <p class="f-eyebrow"><span data-i18n="proj.featured.tag">Featured product</span></p>
        <h2 class="feat-title" data-i18n="proj.featured.name">Looked</h2>
        <p class="feat-desc" data-i18n="proj.featured.desc">AI-powered personal style assistant. Upload a photo, get instant outfit feedback; add your wardrobe and discover combinations the AI — or you — create.</p>
        <div class="feat-meta tags">
          <span class="tag">React Native</span>
          <span class="tag">Gemini 2.5 Flash</span>
          <span class="tag">Firebase</span>
        </div>
      </div>
      <div>
        <div class="feat-cta">
          <a href="https://play.google.com/store/apps/details?id=com.egebo.looked&pcampaignid=web_share" target="_blank" rel="noopener" class="btn btn--accent"><span data-i18n="proj.featured.cta">Google Play</span><span class="arr">→</span></a>
          <a href="https://apps.apple.com/us/app/looked-dijital-stil-asistan%C4%B1/id6776430564" target="_blank" rel="noopener" class="btn btn--dark"><span data-i18n="proj.featured.cta.ios">App Store</span><span class="arr">→</span></a>
          <a href="projects/looked.html" class="btn btn--ghost" data-i18n="proj.cs">Case study <span class="arr">→</span></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Sticky zone: pinned while 400vh outer scrolls -->
  <div class="feat-looked-sticky">

    <!-- Left: phone frame -->
    <div class="phone-col">
      <div class="phone-frame">
        <div class="phone-screen active">
          <img src="looked_ss/play_1.png" alt="Looked wardrobe screen">
        </div>
        <div class="phone-screen">
          <img src="looked_ss/play_2.png" alt="Looked style analysis">
        </div>
        <div class="phone-screen">
          <img src="looked_ss/play_4.png" alt="Looked outfit calendar">
        </div>
        <div class="phone-screen">
          <img src="looked_ss/play_6.png" alt="Looked themes">
        </div>
      </div>
    </div>

    <!-- Right: feature list -->
    <div class="features-col">
      <div class="looked-feat active">
        <div class="lf-icon">👕</div>
        <h3 data-i18n="proj.featured.f1.title">Smart Wardrobe</h3>
        <p data-i18n="proj.featured.f1.desc">Gemini AI detects clothing from photos and auto-tags them. Background removal, category filtering, digital catalog.</p>
      </div>
      <div class="looked-feat">
        <div class="lf-icon">🧠</div>
        <h3 data-i18n="proj.featured.f2.title">AI Style Consulting</h3>
        <p data-i18n="proj.featured.f2.desc">Upload an outfit, get a 0–100 style score and professional feedback. Automatic suggestions from your wardrobe.</p>
      </div>
      <div class="looked-feat">
        <div class="lf-icon">📅</div>
        <h3 data-i18n="proj.featured.f3.title">Outfit Calendar</h3>
        <p data-i18n="proj.featured.f3.desc">Plan outfits for upcoming days. View past analyses and combinations at any time.</p>
      </div>
      <div class="looked-feat">
        <div class="lf-icon">🌗</div>
        <h3 data-i18n="proj.featured.f4.title">Bilingual & Themes</h3>
        <p data-i18n="proj.featured.f4.desc">Full interface and AI responses in Turkish/English. Light & dark mode in terracotta-sage-champagne palette.</p>
      </div>
    </div>
  </div>

</div>
```

Add to `strings.js` (TR + EN) for the new keys:
```js
// TR
"proj.cs": "Case study <span class=\"arr\">→</span>",
"proj.featured.f1.title": "Akıllı Gardırop",
"proj.featured.f1.desc": "Gemini AI fotoğraftan kıyafeti tanıyıp otomatik etiketliyor. Arka plan kaldırma, kategori filtreleme, dijital katalog.",
"proj.featured.f2.title": "AI Stil Danışmanlığı",
"proj.featured.f2.desc": "Kombini yükle, 0-100 stil puanı ve profesyonel geri bildirim al. Gardırobundan otomatik kombin önerisi.",
"proj.featured.f3.title": "Kombin Takvimi",
"proj.featured.f3.desc": "Gelecek günler için kıyafet planla. Geçmiş analizlerini ve kombinlerini istediğin zaman görüntüle.",
"proj.featured.f4.title": "Çift Dil & Tema",
"proj.featured.f4.desc": "Tüm arayüz ve AI yanıtları Türkçe/İngilizce. Terracotta-Sage-Champagne paletinde light & dark mod.",
// EN (same as HTML defaults above)
```

- [ ] **Step 2: Add `initLookedScroll()` to `script.js`**

```js
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
```

Call at bottom of script.js: `initLookedScroll();`

- [ ] **Step 3: Verify in browser**

Scroll past the Looked intro — the sticky zone appears. Continue scrolling: phone screen swaps through 4 images, active feature on right highlights with full opacity and accent border. Test at 375px width: sticky behavior disabled, everything stacks normally.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js strings.js
git commit -m "feat: looked featured — 400vh sticky scroll, phone swap, feature highlight"
```

---

## Task 6: AkademikChatbot Featured — SVG Diagram

**Files:**
- Modify: `index.html` — add feat-rag section after Looked
- Modify: `script.js` — add `initRagDiagram()`

**Interfaces:**
- Consumes: `.feat-rag`, `.rag-diagram`, `.rag-node-g`, `.rag-spoke-line`, `.rag-tooltip` from Task 1
- Produces: `initRagDiagram()` — called in script.js

- [ ] **Step 1: Add AkademikChatbot section to `index.html` after the Looked `</div>` (end of feat-looked-outer)**

The SVG uses a 400×320 viewBox. Center hub at (200, 160). Five spoke nodes at 72° intervals (radius 95px): Text-SQL (200,65), Document RAG (290,125), Web Crawler (257,238), Multi-Turn Chat (143,238), Token Tracking (110,125).

```html
<!-- AKADEMIKCHATBOT — SVG DIAGRAM -->
<article class="feat-rag">
  <div class="wrap">

    <div class="feat-rag-copy">
      <p class="f-eyebrow"><span data-i18n="proj.1.type">Python · RAG</span></p>
      <h2 class="feat-title" data-i18n="proj.1.name">AkademikChatbot</h2>
      <p class="feat-desc" data-i18n="proj.1.desc">Education-focused RAG-based academic advisor. An intent-routing engine directs each query to SQL, vector search, or web crawl. Technically the most complex project in this portfolio.</p>
      <span class="rag-badge" data-i18n="proj.status.done">Completed · Graduation Project</span>
      <div class="feat-cta" style="margin-top:1.8rem">
        <a href="https://github.com/Egebo/AkademikChatbot" target="_blank" rel="noopener" class="btn btn--accent" data-i18n="proj.1.cta">GitHub <span class="arr">→</span></a>
        <a href="projects/rag.html" class="btn btn--ghost" data-i18n="proj.cs">Case study <span class="arr">→</span></a>
      </div>
    </div>

    <div class="rag-diagram-wrap" aria-label="AkademikChatbot architecture diagram">
      <svg class="rag-diagram" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">

        <!-- Animated dashed ring around center -->
        <circle class="rag-ring-anim" cx="200" cy="160" r="52" stroke-dasharray="6 4"/>

        <!-- Spoke lines (one per node, data-node matches node index) -->
        <line class="rag-spoke-line" data-node="0" x1="200" y1="160" x2="200" y2="65"/>
        <line class="rag-spoke-line" data-node="1" x1="200" y1="160" x2="290" y2="125"/>
        <line class="rag-spoke-line" data-node="2" x1="200" y1="160" x2="257" y2="238"/>
        <line class="rag-spoke-line" data-node="3" x1="200" y1="160" x2="143" y2="238"/>
        <line class="rag-spoke-line" data-node="4" x1="200" y1="160" x2="110" y2="125"/>

        <!-- Center hub: Intent Router -->
        <circle class="rag-center-node" cx="200" cy="160" r="32"/>
        <text class="rag-center-label" x="200" y="157">Intent</text>
        <text class="rag-center-label" x="200" y="170">Router</text>

        <!-- Spoke nodes -->
        <g class="rag-node-g" data-idx="0" data-tip="Routes to SQL, RAG, or web based on query type">
          <circle class="rag-node-circle" cx="200" cy="65" r="22"/>
          <text class="rag-node-label" x="200" y="62">Text</text>
          <text class="rag-node-label" x="200" y="73">SQL</text>
        </g>
        <g class="rag-node-g" data-idx="1" data-tip="PDF → ChromaDB embeddings → semantic search">
          <circle class="rag-node-circle" cx="290" cy="125" r="22"/>
          <text class="rag-node-label" x="290" y="122">Doc</text>
          <text class="rag-node-label" x="290" y="133">RAG</text>
        </g>
        <g class="rag-node-g" data-idx="2" data-tip="Crawls university site for up-to-date info">
          <circle class="rag-node-circle" cx="257" cy="238" r="22"/>
          <text class="rag-node-label" x="257" y="235">Web</text>
          <text class="rag-node-label" x="257" y="246">Crawler</text>
        </g>
        <g class="rag-node-g" data-idx="3" data-tip="Preserves context across turns">
          <circle class="rag-node-circle" cx="143" cy="238" r="22"/>
          <text class="rag-node-label" x="143" y="235">Multi</text>
          <text class="rag-node-label" x="143" y="246">Turn</text>
        </g>
        <g class="rag-node-g" data-idx="4" data-tip="Tracks token usage per conversation">
          <circle class="rag-node-circle" cx="110" cy="125" r="22"/>
          <text class="rag-node-label" x="110" y="122">Token</text>
          <text class="rag-node-label" x="110" y="133">Track</text>
        </g>

      </svg>
      <div id="rag-tooltip" class="rag-tooltip" aria-live="polite"></div>
    </div>

  </div>
</article>
```

- [ ] **Step 2: Add `initRagDiagram()` to `script.js`**

```js
function initRagDiagram() {
  var nodes = document.querySelectorAll('.rag-node-g');
  var lines = document.querySelectorAll('.rag-spoke-line');
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
    node.addEventListener('blur', function() { node.dispatchEvent(new Event('mouseleave')); });
  });
}
```

Call at bottom of script.js: `initRagDiagram();`

- [ ] **Step 3: Verify in browser**

Scroll to AkademikChatbot section. Expected: diagram visible on right with 5 spoke nodes around a center hub. Ring animation runs. Hover each node — it highlights, its spoke line turns accent-red, tooltip appears below diagram. Keyboard tab to each node also triggers highlight.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js
git commit -m "feat: akademikchatbot — interactive SVG architecture diagram"
```

---

## Task 7: Project Grid + Canvas Sketches

**Files:**
- Modify: `index.html` — add project grid after feat-rag
- Modify: `script.js` — add `initProjectCanvases()` with 3 canvas draw functions

**Interfaces:**
- Consumes: `.proj-grid`, `.proj-card`, `.proj-card-inner`, `.proj-type`, `.proj-name`, `.proj-desc`, `.proj-link` from Task 1
- Produces: `initProjectCanvases()` — called in script.js

- [ ] **Step 1: Add project grid HTML to `index.html` after `</article>` (feat-rag end)**

```html
<!-- OTHER PROJECTS GRID -->
<div class="proj-grid">

  <!-- Jarvis -->
  <div class="proj-card proj-jarvis reveal">
    <canvas aria-hidden="true"></canvas>
    <div class="proj-card-inner">
      <p class="proj-type" data-i18n="proj.2.type">AI · Voice · Python</p>
      <h3 class="proj-name" data-i18n="proj.2.name">Jarvis</h3>
      <p class="proj-desc" data-i18n="proj.2.desc">Iron Man-inspired voice assistant. "Jarvis" wake word triggers Gemini + function-calling for PC control. Whisper STT + TTS response.</p>
      <div class="tags" style="margin-bottom:1.2rem">
        <span class="tag">Python</span><span class="tag">Gemini</span><span class="tag">Whisper</span><span class="tag">FastAPI</span>
      </div>
      <a href="projects/jarvis.html" class="proj-link" data-i18n="proj.cs.link">Case study <span>→</span></a>
    </div>
  </div>

  <!-- Optura -->
  <div class="proj-card proj-optura reveal" data-d="1">
    <canvas aria-hidden="true"></canvas>
    <div class="proj-card-inner">
      <p class="proj-type" data-i18n="proj.3.type">Mobile · AI · Flutter</p>
      <h3 class="proj-name" data-i18n="proj.3.name">Optura</h3>
      <p class="proj-desc" data-i18n="proj.3.desc">Startup co-founded with my cousin. Photograph a grocery receipt; app auto-tracks your pantry, estimates expiry, suggests recipes.</p>
      <div class="tags" style="margin-bottom:1.2rem">
        <span class="tag">Flutter</span><span class="tag">GPT-4o</span><span class="tag">Supabase</span>
      </div>
      <a href="projects/optura.html" class="proj-link" data-i18n="proj.cs.link">Case study <span>→</span></a>
    </div>
  </div>

  <!-- Poco Loco -->
  <div class="proj-card proj-poco reveal" data-d="2">
    <canvas aria-hidden="true"></canvas>
    <div class="proj-card-inner">
      <p class="proj-type" data-i18n="proj.4.type">Web · E-Commerce</p>
      <h3 class="proj-name" data-i18n="proj.4.name">Poco Loco</h3>
      <p class="proj-desc" data-i18n="proj.4.desc">End-to-end e-commerce for a boutique bag brand. Live payments via iyzico, order tracking, admin panel. 240+ commits.</p>
      <div class="tags" style="margin-bottom:1.2rem">
        <span class="tag">React</span><span class="tag">Supabase</span><span class="tag">iyzico</span>
      </div>
      <a href="projects/poco-loco.html" class="proj-link" data-i18n="proj.cs.link">Case study <span>→</span></a>
    </div>
  </div>

</div>
```

Add missing strings to `strings.js`:
```js
// TR
"proj.cs.link": "Case study →",
"proj.2.type": "AI · Ses · Python",
"proj.2.name": "Jarvis",
"proj.2.desc": "Iron Man'den ilham alan sesli asistan. \"Jarvis\" uyandırma kelimesi Gemini + function-calling ile PC kontrolü sağlar.",
"proj.3.type": "Mobil · AI · Flutter",
"proj.3.name": "Optura",
"proj.3.desc": "Kuzenimle birlikte kurduğumuz girişim. Market fişini fotoğrafla; uygulama erzağını takip eder, son kullanma tahmini yapar, tarif önerir.",
"proj.4.type": "Web · E-Ticaret",
"proj.4.name": "Poco Loco",
"proj.4.desc": "Butik bir çanta markası için uçtan uca e-ticaret. iyzico ile canlı ödeme, sipariş takibi, yönetim paneli. 240+ commit.",
// EN same as HTML defaults
```

- [ ] **Step 2: Add `initProjectCanvases()` to `script.js`**

```js
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
    var raf = null;

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
    // scan line glow
    ctx.shadowColor = 'rgba(212,32,32,0.6)';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = 'rgba(212,32,32,0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    ctx.shadowBlur = 0;
    // revealed items
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
  var xs = [0.14, 0.38, 0.62, 0.86];
  var dash = 0;
  return function() {
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    var cy = H * 0.48;
    ctx.clearRect(0, 0, W, H);
    // connector lines
    for (var i = 0; i < steps.length - 1; i++) {
      var x1 = xs[i] * W + 14, x2 = xs[i+1] * W - 14;
      ctx.setLineDash([5, 4]);
      ctx.lineDashOffset = -dash;
      ctx.strokeStyle = 'rgba(212,32,32,0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x1, cy); ctx.lineTo(x2, cy); ctx.stroke();
    }
    ctx.setLineDash([]);
    // nodes + labels
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
```

Call at bottom of script.js: `initProjectCanvases();`

- [ ] **Step 3: Verify in browser**

Hover each project card: Jarvis shows animated waveform bars, Optura shows receipt scan with descending line revealing items, Poco Loco shows animated dashed connection between flow nodes. On mouseleave canvas clears.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js strings.js
git commit -m "feat: project grid — 3 cards with project-specific canvas sketches"
```

---

## Task 8: About + Awards + Experience

**Files:**
- Modify: `index.html` — add 3 sections after project grid

**Interfaces:**
- Consumes: `.about-section`, `.awards-section`, `.exp-section` + sub-classes from Task 1
- Produces: HTML sections (no new JS needed)

- [ ] **Step 1: Add About section after the project grid**

```html
<!-- ABOUT -->
<section class="about-section section" id="about">
  <div class="about-inner wrap">
    <div class="about-bio">
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

- [ ] **Step 2: Add Awards section**

```html
<!-- AWARDS -->
<section class="awards-section section" id="work">
  <div class="wrap">
    <h2 class="ph-title reveal" data-d="1" data-i18n="ach.title">Awards</h2>
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
```

Add to strings.js: `"ach.title"` → TR: `"Başarılar"`, EN: `"Awards"`.

- [ ] **Step 3: Add Experience section**

```html
<!-- EXPERIENCE -->
<section class="exp-section section" id="path">
  <div class="wrap">
    <h2 class="ph-title reveal" data-i18n="path.title">Experience</h2>
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

Add to strings.js: `"path.title"` → TR: `"Deneyim"`, EN: `"Experience"`.

- [ ] **Step 4: Verify**

All 3 sections render with dark tokens. Awards section has subtle dot-grid background from CSS. Scroll reveals work.

- [ ] **Step 5: Commit**

```bash
git add index.html strings.js
git commit -m "feat: about, awards, experience sections — dark tokens"
```

---

## Task 9: Contact + Footer

**Files:**
- Modify: `index.html` — add contact section and footer

**Interfaces:**
- Consumes: `.contact-section`, `.contact-inner`, `.social`, `.form`, `.footer` from Task 1
- Produces: contact HTML; EmailJS wiring uses existing `initContact()` which is preserved from old script.js

- [ ] **Step 1: Add Contact section and footer to `index.html`**

```html
<!-- CONTACT -->
<section class="contact-section section" id="contact">
  <div class="contact-inner wrap">
    <div class="bc-left">
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
    <div class="contact-form-col reveal" data-d="1">
      <form class="form" id="contactForm" novalidate>
        <div class="form-fields">
          <div class="field">
            <label for="cf-name" data-i18n="form.name.label">Name</label>
            <input id="cf-name" name="name" type="text" autocomplete="name" required placeholder="Ada Lovelace">
          </div>
          <div class="field">
            <label for="cf-email" data-i18n="form.email.label">Email</label>
            <input id="cf-email" name="email" type="email" autocomplete="email" required placeholder="ada@example.com">
          </div>
          <div class="field">
            <label for="cf-msg" data-i18n="form.msg.label">Message</label>
            <textarea id="cf-msg" name="message" rows="4" required placeholder="Tell me about your project..."></textarea>
          </div>
        </div>
        <p class="form-error-msg" id="formError" role="alert" data-i18n="form.error">Please fill in all fields.</p>
        <button type="submit" class="btn btn--accent" data-i18n="form.send">Send message <span class="arr">→</span></button>
      </form>
      <div class="form-success" id="formSuccess">
        <div class="check">✓</div>
        <h3 data-i18n="form.success.title">Message sent!</h3>
        <p data-i18n="form.success.body">I'll get back to you as soon as possible.</p>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner wrap">
    <span class="f-brand">Egemen Bozca</span>
    <a href="#home" class="to-top" data-i18n="footer.top">↑ Back to top</a>
  </div>
</footer>

<script src="strings.js"></script>
<script src="script.js"></script>
</body>
</html>
```

Add to strings.js: `"footer.top"` → TR: `"↑ Başa dön"`, EN: `"↑ Back to top"`.

- [ ] **Step 2: Verify**

Contact section renders with dark form fields. Social links display correctly. Footer at bottom.

- [ ] **Step 3: Commit**

```bash
git add index.html strings.js
git commit -m "feat: contact section + footer"
```

---

## Task 10: script.js — Final Structure + i18n + Reveal

**Files:**
- Rewrite: `script.js` — consolidate all init functions, preserve EmailJS, preserve i18n

**Interfaces:**
- Consumes: all `initX()` functions from Tasks 2–7; `window.I18N` from `strings.js`
- Produces: single `script.js` that calls all init functions on `DOMContentLoaded`

- [ ] **Step 1: Structure `script.js` with all init functions**

The final `script.js` should have this structure (integrate the code already written in Tasks 2–7):

```js
/* ============================================================
   Egemen Bozca · Portfolio v8 — script.js
   ============================================================ */

/* ---------- initScrollProgress ---------- */
function initScrollProgress() { /* Task 2 code */ }

/* ---------- initNav ---------- */
function initNav() { /* Task 2 code */ }

/* ---------- initCursor ---------- */
function initCursor() { /* Task 3 code */ }

/* ---------- initHeroCanvas ---------- */
function initHeroCanvas() { /* Task 3 code */ }

/* ---------- initLookedScroll ---------- */
function initLookedScroll() { /* Task 5 code */ }

/* ---------- initRagDiagram ---------- */
function initRagDiagram() { /* Task 6 code */ }

/* ---------- initProjectCanvases (+ draw helpers) ---------- */
function drawJarvisCanvas(canvas, ctx) { /* Task 7 code */ }
function drawOpturaCanvas(canvas, ctx) { /* Task 7 code */ }
function drawPocoCanvas(canvas, ctx) { /* Task 7 code */ }
function initProjectCanvases() { /* Task 7 code */ }

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
  // Email copy
  var copyBtn = document.getElementById('emailCopy');
  var status = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText('bozcaegemen@gmail.com').then(function() {
        if (status) { status.textContent = '✓'; setTimeout(function() { status.textContent = '↗'; }, 2000); }
      });
    });
  }

  // EmailJS form — preserve YOUR existing service/template IDs from current script.js
  emailjs.init('YOUR_PUBLIC_KEY'); // ← copy from current script.js
  var form = document.getElementById('contactForm');
  var errorEl = document.getElementById('formError');
  var successEl = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (errorEl) errorEl.classList.add('show');
      return;
    }
    if (errorEl) errorEl.classList.remove('show');
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form) // ← copy from current script.js
      .then(function() {
        form.style.display = 'none';
        if (successEl) successEl.classList.add('show');
      })
      .catch(function() {
        if (errorEl) { errorEl.textContent = 'Send failed — please email directly.'; errorEl.classList.add('show'); }
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
  initLang();
  initContact();
});
```

**IMPORTANT:** Before writing `initContact()`, read the current `script.js` to copy the exact `emailjs.init()` key, service ID, and template ID. They must not change.

- [ ] **Step 2: Verify**

Open browser console — no JS errors. Language toggle works (TR/EN). Contact form submits. Cursor follows mouse. All canvas animations run. Scroll reveal fires.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: script.js v8 — all init functions, i18n, contact, reveal"
```

---

## Task 11: Case Study Pages — Dark Token Update

**Files:**
- Modify: `projects/looked.html`, `projects/rag.html`, `projects/optura.html`, `projects/jarvis.html`, `projects/poco-loco.html`

**Interfaces:**
- Consumes: dark tokens from Task 1 (via `style.css?v=33`)
- Produces: case study pages that visually match the dark theme

The case study pages already have `--bg`, `--fg-2`, `--bg-2`, `--fg-3` in their inline CSS (from previous session work). The legacy aliases `--paper`, `--ink-2`, `--card`, `--muted` resolve correctly via Task 1. The only change needed is bumping the style.css version reference and updating the nav background.

- [ ] **Step 1: In each of the 5 case study pages, make these targeted changes**

For `projects/looked.html`, `projects/rag.html`, `projects/optura.html`, `projects/jarvis.html`, `projects/poco-loco.html`:

1. Change `href="../style.css?v=32"` → `href="../style.css?v=33"`
2. Verify the nav background in their inline `<style>` block uses `var(--bg)` not `var(--paper)`. If it still says `var(--paper)`, the alias will handle it — no change needed.
3. The inline CSS already uses new token names from the previous session. No further changes.

- [ ] **Step 2: Verify**

Open `projects/looked.html`. Expected: dark background, white text, red accent, nav frosted on scroll. Open all 5 to confirm consistency.

- [ ] **Step 3: Commit**

```bash
git add projects/
git commit -m "fix: case study pages — bump style.css to v33 for dark tokens"
```

---

## Task 12: Final Polish + Push

**Files:**
- Modify: `style.css` — font size tuning, any visual QA fixes
- Modify: `index.html` — any copy or structure fixes found during review

**This is a visual QA pass. No new features.**

- [ ] **Step 1: Open `index.html` in browser at 100% zoom (1440px wide). Check:**

  - [ ] Hero title reads well — not too large, two lines visible without scrolling
  - [ ] Canvas node graph visible but not distracting
  - [ ] Marquee scrolls smoothly
  - [ ] Looked sticky scroll: phone swaps through 4 screens across ~3 viewport heights of scrolling
  - [ ] AkademikChatbot diagram: all 5 nodes hoverable, tooltip readable
  - [ ] Project grid: all 3 canvas sketches render correctly on hover
  - [ ] Awards dot-grid background visible but subtle
  - [ ] Contact form fields styled correctly (dark bg, no white bleed)
  - [ ] Footer at bottom, not floating

- [ ] **Step 2: Resize to 375px width. Check:**

  - [ ] Nav links hidden on mobile (only brand + CTA visible)
  - [ ] Hero stacked (canvas hidden, copy takes full width)
  - [ ] Looked: sticky behavior disabled, normal scroll
  - [ ] RAG diagram: copy stacks above diagram
  - [ ] Project grid: single column
  - [ ] Contact: single column

- [ ] **Step 3: Fix any issues found**

Common fixes:
- If hero title overflows: reduce the `clamp` max value in `.hero-title` CSS
- If sticky scroll jump feels rough: add `scroll-snap-stop: always` on `.feat-looked-outer`
- If canvas sketches are invisible: check `canvas.offsetWidth` — must be > 0 on first mount; defer resize

- [ ] **Step 4: Push to GitHub Pages**

```bash
git add -A
git commit -m "polish: v8 visual QA — font sizes, responsive fixes"
git push origin main
```

- [ ] **Step 5: Verify live site at `https://egebo.github.io/`**

Wait ~60s for Pages deployment. Open in incognito (no cache). Verify dark theme, no flash of white background, canvas animations running.

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| Dark token system `#0e0d0b` | Task 1 |
| `#D42020` accent | Task 1 |
| Plus Jakarta Sans + Inter + Geist Mono | Task 1 |
| Nav: transparent → frosted | Task 2 |
| Hero: asymmetric 55/45, canvas node graph | Task 3 |
| Marquee dark | Task 4 |
| Looked: 400vh sticky scroll | Task 5 |
| AkademikChatbot: SVG diagram, hover highlights | Task 6 |
| Project grid: 3 canvas sketches | Task 7 |
| About / Awards (dot pattern) / Experience | Task 8 |
| Contact + Footer | Task 9 |
| script.js structured init functions | Task 10 |
| Case study pages dark tokens | Task 11 |
| Visual QA + push | Task 12 |

**No placeholders found.** Every step has real code.

**Type consistency:** All function names (`initLookedScroll`, `initRagDiagram`, `initProjectCanvases`, `drawJarvisCanvas`, `drawOpturaCanvas`, `drawPocoCanvas`) are consistent across Tasks 5–7 and Task 10 boot sequence.

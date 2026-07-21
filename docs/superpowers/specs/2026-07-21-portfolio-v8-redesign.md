# Portfolio v8 — Dark System Redesign

## Goal

Full redesign of egebo.github.io from the current light v7 to a dark, architecturally rich portfolio. Primary purpose: showcase. Secondary: freelance clients and technical hiring.

Identity: **"I build AI systems. I ship apps."** — both technical depth and real shipped products must be visible simultaneously.

## Architecture Overview

Vanilla HTML/CSS/JS, GitHub Pages, zero build tools, zero runtime dependencies. Same stack as current. Single `index.html`, shared `style.css`, shared `script.js`. Case study pages (`projects/*.html`) inherit the new design system via `style.css`.

## Design System

### Color Tokens

```css
--bg:         #0e0d0b;   /* warm near-black, not pure #000 */
--bg-2:       #181714;   /* card backgrounds */
--bg-3:       #1f1d1a;   /* elevated / hover state */
--fg:         #f0ede8;   /* warm off-white */
--fg-2:       #9a9690;   /* secondary text */
--fg-3:       #5a5854;   /* muted / labels */
--line:       rgba(255,255,255,0.07);
--line-2:     rgba(255,255,255,0.12);
--accent:     #D42020;   /* pure red, less orange than v7 */
--accent-dim: #b81a1a;
--accent-rgb: 212, 32, 32;
```

No dark mode toggle needed — site is dark-only.

### Typography

- **Display:** Plus Jakarta Sans 700/800 — headings, hero
- **Body:** Inter 400/500/600 — prose, descriptions
- **Mono:** Geist Mono 400/500 — labels, tags, metadata, code

Scale:
```css
--t-hero:    clamp(3.5rem, 7vw, 5.5rem);   /* hero two-liner */
--t-section: clamp(2.2rem, 4.5vw, 3.5rem); /* section headings */
--t-feat:    clamp(1.8rem, 3vw, 2.6rem);   /* feature titles */
--t-body:    1rem;                           /* 16px base */
--t-small:   0.875rem;
--t-mono:    0.68rem;
```

Letter-spacing: `-0.04em` on display headings, `0.10em` on mono caps labels.

### Spacing

Generous vertical rhythm — sections breathe, not stacked. Min `6rem` between sections, `clamp(5rem, 10vw, 9rem)` for primary section padding.

---

## Page Structure

```
<nav>
<section id="hero">
<div class="marquee-band">
<section id="projects">
  <article class="feat-looked">   ← sticky scroll
  <article class="feat-rag">      ← interactive diagram
  <div class="proj-grid">         ← 3 cards with canvas
<section id="about">
<section id="awards">
<section id="experience">
<section id="contact">
<footer>
```

---

## Section Specs

### Nav

Sticky, `position: fixed`, full width. Transparent over hero, transitions to `rgba(14,13,11,0.88)` with `backdrop-filter: blur(16px)` after 60px scroll.

Left: `Egemen Bozca` wordmark in Plus Jakarta Sans 700, `--fg`.
Right: 4 links (`Work · About · Awards · Contact`) in Geist Mono small caps + TR/EN toggle + CTA button (`Hire me →` in accent).

Nav border-bottom appears on scroll: `1px solid var(--line)`.

### Hero

Full viewport (`100svh`). Asymmetric CSS Grid: `55fr 45fr`, aligned to content top with `padding-top: clamp(8rem, 14vw, 12rem)`.

**Left column (copy):**
```
[mono label]  — EGEMEN BOZCA · DEVELOPER
[h1]          — I build AI systems.
               I ship apps.
[meta row]    — 4 apps live  ·  World Champion  ·  Open to freelance
[cta row]     — [View Work →]  [Contact]
```

The `h1` uses `--t-hero`. "AI systems." and "apps." get the accent color on those words only.

**Right column (canvas):**
`<canvas id="hero-canvas">` fills the column. Renders a slow-drifting node graph:
- 7 nodes, labeled with tech names (React Native, Gemini, Firebase, ChromaDB, FastAPI, Flutter, Python)
- Connection lines between related nodes, `1px`, `rgba(212,32,32,0.2)`
- Nodes drift slowly (`sin/cos` offset, ~0.3px/frame), loop infinitely
- Node fill: `--bg-3`, stroke: `rgba(212,32,32,0.4)`, radius 4px
- Node labels: Geist Mono 10px, `--fg-3`
- `devicePixelRatio` scaling, `requestAnimationFrame` loop
- Respects `prefers-reduced-motion` (static if reduced)

Canvas opacity: `0.7` — visible but not competing with text.

### Marquee Band

Dark version of current. Background `--bg-2`. Same tech stack text content. No structural change.

### Projects — Looked Featured (Sticky Scroll)

Container: `height: 400vh`, `position: relative`.
Inner sticky wrapper: `position: sticky; top: 0; height: 100vh; overflow: hidden`.

**Layout inside sticky:** Two columns, `52% / 48%`.

Left: Phone mockup frame (CSS-drawn or SVG, no image dependency). Inside the frame, 4 screenshot images that swap based on scroll progress. Smooth crossfade transition `0.4s`.

Right: 4 feature blocks stacked vertically (clipped, all rendered but only active one visible at 100% opacity):
1. Smart Wardrobe — icon + title + description
2. AI Style Consulting
3. Outfit Calendar
4. Bilingual & Themes

Scroll progress (0–1 across the `400vh`) divided into 4 equal ranges. Active range = active screenshot + active feature block highlighted (`color: --fg`, others `--fg-3`). Active block has a `2px` left border in accent.

**Above the sticky section:** Project eyebrow + title + description + CTA buttons (Google Play red accent, App Store dark) + tags. These scroll normally, disappear behind the sticky zone.

**Scroll driver:** `IntersectionObserver` on progress markers OR `scroll` event with `getBoundingClientRect()`. Use scroll event for precision:
```js
const progress = (scrollY - sectionTop) / (sectionHeight - windowHeight);
const activeIndex = Math.min(3, Math.floor(progress * 4));
```

### Projects — AkademikChatbot Featured (Interactive Diagram)

Normal scroll (no sticky). Full-width section, dark background `--bg-2`.

Left: copy block — eyebrow, title, description, badge "Graduation Project · 2025", GitHub CTA.

Right: **SVG architecture diagram** — the 6-node intent routing visualization.

SVG nodes (6 circles arranged in hub-and-spoke):
- Center: `Intent Router` (larger, accent stroke)
- 5 spokes: `Text-SQL`, `Document RAG`, `Web Crawler`, `Multi-Turn Chat`, `Token Tracking`
- Connection lines: `--line-2` default
- Animated ring around center: `orbSpin` 20s linear infinite, 40% opacity

On `mouseenter` each spoke node:
- That node's stroke changes to accent
- Its connection line to center animates to `--accent`
- A tooltip/label below shows the node's one-line description
- Uses CSS `:has()` where supported, JS fallback for others

Breathing keyframe on center node: `centerPulse` scale 1 → 1.06 → 1, 3s infinite.

### Projects Grid (Jarvis · Optura · Poco Loco)

3-column grid on desktop, 1-column mobile. Cards: `background: --bg-2`, `border: 1px solid var(--line)`, `border-radius: 8px`.

Each card: eyebrow tag, project name, one-line description, tech tags, CTA link.

**Canvas sketch on hover** — `<canvas>` absolutely positioned over each card, `pointer-events: none`, fades in on `mouseenter`:

- **Jarvis:** 96 vertical bars, sine-wave heights, animated via `requestAnimationFrame`. Color: accent at `0.6` opacity.
- **Optura:** Simulated receipt scan — horizontal scan line descends from top, leaving "recognized items" text below it. Geist Mono, accent color.
- **Poco Loco:** 4 connected flow nodes (`Cart → Order → Payment → Confirm`) drawn left-to-right with animated dashes on connection lines.

Canvas fades out on `mouseleave` (`opacity` CSS transition `0.3s`).

### About

Two-column layout. Left: lead paragraph + skill groups + CV buttons. Right: meta list (Education, Location, Languages, License).

No structural change from v7 — just dark token system applied.

### Awards

Full-width section. 3 achievement cards in a row. Each card: year, rank, large medal number, title, description.

Addition: subtle background pattern behind the section — very low opacity grid of dots (`radial-gradient` repeat), `rgba(212,32,32,0.04)`. Gives texture without weight.

### Experience

Timeline unchanged. Dark tokens.

### Contact

Two-column: left social links, right email form. Dark tokens. Form fields: `background: --bg-2`, `border: 1px solid var(--line-2)`.

### Footer

One line. `Egemen Bozca` wordmark left, `← Back to top` right. `border-top: 1px solid var(--line)`.

---

## JavaScript Architecture

`script.js` — single file, structured in clearly named IIFE sections:

```
initCursor()           — custom dot + ring cursor
initScrollProgress()   — top progress bar
initNav()              — transparent → frosted on scroll
initHeroCanvas()       — node graph animation
initLookedScroll()     — sticky scroll progress driver
initRagDiagram()       — SVG node hover interactions
initProjectCanvases()  — Jarvis/Optura/Poco canvas sketches
initReveal()           — IntersectionObserver fade-in
initLang()             — TR/EN toggle (keep existing system)
initContact()          — EmailJS form (keep existing)
```

Each function is self-contained. No global state except `lang` for i18n.

---

## Case Study Pages

All 5 case study pages (`projects/*.html`) inherit the new `style.css`. Their inline `<style>` blocks use the new dark tokens. `cs-lang.js` unchanged.

No structural redesign of case study pages in this spec — they get the dark token system automatically. A follow-up pass can add richer case study layouts if desired.

---

## File Changes

- **Modify:** `style.css` — full rewrite with dark token system, new component styles
- **Modify:** `index.html` — full rewrite of all sections
- **Modify:** `script.js` — restructure + add new interaction systems
- **Modify:** `strings.js` — no content change, verify keys still match
- **Modify:** `projects/*.html` — dark token updates (inline style blocks only)
- **Modify:** `projects/cs-lang.js` — no change needed

---

## What This Is NOT

- No framework, no build step, no npm
- No dark/light toggle — dark only
- No new pages — same URL structure
- No changes to case study content — only styling
- No external animation libraries (GSAP etc.) — vanilla canvas + CSS only

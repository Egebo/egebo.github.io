# Portfolio Redesign — Design Spec
**Date:** 2026-07-19  
**Status:** Approved

---

## Goal

Redesign egebo.github.io to serve two simultaneous purposes:
1. **Showcase** — "this is who I am and what I've built"
2. **Conversion** — "you should work with me"

Primary use case: share the URL in conversations; the recipient should understand Egemen in under 30 seconds and be impressed enough to reach out or forward to others.

---

## Visual Direction

**Style:** Bold / Personal — not terminal/hacker. Confident, memorable, stands out from typical developer portfolios.

**Color:**
- Background: warm off-white (`#FAFAF8`)
- Foreground: near-black (`#111`)
- Accent: single strong color (to be finalized during implementation — electric blue or amber)
- No border-everywhere approach; space and typography do the heavy lifting

**Typography:**
- Display/headings: large, bold sans-serif (Geist or similar — NOT monospace for body)
- Monospace reserved for code snippets, tags, and technical labels only
- Body: clean readable sans at comfortable line-height

**General feel:** Similar to polished personal sites of Vercel/Linear employees — big type, generous whitespace, confident.

---

## Language

- **Primary:** English
- Language toggle (TR/EN) remains for Turkish visitors

---

## Page Structure (top to bottom)

### 1. Hero
- **Left:** 
  - Small eyebrow: "React Native & AI Developer · Available for freelance"
  - Large bold headline: "I build mobile apps people actually use."
  - 2–3 line description: expertise + availability
  - Two CTAs: "See my work" (accent, primary) · "Get in touch" (ghost)
- **Right:** 
  - Egemen's photo (white background, crops to natural headshot)
  - Small social proof line below photo: "4 apps live on Play Store · Open to projects"

### 2. Stats bar
- 4 apps on Play Store
- 5+ years experience
- Available remotely
- (Keep it short — 3–4 stats max)

### 3. Featured Project — Looked
- Large card, full width or near-full
- App screenshots, description, tech stack
- Prominent "Google Play" + "App Store" CTAs
- "Live product" badge

### 4. Featured Project — AkademikChatbot
- Second featured card (slightly smaller than Looked but clearly elevated above the grid)
- Emphasize technical depth: RAG architecture, intent-routing, GPT-4o-mini, ChromaDB, LangChain
- "Graduation project · Technically complex" framing
- Link to detail page

### 5. Projects grid
- Optura, Jarvis, Poco Loco
- Standard 2-col card grid

### 6. Experience / Background
- Freelance mobile developer (2025–present)
- Looked — personal product (2026–present)
- Robilsa Robotics Team (2018–2022) — one line: Teknofest & TÜBİTAK, national rankings — no over-explanation

### 7. Skills
- Keep current structure (Mobile Dev / AI & ML / Tools) but restyled to match new aesthetic

### 8. Contact
- Email copy button
- LinkedIn, Upwork, GitHub social links
- Contact form (keep existing EmailJS integration)

### 9. Footer
- Minimal

---

## Removed from Current Design

- Manifesto section (weak content, doesn't add value)
- Terminal/hacker aesthetic (borders everywhere, monospace-primary)
- "Dünya 1.'si" as a hero differentiator (overplayed; only 2 countries in the competition)
- Hero canvas background animation (add back only if it fits new aesthetic)
- Coord label (40.7569° N...)

---

## Mobile

- Hamburger menu (currently missing — critical bug)
- All sections fully responsive
- Photo crops gracefully on small screens

---

## What Stays

- Scroll reveal animations (refine timing)
- Language toggle (TR/EN)
- EmailJS contact form
- Custom cursor (optional — reassess in new aesthetic)
- Scroll progress bar
- Project detail pages (jarvis.html, looked.html, etc.) — restyled separately later

---

## Out of Scope

- Project detail page redesigns (separate task)
- SEO changes
- New projects or content additions

# Portfolio Client-Attracting Redesign — Design Spec
Date: 2026-07-20
Status: Approved

## Goal

Redesign egebo.github.io so that a potential client referred from Upwork/Fiverr lands, builds trust in 30 seconds, and knows how to reach out. The site's job is not to impress with its own design — it is to make the work look credible and excellent.

## Context

- **Primary use case:** Reference site. Visitor already knows Egemen from Upwork/Fiverr. They visit to verify quality and decide to hire.
- **Strongest selling points:** Live products on Play Store, technical depth (RAG, AI systems), visual quality of built products.
- **Aspiration:** Be known as a master of technical depth + UX — someone who makes any system the best it can be.
- **Current problem:** Multiple rapid redesigns have produced a visually complex bento grid that scatters attention. The design competes with the work instead of showcasing it.

## Design Principles

1. **Work is the hero.** The site design steps back; the products step forward.
2. **One reading direction.** Visitor flows top to bottom without confusion about what to look at.
3. **30-second trust.** By the time a visitor reaches the first project, they should feel "this person is legit."
4. **Visual beauty through restraint.** Premium feel comes from typography, whitespace, and excellent image presentation — not complexity.

## Visual Language

| Property | Decision |
|---|---|
| Theme | Light (white background, dark text) |
| Accent color | Warm red ~#E8442A — used only on CTAs, hover states, small details |
| Display font | Plus Jakarta Sans — geometric, confident, pairs with Inter |
| Body font | Inter — clean, readable |
| Spacing | Generous — sections breathe, nothing cramped |
| Animation | Minimal: subtle scroll reveal only, no decorative motion |
| Image presentation | Large, staged — not trapped inside small cards |

## Page Structure

### Nav
- Left: Name/brand
- Right: Projects · About · Awards · Contact + "Get in touch" accent button
- Sticky, minimal glass blur on scroll
- Mobile: hamburger

### Hero
- Full-width, centered or left-aligned
- Large heading: name + role
- One-line tagline
- Two CTAs: "See my work" (primary) · "Get in touch" (ghost)
- No stats bar, no photo — clean and fast
- Subtle background texture or gradient optional

### Featured Projects (full-width sections, stacked)

**Looked**
- Left ~45%: Label ("Featured Product"), h2 title, 2-sentence description, tech tags, CTA buttons (Play Store, App Store, Case study)
- Right ~55%: Large phone screenshots on dark/neutral background, staged
- Full viewport width section with generous padding

**AkademikChatbot**
- Left ~45%: Label, h2 title, description, tech stack tags, "Case study →" link
- Right ~55%: Architecture diagram or screenshot — large, clearly legible
- Slightly different background tint to visually separate from Looked section

### Other Projects
- 3-column card grid: Optura · Jarvis · Poco Loco
- Each card: thumbnail (16:10) → title → one-line description → type tag → case study link
- Cards are clean, not bento — equal size, simple hover

### About
- 2-column: left = short bio (3–4 sentences max), right = meta info (location, education, languages, licenses)
- Optional: small photo
- No long paragraphs

### Contact
- 2-column: left = social links (email copy, LinkedIn, Upwork, GitHub) + CV downloads, right = contact form
- Heading: direct and human ("Let's work together" or "Get in touch")

### Footer
- Single line: name · tagline · year · back to top

## Component Inventory

| Component | Notes |
|---|---|
| Nav | Sticky, glass blur on scroll, hamburger mobile |
| Hero section | Text + 2 CTAs, no distractions |
| Project feature row | Reusable: text-left / visual-right, full width |
| Project mini card | Thumbnail + title + desc + link |
| About split | Bio left, meta right |
| Social link list | Email copy-to-clipboard + external links |
| Contact form | EmailJS integration, existing logic preserved |
| Scroll reveal | Subtle fade+rise on enter viewport |
| Custom cursor | Desktop only, accent colored |
| Scroll progress bar | 2px top bar |

## What Changes from Current Site

| Current (v6 bento) | New |
|---|---|
| Dark theme (#0D0D12) | Light theme (white) |
| Mint accent (#00D4AA) | Warm red (~#E8442A) |
| Bento grid layout | Linear scroll, full-width sections |
| Syne 800 display | Plus Jakarta Sans (display) + Inter (body) |
| Projects in small cards | Featured projects full-width, staged |
| Stats in hero | Stats removed from hero (or moved to About) |
| Photo in hero | Photo optional in About only |
| Complex multi-card layout | Single clear reading path |

## What Stays the Same

- All i18n strings (TR/EN toggle)
- EmailJS contact form logic
- Case study pages (projects/*.html) — untouched
- Custom cursor behavior
- Hamburger menu
- Scroll progress bar
- All data-i18n attributes and data-count attributes
- strings.js and script.js logic

## Success Criteria

A potential client referred from Upwork:
1. Lands → immediately understands "React Native & AI developer, Turkey"
2. Scrolls → sees Looked screenshots, thinks "this looks real and polished"
3. Continues → sees AkademikChatbot, thinks "technically deep"
4. Reaches contact → knows exactly how to reach out
5. Total time to trust: under 30 seconds

# BTP Digital Tech: website plan

Stack: **Next.js 15 (App Router, TypeScript)**, **GSAP 3 + ScrollTrigger**, **Lenis**, Tailwind CSS v4, `next-intl` (FR default, EN second).
Data source: `data/content.json` (collected from the Facebook page) plus `data/assets/` (logo and cover).

---

## 1. Art direction: "site de chantier" (construction site)

The goal is a site that feels like construction: blueprints, concrete, scaffolding. It should not look like a generic SaaS template.

| Token | Value | Use |
|---|---|---|
| `--blue` | `#1747B8` | logo blue: titles, links, blueprint grid |
| `--red` | `#E31B23` | logo red: small accents only (cursor, active state) |
| `--yellow` | `#F6C400` | logo yellow: safety tape, CTA, highlight |
| `--concrete` | `#E9E6E0` | page background (warm grey, not pure white) |
| `--ink` | `#14161A` | text, dark sections |

- **Type:** `Archivo` (headings, wide or condensed weights, close to the logo lettering) + `IBM Plex Mono` (dimensions, labels such as "R+3", "PK21", "95 %").
- **Motifs:** a faint blueprint grid behind sections, dimension lines (`├── 12.40 m ──┤`) as dividers, yellow/black hazard tape for the CTA band, and the **pixel squares from the logo** (red/yellow) as decorative elements that animate in.

## 2. Icons that don't look AI-generated

Avoid Lucide, Heroicons and the default outline sets. Those are what make sites look templated.

1. **Custom SVG set (main):** about 12 construction icons drawn in one style: 2.5px stroke, square caps, plus a small **offset colour block** (yellow or red square) behind each one, which echoes the logo. Icons: grue (crane), truelle (trowel), fer à béton (rebar), coffrage (formwork), plan/compas, casque, bétonnière, niveau à bulle, règle, maison R+3, ordinateur+plan (training), camion (import-export).
   Put them in `components/icons/*.tsx` as React components with a `size` prop and `currentColor`.
2. **Utility icons** (arrows, WhatsApp, phone, play, menu): **Phosphor Icons, "bold" weight** (`@phosphor-icons/react`). Its shapes are rounder and less common than Lucide.
3. Use **numbered labels instead of icons** where possible ("01 / Formation"). This looks more editorial and less like a template.

## 3. Sitemap

```
/                 Accueil (home)
/services         7 services (+ /services/[slug] later)
/realisations     project portfolio (Kotto R+3, piscine Kotto, Duplex PK21, Edéa…)
/conseils         "Conseils de chantier": the tip videos (reels) grouped by theme
/formation        BTP software training (service #1, a dedicated page for lead generation)
/contact          WhatsApp, phone, email, map of Douala
```

## 4. Home page sections and animations

| # | Section | Content | GSAP / Lenis effect |
|---|---|---|---|
| 1 | **Hero** | "Formation · Étude · Réalisation", logo, WhatsApp CTA | Title letters rise in like stacked blocks (SplitText, `stagger`, `y:100%`); pixel squares fly into place; blueprint grid draws in (`stroke-dashoffset`) |
| 2 | **Chiffres** | 6.8K followers, 7 services, projects delivered | Counters in Plex Mono, `ScrollTrigger` on enter |
| 3 | **Services** | 7 cards, numbered 01 to 07 | **Horizontal pinned scroll** (pin + `x` translate), each card shows its custom icon |
| 4 | **Du plan au bâtiment** | Kotto R+3 story: plan → gros œuvre → crépissage → livré | **Pinned scrollytelling:** a blueprint SVG morphs to a photo with `clip-path` reveal at each step; a progress bar in hazard-tape style |
| 5 | **Réalisations** | 4–6 featured projects | Image `clip-path: inset()` reveal + slight parallax (`yPercent`) |
| 6 | **Conseils** | 6 tip reels (fondation, ciment 42.5, permis 1/3…) | Vertical video cards; cards rise in with stagger; hover plays a muted preview |
| 7 | **Partenaires** | Laroche Construction + others | Slow marquee (GSAP `xPercent` loop, Lenis velocity skews it slightly) |
| 8 | **CTA** | "Parlons de votre projet" + WhatsApp | Yellow/black hazard band that scrolls sideways |
| 9 | **Footer** | Contacts, socials, Douala | — |

Lenis setup: one provider in `app/providers.tsx` with `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`.
Respect `prefers-reduced-motion`: disable Lenis and skip pins, so content simply appears.

## 5. Folder structure

```
btp-digital-tech/
├─ app/[locale]/(site)/page.tsx, services/, realisations/, conseils/, formation/, contact/
├─ app/providers.tsx          # Lenis + GSAP registration
├─ components/
│  ├─ icons/                  # custom SVG construction icons
│  ├─ motion/                 # SplitReveal, Parallax, PinnedHorizontal, Counter, Marquee
│  └─ sections/               # Hero, Services, Scrollytelling, Projects, Tips, CTA
├─ content/                   # content.json → typed via zod
├─ public/media/              # logo, re-hosted photos & videos (see §6)
└─ messages/fr.json, en.json
```

## 6. Content and media: important

- **Don't embed Facebook reels as the main media.** The Facebook embed is heavy, slow on Cameroon mobile data, and shows cookie banners. Instead, ask the client for the **original video and photo files**, compress them (MP4 H.264 720p + WebM, poster JPG), and host them in `/public/media` or on Cloudinary's free tier.
- Keep the Facebook link on each card ("Voir sur Facebook ↗") so the page still gets traffic.
- The logo is a 720px JPG. Ask for the vector (AI/SVG/PDF) or redraw it as SVG for a sharp header.
- Clean up the text: posts use Unicode "bold" letters (𝗱𝘂 𝟮𝟬…), so normalise them before display (already done in `content.json`).

## 7. Performance and SEO

- `next/image` everywhere, AVIF; videos `preload="none"` + poster, loaded only when in view.
- Load GSAP and its plugins only in client components; use dynamic import for the pinned sections.
- Lighthouse target: ≥ 90 on mobile (test on a 3G profile; it matters for Douala users).
- JSON-LD `LocalBusiness` / `GeneralContractor` (Douala, phone, email), FR/EN `hreflang`, OG image built from the logo.

## 8. Roadmap

| Phase | Content | Estimate |
|---|---|---|
| 0 | Get original media + vector logo + confirm texts from the client | — |
| 1 | Scaffold Next.js, Tailwind tokens, fonts, Lenis/GSAP provider, layout, header/footer | 0.5 day |
| 2 | Custom icon set (12 SVG) | 1 day |
| 3 | Home: hero, counters, services horizontal pin | 1.5 days |
| 4 | Scrollytelling "Du plan au bâtiment" + réalisations | 1.5 days |
| 5 | Conseils page (video grid + theme filters), formation, contact | 1 day |
| 6 | i18n EN, SEO, reduced-motion, mobile pass, Lighthouse | 1 day |
| 7 | Deploy on Vercel (free) + domain | 0.5 day |

## 9. Packages

```bash
npx create-next-app@latest btp-digital-tech --ts --tailwind --app --eslint
npm i gsap @gsap/react lenis @phosphor-icons/react next-intl zod clsx
```
(GSAP is now fully free, including SplitText and ScrollTrigger.)

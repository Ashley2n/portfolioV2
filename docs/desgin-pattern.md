# Design Pattern — portfolioV2

A description of the visual system actually implemented in this codebase today, written from the current source (`app/globals.css`, `lib/fonts/fonts.ts`, and the homepage/header/about components), not from a spec. Where the codebase expresses the same idea two different ways, that's called out as "current variance" rather than smoothed over.

## Philosophy

Dark-first, minimal, "premium." Black background, white as the only accent color — no brand hue anywhere in the UI chrome (color only shows up inside the WebGL background effects and the tech-stack skill-tag icons). Hierarchy is built almost entirely through **opacity**, not through a palette: full-white text for the thing you want read first, progressively more transparent white for everything supporting it. Surfaces read as frosted glass floating over the black page rather than as solid panels.

## Color system

Defined once in `app/globals.css` under `:root`, then re-exposed as Tailwind utilities via `@theme inline` (so `bg-background`, `text-foreground`, `bg-surface`, `border-border-subtle`, `text-text-muted`, `text-text-faint`, `bg-overlay`, `bg-surface-chip` all exist as real Tailwind classes, not just CSS variables):

| Token | Value | Used for |
|---|---|---|
| `--background` | `#0a0a0a` | page background |
| `--foreground` | `#ededed` | primary text |
| `--surface` | `rgba(0,0,0,0.4)` | glass panels — nav pill, dropdown, mobile drawer sheet |
| `--surface-blur` | `24px` | paired with `--surface` (`backdrop-blur-2xl` in practice) |
| `--border-subtle` | `rgba(255,255,255,0.08)` | default border on glass panels |
| `--border-strong` | `rgba(255,255,255,0.14)` | not yet used in the files reviewed — reserved for a more emphatic border state |
| `--text-muted` | `rgba(255,255,255,0.6)` | secondary text (nav links, body copy) |
| `--text-faint` | `rgba(255,255,255,0.4)` | tertiary text (captions, FAQ answers) |
| `--overlay` | `rgba(0,0,0,0.6)` | full-screen scrims (mobile menu backdrop) |
| `--surface-chip` / `--surface-chip-hover` | `rgba(255,255,255,0.03)` / `0.06` | small inline chips — icon swatches, skill tags |

**Current variance:** components also reach for ad hoc opacity utilities directly — `text-white/40`, `text-white/60`, `border-white/10`, `bg-white/[0.03]`, `bg-white/[0.04]`, `hover:bg-white/[0.06]` — instead of the named tokens above, even in cases where the value matches exactly (`text-white/60` ≈ `text-text-muted`). Both spellings currently coexist section-to-section; the token names are the more intentional/newer layer, the raw opacity utilities are the older layer from before the token system existed.

## Typography

Three type families, each with a distinct job:

- **Teko** (`font-teko`, weight 400) — the display face. Used once, at enormous scale, for the hero name (`text-[7rem] md:text-[8.6rem] xl:text-[14.8rem]`, uppercase, bold, tight tracking) and again small/italic for the header logo mark ("Aa"). This is the one place the design allows a condensed, attention-grabbing typeface.
- **Poppins** (`font-poppins`, weights 300/400/600/700/900, italic + normal) — the body/UI workhorse, applied at the `body` level as the default `font-family`.
- **Geist** — applied at the `html` level via `font-sans` + `geist.variable`, sitting underneath Poppins in the cascade. In practice Poppins wins for body text since it's set closer to the content; Geist is the fallback/base layer.
- **Chela One** is imported and configured in `lib/fonts/fonts.ts` but not wired into `layout.tsx` — a reserved fourth font that isn't actually rendering anywhere yet.

Heading weight is consistently `font-medium` or `font-semibold` with tight tracking (`tracking-tight`) — nothing goes to `font-bold` except the hero name. Section labels ("Selected work," "Technologies") use a small, uppercase, wide-tracked style: `text-xs uppercase tracking-[0.2em] text-white/40`.

## Layout & spacing

Three reusable classes in `globals.css` carry all page-level rhythm — this is the system that replaced per-page, hand-tuned padding:

- **`.section-y`** — `py-24 md:py-32`. Every homepage content section (Projects, Tech Stack, FAQ, Pitch) uses this and nothing else for vertical spacing. The Hero is the one deliberate exception (full-bleed, `h-screen`).
- **`.page-container`** — `mx-auto max-w-7xl px-6 md:px-10`. The shared horizontal column every section's content sits inside, so left/right edges stay aligned as you scroll.
- **`.page-shell`** — same horizontal column as `.page-container`, plus top clearance for the fixed header and bottom rhythm (`pt-32 pb-24 md:pt-40 md:pb-32`). Used by standalone pages (About, Projects) instead of `.section-y`.
- **`.snap-section`** — opts a section into scroll-snap (`scroll-snap-align: start; scroll-snap-stop: always`). Paired with `scroll-snap-type: y proximity` set globally on `html` (proximity rather than mandatory, since sections are content-sized, not locked to `100vh`).

Grids default to `grid-cols-1` on mobile, stepping up through `md:grid-cols-2` to `lg:grid-cols-3`, with `gap-5` to `gap-x-8 gap-y-2` depending on density.

## Surface & elevation

A single "floating glass" treatment is reused for every panel that needs to sit above content: `bg-surface backdrop-blur-2xl border border-border-subtle`, optionally with an inset highlight + drop shadow (`shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.4)]`). This exact combination appears on the scrolled header pill, the desktop nav dropdown, and the mobile drawer sheet — one visual language, three components.

Corner radius scales with the size of the thing: `rounded-full` for pill-shaped nav/buttons, `rounded-2xl` for cards and large panels, `rounded-xl`/`rounded-lg` for smaller chips and buttons.

## Motion (Framer Motion)

One easing curve is used almost everywhere: `[0.22, 1, 0.36, 1]` — an "ease-out-expo"-style curve (fast start, long soft settle) — applied consistently across both CSS transitions (as a Tailwind arbitrary value, `ease-[cubic-bezier(0.22,1,0.36,1)]`, in the header) and Framer Motion's `transition.ease`.

Two recurring entrance shapes:

1. **Single-block fade-up** — a heading or standalone block: `initial={{opacity:0, y:24}}`, `whileInView={{opacity:1, y:0}}`, `transition={{duration:0.6, ease:[0.22,1,0.36,1]}}`, `viewport={{amount:0.3}}`.
2. **Staggered list** — a `motion.ul` with `variants={listVariants}` (`hidden:{}`, `show:{transition:{staggerChildren:0.06–0.08}}`) wrapping `motion.li` children with `variants={itemVariants}` (`hidden:{opacity:0,y:16-24}`, `show:{opacity:1,y:0,duration:0.4-0.5}`). Used for the Projects grid, Tech Stack list, FAQ list, and the mobile nav drawer's link list.

**Current variance:** `viewport.once` is `true` on the Projects/Tech-Stack/FAQ *headings* and the header's own animations, but `false` on the Tech Stack/FAQ/Pitch/About *lists* and the Pitch/About hero-style blocks — so some content re-plays its entrance every time it re-enters the viewport, and some plays once and stays. Worth deciding intentionally per-section rather than per-file.

The header additionally uses `AnimatePresence` for real mount/unmount transitions on the mobile menu (backdrop fade + sheet slide, `duration:0.3`), and drives its own show/hide-on-scroll via `animate={{y: isHidden ? "-100%" : "0%"}}` on a fixed `motion.header`.

## Interactive states

- **Text links**: `text-white/60` (or `text-text-muted`) resting → `hover:text-white`.
- **Row/chip hover**: background wash `hover:bg-white/[0.04]` to `hover:bg-white/[0.06]`, occasionally paired with a border brighten (`border-white/10` → `group-hover:border-white/20`).
- **Directional icon cue**: an arrow (`ArrowRight`/`ArrowUpRight` from `lucide-react`) that translates on hover — `group-hover:translate-x-1` — used on every "view more" style link (Projects "View all," Tech Stack rows, the CTA button).
- **Primary CTA button**: consistently a light pill on the dark page — white/near-white background, dark text, `rounded-md`/`rounded-lg`/`rounded-xl`, subtle shadow, `hover:scale-[1.04] active:scale-95`. Implemented three separate times with slightly different styling (`ContactMeButton.tsx`, the header's inline "Contact Me" button, `actionButton.tsx`) — same design intent, not yet consolidated into one shared button component.

## Background effects

WebGL/canvas background components (`Particles`, `LightRays`, `Ferrofluid`, `DarkVeil`, `LightPillar`, `LiquidEther`) live in `components/Backgrounds/` and are treated as vendored third-party code (sourced from "reactbits") — **the established rule is these files are never edited directly.** When a background needs to sit correctly behind content, the fix goes in the *calling* component instead: wrap the effect in the caller's own `<div className="absolute inset-0 z-0">`, and add a separate overlay `<div aria-hidden className="absolute inset-0 ... pointer-events-none" />` with a radial or linear gradient to keep foreground text legible without blocking pointer events to the effect underneath. `HomePagePitch.tsx` and `AboutMeCardItem.tsx` are the two current examples of this pattern.

## Component conventions

- Sections that render a list (`Projects`, `Tech Stack`, `FAQ`) all follow the same shape: a section-level component owns the heading + `motion.ul`, and a separate exported sub-component (`TechStackItem`, `QuestionItem`, the inline `Cards`) owns a single row/card's markup, keyed by a stable field from the data (`item.title`, `item.name`, or index for FAQ).
- Card imagery uses `next/image` with `fill` inside a `relative aspect-[16/10] overflow-hidden rounded-2xl` wrapper, plus a `sizes` prop for responsive loading, and a hover treatment on the image itself (`scale-105` resting, `group-hover:scale-110` plus a slight translate).
- Decorative, non-interactive layers (gradient overlays, the particles container) are marked `aria-hidden` and `pointer-events-none` so they never intercept clicks or get announced to screen readers; icon-only buttons carry an explicit `aria-label`.
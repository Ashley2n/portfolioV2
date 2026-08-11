# SEO Optimization Guide — portfolioV2

A step-by-step set of SEO improvements for this site, in priority order. Each section shows a standard/example implementation and calls out exactly what needs to be swapped for your own information. None of this has been implemented yet — this is a reference to work from.

Current baseline (for context): `app/layout.tsx` exports one static `metadata` object shared by every route — title `"Ashley's Portfolio"`, one generic description, no Open Graph, no structured data, no `sitemap.ts`/`robots.ts`. That's the starting point every section below improves on.

---

## 1. Page Metadata (Titles & Descriptions)

**Why it matters:** the title tag is the single strongest on-page signal for both ranking and click-through. A generic title like "Ashley's Portfolio" tells Google nothing about who you are or what you do. Each route should have its own title/description targeting a different search intent (your name, your role, "hire a developer in Iowa," etc.).

**Standard example — root layout (`app/layout.tsx`):**

```tsx
export const metadata: Metadata = {
  title: {
    default: "Ashley Abongwa — Full-Stack Software Developer",
    template: "%s | Ashley Abongwa",
  },
  description:
    "Portfolio of Ashley Abongwa, a full-stack developer building with React, Python, and .NET. Based in Iowa. View projects, tech stack, and get in touch.",
  keywords: ["Ashley Abongwa", "Full-Stack Developer", "React Developer", "Iowa Software Developer"],
};
```

**Standard example — a per-page override (server component only):**

```tsx
// app/about/page.tsx
export const metadata: Metadata = {
    title: "Contact",
    description: "Full-stack developer recent graduate in Software Development — background, interests, and skills.",
};
```

**⚠️ Constraint specific to this codebase:** `app/projects/page.tsx` and `app/contact/page.tsx` are currently `"use client"` files. Next's Metadata API only works in Server Components, so as written those two routes cannot export their own `metadata` — they'll keep inheriting the root layout's title/description. To fix this, split each into a thin server-component `page.tsx` (owns the `metadata` export) that renders a client child component (owns the interactive logic — search state, the form). This is worth doing before anything else in this list, since it unlocks per-page targeting for two of your four routes.

**Personalize:**
- Title wording for each route (Home / About / Projects / Contact) — should read naturally, include your name once site-wide, and vary the role/keyword angle per page.
- Description copy — 150–160 characters, written for humans first (it's your search-result snippet).
- `keywords` array — optional in practice (most engines ignore it now), but harmless to include your real skill list.

---

## 2. Structured Data (JSON-LD `Person` Schema)

**Why it matters:** this is the highest-leverage item for *name* searches specifically. It tells Google, unambiguously, that this page represents a real person named "Ashley Abongwa" with a specific job title, skill set, and linked profiles — the foundation for how search engines build an "entity" around you rather than just indexing text.

**Standard example** — add as a small component rendered once in `app/layout.tsx`:

```tsx
// components/seo/PersonJsonLd.tsx
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashley Abongwa",
    url: "https://your-domain.com",
    jobTitle: "Full-Stack Software Developer",
    address: {
      "@type": "PostalAddress",
      addressRegion: "IA",
      addressCountry: "US",
    },
    alumniOf: "Indian Hills Community College",
    knowsAbout: ["React", "Python", "Flask", "C#", ".NET", "Java", "Tailwind CSS"],
    sameAs: [
      "https://github.com/Ashley2n",
      "https://www.linkedin.com/in/your-linkedin-handle",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Then render `<PersonJsonLd />` once inside `<body>` in `app/layout.tsx`.

**Personalize:**
- `url` — your live production domain.
- `sameAs` — every real profile URL (GitHub is already confirmed as `Ashley2n`; add your actual LinkedIn URL, and any dev.to/X/portfolio-adjacent profile you use).
- `knowsAbout` — keep this matched to what's actually true and demonstrated in your `TechStackData` (`lib/contants.ts`), so it doesn't overclaim.
- `jobTitle` — match whatever title you're using on LinkedIn/resume for consistency.

---

## 3. `sitemap.xml` & `robots.txt`

**Why it matters:** without these, there's nothing explicitly telling Google which routes exist or that it's welcome to crawl them. Next.js 15 (App Router) generates both automatically from simple file conventions — no separate package needed.

**Standard example — `app/sitemap.ts`:**

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://your-domain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
```

**Standard example — `app/robots.ts`:**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
```

**Personalize:**
- Replace `BASE_URL`/domain in both files with your actual production URL once deployed.
- Update the `routes` array in `sitemap.ts` any time you add a new top-level page.
- After deploying, submit the sitemap URL (`your-domain.com/sitemap.xml`) to Google Search Console and Bing Webmaster Tools.

---

## 4. Open Graph & Twitter Card Images

**Why it matters:** without this, any link to your portfolio shared on LinkedIn, X, or in an email application shows up as a bare, imageless link. A proper preview card is a small thing that makes a real difference in how professional a shared link looks.

**Standard example — extend the root `metadata` object:**

```tsx
export const metadata: Metadata = {
  // ...title, description from Section 1
  openGraph: {
    title: "Ashley Abongwa — Full-Stack Software Developer",
    description: "Portfolio, projects, and tech stack of Ashley Abongwa.",
    url: "https://your-domain.com",
    siteName: "Ashley Abongwa",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashley Abongwa — Full-Stack Software Developer",
    description: "Portfolio, projects, and tech stack of Ashley Abongwa.",
    images: ["/og-image.png"],
  },
};
```

**Personalize:**
- Create an actual `og-image.png` (1200×630px) — a simple branded card with your name/role works fine — and drop it in `/public`.
- Swap the `url`/domain once deployed.
- If you split metadata per-page (Section 1), each page can override `openGraph.title`/`description` with page-specific copy.

---

## 5. `metadataBase` & Canonical URLs

**Why it matters:** relative image paths (like `/og-image.png` above) won't resolve correctly in Open Graph tags without a `metadataBase` set — Next needs an absolute base to build the final URL from. This also prevents duplicate-content issues if the site is ever reachable at multiple URLs (e.g., with and without `www`).

**Standard example:**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  // ...rest of metadata
};
```

**Personalize:**
- The one thing to change is the domain — pick your canonical one (e.g., decide once whether it's `ashleyabongwa.dev` or `www.ashleyabongwa.dev`) and use it consistently everywhere.

---

## 6. Semantic Heading Structure (one `<h1>` per page)

**Why it matters:** search engines weight `<h1>` content as a strong statement of "what is this page about." Right now, `/about` has no `<h1>` at all (`AboutMeCardItem.tsx` uses only `<p>` tags) and `/contact` tops out at an `<h2>` ("Contact Me"). Every page should have exactly one clear, keyword-relevant `<h1>`.

**Standard example:**

```tsx
// In AboutMeCardItem.tsx, promote the intro line:
<h1 className="text-xs font-medium uppercase tracking-[0.2em] text-text-faint">
  Software Developer — Iowa, US
</h1>
```

*(Visually this can stay styled exactly as it is now — this is about the semantic tag, not the look.)*

**Personalize:**
- Decide the exact wording per page — it should describe that specific page, not repeat your homepage `<h1>` verbatim (Home already correctly uses "Ashley Abongwa" as its `<h1>` in `HomepageHero.tsx`).

---

## 7. Real Content Over Placeholder Text

**Why it matters:** search engines index what's actually in the DOM. Lorem ipsum text can't rank for any real skill or interest term, and it reads poorly to any employer who does land on the page before you've swapped it out.

**Where this still applies today:**
- The "Cooking" card in `AboutCardListing`'s data (`lib/contants.ts` → `aboutData`) is still lorem ipsum.
- Any other placeholder copy you add going forward — treat it as a launch blocker, not a "later" item.

**Personalize:** write one real sentence or two per remaining placeholder, in your own voice, following the tone already established in the other three cards (Health/Entertainment/Music).

---

## 8. Descriptive Alt Text

**Why it matters:** alt text is both an accessibility requirement and a minor but real SEO signal (image search, context for the surrounding content).

**Standard example (already done correctly in most places, e.g. `ProjectCard.tsx`):**

```tsx
<Image src={item.imageUrl} alt={item.title} />
```

**Personalize:** if you ever add a personal headshot or any image that isn't self-evidently described by a `title`/`name` field, write a specific alt string rather than reusing a generic one — e.g. `alt="Ashley Abongwa, full-stack developer, headshot"` rather than `alt="profile photo"`.

---

## 9. Performance / Core Web Vitals

**Why it matters:** Google's page-experience signals factor real load/interactivity metrics (LCP, INP, CLS) into ranking. This site runs WebGL/canvas backgrounds (`LiquidEther`, `DarkVeil`, `Particles`) on nearly every route — worth confirming they aren't tanking your Lighthouse score.

**Standard example — defer a heavy background component:**

```tsx
import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/Backgrounds/LiquidEther"), {
  ssr: false,
});
```

**Personalize:**
- Run Lighthouse (Chrome DevTools → Lighthouse tab) against the deployed site once live, and note actual LCP/INP numbers before deciding which backgrounds need deferring — don't guess.
- Apply the `dynamic(..., { ssr: false })` pattern to whichever specific background components turn out to be the bottleneck.

---

## 10. Off-Site Signals (Backlinks & Entity Consistency)

**Why it matters:** none of this lives in the codebase, but it's what actually gets a name search to surface your site in the first place. Search engines partly trust an identity based on consistent signals across the web.

**Personalize (checklist, not code):**
- LinkedIn "Featured" section and "Website" field both point to your live portfolio URL.
- GitHub profile README links to the portfolio.
- Resume PDF (see Section 11) includes the portfolio URL.
- Your name is spelled identically ("Ashley Abongwa") across LinkedIn, GitHub, and the site — small variations (nicknames, missing middle initial, etc.) split the entity signal.

---

## 11. Verify the Résumé Link Isn't Broken

**Why it matters:** this isn't SEO exactly, but it's the first thing an employer clicks, so it belongs on this list. The header (`components/layout/header.tsx`) links to `/resume.pdf`, but no `resume.pdf` was found in `public/` as of this review.

**Personalize:** drop your actual résumé PDF at `public/resume.pdf` (or update the header link to wherever it actually lives) and click-test it on the deployed site.

---

## Quick-Reference Checklist

| # | Item | Effort | Status |
|---|---|---|---|
| 1 | Rewrite root metadata + split `/projects` & `/contact` for per-page metadata | Medium | Not started |
| 2 | Add `Person` JSON-LD structured data | Low | Not started |
| 3 | Add `app/sitemap.ts` + `app/robots.ts` | Low | Not started |
| 4 | Add Open Graph / Twitter card image + metadata | Low | Not started |
| 5 | Set `metadataBase` | Low | Not started |
| 6 | Add a proper `<h1>` to About and Contact pages | Low | Not started |
| 7 | Replace remaining lorem ipsum (Cooking card, etc.) | Low | Not started |
| 8 | Double-check alt text on any new images | Ongoing | Not started |
| 9 | Lighthouse pass on deployed site; defer heavy backgrounds if needed | Medium | Not started |
| 10 | Align LinkedIn/GitHub/resume links + name spelling | Low | Not started |
| 11 | Confirm `/resume.pdf` isn't a broken link | Low | Not started |

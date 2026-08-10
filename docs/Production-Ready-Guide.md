# Production-Ready Guide — portfolioV2

What's left to take this from "runs locally" to "production-ready," in priority order. Already done and not repeated below: `.env.local`, first Prisma migration (`ContactSubmission`), per-page metadata, `sitemap.ts`/`robots.ts`, JSON-LD — see `SEO-Optimization-Guide.md` for that track.

---

### 1. Fix the DB connection string
**Principle:** serverless can't share one long-lived connection like local dev does — the running app needs the *pooled* connection; only migrations need the *direct* one.

**Fix:** `lib/prisma.ts` currently uses `DIRECT_URL`. Swap it:
```ts
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
```
No personalizing needed — both values already exist in `.env.local`.

---

### 2. Finish the review submissions feature
Reviewed your `ReviewSubmission` model — it's fine as-is, matches `ContactSubmission`'s `cuid()`/index pattern. Two things left before it actually works:

**Fix 1 — migrate it** (schema has the model, but no migration includes it yet):
```
npx prisma migrate dev --name add-review-submission
```

**Fix 2 — wire the query** in `lib/services/contact.queries.ts` (`createReviewSubmission` is a stub that never touches the DB, and `GetAllReviewSubmissions` still queries `contactSubmission` by mistake):
```ts
export const createReviewSubmission = async (data: reviewFormType) => {
  return prisma.reviewSubmission.create({ data });
};

export const GetAllReviewSubmissions = async () => {
  return prisma.reviewSubmission.findMany();
};
```

---

### 3. Generate the Prisma client on every deploy
**Principle:** gitignored generated code only works if every environment regenerates it — Vercel's build won't unless told to.

**Fix**, in `package.json`:
```json
"postinstall": "prisma generate"
```

---

### 4. Document env vars
**Fix:** commit `.env.example` (names only):
```
DATABASE_URL=
DIRECT_URL=
```
**Personalize:** nothing in the file — just set real values in Vercel's dashboard (Production + Preview) once deployed.

---

### 5. Error boundaries
**Principle:** an unhandled render error currently falls back to Next's generic error screen.

**Fix:** add `app/error.tsx` and `app/not-found.tsx` (styled, on-brand versions of each).

---

### 6. Harden the public forms
**Principle:** a public contact/review form is a spam target the moment it's indexed.

**Fix:** rate-limit both server actions (IP-based, or Upstash Ratelimit), and add basic headers in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`).

---

### 7. Repo hygiene
- `validated.error.flatten` → `validated.error.flatten()` in `action.ts` (both `submitContact` and `submitReview` have this).
- Delete `components/ui/FormComponent.tsx` and `components/ui/Form/MailFromInput.tsx` — confirmed unused now that `ContactForm.tsx` handles both forms.
- Add `.idea/` to `.gitignore`.
- Delete or move `../script/test.ts` / `../script/apitest.ts` into a `scripts/` folder.

---

### 8. SEO — mostly shipped
Full guide: `SEO-Optimization-Guide.md`. What's live already: metadata, per-page titles, JSON-LD, sitemap/robots. Two TODOs already marked in `app/layout.tsx`: swap the placeholder `your-domain.com` (2 spots) for your real domain, and add `/public/og-image.png`.

---

### 9. Stretch goals
- CI: a minimal `.github/workflows/ci.yml` running lint + typecheck + build on every PR.
- Tests: a couple of Playwright smoke tests (homepage loads, contact form submits, nav works).

---

## Checklist

- [ ] `lib/prisma.ts` → `DATABASE_URL`
- [ ] Migrate `ReviewSubmission`
- [ ] Wire `createReviewSubmission` / fix `GetAllReviewSubmissions`
- [ ] `postinstall: "prisma generate"`
- [ ] `.env.example` committed + Vercel env vars set
- [ ] `app/error.tsx` + `app/not-found.tsx`
- [ ] Rate limiting + security headers
- [ ] Fix `.flatten()` calls
- [ ] Delete `FormComponent.tsx`, `MailFromInput.tsx`, `../script/test.ts`, `../script/apitest.ts`
- [ ] `.idea/` in `.gitignore`
- [ ] Swap `your-domain.com` + add `og-image.png`
- [ ] (Stretch) CI workflow
- [ ] (Stretch) Playwright smoke tests

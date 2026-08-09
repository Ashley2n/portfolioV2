# Making portfolioV2 Production-Ready

This is organized as two tracks. Track 1 gets the app running correctly on your machine today. Track 2 is the actual lesson: what changes between "runs on my laptop" and "runs in production," using your repo as the worked example. Target deploy is Vercel, DB is Supabase (Postgres) — the advice below is tailored to that pair.

---

## Track 1 — Local-Ready

Get `/contact` rendering and the DB actually connected.

1. **Create `.env.local`** in the project root (already gitignored via `.env*`, so this is safe):
   ```
   DATABASE_URL="<supabase pooled connection string>"
   DIRECT_URL="<supabase direct connection string>"
   ```
   In the Supabase dashboard: Project Settings → Database → Connection string. You'll see both a "Transaction pooler" (port 6543) and a "Direct connection" (port 5432) string — grab both. Why you need both is Track 2, section 1 below.

2. **Generate the Prisma client**: `npx prisma generate`. This creates `lib/generated/prisma`, which is gitignored and currently missing — that's the exact reason `/contact` fails to render.

3. **Create the table**: `npx prisma migrate dev` (or `npx prisma db push` if you don't want migration history files yet).

4. **Restart** `npm run dev`.

---

## Track 2 — Production-Ready

Each section: the general principle, what's currently in this repo, and the concrete fix.

### 1. Database connections need to be architected differently for serverless

**Principle:** A local dev server is one long-running process with one DB connection. Vercel runs your app as many short-lived serverless functions — every request can spin up a fresh function instance, and each one that touches Prisma opens its own DB connection. Postgres has a hard connection limit (Supabase's free/small tiers cap in the dozens). Under real traffic, "one connection per request" exhausts that limit fast. This is one of the most common ways a portfolio site that works fine locally falls over the moment it gets real visitors.

**What's in the repo:** `lib/prisma.ts` passes `DIRECT_URL` straight into the `PrismaPg` adapter — that's the *direct* (unpooled) Postgres connection, used for every single query the app runs at runtime.

**The fix:** Use two separate connection strings, each for a different job:
- `DATABASE_URL` — Supabase's **pooled** connection (port 6543, via Supavisor/PgBouncer). This is what your running app should use for every query.
- `DIRECT_URL` — Supabase's **direct** connection (port 5432). This is only for `prisma migrate`/`db push`, which need to run DDL and can't go through a transaction-mode pooler.

Concretely: change `lib/prisma.ts` to read `process.env.DATABASE_URL` for the adapter's `connectionString`, and leave `prisma.config.ts`'s `datasource.url` pointed at `DIRECT_URL` (that one's only read by the Prisma CLI, never by your running app).

### 2. Generated code can't be gitignored *and* forgotten from the build step

**Principle:** Anything a build step generates (a Prisma client, generated types, compiled assets) is fine to gitignore — but only if every environment that runs the app also runs the generator. Local dev "just works" because you ran `prisma generate` by hand once. A fresh Vercel build clones a clean checkout and runs `npm install && next build` — nothing tells it to generate the Prisma client first.

**What's in the repo:** `/lib/generated/prisma` is correctly gitignored, but `package.json`'s `build` script is just `"next build"` — no generate step.

**The fix:** Add a `postinstall` script so it runs automatically after every `npm install` (which Vercel always runs before building):
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### 3. Environment variables are per-environment, not global

**Principle:** In production you'll want different values for different contexts — a Preview deploy (every PR gets its own URL) probably shouldn't hit the same DB rows as Production. Vercel's dashboard has three scopes per env var: Development, Preview, Production.

**What's in the repo:** No `.env.example`, so there's no documentation of which variables the app needs — anyone (including future you) has to read the source to figure it out.

**The fix:** Commit a `.env.example` with the variable names and no real values:
```
DATABASE_URL=
DIRECT_URL=
```
Then in Vercel: Project Settings → Environment Variables, add `DATABASE_URL` and `DIRECT_URL` for the Production scope (and Preview, if you want PR previews to hit a real DB — often people point Preview at a separate Supabase branch/project so a bad PR can't touch real data).

### 4. Validate env vars at startup, not with a runtime crash

**Principle:** Right now, a missing/misnamed env var fails deep inside a request (a Prisma connection error inside a server action) instead of failing loudly at boot. In a larger app you'd validate `process.env` against a schema once, at the top of the module, so a bad deploy fails immediately and obviously instead of intermittently in production.

**The fix (optional but a good habit):** a tiny `lib/env.ts`:
```ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```
Then import `env.DATABASE_URL` instead of `process.env.DATABASE_URL` directly.

### 5. Error boundaries and structured logging

**Principle:** `console.error` is fine in dev — you're watching the terminal. In production nobody is watching the terminal; you need errors to go somewhere you'll actually see them.

**What's in the repo:** `app/contact/action.ts` catches errors and logs via `console.error`, which is a reasonable start, but there's no `app/error.tsx` or `app/not-found.tsx`, so an unhandled render error shows Next.js's generic error screen instead of something on-brand.

**The fix:**
- Add `app/error.tsx` (client component, catches render errors for a route segment) and `app/not-found.tsx` (styled 404).
- For actual production error visibility, Vercel has a free tier of native log drains, or add Sentry's Next.js SDK (a few lines in `next.config.ts` via `@sentry/nextjs`) — probably overkill for v1 of a portfolio, but worth knowing it's the standard next step.

### 6. Security headers and abuse protection

**Principle:** A public contact form is a spam target the moment it's indexed. Production apps add basic hardening that a local dev environment never needs.

**What's in the repo:** Server-side zod validation on the contact form already exists in `action.ts` — that part's already correct and is the most important piece (never trust client-side validation alone). What's missing is rate limiting and response headers.

**The fix:**
- Rate-limit the server action (even a simple in-memory/IP-based limiter, or Vercel's `@vercel/firewall` / Upstash Ratelimit for something durable across function instances) so a script can't hammer your DB with fake submissions.
- Add basic security headers in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` at minimum) via the `headers()` config function.

### 7. SEO and metadata

**Principle:** For a portfolio, this *is* a chunk of the product — it's how it shows up when someone shares your link or when a recruiter searches your name.

**What's in the repo:** `app/layout.tsx` has a basic `title`/`description`, which is good, but there's no `metadataBase`, no Open Graph/Twitter card image, no `robots.ts` or `sitemap.ts`, and `public/` still has the default `create-next-app` placeholder SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) that aren't used anywhere.

**The fix:**
- Expand the `metadata` export with `metadataBase: new URL("https://your-domain.com")` and an `openGraph`/`twitter` block pointing at a real screenshot/image of the site.
- Add `app/sitemap.ts` and `app/robots.ts` (Next.js has built-in support — they're just exported functions, no extra package).
- Delete the unused default SVGs from `public/`.

### 8. CI: catch mistakes before they're live

**Principle:** Right now, a typo that breaks the build is discovered when Vercel's deploy fails (or worse, isn't caught at all if it's a lint-only issue). A CI check on every PR catches this before it merges.

**What's in the repo:** No `.github/workflows/`. Note: once this repo is connected to Vercel via Git, Vercel *already* gives you a form of CI for free — every push gets a full `next build` and every PR gets its own preview URL. That's most of the value already. A GitHub Actions workflow is the next increment on top of that (fails fast, before even reaching Vercel, and can also run lint/typecheck which Vercel's build doesn't fail on the same way).

**The fix (optional next step):** a minimal `.github/workflows/ci.yml` running `npm ci`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` on every PR.

### 9. Testing

**Principle:** Manual verification (reading the code, clicking through the site) doesn't scale as the site grows, and it's exactly what caught the bugs in this project so far. A small automated safety net catches regressions for free going forward.

**What's in the repo:** No test runner configured at all. `test.ts` and `apitest.ts` at the project root are ad hoc manual scripts (not part of any test framework, not run by anything automated) — worth either deleting or moving into a `scripts/` folder so they're clearly "manual debug tools," not confused with real tests.

**The fix (proportionate to a portfolio site):** You don't need a huge test suite here. A reasonable minimum: Playwright for a couple of smoke tests (homepage loads, contact form submits and shows a success state, nav links work). That alone would have caught several of the JSX/logic bugs found earlier in this project automatically.

### 10. Repo hygiene

Small things that don't affect functionality but are part of what "production-grade" looks like in the codebase itself:
- `.idea/` (JetBrains project config) isn't in `.gitignore` — add it, since it's local-editor-specific and shouldn't be shared.
- `app/contact/action.ts` has `validated.error.flatten` without calling it (`validated.error.flatten()`) — currently returns the function reference instead of the error object.
- `components/ui/FormComponent.tsx` and `components/ui/Form/MailFromInput.tsx` look like an earlier, abandoned attempt at the contact form (uncontrolled inputs, nothing wires them up) — confirm nothing imports them, then delete.
- `test.ts` / `apitest.ts` at the root — move to a `scripts/` folder or delete.

---

## Quick checklist

- [ ] `.env.local` with `DATABASE_URL` (pooled) + `DIRECT_URL` (direct)
- [ ] `npx prisma generate`
- [ ] `npx prisma migrate dev`
- [ ] `lib/prisma.ts` uses `DATABASE_URL`, not `DIRECT_URL`, for the runtime adapter
- [ ] `postinstall: "prisma generate"` in `package.json`
- [ ] `.env.example` committed
- [ ] Env vars set in Vercel dashboard (Production + Preview scopes)
- [ ] `app/error.tsx` + `app/not-found.tsx`
- [ ] Rate limiting on the contact form
- [ ] Security headers in `next.config.ts`
- [ ] `metadataBase` + Open Graph image + `sitemap.ts` + `robots.ts`
- [ ] Delete unused default SVGs in `public/`
- [ ] `.idea/` added to `.gitignore`
- [ ] Fix `validated.error.flatten()` in `action.ts`
- [ ] Delete or relocate `FormComponent.tsx`, `MailFromInput.tsx`, `test.ts`, `apitest.ts` if unused
- [ ] (Stretch) GitHub Actions CI: lint + typecheck + build on PR
- [ ] (Stretch) A couple of Playwright smoke tests
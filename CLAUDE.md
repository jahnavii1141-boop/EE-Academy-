# The Extended Essay Academy — working notes for Claude

Next.js 15 App Router site. **Read this before touching the dashboard, the sidebar nav,
or any route.** Features have been accidentally orphaned during rebuilds (the Pathway
Finder and the Study Calendar both lost their only link when the dashboard was rebuilt
"course-first"). This file is the guardrail against that — keep it current.

## GOLDEN RULE — never orphan a route
Every user-facing route in the registry below must keep a **reachable link**. Before you
rebuild the dashboard, edit the sidebar nav (`app/dashboard/layout.jsx`), or delete a
component that links somewhere, check that each route here still has an entry point.
"The component/route still exists" is NOT enough — if nothing links to it, users can't
reach it and it's effectively gone. If a change would drop an entry point, re-add it
(usually to `NAV_TOOLS` in the sidebar) in the same change.

## Tools & routes registry
Sidebar nav is defined in `app/dashboard/layout.jsx` → `NAV_MAIN` / `NAV_TOOLS` / `NAV_MORE`.

| Tool / page | Route | Entry point | Access |
|---|---|---|---|
| Course lessons | `/course/[moduleId]` | Home card, landing, guide CTAs | Lessons 1–5 free; rest paid |
| Guides list | `/dashboard/modules` | Sidebar "Guides" | signed-in |
| Example EE (32/34) | `/dashboard/sample-ee` | Sidebar | paid |
| My Essay (editor) | `/dashboard/essay` | Sidebar | signed-in |
| EE Dump | `/dashboard/dump` + public `/dump` | Sidebar + guide CTAs | free preview (7 sources), then paid |
| EE Planner | `/dashboard/planner` + `/planner` | Sidebar (Free) | free (signed-in) |
| EE Pathway Finder | `/dashboard/tools` | Sidebar (Free) | free — **re-linked 2026-08, was orphaned** |
| Study Calendar | `/study-calendar` (iframes `public/tools/study-calendar.html`) | Sidebar (Free) | free (signed-in) — **re-linked 2026-08, was orphaned** |
| Templates & SOPs | `/dashboard/templates` | Sidebar | paid |
| IB Official EE Guide | `/dashboard/ib-guide` | Sidebar (Free) | free |
| Share w/ supervisor | `/dashboard/share` + public `/share/[token]` | Sidebar / "My Essay" | free tier |
| AI agent | `/dashboard/agent` | agent flows | premium (`tier==='premium'`) |
| Grade Scan | `/dashboard/scan` | (verify entry point before relying on it) | — |
| Onboarding | `/onboarding` | post-checkout / sign-up | skippable for free users |

Static tool HTML lives in `public/tools/` (`planner.html`, `ee-dump.html`, `study-calendar.html`) and is iframed by the routes above.

Dead/unused components (safe to ignore, not rendered): `HomeOffer.jsx`, `Testimonials.jsx`, `MissionMap.jsx`, `EvervaultCTA` links may be stale — do not treat as live entry points.

## Pricing — single tier
"The full course" — **$89 one-time, lifetime access** ("$89 for the first 50 students, then $99").
- Displayed price = `PRICING.course.price` in `src/config/paddle.js`.
- The amount **charged** comes from the Paddle price ID `NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID` — it must equal the displayed price. **Never change the price ID in code to "fix" a mismatch; flag it** (Paddle prices are immutable — a new price means a new ID).
- The old $149 Premium Paddle price is kept for historical buyers; the site no longer references it.
- Free tier = EE Planner + Research Question Checker + first free lessons.
- Entitlement caveat: the AI guide (Guide 12) and AI agent are still gated to `tier==='premium'`, so a $89 buyer (tier `basic`) is paywalled there until that mapping is changed — owner decision pending.

## Deploy workflow
Work on branch `feat/dashboard-missions`. Gate every deploy on `npm run build` (must exit 0).
Then `git checkout main && git merge --ff-only feat/dashboard-missions && git push origin main`
(Vercel auto-deploys). Verify with `/usr/bin/curl` (plain `curl` fails inside loops/subshells).
Edge propagation lags ~1–2 min; a 404 on a just-pushed asset is usually lag — re-check.

## Deeper invariants
The full never-regress list (onboarding rules, dashboard tour, guide names, lessons-first
funnel, auth/Clerk flow, faceless brand) lives in Claude's `protected-features` memory.
This file is the operational quick-reference; that memory has the reasoning.

## Changelog (most recent first)
- **2026-08-20**: Paddle price confirmed **$89** by owner — displayed price matches the amount charged, checkout is consistent.
- **2026-08**: Re-linked **Study Calendar** in the sidebar (was orphaned by the course-first dashboard rebuild).
- **2026-08**: Added the `/pricing` **"What you get access to"** tools section — 4 groups (Plan it / Research it / Write it / Work with your supervisor), one WebP screenshot each (`public/pricing/`), lazy-loaded below the fold.
- **2026-08**: Course price **$79 → $89** sitewide (displayed copy only — Paddle price must match).
- **2026-08**: Pricing collapsed to a **single tier**; removed Standard/Premium split + all "yearly access" wording; "14-module" → "14-lesson".
- **2026-08**: Re-linked **EE Pathway Finder** in the sidebar (was orphaned).
- **2026-08**: Made `/dump` **public** (no-account EE Dump); guide articles reduced to one end-CTA.

> When you make a significant change, add a line here.

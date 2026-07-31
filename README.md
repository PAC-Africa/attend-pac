# AttendPAC

Workforce attendance & time management platform — PAC Africa Technology Division.
Engineering delivery: Gordian Knotz Technovation.

## Stack

- **Next.js 15** (App Router, TypeScript) — pinned to 15, not latest, to stay
  consistent with pac.africa / jobs.pac.africa / cdp.pac.africa.
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.ts`).
- **shadcn/ui** components, hand-built rather than CLI-installed (see note
  below), style: `new-york`.
- **Supabase** (Postgres + Auth + RLS) — schema in `supabase/migrations/`.
- **next-themes** for the light/dark toggle.
- **@fontsource** packages for the brand typefaces — self-hosted, no Google
  Fonts CDN dependency.

## What's here

- **`/`** — marketing/landing page, with "Log in" / "Sign up" in the header
  (both go to `/login`) and a separate pilot-request contact form further
  down the page for prospective clients who aren't ready to self-serve.
- **`/login`** — Supabase email/password auth. Signing up creates a new
  account with no organization attached yet; signing in routes you to
  `/admin`, `/checkin`, or `/onboarding` depending on your role.
- **`/onboarding`** — shown to any signed-in user with no `employees` row.
  Lets them name an organization and become its `org_admin`, via a
  dedicated Postgres RPC (`create_organization_for_self`) that bootstraps
  one org + one default site + their own employee row atomically.
- **`/checkin`** — the clock in/out flow. Geofenced (browser Geolocation
  API), offline-queued (localStorage, synced on reconnect), with
  server-side geofence re-validation on every submit. This is the "Web
  Kiosk / QR" capture path from Section 04 — it shares the schema,
  geofence math, and offline-queue logic the React Native (Expo) app will
  use later.
- **`/admin`** — the admin dashboard. Overview now queries **real** data:
  today's present/late/absent/on-leave counts, an exceptions table, and
  per-site check-in ratios, all computed from `attendance_events` +
  `leave_requests`. Sites/Staff/Schedule/Devices/Reports/Settings are
  still UI stubs — the tables exist, the screens don't yet.
- **`middleware.ts`** — refreshes the Supabase session and guards
  `/admin/*`, `/checkin`, and `/onboarding` server-side, per Section 06.
  Passes requests through untouched if Supabase env vars aren't set, so
  the marketing site keeps working either way.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local` and fill in the three values from
   your project's API settings (you've already done this).
3. Run the migrations, in order — either `supabase db push` (CLI) or paste
   each file into the SQL editor:
   - `supabase/migrations/0001_init_schema.sql` — schema + RLS
   - `supabase/migrations/0002_self_serve_signup.sql` — the onboarding RPC
4. Run `supabase/seed.sql` — creates one demo org ("Alpha Pride Security")
   and one demo site ("Two Rivers Mall", Nairobi CBD coordinates).
5. Link your own account to that org as you already did, **or** just sign
   up via `/login` → "Sign up" and go through `/onboarding` to create your
   own organization instead — either works now.

### Populating a realistic demo

Once the schema and your account are set up, seed a full demo dataset —
more sites, ~14 fake staff accounts, and a week of realistic
present/late/absent/on-leave attendance history:

```bash
node --env-file=.env.local scripts/seed-demo-data.mjs
```

This needs `SUPABASE_SERVICE_ROLE_KEY` (already in your `.env.local`) since
it creates real `auth.users` via the Admin API — that's also why it has to
run on your machine rather than in a sandboxed build environment. It's
safe to re-run. It prints a couple of demo staff logins
(password `Demo1234!`) at the end if you want to try `/checkin` as one of
them too.

After seeding, sign in as your own (org_admin) account and open `/admin` —
the Overview page should be fully populated.

## Brand system

Colors, type, and the paper/ink duality come straight from `DS-01 — The
PAC Document Format`. Full palette and font stacks live in
`src/app/globals.css`:

| Token                | Hex       | Used as                               |
|----------------------|-----------|------------------------------------------|
| `--pac-ink`           | `#171210` | dark-mode background, light-mode text  |
| `--pac-graphite`      | `#2A211D` | dark-mode card/surface                 |
| `--pac-orange`        | `#E8532E` | primary — buttons, links, focus ring   |
| `--pac-orange-light`  | `#F4A98D` | light-mode accent / tint surfaces      |
| `--pac-ember`         | `#A63A1C` | destructive, dark-mode accent          |
| `--pac-paper`         | `#F7F3EC` | light-mode background, dark-mode text  |

`secondary`, `muted`, and `border` are **derived** shades needed for app UI
surface hierarchy that DS-01 (a print-document spec) didn't need to define.

Typography: **Source Serif 4** (display/headings), **IBM Plex Sans**
(body/UI), **IBM Plex Mono** (labels, metadata, status chips).

The doc's three-tier callout system (§04 — rule+chip / label-bar-on-tint /
ink panel) is implemented as `src/components/callout.tsx`.

## A note on the shadcn CLI

`npx shadcn add <component>` needs to reach `ui.shadcn.com`, which wasn't
reachable from the sandbox this was built in — so the components in
`src/components/ui/` were written by hand instead of CLI-generated.
`components.json` is configured correctly, so the CLI works normally for
you from here on.

## Running it

```bash
npm install
npm run dev
```

## Next steps

1. **The "late" rule is a placeholder.** `src/lib/attendance.ts` currently
   flags anyone checking in after 7:15 AM org-wide. Once the scheduling
   module exists, compare against each employee's actual `shifts.start_at`
   instead.
2. **Staff provisioning UI.** New employees still get added via SQL
   (or the seed script's fake accounts). Section 06 assumes org_admins add
   staff through the product — build that in `/admin/staff` before
   onboarding a real client.
3. **Realtime.** `/admin` re-queries on page load; wiring Supabase
   Realtime would make "Present today" genuinely live without a refresh.
4. **Mobile app.** React Native (Expo) — separate codebase — for the
   native GPS + selfie check-in flow, reusing the same geofence/offline
   approach as `/checkin`. Biometric terminal integration (SDK/webhook
   bridge) is also a separate build.
5. **Scheduling, leave approval, reporting.** `shifts`, `leave_requests`,
   and `payroll_exports` have schema + RLS but no UI — `/admin/schedule`,
   the leave side of `/admin/staff`, and `/admin/reports` are still stubs.
6. Resolve the resourcing conflict flagged in the proposal (Section 01/08)
   before committing to timing on any of the above.
"# attend-pac" 

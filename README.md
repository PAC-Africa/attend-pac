# AttendPAC

Workforce attendance & time management platform — PAC Africa Technology Division.


## Stack

- **Next.js 15** (App Router, TypeScript) 
- **Tailwind CSS v4** 
- **shadcn/ui** components, hand-built rather than CLI-installed (see note
  below), style: `new-york`.
- **Supabase Pro** (Postgres + Auth + RLS) 
## What's here
  - **Overview** — today's present/late/absent/on-leave counts, an
    exceptions table, per-site check-in ratios.
  - **Sites** — list + add/delete, each showing staff and device counts.
  - **Staff** — roster with role/site, an "Invite staff" flow that sends a
    Resend Auth email invite and links the account, and remove.
  - **Schedule** — next 14 days of shifts grouped by day, add/delete.
    Managers can only write shifts at their own site (enforced by RLS, not
    just the UI).
  - **Devices** — registered biometric terminals per site, 


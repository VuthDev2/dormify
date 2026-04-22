# Dormify (DormFlow Meals) — Backend Context

## What This Is

A multi-tenant SaaS for dormitory + meal management. Landlords (admins) manage dorms,
rooms, tenants, payments, and meals. Tenants self-serve their bills and meal toggles.
Chefs view real-time meal counts for their assigned dorm.

**Source of truth:** `docs/Dormify_SRS.pdf` (v2.0, March 2026)

## Stack

- **Frontend:** Next.js 14 App Router + Tailwind CSS + DaisyUI (built by teammates)
- **Backend:** Next.js API Routes (serverless) + Supabase (Postgres + Auth + Storage + Realtime)
- **Hosting:** Vercel
- **Validation:** Zod on all API route inputs
- **Response shape:** Always `{ data, error }` — never throw raw errors to the client

## User Roles (§4)

|Role|Scope|Key Capability|
|---|---|---|
|admin|owns dorms|full CRUD on their dorms/rooms/tenants/invoices |
| tenant | assigned to a room | view own data, toggle meals, submit maintenance |
| chef | assigned to a dorm | view meal counts + meal plan for their dorm only |

A single auth user can be a tenant in one dorm and a chef in another (roles are dorm-scoped
via `tenant_rooms` and `dorm_chefs` junction tables).

## Subscription Tiers (§9)

| Plan    | Price  | Max Rooms | Multi-Dorm | Chef Mgmt |
|---------|--------|-----------|------------|-----------|
| starter | free   | 3         | no         | no        |
| growth  | $15/mo | 20        | no         | no        |
| pro     | $45/mo | unlimited | yes        | yes       |

**Tier limits are enforced server-side in API routes** — never trust the client.

## Database Conventions

- RLS enabled on **every table** — no exceptions
- All PKs are `uuid` using `uuid_generate_v4()`
- All tables have `created_at timestamptz DEFAULT now()`
- Mutable tables also have `updated_at` with an auto-update trigger
- Foreign keys use `ON DELETE CASCADE` for child records, `RESTRICT` for financial records
- Monetary values: `numeric(10,2)` in the dorm's local currency (KHR/USD)
- Enums defined as Postgres `CREATE TYPE` (not check constraints)

## Meal Toggle Logic

- Default state is ON for all tenants (configurable per dorm via `dorms.default_meals_on`)
- A row in `meal_toggles` only exists when a tenant explicitly overrides the default
- Cutoff time per meal type is stored on `meal_plan_items.cutoff_time`
- After cutoff, the API rejects toggle mutations for that meal

## Key Files

- `supabase/migrations/0001_initial_schema.sql` — all tables, types, triggers, indexes
- `supabase/migrations/0002_rls_policies.sql` — RLS enable + all policies
- `supabase/seed.sql` — dev seed data
- `docs/Dormify_SRS.pdf` — authoritative requirements

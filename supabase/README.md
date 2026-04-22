# Supabase Migrations

## Folder Structure
```
supabase/
  migrations/
    0001_initial_schema.sql   — tables, types, triggers, indexes
    0002_rls_policies.sql     — RLS enable + all row-level security policies
  seed.sql                    — dev/staging seed data (do NOT run in production)
  README.md                   — this file
```

## Applying Migrations

### Option A — Supabase MCP (recommended for this project)
Use the `mcp__supabase__apply_migration` tool inside Claude Code, passing the SQL content.
This applies migrations directly to the linked Supabase project.

### Option B — Supabase CLI
```bash
supabase db push          # push all pending migrations
supabase db reset         # reset local DB and re-run all migrations + seed
```

### Option C — Supabase Dashboard SQL Editor
Paste migration files in order (0001, then 0002) into the SQL editor and run.

## Order Matters
Always apply migrations in numeric order. `0002_rls_policies.sql` depends on tables
created in `0001_initial_schema.sql`.

## Seed Data
```bash
supabase db reset   # automatically runs seed.sql after migrations
# or manually:
psql $DATABASE_URL < supabase/seed.sql
```

## Adding New Migrations
Name files as `NNNN_short_description.sql` where NNNN increments from the last file.
Never edit already-applied migration files — add a new one instead.

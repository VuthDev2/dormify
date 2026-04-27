# Dormify Backend Manual Test Plan

This checklist covers the security-sensitive backend paths added in PR #2.
Use a preview or local server with environment variables from `.env.example`.

## Setup

- `BASE_URL=http://localhost:3000` or the Vercel preview URL.
- `TENANT_A_TOKEN` is a valid access token for tenant A.
- `TENANT_B_DORM_ID` is a dorm where tenant A is not an active tenant.
- `TENANT_A_DORM_ID` is a dorm where tenant A is active.
- `TODAY_UTC` is today's UTC date in `YYYY-MM-DD` format.
- `PAST_DATE` is any date before today in `YYYY-MM-DD` format.

## Meal Toggle Security

### Cross-dorm toggle is rejected

Tenant A must not be able to create or update a meal toggle for tenant B's dorm.

```bash
curl -i -X PUT "$BASE_URL/api/meals/toggles" \
  -H "Authorization: Bearer $TENANT_A_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"dorm_id\": \"$TENANT_B_DORM_ID\",
    \"meal_date\": \"$TODAY_UTC\",
    \"meal_type\": \"breakfast\",
    \"is_on\": true
  }"
```

Expected result:

- HTTP `403`
- Response shape: `{ "data": null, "error": "Forbidden: not an active tenant of this dorm" }`
- If the app-layer check is bypassed, Supabase RLS should still reject the write.

### Past meal date is rejected

```bash
curl -i -X PUT "$BASE_URL/api/meals/toggles" \
  -H "Authorization: Bearer $TENANT_A_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"dorm_id\": \"$TENANT_A_DORM_ID\",
    \"meal_date\": \"$PAST_DATE\",
    \"meal_type\": \"lunch\",
    \"is_on\": false
  }"
```

Expected result:

- HTTP `422`
- Response shape: `{ "data": null, "error": "Cannot toggle meals for past dates" }`

### Cutoff boundary is rejected

Seed or edit the matching `meal_plan_items.cutoff_time` so it equals the current UTC time,
then submit a toggle for `TODAY_UTC`.

Expected result:

- HTTP `422`
- Response shape: `{ "data": null, "error": "Cutoff time has passed for this meal" }`

## RLS Migration Smoke Checks

After applying `supabase/migrations/0004_tighten_rls_membership.sql`:

- Tenant A can read their own meal toggles.
- Tenant A cannot insert/update/delete meal toggles for a dorm where they are not active.
- Admin or chef can still read meal counts for their assigned dorms.
- Tenant invoice read access is unchanged, including historical invoices owned by the tenant.
- Deactivated tenants cannot read maintenance tickets for dorms they have left.

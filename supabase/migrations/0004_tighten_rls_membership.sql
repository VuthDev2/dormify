-- =============================================================================
-- 0004_tighten_rls_membership.sql
-- DormFlow Meals - tighter RLS: membership-verified tenant policies
-- SRS Reference: section 4 role matrix, section 6.2 security
--
-- Context:
-- 0002_rls_policies.sql had a weak tenant policy on meal_toggles that checked
-- only tenant_id = auth.uid(). That prevents cross-user writes, but it did not
-- prove the authenticated user is an active tenant of the dorm being toggled.
--
-- This migration replaces that broad FOR ALL policy with operation-specific
-- policies. INSERT/UPDATE/DELETE now require active dorm membership.
--
-- Note on numbering:
-- 0003_audit_logs.sql already exists, so this file is 0004 to keep migration
-- order deterministic.
--
-- Policies tightened:
--   1. meal_toggles: tenant INSERT
--   2. meal_toggles: tenant UPDATE
--   3. meal_toggles: tenant DELETE
--   4. maintenance_tickets: tenant reads own
--
-- Policy intentionally left unchanged:
--   invoices: tenant reads own
--   Tenants should keep access to their own historical invoices/receipts even
--   after tenant_rooms.is_active becomes false.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. meal_toggles
--
-- OLD:
--   "meal_toggles: tenant manages own" FOR ALL
--   USING (tenant_id = auth.uid())
--   WITH CHECK (tenant_id = auth.uid())
--
-- PROBLEM:
-- Any authenticated user could insert a toggle with their own tenant_id but an
-- arbitrary dorm_id. The app route now blocks that, and this RLS policy adds
-- database-level defense in depth.
--
-- REPLACEMENT:
-- Split the broad FOR ALL policy into operation-specific policies.
-- SELECT keeps identity-only access. INSERT/UPDATE/DELETE require active dorm
-- membership. INSERT/UPDATE also prove that the dorm has an active meal plan
-- item for the submitted meal_type.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "meal_toggles: tenant manages own" ON meal_toggles;

CREATE POLICY "meal_toggles: tenant reads own"
  ON meal_toggles FOR SELECT
  USING (tenant_id = auth.uid());

CREATE POLICY "meal_toggles: tenant inserts own"
  ON meal_toggles FOR INSERT
  WITH CHECK (
    tenant_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM tenant_rooms tr
      JOIN meal_plans mp
        ON mp.dorm_id = tr.dorm_id
      JOIN meal_plan_items mpi
        ON mpi.plan_id = mp.id
       AND mpi.meal_type = meal_toggles.meal_type
       AND mpi.is_active = true
      WHERE tr.dorm_id = meal_toggles.dorm_id
        AND tr.tenant_id = auth.uid()
        AND tr.is_active = true
        AND mp.week_start_date = date_trunc('week', meal_toggles.meal_date)::date
        AND mpi.day_of_week = EXTRACT(ISODOW FROM meal_toggles.meal_date)::int - 1
    )
  );

CREATE POLICY "meal_toggles: tenant updates own"
  ON meal_toggles FOR UPDATE
  USING (tenant_id = auth.uid())
  WITH CHECK (
    tenant_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM tenant_rooms tr
      JOIN meal_plans mp
        ON mp.dorm_id = tr.dorm_id
      JOIN meal_plan_items mpi
        ON mpi.plan_id = mp.id
       AND mpi.meal_type = meal_toggles.meal_type
       AND mpi.is_active = true
      WHERE tr.dorm_id = meal_toggles.dorm_id
        AND tr.tenant_id = auth.uid()
        AND tr.is_active = true
        AND mp.week_start_date = date_trunc('week', meal_toggles.meal_date)::date
        AND mpi.day_of_week = EXTRACT(ISODOW FROM meal_toggles.meal_date)::int - 1
    )
  );

CREATE POLICY "meal_toggles: tenant deletes own"
  ON meal_toggles FOR DELETE
  USING (
    tenant_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM tenant_rooms
      WHERE tenant_id = auth.uid()
        AND dorm_id = meal_toggles.dorm_id
        AND is_active = true
    )
  );

-- ---------------------------------------------------------------------------
-- 2. maintenance_tickets - tenant read
--
-- OLD:
--   "tickets: tenant reads own" FOR SELECT
--   USING (tenant_id = auth.uid())
--
-- PROBLEM:
-- The INSERT policy already requires active dorm membership, but the SELECT
-- policy did not. Align SELECT with INSERT so deactivated tenants no longer
-- retain ticket access for a dorm they have left.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "tickets: tenant reads own" ON maintenance_tickets;

CREATE POLICY "tickets: tenant reads own"
  ON maintenance_tickets FOR SELECT
  USING (
    tenant_id = auth.uid()
    AND is_dorm_tenant(dorm_id)
  );

-- =============================================================================
-- 0002_rls_policies.sql
-- DormFlow Meals — Row Level Security Policies
-- SRS Reference: §4 (role matrix), §6.2 (security)
--
-- Design principle: every table is locked by default; access is granted by
-- explicit policies only. Helper functions use SECURITY DEFINER so they can
-- query tables the calling role can't directly access.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enable RLS on all tables
-- ---------------------------------------------------------------------------
ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE dorms               ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms               ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_rooms        ENABLE ROW LEVEL SECURITY;
ALTER TABLE dorm_chefs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans          ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_toggles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices            ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications       ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Helper functions (SECURITY DEFINER — run as owner, bypass RLS internally)
-- ---------------------------------------------------------------------------

-- Is the calling user the owner of a given dorm?
CREATE OR REPLACE FUNCTION is_dorm_admin(p_dorm_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM dorms WHERE id = p_dorm_id AND owner_id = auth.uid()
  );
$$;

-- Is the calling user an active tenant in a given dorm?
CREATE OR REPLACE FUNCTION is_dorm_tenant(p_dorm_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM tenant_rooms
    WHERE dorm_id = p_dorm_id AND tenant_id = auth.uid() AND is_active = true
  );
$$;

-- Is the calling user an active chef in a given dorm?
CREATE OR REPLACE FUNCTION is_dorm_chef(p_dorm_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM dorm_chefs
    WHERE dorm_id = p_dorm_id AND chef_id = auth.uid() AND is_active = true
  );
$$;

-- Is the calling user a member of a dorm (tenant or chef or admin)?
CREATE OR REPLACE FUNCTION is_dorm_member(p_dorm_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT is_dorm_admin(p_dorm_id)
      OR is_dorm_tenant(p_dorm_id)
      OR is_dorm_chef(p_dorm_id);
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- Users read/update their own profile.
-- Admins can also read profiles of users in their dorms (for management UI).
-- ---------------------------------------------------------------------------
CREATE POLICY "profiles: users read own"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "profiles: admin reads dorm members"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM dorms d
      WHERE d.owner_id = auth.uid()
        AND (
          EXISTS (SELECT 1 FROM tenant_rooms tr WHERE tr.tenant_id = profiles.id AND tr.dorm_id = d.id)
          OR
          EXISTS (SELECT 1 FROM dorm_chefs dc WHERE dc.chef_id = profiles.id AND dc.dorm_id = d.id)
        )
    )
  );

CREATE POLICY "profiles: users update own"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Inserts handled by the handle_new_user() trigger (SECURITY DEFINER)

-- ---------------------------------------------------------------------------
-- subscriptions
-- Only the admin who owns the subscription can read/manage it.
-- ---------------------------------------------------------------------------
CREATE POLICY "subscriptions: admin reads own"
  ON subscriptions FOR SELECT
  USING (admin_id = auth.uid());

CREATE POLICY "subscriptions: admin inserts own"
  ON subscriptions FOR INSERT
  WITH CHECK (admin_id = auth.uid());

CREATE POLICY "subscriptions: admin updates own"
  ON subscriptions FOR UPDATE
  USING (admin_id = auth.uid())
  WITH CHECK (admin_id = auth.uid());

-- ---------------------------------------------------------------------------
-- dorms
-- Admin: full CRUD on their own dorms.
-- Tenants/chefs: read-only on dorms they belong to.
-- ---------------------------------------------------------------------------
CREATE POLICY "dorms: admin full access"
  ON dorms FOR ALL
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "dorms: tenant reads assigned dorm"
  ON dorms FOR SELECT
  USING (is_dorm_tenant(id));

CREATE POLICY "dorms: chef reads assigned dorm"
  ON dorms FOR SELECT
  USING (is_dorm_chef(id));

-- ---------------------------------------------------------------------------
-- rooms
-- Admin: full CRUD on rooms in their dorms.
-- Tenants: read rooms in their dorm.
-- Chefs: no direct room access needed.
-- ---------------------------------------------------------------------------
CREATE POLICY "rooms: admin full access"
  ON rooms FOR ALL
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

CREATE POLICY "rooms: tenant reads own dorm rooms"
  ON rooms FOR SELECT
  USING (is_dorm_tenant(dorm_id));

-- ---------------------------------------------------------------------------
-- tenant_rooms
-- Admin: full CRUD on assignments in their dorms.
-- Tenant: read their own assignments only.
-- ---------------------------------------------------------------------------
CREATE POLICY "tenant_rooms: admin full access"
  ON tenant_rooms FOR ALL
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

CREATE POLICY "tenant_rooms: tenant reads own"
  ON tenant_rooms FOR SELECT
  USING (tenant_id = auth.uid());

-- ---------------------------------------------------------------------------
-- dorm_chefs
-- Admin: full CRUD on chef assignments in their dorms.
-- Chef: read their own assignments.
-- ---------------------------------------------------------------------------
CREATE POLICY "dorm_chefs: admin full access"
  ON dorm_chefs FOR ALL
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

CREATE POLICY "dorm_chefs: chef reads own assignments"
  ON dorm_chefs FOR SELECT
  USING (chef_id = auth.uid());

-- ---------------------------------------------------------------------------
-- meal_plans
-- Admin/Chef: create and manage plans for their dorms.
-- All dorm members: read meal plans.
-- ---------------------------------------------------------------------------
CREATE POLICY "meal_plans: admin can manage"
  ON meal_plans FOR ALL
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

CREATE POLICY "meal_plans: chef can manage"
  ON meal_plans FOR ALL
  USING (is_dorm_chef(dorm_id))
  WITH CHECK (is_dorm_chef(dorm_id));

CREATE POLICY "meal_plans: all dorm members can read"
  ON meal_plans FOR SELECT
  USING (is_dorm_member(dorm_id));

-- ---------------------------------------------------------------------------
-- meal_plan_items
-- Access mirrors meal_plans (via the plan's dorm_id through the plan_id FK).
-- ---------------------------------------------------------------------------
CREATE POLICY "meal_plan_items: admin can manage"
  ON meal_plan_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM meal_plans mp WHERE mp.id = plan_id AND is_dorm_admin(mp.dorm_id))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM meal_plans mp WHERE mp.id = plan_id AND is_dorm_admin(mp.dorm_id))
  );

CREATE POLICY "meal_plan_items: chef can manage"
  ON meal_plan_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM meal_plans mp WHERE mp.id = plan_id AND is_dorm_chef(mp.dorm_id))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM meal_plans mp WHERE mp.id = plan_id AND is_dorm_chef(mp.dorm_id))
  );

CREATE POLICY "meal_plan_items: all dorm members can read"
  ON meal_plan_items FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM meal_plans mp WHERE mp.id = plan_id AND is_dorm_member(mp.dorm_id))
  );

-- ---------------------------------------------------------------------------
-- meal_toggles
-- Tenant: insert/update/delete their own toggles (cutoff enforcement in API).
-- Admin: read all toggles in their dorm (for meal counting & invoicing).
-- Chef: read all toggles in their dorm (to see real-time meal counts).
-- ---------------------------------------------------------------------------
CREATE POLICY "meal_toggles: tenant manages own"
  ON meal_toggles FOR ALL
  USING (tenant_id = auth.uid())
  WITH CHECK (tenant_id = auth.uid());

CREATE POLICY "meal_toggles: admin reads dorm toggles"
  ON meal_toggles FOR SELECT
  USING (is_dorm_admin(dorm_id));

CREATE POLICY "meal_toggles: chef reads dorm toggles"
  ON meal_toggles FOR SELECT
  USING (is_dorm_chef(dorm_id));

-- ---------------------------------------------------------------------------
-- invoices
-- Admin: full CRUD on invoices for their dorms (create, mark paid, etc.).
-- Tenant: read their own invoices only.
-- ---------------------------------------------------------------------------
CREATE POLICY "invoices: admin full access"
  ON invoices FOR ALL
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

CREATE POLICY "invoices: tenant reads own"
  ON invoices FOR SELECT
  USING (tenant_id = auth.uid());

-- ---------------------------------------------------------------------------
-- maintenance_tickets
-- Tenant: submit new tickets (INSERT); read and track their own tickets.
-- Admin: read all tickets in their dorms; update status.
-- Chef: no access (per §4 role matrix).
-- ---------------------------------------------------------------------------
CREATE POLICY "tickets: tenant submits"
  ON maintenance_tickets FOR INSERT
  WITH CHECK (tenant_id = auth.uid() AND is_dorm_tenant(dorm_id));

CREATE POLICY "tickets: tenant reads own"
  ON maintenance_tickets FOR SELECT
  USING (tenant_id = auth.uid());

CREATE POLICY "tickets: admin reads all in dorm"
  ON maintenance_tickets FOR SELECT
  USING (is_dorm_admin(dorm_id));

CREATE POLICY "tickets: admin updates status"
  ON maintenance_tickets FOR UPDATE
  USING (is_dorm_admin(dorm_id))
  WITH CHECK (is_dorm_admin(dorm_id));

-- ---------------------------------------------------------------------------
-- notifications
-- Each user can only read and update (mark read) their own notifications.
-- Inserts are done server-side (service role), not by end users.
-- ---------------------------------------------------------------------------
CREATE POLICY "notifications: users read own"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "notifications: users mark own as read"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

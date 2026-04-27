-- =============================================================================
-- 0003_audit_logs.sql
-- Audit Logging for Dormify
-- Tracks all admin actions for compliance and debugging
-- Idempotent: safe to re-run against any partial state of the live DB.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- audit_logs table
-- Immutable log of all significant actions in the system.
--
-- actor_id is nullable: if a user account is deleted (GDPR / offboarding),
-- the cascade from auth.users → profiles must not block deletion. ON DELETE
-- SET NULL preserves the log row while releasing the FK reference.
-- actor_name snapshots the actor's full_name at write time so the record
-- remains readable even after the profile row is gone.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
  id             uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  dorm_id        uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  actor_id       uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  actor_name     text,
  action         text        NOT NULL CHECK (action IN (
                               'create', 'update', 'delete',
                               'assign_tenant', 'remove_tenant',
                               'assign_chef', 'remove_chef',
                               'toggle_meal', 'update_meal_plan',
                               'create_invoice', 'mark_paid', 'cancel_invoice',
                               'update_settings', 'update_subscription',
                               'create_maintenance', 'update_maintenance',
                               'other'
                             )),
  resource_type  text        NOT NULL,
  resource_id    uuid,
  resource_name  text,
  changes        jsonb,
  status         text        NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'error')),
  error_message  text,
  ip_address     text,
  user_agent     text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_audit_logs_dorm_id      ON audit_logs(dorm_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id     ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at   ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_dorm_created ON audit_logs(dorm_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action       ON audit_logs(dorm_id, action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource     ON audit_logs(resource_type, resource_id);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop all known policy names (covers any partial state the live DB may be in)
DROP POLICY IF EXISTS "Admins can view their dorm's audit logs"         ON audit_logs;
DROP POLICY IF EXISTS "Dorm members can insert audit logs for own dorms" ON audit_logs;
DROP POLICY IF EXISTS "Service role can insert audit logs"               ON audit_logs;

-- Read-only for admins of the dorm (immutable log — no UPDATE/DELETE allowed)
CREATE POLICY "Admins can view their dorm's audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    dorm_id IN (
      SELECT id FROM dorms WHERE owner_id = auth.uid()
    )
  );

-- Any authenticated dorm member may insert a log entry for actions they
-- performed. actor_id = auth.uid() prevents actor spoofing.
-- Server-side routes using service_role bypass RLS and always insert.
CREATE POLICY "Dorm members can insert audit logs for own dorms"
  ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    actor_id = auth.uid()
    AND is_dorm_member(dorm_id)
  );

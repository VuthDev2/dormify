-- =============================================================================
-- 0003_audit_logs.sql
-- Audit Logging for Dormify
-- Tracks all admin actions for compliance and debugging
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enum for audit action types
-- ---------------------------------------------------------------------------
CREATE TYPE audit_action AS ENUM (
  'create', 'update', 'delete',
  'assign_tenant', 'remove_tenant',
  'assign_chef', 'remove_chef',
  'toggle_meal', 'update_meal_plan',
  'create_invoice', 'mark_paid', 'cancel_invoice',
  'update_settings', 'update_subscription',
  'create_maintenance', 'update_maintenance',
  'other'
);

-- ---------------------------------------------------------------------------
-- audit_logs table
-- Immutable log of all significant actions in the system
-- ---------------------------------------------------------------------------
CREATE TABLE audit_logs (
  id             uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  dorm_id        uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  actor_id       uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  action         audit_action NOT NULL,
  resource_type  text        NOT NULL,  -- 'room', 'tenant', 'invoice', 'meal_plan', etc.
  resource_id    uuid,
  resource_name  text,                 -- human-readable identifier (e.g., room number, tenant name)
  changes        jsonb,                -- old_value, new_value for updates
  status         text        NOT NULL DEFAULT 'success',  -- 'success' or 'error'
  error_message  text,
  ip_address     text,
  user_agent     text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes for audit log queries
-- ---------------------------------------------------------------------------
CREATE INDEX idx_audit_logs_dorm_id ON audit_logs(dorm_id);
CREATE INDEX idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_dorm_created ON audit_logs(dorm_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(dorm_id, action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- ---------------------------------------------------------------------------
-- RLS: Only admins of the dorm can view its audit logs
-- ---------------------------------------------------------------------------
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view their dorm's audit logs"
  ON audit_logs FOR SELECT
  USING (
    dorm_id IN (
      SELECT id FROM dorms WHERE owner_id = auth.uid()
    )
  );

-- Service role can insert (for audit logging from API routes)
CREATE POLICY "Service role can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- =============================================================================
-- 0001_initial_schema.sql
-- DormFlow Meals — Core Schema
-- SRS Reference: §4 (roles), §5 (functional requirements)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Enum Types
-- ---------------------------------------------------------------------------
CREATE TYPE user_role          AS ENUM ('admin', 'tenant', 'chef');
CREATE TYPE subscription_plan  AS ENUM ('starter', 'growth', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'cancelled', 'expired');
CREATE TYPE room_status        AS ENUM ('available', 'occupied', 'maintenance');
CREATE TYPE meal_type          AS ENUM ('breakfast', 'lunch', 'dinner');
CREATE TYPE meal_calc_method   AS ENUM ('per_meal', 'proportional');
CREATE TYPE invoice_status     AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
CREATE TYPE ticket_status      AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_category    AS ENUM ('plumbing', 'electrical', 'hvac', 'furniture', 'cleaning', 'other');
CREATE TYPE ticket_priority    AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE notification_type  AS ENUM ('payment', 'meal', 'maintenance', 'system', 'subscription');

-- ---------------------------------------------------------------------------
-- Utility: auto-update updated_at
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- Mirrors auth.users; created automatically via trigger on signup.
-- role stores the user's primary account type.
-- Per-dorm roles are determined by tenant_rooms / dorm_chefs membership.
-- ---------------------------------------------------------------------------
CREATE TABLE profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text        NOT NULL,
  phone       text,
  avatar_url  text,
  role        user_role   NOT NULL DEFAULT 'tenant',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile row when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'tenant')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ---------------------------------------------------------------------------
-- subscriptions
-- One row per admin — their SaaS plan.
-- Tier limits (max_rooms, multi-dorm, chef_mgmt) are enforced server-side.
-- ---------------------------------------------------------------------------
CREATE TABLE subscriptions (
  id               uuid                PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id         uuid                NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  plan             subscription_plan   NOT NULL DEFAULT 'starter',
  status           subscription_status NOT NULL DEFAULT 'active',
  price_per_month  numeric(10,2),
  started_at       timestamptz         NOT NULL DEFAULT now(),
  ends_at          timestamptz,
  cancelled_at     timestamptz,
  created_at       timestamptz         NOT NULL DEFAULT now(),
  updated_at       timestamptz         NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- dorms
-- Owned by one admin. Per SRS §9, multi-dorm is a Pro-only feature
-- (enforced at API level, not DB level).
-- ---------------------------------------------------------------------------
CREATE TABLE dorms (
  id                   uuid              PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id             uuid              NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  name                 text              NOT NULL,
  address              text,
  phone                text,
  email                text,
  meal_calc_method     meal_calc_method  NOT NULL DEFAULT 'per_meal',
  default_meal_rate    numeric(10,2)     NOT NULL DEFAULT 0 CHECK (default_meal_rate >= 0),
  billing_day          smallint          NOT NULL DEFAULT 1 CHECK (billing_day BETWEEN 1 AND 28),
  default_meals_on     boolean           NOT NULL DEFAULT true,
  is_active            boolean           NOT NULL DEFAULT true,
  created_at           timestamptz       NOT NULL DEFAULT now(),
  updated_at           timestamptz       NOT NULL DEFAULT now()
);

CREATE INDEX idx_dorms_owner_id ON dorms(owner_id);

CREATE TRIGGER trg_dorms_updated_at
  BEFORE UPDATE ON dorms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- rooms
-- Defined within a dorm. capacity > 1 allows shared rooms.
-- ---------------------------------------------------------------------------
CREATE TABLE rooms (
  id            uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  dorm_id       uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  room_number   text        NOT NULL,
  floor         smallint,
  capacity      smallint    NOT NULL DEFAULT 1 CHECK (capacity > 0),
  monthly_rent  numeric(10,2) NOT NULL CHECK (monthly_rent >= 0),
  status        room_status NOT NULL DEFAULT 'available',
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (dorm_id, room_number)
);

CREATE INDEX idx_rooms_dorm_id        ON rooms(dorm_id);
CREATE INDEX idx_rooms_dorm_id_status ON rooms(dorm_id, status);

CREATE TRIGGER trg_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- tenant_rooms
-- Assigns a tenant to a specific room with start/end dates.
-- monthly_rent_override allows per-tenant rent that differs from the room default.
-- ---------------------------------------------------------------------------
CREATE TABLE tenant_rooms (
  id                    uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id             uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  room_id               uuid        NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  dorm_id               uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  start_date            date        NOT NULL,
  end_date              date,
  monthly_rent_override numeric(10,2) CHECK (monthly_rent_override >= 0),
  is_active             boolean     NOT NULL DEFAULT true,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR end_date > start_date)
);

CREATE INDEX idx_tenant_rooms_tenant_id ON tenant_rooms(tenant_id);
CREATE INDEX idx_tenant_rooms_dorm_id   ON tenant_rooms(dorm_id);
CREATE INDEX idx_tenant_rooms_room_id   ON tenant_rooms(room_id);
CREATE INDEX idx_tenant_rooms_active    ON tenant_rooms(dorm_id, is_active);

CREATE TRIGGER trg_tenant_rooms_updated_at
  BEFORE UPDATE ON tenant_rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- dorm_chefs
-- Assigns a chef to a dorm. A user can be chef in multiple dorms (Pro feature).
-- ---------------------------------------------------------------------------
CREATE TABLE dorm_chefs (
  id          uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  chef_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dorm_id     uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  is_active   boolean     NOT NULL DEFAULT true,
  UNIQUE (chef_id, dorm_id)
);

CREATE INDEX idx_dorm_chefs_dorm_id  ON dorm_chefs(dorm_id);
CREATE INDEX idx_dorm_chefs_chef_id  ON dorm_chefs(chef_id);

-- ---------------------------------------------------------------------------
-- meal_plans
-- One plan per dorm per week. week_start_date should always be a Monday
-- (enforced by the application layer, not the DB).
-- ---------------------------------------------------------------------------
CREATE TABLE meal_plans (
  id              uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  dorm_id         uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  week_start_date date        NOT NULL,
  created_by      uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (dorm_id, week_start_date)
);

CREATE INDEX idx_meal_plans_dorm_week ON meal_plans(dorm_id, week_start_date);

CREATE TRIGGER trg_meal_plans_updated_at
  BEFORE UPDATE ON meal_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- meal_plan_items
-- One row per day-of-week × meal_type within a plan.
-- cutoff_time: the daily time after which tenants cannot toggle this meal.
-- day_of_week: 0 = Monday, 6 = Sunday (matches ISO weekday - 1).
-- ---------------------------------------------------------------------------
CREATE TABLE meal_plan_items (
  id               uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id          uuid        NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  day_of_week      smallint    NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  meal_type        meal_type   NOT NULL,
  menu_description text,
  cutoff_time      time        NOT NULL DEFAULT '08:00:00',
  is_active        boolean     NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (plan_id, day_of_week, meal_type)
);

CREATE INDEX idx_meal_plan_items_plan_id ON meal_plan_items(plan_id);

-- ---------------------------------------------------------------------------
-- meal_toggles
-- Stores a tenant's explicit override of the dorm's default_meals_on.
-- If no row exists → the dorm default applies.
-- Unique constraint prevents duplicate toggles (upsert on conflict).
-- ---------------------------------------------------------------------------
CREATE TABLE meal_toggles (
  id          uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id   uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dorm_id     uuid        NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  meal_date   date        NOT NULL,
  meal_type   meal_type   NOT NULL,
  is_on       boolean     NOT NULL,
  toggled_at  timestamptz NOT NULL DEFAULT now(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, meal_date, meal_type)
);

CREATE INDEX idx_meal_toggles_tenant_date  ON meal_toggles(tenant_id, meal_date);
CREATE INDEX idx_meal_toggles_dorm_date    ON meal_toggles(dorm_id, meal_date, meal_type);

-- ---------------------------------------------------------------------------
-- invoices
-- Monthly invoice per tenant combining rent + meal cost + adjustments.
-- total_amount is a generated column (computed by DB, not application).
-- ---------------------------------------------------------------------------
CREATE TABLE invoices (
  id                uuid           PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id         uuid           NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  dorm_id           uuid           NOT NULL REFERENCES dorms(id) ON DELETE RESTRICT,
  room_id           uuid           REFERENCES rooms(id) ON DELETE SET NULL,
  period_start      date           NOT NULL,
  period_end        date           NOT NULL,
  rent_amount       numeric(10,2)  NOT NULL DEFAULT 0 CHECK (rent_amount >= 0),
  meal_amount       numeric(10,2)  NOT NULL DEFAULT 0 CHECK (meal_amount >= 0),
  other_adjustments numeric(10,2)  NOT NULL DEFAULT 0,
  total_amount      numeric(10,2)  GENERATED ALWAYS AS
                      (rent_amount + meal_amount + other_adjustments) STORED,
  status            invoice_status NOT NULL DEFAULT 'pending',
  due_date          date           NOT NULL,
  paid_at           timestamptz,
  payment_method    text,
  notes             text,
  created_at        timestamptz    NOT NULL DEFAULT now(),
  updated_at        timestamptz    NOT NULL DEFAULT now(),
  CONSTRAINT valid_period CHECK (period_end > period_start)
);

CREATE INDEX idx_invoices_tenant_id    ON invoices(tenant_id);
CREATE INDEX idx_invoices_dorm_id      ON invoices(dorm_id);
CREATE INDEX idx_invoices_status       ON invoices(dorm_id, status);
CREATE INDEX idx_invoices_due_date     ON invoices(due_date) WHERE status = 'pending';

CREATE TRIGGER trg_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- maintenance_tickets
-- Submitted by tenants; admin updates status.
-- ---------------------------------------------------------------------------
CREATE TABLE maintenance_tickets (
  id          uuid              PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id   uuid              NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  dorm_id     uuid              NOT NULL REFERENCES dorms(id) ON DELETE CASCADE,
  room_id     uuid              REFERENCES rooms(id) ON DELETE SET NULL,
  title       text              NOT NULL,
  description text              NOT NULL,
  category    ticket_category   NOT NULL DEFAULT 'other',
  priority    ticket_priority   NOT NULL DEFAULT 'medium',
  status      ticket_status     NOT NULL DEFAULT 'open',
  photo_url   text,
  admin_notes text,
  resolved_at timestamptz,
  created_at  timestamptz       NOT NULL DEFAULT now(),
  updated_at  timestamptz       NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_dorm_status ON maintenance_tickets(dorm_id, status);
CREATE INDEX idx_tickets_tenant_id   ON maintenance_tickets(tenant_id);

CREATE TRIGGER trg_tickets_updated_at
  BEFORE UPDATE ON maintenance_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-set resolved_at when status changes to resolved/closed
CREATE OR REPLACE FUNCTION set_ticket_resolved_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status IN ('resolved', 'closed') AND OLD.status NOT IN ('resolved', 'closed') THEN
    NEW.resolved_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_ticket_resolved_at
  BEFORE UPDATE ON maintenance_tickets
  FOR EACH ROW EXECUTE FUNCTION set_ticket_resolved_at();

-- ---------------------------------------------------------------------------
-- notifications
-- Sent to any user. metadata jsonb holds context (e.g., invoice_id, ticket_id).
-- ---------------------------------------------------------------------------
CREATE TABLE notifications (
  id         uuid              PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    uuid              NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dorm_id    uuid              REFERENCES dorms(id) ON DELETE CASCADE,
  title      text              NOT NULL,
  body       text              NOT NULL,
  type       notification_type NOT NULL DEFAULT 'system',
  is_read    boolean           NOT NULL DEFAULT false,
  metadata   jsonb,
  created_at timestamptz       NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at  ON notifications(created_at DESC);

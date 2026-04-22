-- =============================================================================
-- seed.sql — Dev/Staging Seed Data
-- DO NOT run in production.
-- Requires migrations 0001 and 0002 to be applied first.
-- Auth users must be created manually (or via Supabase dashboard) since
-- auth.users is managed by Supabase Auth, not SQL inserts.
-- =============================================================================

-- After creating test users in the Supabase dashboard, replace these UUIDs:
-- admin_user_id  : the UUID of your test admin account
-- tenant_user_id : the UUID of your test tenant account
-- chef_user_id   : the UUID of your test chef account

DO $$
DECLARE
  admin_id  uuid := '00000000-0000-0000-0000-000000000001';
  tenant_id uuid := '00000000-0000-0000-0000-000000000002';
  chef_id   uuid := '00000000-0000-0000-0000-000000000003';
  dorm_id   uuid := uuid_generate_v4();
  room1_id  uuid := uuid_generate_v4();
  room2_id  uuid := uuid_generate_v4();
  room3_id  uuid := uuid_generate_v4();
  plan_id   uuid := uuid_generate_v4();
BEGIN

  -- Profiles (normally created by the auth trigger; insert manually for seeding)
  INSERT INTO profiles (id, full_name, phone, role) VALUES
    (admin_id,  'Test Admin',  '+855 12 000 001', 'admin'),
    (tenant_id, 'Test Tenant', '+855 12 000 002', 'tenant'),
    (chef_id,   'Test Chef',   '+855 12 000 003', 'chef')
  ON CONFLICT (id) DO NOTHING;

  -- Subscription for the admin (starter = free)
  INSERT INTO subscriptions (admin_id, plan, status) VALUES
    (admin_id, 'starter', 'active')
  ON CONFLICT (admin_id) DO NOTHING;

  -- Dorm
  INSERT INTO dorms (id, owner_id, name, address, meal_calc_method, default_meal_rate, billing_day)
  VALUES (
    dorm_id, admin_id,
    'Sunrise Dorm', '123 University Ave, Phnom Penh',
    'per_meal', 2.50, 1
  );

  -- Rooms
  INSERT INTO rooms (id, dorm_id, room_number, floor, capacity, monthly_rent) VALUES
    (room1_id, dorm_id, '101', 1, 2, 120.00),
    (room2_id, dorm_id, '102', 1, 1, 100.00),
    (room3_id, dorm_id, '201', 2, 2, 130.00);

  -- Assign tenant to room 101
  INSERT INTO tenant_rooms (tenant_id, room_id, dorm_id, start_date, is_active)
  VALUES (tenant_id, room1_id, dorm_id, CURRENT_DATE - interval '30 days', true);

  UPDATE rooms SET status = 'occupied' WHERE id = room1_id;

  -- Assign chef to dorm
  INSERT INTO dorm_chefs (chef_id, dorm_id, is_active)
  VALUES (chef_id, dorm_id, true);

  -- Meal plan for current week (week starting Monday)
  INSERT INTO meal_plans (id, dorm_id, week_start_date, created_by)
  VALUES (
    plan_id, dorm_id,
    date_trunc('week', CURRENT_DATE)::date,
    admin_id
  );

  -- Meal plan items (Mon–Fri, all three meal types)
  INSERT INTO meal_plan_items (plan_id, day_of_week, meal_type, menu_description, cutoff_time)
  SELECT
    plan_id,
    d.day,
    m.meal::meal_type,
    CASE m.meal
      WHEN 'breakfast' THEN 'Rice congee with eggs'
      WHEN 'lunch'     THEN 'Amok fish with rice'
      WHEN 'dinner'    THEN 'Lok lak beef with bread'
    END,
    CASE m.meal
      WHEN 'breakfast' THEN '07:00'::time
      WHEN 'lunch'     THEN '10:30'::time
      WHEN 'dinner'    THEN '16:00'::time
    END
  FROM generate_series(0, 4) AS d(day)
  CROSS JOIN (VALUES ('breakfast'), ('lunch'), ('dinner')) AS m(meal);

  -- Sample invoice (last month)
  INSERT INTO invoices (tenant_id, dorm_id, room_id, period_start, period_end,
                        rent_amount, meal_amount, status, due_date)
  VALUES (
    tenant_id, dorm_id, room1_id,
    date_trunc('month', CURRENT_DATE - interval '1 month')::date,
    (date_trunc('month', CURRENT_DATE) - interval '1 day')::date,
    120.00, 37.50,
    'paid',
    (date_trunc('month', CURRENT_DATE - interval '1 month') + interval '7 days')::date
  );

  -- Sample open maintenance ticket
  INSERT INTO maintenance_tickets (tenant_id, dorm_id, room_id, title, description, category, priority)
  VALUES (
    tenant_id, dorm_id, room1_id,
    'Leaking faucet', 'The bathroom faucet drips constantly.',
    'plumbing', 'medium'
  );

  -- Sample notifications
  INSERT INTO notifications (user_id, dorm_id, title, body, type) VALUES
    (tenant_id, dorm_id, 'Invoice Generated', 'Your invoice for last month is now available.', 'payment'),
    (admin_id,  dorm_id, 'New Maintenance Ticket', 'Tenant submitted a plumbing issue in room 101.', 'maintenance'),
    (chef_id,   dorm_id, 'Meal Plan Updated', 'The meal plan for this week has been updated.', 'meal');

END $$;

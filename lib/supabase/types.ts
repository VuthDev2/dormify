export type UserRole = 'admin' | 'tenant' | 'chef'
export type SubscriptionPlan = 'starter' | 'growth' | 'pro'
export type SubscriptionStatus = 'active' | 'trialing' | 'cancelled' | 'expired'
export type RoomStatus = 'available' | 'occupied' | 'maintenance'
export type MealType = 'breakfast' | 'lunch' | 'dinner'
export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketCategory = 'plumbing' | 'electrical' | 'hvac' | 'furniture' | 'cleaning' | 'other'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

/** Maps frontend tier route segment → DB subscription_plan */
export const TIER_TO_PLAN: Record<string, SubscriptionPlan> = {
  normal: 'starter',
  pro: 'growth',
  premium: 'pro',
}

/** Maps DB subscription_plan → frontend tier route segment */
export const PLAN_TO_TIER: Record<SubscriptionPlan, string> = {
  starter: 'normal',
  growth: 'pro',
  pro: 'premium',
}

export interface Profile {
  id: string
  full_name: string
  phone: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  admin_id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  price_per_month: number | null
  started_at: string
  ends_at: string | null
  cancelled_at: string | null
}

export interface Dorm {
  id: string
  owner_id: string
  name: string
  address: string | null
  phone: string | null
  email: string | null
  meal_calc_method: 'per_meal' | 'proportional'
  default_meal_rate: number
  billing_day: number
  default_meals_on: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Room {
  id: string
  dorm_id: string
  room_number: string
  floor: number | null
  capacity: number
  monthly_rent: number
  status: RoomStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface TenantRoom {
  id: string
  tenant_id: string
  room_id: string
  dorm_id: string
  start_date: string
  end_date: string | null
  monthly_rent_override: number | null
  is_active: boolean
}

export interface Invoice {
  id: string
  tenant_id: string
  dorm_id: string
  room_id: string | null
  period_start: string
  period_end: string
  rent_amount: number
  meal_amount: number
  other_adjustments: number
  total_amount: number
  status: InvoiceStatus
  due_date: string
  paid_at: string | null
  payment_method: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface MaintenanceTicket {
  id: string
  tenant_id: string
  dorm_id: string
  room_id: string | null
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  photo_url: string | null
  admin_notes: string | null
  resolved_at: string | null
  created_at: string
  updated_at: string
}

export interface MealPlan {
  id: string
  dorm_id: string
  week_start_date: string
  created_by: string | null
  notes: string | null
}

export interface MealPlanItem {
  id: string
  plan_id: string
  day_of_week: number
  meal_type: MealType
  menu_description: string | null
  cutoff_time: string
  is_active: boolean
}

export interface MealToggle {
  id: string
  tenant_id: string
  dorm_id: string
  meal_date: string
  meal_type: MealType
  is_on: boolean
  toggled_at: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, MealToggle } from '@/lib/supabase/types'

const toggleSchema = z.object({
  dorm_id: z.string().uuid(),
  meal_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner']),
  is_on: z.boolean(),
})

/** Convert YYYY-MM-DD → day_of_week where 0 = Monday, 6 = Sunday (matches DB convention). */
function toDayOfWeek(dateStr: string): number {
  const jsDay = new Date(dateStr + 'T00:00:00Z').getUTCDay() // 0=Sun…6=Sat
  return jsDay === 0 ? 6 : jsDay - 1
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  const date = searchParams.get('date')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  // RLS scopes results: tenant sees own, admin/chef see all in dorm
  let query = supabase.from('meal_toggles').select('*').eq('tenant_id', user.id)
  if (dormId) query = query.eq('dorm_id', dormId)
  if (date) query = query.eq('meal_date', date)

  const { data, error } = await query.order('meal_date', { ascending: false }).limit(30)
  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealToggle[]>)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = toggleSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { dorm_id, meal_date, meal_type, is_on } = parsed.data

  // Only active tenants of this dorm may toggle — RLS alone only checks tenant_id = auth.uid()
  const { data: membership } = await supabase
    .from('tenant_rooms')
    .select('id')
    .eq('dorm_id', dorm_id)
    .eq('tenant_id', user.id)
    .eq('is_active', true)
    .maybeSingle()

  if (!membership) {
    return NextResponse.json(
      { data: null, error: 'Forbidden: not an active tenant of this dorm' },
      { status: 403 }
    )
  }

  // Reject toggles for past dates (all comparisons in UTC)
  const todayUTC = new Date().toISOString().slice(0, 10)
  if (meal_date < todayUTC) {
    return NextResponse.json(
      { data: null, error: 'Cannot toggle meals for past dates' },
      { status: 422 }
    )
  }

  // Cutoff check - only applies to today; future dates are always toggleable.
  // TODO: cutoff_time currently assumes a single dorm timezone (Asia/Phnom_Penh for MVP).
  // If multi-region dorms are added in Pro tier, store TZ on the dorms row and convert cutoff using it.
  if (meal_date === todayUTC) {
    const dayOfWeek = toDayOfWeek(meal_date)

    const { data: plan } = await supabase
      .from('meal_plans')
      .select('id')
      .eq('dorm_id', dorm_id)
      .lte('week_start_date', meal_date)
      .order('week_start_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (plan) {
      const { data: item } = await supabase
        .from('meal_plan_items')
        .select('cutoff_time, is_active')
        .eq('plan_id', plan.id)
        .eq('day_of_week', dayOfWeek)
        .eq('meal_type', meal_type)
        .maybeSingle()

      if (item) {
        if (!item.is_active) {
          return NextResponse.json(
            { data: null, error: 'This meal is not available for that day' },
            { status: 422 }
          )
        }

        // Use UTC throughout: cutoff_time is stored as "HH:MM:SS" and treated as UTC
        const [hh, mm, ss = 0] = item.cutoff_time.split(':').map(Number)
        const cutoff = new Date(meal_date + 'T00:00:00Z')
        cutoff.setUTCHours(hh, mm, ss, 0)

        if (Date.now() >= cutoff.getTime()) {
          return NextResponse.json(
            { data: null, error: 'Cutoff time has passed for this meal' },
            { status: 422 }
          )
        }
      }
    }
  }

  const { data, error } = await supabase
    .from('meal_toggles')
    .upsert(
      { tenant_id: user.id, dorm_id, meal_date, meal_type, is_on, toggled_at: new Date().toISOString() },
      { onConflict: 'tenant_id,meal_date,meal_type' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealToggle>)
}

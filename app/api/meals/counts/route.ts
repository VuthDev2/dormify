import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  const date = searchParams.get('date') ?? new Date().toISOString().slice(0, 10)

  if (!dormId) return NextResponse.json({ data: null, error: 'dorm_id required' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  // Get dorm to check default_meals_on and total active tenants
  const { data: dorm } = await supabase
    .from('dorms')
    .select('default_meals_on')
    .eq('id', dormId)
    .single()
  if (!dorm) return NextResponse.json({ data: null, error: 'Dorm not found' }, { status: 404 })

  const { count: totalTenants } = await supabase
    .from('tenant_rooms')
    .select('id', { count: 'exact', head: true })
    .eq('dorm_id', dormId)
    .eq('is_active', true)

  // Get explicit toggles for this date
  const { data: toggles } = await supabase
    .from('meal_toggles')
    .select('meal_type, is_on, tenant_id')
    .eq('dorm_id', dormId)
    .eq('meal_date', date)

  const total = totalTenants ?? 0
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const
  const counts: Record<string, number> = {}

  for (const meal of mealTypes) {
    const mealToggles = (toggles ?? []).filter(t => t.meal_type === meal)
    const explicitOn = mealToggles.filter(t => t.is_on).length
    const explicitOff = mealToggles.filter(t => !t.is_on).length
    // Tenants without a toggle use the dorm default
    const defaulting = total - mealToggles.length
    counts[meal] = dorm.default_meals_on
      ? explicitOn + defaulting - 0 // all defaulting tenants are ON
      : explicitOn // only explicit ON toggles count

    if (dorm.default_meals_on) {
      counts[meal] = total - explicitOff
    } else {
      counts[meal] = explicitOn
    }
  }

  return NextResponse.json({
    data: { date, dorm_id: dormId, total_tenants: total, counts },
    error: null,
  })
}

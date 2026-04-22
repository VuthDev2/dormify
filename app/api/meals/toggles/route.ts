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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  const date = searchParams.get('date')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

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

  // Cutoff check: find the meal_plan_item for this meal and verify cutoff hasn't passed
  const targetDate = new Date(parsed.data.meal_date)
  const dayOfWeek = (targetDate.getDay() + 6) % 7 // ISO: Mon=0

  const { data: plan } = await supabase
    .from('meal_plans')
    .select('id')
    .eq('dorm_id', parsed.data.dorm_id)
    .lte('week_start_date', parsed.data.meal_date)
    .order('week_start_date', { ascending: false })
    .limit(1)
    .single()

  if (plan) {
    const { data: item } = await supabase
      .from('meal_plan_items')
      .select('cutoff_time')
      .eq('plan_id', plan.id)
      .eq('day_of_week', dayOfWeek)
      .eq('meal_type', parsed.data.meal_type)
      .single()

    if (item) {
      const now = new Date()
      const [h, m] = item.cutoff_time.split(':').map(Number)
      const cutoff = new Date(targetDate)
      cutoff.setHours(h, m, 0, 0)
      if (now > cutoff && parsed.data.meal_date === now.toISOString().slice(0, 10)) {
        return NextResponse.json(
          { data: null, error: 'Cutoff time has passed for this meal' },
          { status: 422 }
        )
      }
    }
  }

  const { data, error } = await supabase
    .from('meal_toggles')
    .upsert(
      { ...parsed.data, tenant_id: user.id, toggled_at: new Date().toISOString() },
      { onConflict: 'tenant_id,meal_date,meal_type' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealToggle>)
}

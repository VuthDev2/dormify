import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, MealPlanItem } from '@/lib/supabase/types'

const itemSchema = z.object({
  day_of_week: z.number().int().min(0).max(6),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner']),
  menu_description: z.string().optional(),
  cutoff_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional(),
  is_active: z.boolean().optional(),
})

type Params = { params: Promise<{ planId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { planId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('meal_plan_items')
    .select('*')
    .eq('plan_id', planId)
    .order('day_of_week')
    .order('meal_type')

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealPlanItem[]>)
}

export async function POST(request: Request, { params }: Params) {
  const { planId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = itemSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('meal_plan_items')
    .upsert({ ...parsed.data, plan_id: planId }, { onConflict: 'plan_id,day_of_week,meal_type' })
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealPlanItem>, { status: 201 })
}

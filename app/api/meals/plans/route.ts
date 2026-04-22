import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, MealPlan } from '@/lib/supabase/types'

const createSchema = z.object({
  dorm_id: z.string().uuid(),
  week_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  if (!dormId) return NextResponse.json({ data: null, error: 'dorm_id required' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('meal_plans')
    .select('*, meal_plan_items(*)')
    .eq('dorm_id', dormId)
    .order('week_start_date', { ascending: false })
    .limit(8)

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('meal_plans')
    .insert({ ...parsed.data, created_by: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MealPlan>, { status: 201 })
}

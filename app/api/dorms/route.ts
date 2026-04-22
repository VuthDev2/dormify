import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Dorm } from '@/lib/supabase/types'

const PLAN_MAX_ROOMS: Record<string, number | null> = {
  starter: 3,
  growth: 20,
  pro: null,
}

const createSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  default_meal_rate: z.number().min(0).optional(),
  billing_day: z.number().int().min(1).max(28).optional(),
  default_meals_on: z.boolean().optional(),
})

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('dorms')
    .select('*')
    .eq('owner_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Dorm[]>)
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

  // Tier check: multi-dorm is Pro only
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('admin_id', user.id)
    .single()

  const plan = sub?.plan ?? 'starter'
  if (plan !== 'pro') {
    const { count } = await supabase
      .from('dorms')
      .select('id', { count: 'exact', head: true })
      .eq('owner_id', user.id)
      .eq('is_active', true)
    if ((count ?? 0) >= 1) {
      return NextResponse.json(
        { data: null, error: 'Multi-dorm management requires the Pro plan' },
        { status: 403 }
      )
    }
  }

  const { data, error } = await supabase
    .from('dorms')
    .insert({ ...parsed.data, owner_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Dorm>, { status: 201 })
}

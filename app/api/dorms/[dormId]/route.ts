import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Dorm } from '@/lib/supabase/types'

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  default_meal_rate: z.number().min(0).optional(),
  billing_day: z.number().int().min(1).max(28).optional(),
  default_meals_on: z.boolean().optional(),
  is_active: z.boolean().optional(),
})

type Params = { params: Promise<{ dormId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { dormId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('dorms')
    .select('*')
    .eq('id', dormId)
    .eq('owner_id', user.id)
    .single()

  if (error) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Dorm>)
}

export async function PATCH(request: Request, { params }: Params) {
  const { dormId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('dorms')
    .update(parsed.data)
    .eq('id', dormId)
    .eq('owner_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Dorm>)
}

export async function DELETE(_req: Request, { params }: Params) {
  const { dormId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('dorms')
    .update({ is_active: false })
    .eq('id', dormId)
    .eq('owner_id', user.id)

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data: { success: true }, error: null })
}

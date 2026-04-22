import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Invoice } from '@/lib/supabase/types'

const createSchema = z.object({
  tenant_id: z.string().uuid(),
  dorm_id: z.string().uuid(),
  room_id: z.string().uuid().optional(),
  period_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  period_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rent_amount: z.number().min(0),
  meal_amount: z.number().min(0).optional(),
  other_adjustments: z.number().optional(),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  const tenantId = searchParams.get('tenant_id')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  let query = supabase.from('invoices').select('*')

  if (dormId) query = query.eq('dorm_id', dormId)
  if (tenantId) query = query.eq('tenant_id', tenantId)

  const { data, error } = await query.order('created_at', { ascending: false }).limit(50)
  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Invoice[]>)
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

  // Verify admin owns the dorm
  const { data: dorm } = await supabase
    .from('dorms')
    .select('id')
    .eq('id', parsed.data.dorm_id)
    .eq('owner_id', user.id)
    .single()
  if (!dorm) return NextResponse.json({ data: null, error: 'Dorm not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('invoices')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Invoice>, { status: 201 })
}

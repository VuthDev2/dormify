import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const patchSchema = z.object({
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  monthly_rent_override: z.number().min(0).optional(),
  is_active: z.boolean().optional(),
})

type Params = { params: Promise<{ tenantId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { tenantId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('tenant_rooms')
    .select(`
      id, start_date, end_date, monthly_rent_override, is_active,
      profiles:tenant_id (id, full_name, phone, avatar_url),
      rooms:room_id (id, room_number, floor, monthly_rent, status),
      dorms:dorm_id (id, name, owner_id)
    `)
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .single()

  if (error) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })

  // Only the dorm owner or the tenant themselves can access
  const dorm = (data as any).dorms
  if (dorm.owner_id !== user.id && tenantId !== user.id) {
    return NextResponse.json({ data: null, error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ data, error: null })
}

export async function PATCH(request: Request, { params }: Params) {
  const { tenantId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  // Verify admin owns the dorm this tenant belongs to
  const { data: assignment } = await supabase
    .from('tenant_rooms')
    .select('dorm_id')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .single()
  if (!assignment) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })

  const { data: dorm } = await supabase
    .from('dorms')
    .select('id')
    .eq('id', assignment.dorm_id)
    .eq('owner_id', user.id)
    .single()
  if (!dorm) return NextResponse.json({ data: null, error: 'Forbidden' }, { status: 403 })

  const { data, error } = await supabase
    .from('tenant_rooms')
    .update(parsed.data)
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null })
}

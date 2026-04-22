import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const assignSchema = z.object({
  tenant_id: z.string().uuid(),
  room_id: z.string().uuid(),
  dorm_id: z.string().uuid(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  monthly_rent_override: z.number().min(0).optional(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  if (!dormId) return NextResponse.json({ data: null, error: 'dorm_id required' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('tenant_rooms')
    .select(`
      id, start_date, end_date, monthly_rent_override, is_active,
      profiles:tenant_id (id, full_name, phone, avatar_url, role),
      rooms:room_id (id, room_number, floor, monthly_rent, status)
    `)
    .eq('dorm_id', dormId)
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = assignSchema.safeParse(body)
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
    .from('tenant_rooms')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null }, { status: 201 })
}

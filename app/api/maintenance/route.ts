import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, MaintenanceTicket } from '@/lib/supabase/types'

const createSchema = z.object({
  dorm_id: z.string().uuid(),
  room_id: z.string().uuid().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['plumbing', 'electrical', 'hvac', 'furniture', 'cleaning', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  photo_url: z.string().url().optional(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dormId = searchParams.get('dorm_id')
  const status = searchParams.get('status')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  let query = supabase
    .from('maintenance_tickets')
    .select('*, profiles:tenant_id(full_name, avatar_url), rooms:room_id(room_number)')

  if (dormId) query = query.eq('dorm_id', dormId)
  if (status) query = query.eq('status', status)

  const { data, error } = await query.order('created_at', { ascending: false }).limit(50)
  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MaintenanceTicket[]>)
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
    .from('maintenance_tickets')
    .insert({ ...parsed.data, tenant_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MaintenanceTicket>, { status: 201 })
}

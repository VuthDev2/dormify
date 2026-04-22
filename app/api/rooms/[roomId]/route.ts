import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Room } from '@/lib/supabase/types'

const patchSchema = z.object({
  room_number: z.string().min(1).optional(),
  floor: z.number().int().optional(),
  capacity: z.number().int().min(1).optional(),
  monthly_rent: z.number().min(0).optional(),
  status: z.enum(['available', 'occupied', 'maintenance']).optional(),
  notes: z.string().optional(),
})

type Params = { params: Promise<{ roomId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { roomId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('rooms')
    .select('*, dorms!inner(owner_id)')
    .eq('id', roomId)
    .single()

  if (error || data?.dorms?.owner_id !== user.id) {
    return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })
  }

  const { dorms: _, ...room } = data as any
  return NextResponse.json({ data: room as Room, error: null })
}

export async function PATCH(request: Request, { params }: Params) {
  const { roomId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('rooms')
    .update(parsed.data)
    .eq('id', roomId)
    .select('*, dorms!inner(owner_id)')
    .single()

  if (error || data?.dorms?.owner_id !== user.id) {
    return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })
  }

  const { dorms: _, ...room } = data as any
  return NextResponse.json({ data: room as Room, error: null })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { roomId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data: room } = await supabase
    .from('rooms')
    .select('dorm_id')
    .eq('id', roomId)
    .single()
  if (!room) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })

  const { data: dorm } = await supabase
    .from('dorms')
    .select('id')
    .eq('id', room.dorm_id)
    .eq('owner_id', user.id)
    .single()
  if (!dorm) return NextResponse.json({ data: null, error: 'Forbidden' }, { status: 403 })

  const { error } = await supabase.from('rooms').delete().eq('id', roomId)
  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data: { success: true }, error: null })
}

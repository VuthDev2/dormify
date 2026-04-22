import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Room } from '@/lib/supabase/types'

const PLAN_MAX_ROOMS: Record<string, number | null> = {
  starter: 3,
  growth: 20,
  pro: null,
}

const createSchema = z.object({
  dorm_id: z.string().uuid(),
  room_number: z.string().min(1),
  floor: z.number().int().optional(),
  capacity: z.number().int().min(1).optional(),
  monthly_rent: z.number().min(0),
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
    .from('rooms')
    .select('*')
    .eq('dorm_id', dormId)
    .order('room_number', { ascending: true })

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Room[]>)
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

  // Verify caller owns the dorm
  const { data: dorm } = await supabase
    .from('dorms')
    .select('id')
    .eq('id', parsed.data.dorm_id)
    .eq('owner_id', user.id)
    .single()
  if (!dorm) return NextResponse.json({ data: null, error: 'Dorm not found' }, { status: 404 })

  // Tier room limit check
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('admin_id', user.id)
    .single()
  const plan = sub?.plan ?? 'starter'
  const maxRooms = PLAN_MAX_ROOMS[plan]
  if (maxRooms !== null) {
    const { count } = await supabase
      .from('rooms')
      .select('id', { count: 'exact', head: true })
      .eq('dorm_id', parsed.data.dorm_id)
    if ((count ?? 0) >= maxRooms) {
      return NextResponse.json(
        { data: null, error: `Your plan allows a maximum of ${maxRooms} rooms` },
        { status: 403 }
      )
    }
  }

  const { data, error } = await supabase
    .from('rooms')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Room>, { status: 201 })
}

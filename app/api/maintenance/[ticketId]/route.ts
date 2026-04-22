import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, MaintenanceTicket } from '@/lib/supabase/types'

const patchSchema = z.object({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  admin_notes: z.string().optional(),
})

type Params = { params: Promise<{ ticketId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { ticketId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('maintenance_tickets')
    .select('*')
    .eq('id', ticketId)
    .single()

  if (error) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MaintenanceTicket>)
}

export async function PATCH(request: Request, { params }: Params) {
  const { ticketId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('maintenance_tickets')
    .update(parsed.data)
    .eq('id', ticketId)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<MaintenanceTicket>)
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse, Invoice } from '@/lib/supabase/types'

const patchSchema = z.object({
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).optional(),
  paid_at: z.string().datetime().optional(),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
  other_adjustments: z.number().optional(),
})

type Params = { params: Promise<{ invoiceId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { invoiceId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .single()

  if (error) return NextResponse.json({ data: null, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Invoice>)
}

export async function PATCH(request: Request, { params }: Params) {
  const { invoiceId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  // Auto-set paid_at when marking paid
  const update: Record<string, unknown> = { ...parsed.data }
  if (parsed.data.status === 'paid' && !parsed.data.paid_at) {
    update.paid_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('invoices')
    .update(update)
    .eq('id', invoiceId)
    .select()
    .single()

  if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  return NextResponse.json({ data, error: null } satisfies ApiResponse<Invoice>)
}

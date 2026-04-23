import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ApiResponse } from '@/lib/supabase/types'

export interface AuditLog {
  id: string
  dorm_id: string
  actor_id: string
  action: string
  resource_type: string
  resource_id: string | null
  resource_name: string | null
  changes: Record<string, any> | null
  status: string
  error_message: string | null
  created_at: string
  actor?: {
    id: string
    full_name: string
    email?: string
  }
}

const querySchema = z.object({
  dorm_id: z.string().uuid(),
  limit: z.string().transform(v => Math.min(parseInt(v) || 50, 500)).optional().default('50'),
  offset: z.string().transform(v => parseInt(v) || 0).optional().default('0'),
  action: z.string().optional(),
  resource_type: z.string().optional(),
  from_date: z.string().optional(),
  to_date: z.string().optional(),
})

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  const parsed = querySchema.safeParse(params)

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 400 })
  }

  const { dorm_id, limit, offset, action, resource_type, from_date, to_date } = parsed.data

  // Verify user owns this dorm
  const { data: dorm, error: dormError } = await supabase
    .from('dorms')
    .select('id')
    .eq('id', dorm_id)
    .eq('owner_id', user.id)
    .single()

  if (dormError || !dorm) {
    return NextResponse.json({ data: null, error: 'Dorm not found or unauthorized' }, { status: 403 })
  }

  let query = supabase
    .from('audit_logs')
    .select(`
      id,
      dorm_id,
      actor_id,
      action,
      resource_type,
      resource_id,
      resource_name,
      changes,
      status,
      error_message,
      created_at,
      profiles!audit_logs_actor_id_fkey(id, full_name)
    `, { count: 'exact' })
    .eq('dorm_id', dorm_id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (action) {
    query = query.eq('action', action)
  }

  if (resource_type) {
    query = query.eq('resource_type', resource_type)
  }

  if (from_date) {
    query = query.gte('created_at', from_date)
  }

  if (to_date) {
    query = query.lte('created_at', to_date)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data: {
      logs: data,
      total: count,
      limit,
      offset,
    },
    error: null,
  } satisfies ApiResponse<any>)
}

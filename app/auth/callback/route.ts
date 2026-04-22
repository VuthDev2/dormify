import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PLAN_TO_TIER } from '@/lib/supabase/types'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard/normal'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('plan')
          .eq('admin_id', user.id)
          .single()
        const tier = sub ? PLAN_TO_TIER[sub.plan as keyof typeof PLAN_TO_TIER] : 'normal'
        return NextResponse.redirect(`${origin}/dashboard/${tier}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}

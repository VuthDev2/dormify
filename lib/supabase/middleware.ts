import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Protect all dashboard routes
  if (path.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from auth pages
  if ((path === '/login' || path === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard/normal', request.url))
  }

  // Gate chef dashboard behind pro plan
  if (path.startsWith('/dashboard/chef') && user) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('admin_id', user.id)
      .single()

    if (!sub || sub.plan !== 'pro') {
      return NextResponse.redirect(new URL('/dashboard/normal', request.url))
    }
  }

  return supabaseResponse
}

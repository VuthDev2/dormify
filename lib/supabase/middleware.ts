import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { hasSupabaseBrowserConfig, getSupabaseBrowserConfig } from '@/lib/supabase/config'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  if (!hasSupabaseBrowserConfig()) {
    return supabaseResponse
  }

  const { url, anonKey } = getSupabaseBrowserConfig()

  const supabase = createServerClient(
    url,
    anonKey,
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

  // Gate /dashboard/chef: allow actual chef-role users; for admins require pro plan
  if (path.startsWith('/dashboard/chef') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'chef') {
      return supabaseResponse
    }

    // Admin must have pro plan to access chef dashboard
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

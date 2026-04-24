import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv, requireSupabaseEnv } from './env'

export function createClient() {
  const { url, anonKey } = requireSupabaseEnv()

  return createBrowserClient(
    url,
    anonKey
  )
}

export function createOptionalClient() {
  const env = getSupabaseEnv()
  if (!env) return null

  return createBrowserClient(
    env.url,
    env.anonKey
  )
}

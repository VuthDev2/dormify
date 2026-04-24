export const missingSupabaseEnvMessage =
  "Supabase env is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, replace template placeholders, then restart `npm run dev`."

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  const hasTemplateValue =
    url?.includes("<your-project-ref>") ||
    anonKey?.includes("<your-anon-key>") ||
    url?.includes("<") ||
    anonKey?.includes("<")

  if (!url || !anonKey || hasTemplateValue) {
    return null
  }

  return { url, anonKey }
}

export function requireSupabaseEnv() {
  const env = getSupabaseEnv()
  if (!env) throw new Error(missingSupabaseEnvMessage)
  return env
}

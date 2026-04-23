const PLACEHOLDER_VALUES = [
  'your-project-ref',
  'your-anon-key',
  'your-service-role-key',
  '<your-project-ref>',
  '<your-anon-key>',
  '<your-service-role-key>',
]

function isPlaceholder(value: string | undefined) {
  if (!value) {
    return true
  }

  return PLACEHOLDER_VALUES.some((placeholder) => value.includes(placeholder))
}

export function hasSupabaseBrowserConfig() {
  return (
    !isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  )
}

export function getSupabaseBrowserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!hasSupabaseBrowserConfig() || !url || !anonKey) {
    throw new Error(
      'Supabase is not configured. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.'
    )
  }

  return { url, anonKey }
}

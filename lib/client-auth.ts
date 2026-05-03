const AUTH_KEY_HINTS = ['supabase', 'sb-', 'auth', 'session', 'token', 'dormify-auth'];

function looksLikeAuthKey(key: string) {
  const normalized = key.toLowerCase();
  return AUTH_KEY_HINTS.some((hint) => normalized.includes(hint));
}

function clearStorage(storage: Storage) {
  const keysToRemove: string[] = [];
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (!key) continue;
    if (looksLikeAuthKey(key)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => storage.removeItem(key));
}

function clearCookies() {
  const cookies = document.cookie.split(';');
  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name) return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
  });
}

export function performClientSignOut(redirectTo = '/login') {
  if (typeof window === 'undefined') return;

  try {
    clearStorage(window.localStorage);
    clearStorage(window.sessionStorage);
    clearCookies();
  } finally {
    window.location.href = redirectTo;
  }
}

// lib/auth.ts
export function clearAuth() {
  localStorage.removeItem('token')
  document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'
}

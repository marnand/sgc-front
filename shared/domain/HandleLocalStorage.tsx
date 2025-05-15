export const TokenStorage = {
  set: (value: string) => localStorage.setItem('auth_token', value),
  get: () => localStorage.getItem('auth_token'),
  remove : () => localStorage.removeItem('auth_token')
}
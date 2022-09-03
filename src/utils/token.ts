const TOKEN_STORAGE_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY

export function writeToken(token: string) {
  localStorage[TOKEN_STORAGE_KEY] = token
}

export function readToken(): string | undefined {
  const token = localStorage[TOKEN_STORAGE_KEY]

  return token ? token : undefined // swap null with undefined
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

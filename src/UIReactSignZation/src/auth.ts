const TOKEN_KEY = 'signzation_token';
const EXPIRES_KEY = 'signzation_expires_at';

export const setSession = (token: string, expiresInSeconds: number) => {
  const expiresAt = Date.now() + expiresInSeconds * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isSessionValid = (): boolean => {
  const token = getToken();
  const expiresAt = localStorage.getItem(EXPIRES_KEY);
  if (!token || !expiresAt) {
    return false;
  }
  return Date.now() < Number(expiresAt);
};

const TOKEN_KEY = 'signzation_token';
const EXPIRES_KEY = 'signzation_expires_at';
const USER_KEY = 'signzation_user';

type SessionUser = {
  id: number;
  email: string;
};

export const setSession = (token: string, expiresInSeconds: number, user: SessionUser) => {
  const expiresAt = Date.now() + expiresInSeconds * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
  localStorage.setItem(USER_KEY, JSON.stringify({ id: user.id, email: user.email }));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USER_KEY);
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

export const getCurrentUserId = (): number | null => {
  const userRaw = localStorage.getItem(USER_KEY);
  if (!userRaw) {
    return null;
  }

  try {
    const user = JSON.parse(userRaw) as SessionUser;
    return typeof user.id === 'number' ? user.id : null;
  } catch {
    return null;
  }
};

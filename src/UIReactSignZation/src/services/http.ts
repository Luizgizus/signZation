import { clearSession } from '../auth';

const parseBody = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return text as unknown as T;
};

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = await response.clone().json();
    if (typeof data?.detail === 'string') {
      return data.detail;
    }
    if (typeof data?.message === 'string') {
      return data.message;
    }
    if (typeof data?.Message === 'string') {
      return data.Message;
    }
    return JSON.stringify(data);
  } catch {
    const text = await response.text();
    return text || response.statusText;
  }
};

const withAuth = (init?: RequestInit): RequestInit => {
  const token = localStorage.getItem('signzation_token');
  if (!token) {
    return init ?? {};
  }

  return {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  };
};

export const requestJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, withAuth(init));
  if (!response.ok) {
    if (response.status === 403) {
      clearSession();
      window.location.href = '/login';
    }
    throw new Error(await parseError(response));
  }

  const body = await parseBody<T>(response);
  return body as T;
};

export const requestVoid = async (input: RequestInfo, init?: RequestInit): Promise<void> => {
  const response = await fetch(input, withAuth(init));
  if (!response.ok) {
    if (response.status === 403) {
      clearSession();
      window.location.href = '/login';
    }
    throw new Error(await parseError(response));
  }
};

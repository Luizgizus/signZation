import { requestJson } from './http';

const baseUrl = 'http://localhost:8000/users';

export type LoginResponse = {
  token: string;
  expires_in: number;
  user: {
    id: number;
    email: string;
  };
};

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return requestJson<LoginResponse>(`${baseUrl}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },
};

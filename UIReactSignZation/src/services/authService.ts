import { requestJson } from './http';
import { API_BASE_URL } from '../config/api';

const baseUrl = `${API_BASE_URL}/users`;

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
  resetPassword: async (userId: number, oldPassword: string, newPassword: string): Promise<{ detail: string }> => {
    return requestJson<{ detail: string }>(`${baseUrl}/reset-password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  },
};

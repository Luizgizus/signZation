import { API_BASE_URL } from '../config/api';
import { User } from '../dtos/user';
import { requestJson, requestVoid } from './http';

const baseUrl = `${API_BASE_URL}/users`;

export const userService = {
  getAll: async (): Promise<User[]> => {
    return requestJson<User[]>(`${baseUrl}/`);
  },
  getById: async (id: string | number): Promise<User> => {
    return requestJson<User>(`${baseUrl}/${id}/`);
  },
  create: async (data: Partial<User>): Promise<unknown> => {
    return requestJson(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  update: async (id: string | number, data: Partial<User>): Promise<unknown> => {
    return requestJson(`${baseUrl}/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string | number): Promise<void> => {
    return requestVoid(`${baseUrl}/${id}/`, {
      method: 'DELETE',
    });
  },
};

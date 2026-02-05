import { Company } from '../models/company';
import { requestJson, requestVoid } from './http';
import { API_BASE_URL } from '../config/api';

const baseUrl = `${API_BASE_URL}/companies`;

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    return requestJson<Company[]>(`${baseUrl}/`);
  },
  getById: async (id: string | number): Promise<Company> => {
    return requestJson<Company>(`${baseUrl}/${id}/`);
  },
  create: async (data: Partial<Company>): Promise<unknown> => {
    return requestJson(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  update: async (id: string | number, data: Partial<Company>): Promise<unknown> => {
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

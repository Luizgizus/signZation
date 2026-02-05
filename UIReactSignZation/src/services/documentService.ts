import { Document } from '../models/document';
import { requestJson, requestVoid } from './http';
import { API_BASE_URL } from '../config/api';

const baseUrl = `${API_BASE_URL}/documents`;

export const documentService = {
  getAll: async (): Promise<Document[]> => {
    return requestJson<Document[]>(`${baseUrl}/`);
  },
  signDocument: async (id: string | number, data: Partial<Document>): Promise<Document> => {
    return requestJson<Document>(`${baseUrl}/sign/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  getById: async (id: string | number): Promise<Document> => {
    return requestJson<Document>(`${baseUrl}/${id}`);
  },
  create: async (data: Partial<Document>): Promise<unknown> => {
    return requestJson(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  update: async (id: string | number, data: Partial<Document>): Promise<unknown> => {
    return requestJson(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string | number): Promise<void> => {
    return requestVoid(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  },
};

export interface User {
  id?: number | string;
  email?: string;
  password?: string;
  created_by?: number | null;
  updated_by?: number | null;
}

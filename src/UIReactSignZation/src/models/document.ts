export interface Document {
  id?: number;
  name?: string;
  created_at?: Date | string;
  last_updated_at?: Date | string;
  date_limit_to_sign?: string;
  signed?: boolean;
  company?: number;
  created_by?: number;
  updated_by?: number | null;
}

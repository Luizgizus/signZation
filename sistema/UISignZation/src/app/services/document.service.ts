import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';

const baseUrl = 'http://localhost:8000/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Document[]> {
    return this.http.get<Document[]>(`${baseUrl}/`);
  }

  signDocument(id: any, data: any): Observable<Document> {
    return this.http.post<Document>(`${baseUrl}/sign/${id}`, data);
  }
  
  getById(id: any,): Observable<Document> {
    return this.http.get<Document>(`${baseUrl}/${id}/`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = `${environment.apiUrl}/api/requests`;

  constructor(private http: HttpClient) { }

  getRequests(username: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/${username}`);
  }

  createRequest(username: string, sender: string, status: string): Observable<Request> {
    const request = { username, sender, status };
    return this.http.post<Request>(this.apiUrl, request);
  }

  updateRequest(id: string, username: string, sender: string, status: string): Observable<Request> {
    const request = { username, sender, status };
    return this.http.put<Request>(`${this.apiUrl}/${id}`, request);
  }
}
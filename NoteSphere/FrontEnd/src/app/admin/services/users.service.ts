import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  admin: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }

  updateUser(username: string, updatedUser: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${username}`, updatedUser);
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${username}`);
  }
  
  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${username}`);
  }
}


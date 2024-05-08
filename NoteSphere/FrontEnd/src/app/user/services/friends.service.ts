import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Friend {
  _id: string;
  username: string;
  friend: string;
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiUrl = 'http://localhost:3000/api/friends'; 

  constructor(private http: HttpClient) { }

  getAllFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.apiUrl);
  }

  getFriendsByUsername(username: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiUrl}/username/${username}`);
  }

  createFriend(newFriend: Friend): Observable<Friend> {
    return this.http.post<Friend>(this.apiUrl, newFriend);
  }

  deleteFriendByUsername(username: string, friend: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/username/${username}/friend/${friend}`);
  }
}
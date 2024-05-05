import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Note {
  _id: string;
  title: string;
  content: string;
  owner: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/api/notes'; 

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${noteId}`);
  }

  createNote(newNote: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, newNote);
  }

  updateNote(noteId: string, updatedNote: Note): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}/${noteId}`, updatedNote);
  }

  deleteNote(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`);
  }
}


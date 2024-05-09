import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  private apiUrl = `${environment.apiUrl}/api/notes`;

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getNotesByOwner(owner: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/owner/${owner}`);
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${noteId}`);
  }

  createNote(newNote: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, newNote);
  }

  updateNote(updatedNote: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${updatedNote._id}`, updatedNote);
  }

  deleteNote(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`);
  }
}


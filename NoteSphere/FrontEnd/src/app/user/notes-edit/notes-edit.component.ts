import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css']
})
export class NotesEditComponent implements OnInit {
  note: Note = {
    _id: '',
    title: '',
    content: '',
    owner: '' // Aquí deberías poner el propietario de la nota
  };

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.loadNote(noteId);
    }
  }

  loadNote(noteId: string): void {
    this.notesService.getNoteById(noteId).subscribe(note => {
      this.note = note;
    });
  }

  saveNote(): void {
    this.notesService.updateNote(this.note).subscribe(() => {
      console.log('Nota actualizada con éxito');
      this.router.navigate(['/user/notes']);
    }, error => {
      console.error('Error al actualizar la nota:', error);
    });
  }
}
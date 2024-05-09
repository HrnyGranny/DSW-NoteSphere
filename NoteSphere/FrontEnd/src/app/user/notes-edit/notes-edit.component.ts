import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import Swal from 'sweetalert2';

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
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.loadNote(noteId);
    }
    this.username = this.authService.getUser();
  }

  loadNote(noteId: string): void {
    this.notesService.getNoteById(noteId).subscribe(note => {
      this.note = note;
    }, error => {
      Swal.fire({
        title: 'Error loading the note',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  saveNote(): void {
    this.notesService.updateNote(this.note).subscribe(() => {
      Swal.fire({
        title: 'Note successfully updated.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/user/notes']);
    }, error => {
      Swal.fire({
        title: 'Error updating the note',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  return(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }
}
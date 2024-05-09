import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { User } from '../../models/user.model';
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 de la biblioteca uuid
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})
export class NotesCreateComponent {
  noteTitle: string = ''; // Variable para almacenar el título de la nota
  noteContent: string = ''; // Variable para almacenar el contenido de la nota
  username: string = '';

  constructor(
    private authService: AuthService,
    private notesService: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
  }

  saveNote(): void {
    // Obtén el propietario del usuario actual del AuthService
    const owner = this.authService.getUser();

    // Crea una nueva instancia de la nota con los datos del formulario
    const newNote: Note = {
      _id: uuidv4(), // Genera un ID único utilizando uuid
      title: this.noteTitle,
      content: this.noteContent,
      owner: owner
    };

    // Llama al servicio para guardar la nueva nota
    this.notesService.createNote(newNote).subscribe(() => {
      Swal.fire({
        title: 'Note successfully created.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      // Redirige a la página de notas después de crear la nota
      this.router.navigate(['/user/notes']);
    }, error => {
      Swal.fire({
        title: 'Error creating the note',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }
  
  return(): void {
    this.router.navigate(['/user/notes']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirects the user to the LoginComponent
  }
}
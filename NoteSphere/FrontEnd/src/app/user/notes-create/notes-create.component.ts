import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 de la biblioteca uuid

@Component({
  selector: 'app-note-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})
export class NotesCreateComponent {
  noteTitle: string = ''; // Variable para almacenar el título de la nota
  noteContent: string = ''; // Variable para almacenar el contenido de la nota

  constructor(
    private authService: AuthService,
    private notesService: NotesService,
    private router: Router
  ) { }

  saveNote(): void {
    // Obtén el propietario del usuario actual del AuthService
    const owner = this.authService.getUser();
    console.log('Propietario de la nota:', owner);

    // Crea una nueva instancia de la nota con los datos del formulario
    const newNote: Note = {
      _id: uuidv4(), // Genera un ID único utilizando uuid
      title: this.noteTitle,
      content: this.noteContent,
      owner: owner
    };

    // Llama al servicio para guardar la nueva nota
    this.notesService.createNote(newNote).subscribe(() => {
      console.log('Nota creada con éxito');
      // Redirige a la página de notas después de crear la nota
      this.router.navigate(['/user/notes']);
    }, error => {
      console.error('Error al crear la nota:', error);
      // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje al usuario
    });
  }
}




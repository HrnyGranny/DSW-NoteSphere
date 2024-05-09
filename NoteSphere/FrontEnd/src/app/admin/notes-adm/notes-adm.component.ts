import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notas',
  templateUrl: './notes-adm.component.html',
  styleUrls: ['./notes-adm.component.css']
})
export class NotesAdmComponent implements OnInit {
  notas: Note[] = [];
  username: string = '';

  constructor(private authService: AuthService, private router: Router, private notesService: NotesService) { }

  ngOnInit(): void {
    this.obtenerNotas();
    this.username = this.authService.getUser();
  }

  obtenerNotas(): void {
    this.notesService.getAllNotes().subscribe(
      notas => {
        this.notas = notas;
      },
      error => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }
  
  eliminarNota(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete this note?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notesService.deleteNote(id).subscribe(
          () => {
            this.notas = this.notas.filter(nota => nota._id !== id);
            Swal.fire({
              title: 'Deleted!',
              text: 'The note has been deleted.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the note.',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            });
          }
        );
      }
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
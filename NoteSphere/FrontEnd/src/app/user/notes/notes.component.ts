import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/users.service';
import { FriendsService } from '../../services/friends.service';
import Swal from 'sweetalert2';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'app-notas',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notas: Note[] = [];
  amigos: Friend[] = [];
  username: string = '';

  constructor(private notesService: NotesService, private authService: AuthService, private router: Router, private userService: UserService, private friendsService : FriendsService) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.obtenerNotasPorUsuario(this.username);
    this.obtenerUsuarios();
  }

  obtenerNotasPorUsuario(usuario: string): void {
    this.notesService.getNotesByOwner(usuario).subscribe(
      notas => {
        this.notas = notas;
      },
      error => {
        Swal.fire({
          title: 'Error getting the notes',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  obtenerUsuarios(): void {
    this.friendsService.getFriendsByUsername(this.username).subscribe(
      amigos => {
        this.amigos = amigos; // Asegúrate de que 'usuarios' sea de tipo 'Friend[]'
      },
      error => {
        Swal.fire({
          title: 'Error al obtener los amigos',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  eliminarNota(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notesService.deleteNote(id).subscribe(
          () => {
            // Remove the note from the local list of notes
            this.notas = this.notas.filter(nota => nota._id !== id);
            Swal.fire({
              title: 'Note successfully deleted.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error => {
            Swal.fire({
              title: 'Error deleting the note',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            });
          }
        );
      }
    });
  }

  editarNota(nota: Note): void {
    this.router.navigate(['/user/notes/edit', nota._id]);
  }

  compartirNota(nota: Note, amigo: Friend): void {
    if (amigo.friend === this.username) {
      Swal.fire({
        title: 'You cannot share a note with yourself.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
  
    this.notesService.getNotesByOwner(amigo.friend).subscribe(
      notasAmigo => {
        const notaExistente = notasAmigo.find(n => n.title === nota.title && n.content === nota.content);
        if (notaExistente) {
          Swal.fire({
            title: 'The friend already has this note.',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          const nuevaNota = { ...nota, owner: amigo.friend };
          this.notesService.createNote(nuevaNota).subscribe(
            () => {
              Swal.fire({
                title: 'Note successfully shared.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
            },
            error => {
              Swal.fire({
                title: 'Error sharing the note',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
              });
            }
          );
        }
      },
      error => {
        Swal.fire({
          title: 'Error sharing the note',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  navigateToCreateNote(): void {
    this.router.navigate(['/user/notes/create']);
  }

  return(): void {
    this.router.navigate(['/user']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirects the user to the LoginComponent
  }
}
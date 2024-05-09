import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  userForm: FormGroup;
  passwordMismatchError: boolean = false;
  usernameExistsError: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      admin: [false]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { username, password, confirmPassword, admin } = this.userForm.value;

    if (password !== confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }

    this.userService.checkUsernameExists(username).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.usernameExistsError = true;
        } else {
          const newUser: User = {
            username,
            password,
            admin: admin ? 'Y' : 'N'
          };
  
          this.userService.createUser(newUser).subscribe(
            () => {
              Swal.fire({
                title: 'User created successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['admin/usersAdm']);
            },
            error => {
              Swal.fire({
                title: 'Error creating user.',
                text: error.message,
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
          title: 'Error checking username.',
          text: error.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm: FormGroup;
  passwordMismatchError: boolean = false;
  usernameExistsError: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { username, password, confirmPassword } = this.userForm.value;

    if (password !== confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }

    this.userService.checkUsernameExists(username).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.toastr.success('User registered successfully');
          this.usernameExistsError = true;
        } else {
          const newUser: User = {
            username,
            password,
            admin: 'N'
          };

          this.userService.createUser(newUser).subscribe(
            () => {
              this.toastr.success('User registered successfully');
              this.router.navigate(['login']);
            },
            error => {
              console.error('Error al registrar usuario:', error);
            }
          );
        }
      },
      error => {
        console.error('Error al verificar el nombre de usuario:', error);
      }
    );
  }
}
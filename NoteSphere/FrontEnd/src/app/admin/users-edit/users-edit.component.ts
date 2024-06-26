import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup;
  passwordMismatchError: boolean = false;
  usernameExistsError: boolean = false;
  user: User = {
    username: '',
    password: '',
    admin: ''
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      admin: [false]
    });
  }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.userService.getUserByUsername(username).subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          ...user,
          confirmPassword: user.password,
          admin: user.admin === 'Y'
        });
      });
    }
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
  
    const updatedUser: User = {
      username,
      password,
      admin: admin ? 'Y' : 'N'
    };
  
    this.userService.updateUser(this.user.username, updatedUser).subscribe(
      () => {
        Swal.fire({
          title: 'User updated successfully.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['admin/usersAdm']);
      },
      error => {
        Swal.fire({
          title: 'Error updating user.',
          text: error.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
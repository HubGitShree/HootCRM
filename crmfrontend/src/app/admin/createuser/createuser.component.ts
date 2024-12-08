import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent {
  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(AdminService) private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.adminService.createUser(this.createUserForm.value).subscribe(
        response => {
          console.log('User created successfully:', response);
          this.createUserForm.reset(); // reset the form values
          this.snackBar.open('User created successfully', 'Close', {
            duration: 3000, //3000 milliseconds
          });
        },
        error => {
          console.error('Error creating user:', error);
          this.snackBar.open('Error creating user', 'Close', {
            duration: 3000, // 3000 milliseconds
          });
        }
      );
    }
  }
}
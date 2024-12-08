import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true, // Angular 18-specific
  imports: [FormsModule], // Required for ngModel
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  formData = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
      },
      (error: any) => {
        console.error('Registration error', error);
      }
    );
  }
}

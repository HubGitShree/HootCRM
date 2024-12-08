import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import * as jwt_decode from "jwt-decode";
import {jwtDecode} from 'jwt-decode'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,  private router : Router ) {}

  onSubmit() {
    this.authService.login(this.formData).subscribe(
      (response: any) => {
        console.log('User logged in successfully', response);
        const token = response.token;
        localStorage.setItem('token', token);

        // Decode the token to extract the role
        interface MyToken {
          role: string;
          // other properties, basically simulating your token object
        }
        const decodedToken = jwtDecode<MyToken>(token);
        console.log('Decoded token', decodedToken.role);
        const role = decodedToken.role;


        // navigate based on the role
        if (role === 'ADMIN') {
          this.router.navigateByUrl('admin/dashboard');
        } else if (role === 'SALES') {
          this.router.navigateByUrl('sales/tasks');
        }else {
          // handling other roles or default navigation
          this.router.navigateByUrl('/');
        }

      },
      (error: any) => {
        console.error('Login error', error);
      }
    );
  }
}
    
// from stackoverflow, define an interfce bcoz jwt does not know what is inside your decodedtoken
// interface MyToken {
//   name: string;
//   exp: number;
//   // whatever else is in the JWT.
// }

// const decodedToken = jwtDecode<MyToken>(token);
// console.log(decodedToken.exp); // works!



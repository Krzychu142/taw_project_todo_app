
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  error: string | null = null; 

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.loginUser(this.user).subscribe(
      (data: any) => {
         this.router.navigate(['/']);
      },
      (error: any) => {
        console.error(error.error.error);
        this.error = error.error.error; 
      }
    );
  }
}
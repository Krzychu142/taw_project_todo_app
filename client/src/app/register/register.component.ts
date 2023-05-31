import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.mode'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { name: '', email: '', password: '' } 
  error: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

 onSubmit(): void {
    this.authService.registerUser(this.user).subscribe(
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

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../../src/app/user.mode'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { name: '', email: '', password: '' } 
  error: string | null = null; 

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.registerUser(this.user).subscribe(
      (data: any) => console.log(data),
      (error: any) => {
        console.error(error.error.error);
        this.error = error.error.error;
      }
    )
  }
}

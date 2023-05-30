
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  error: string | null = null; 

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.loginUser(this.user).subscribe(
      (data: any) => console.log(data),
      (error: any) => {

        console.error(error.error.error);
        this.error = error.error.error; 
      }
    );
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarOpen = false;

  constructor(private authService: AuthService) {}

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  handleLogoClick(): void {
    this.authService.logout();
  }

  isUserAuthenticated(): boolean {
    return this.authService.userIsAuthenticated;
  }
}

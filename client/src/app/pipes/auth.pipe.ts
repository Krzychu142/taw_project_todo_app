import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export function setAuthTokenAndAuthState(authService: AuthService) {
  return tap((response: any) => {
    localStorage.setItem('token', response.token);
    authService.userIsAuthenticated = true;
  });
}

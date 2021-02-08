import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  private readonly credentials = {
    username: 'Srujan',
    password: '1234'
  };

  get isLoggedIn(): boolean {
    return localStorage.loggedIn === 'true';
  }

  get username(): string {
    return this.credentials.username;
  }

  getToken({ username, password }): Observable<true | string> {
    let response: Observable<true | string>;
    if (
      username === this.credentials.username &&
      password === this.credentials.password
    ) {
      response = of(true);
      localStorage.loggedIn = true;
    } else {
      response = throwError('Invalid Credentials');
    }
    return response.pipe(delay(2000));
  }

  logout(): void {
    localStorage.loggedIn = false;
    this.router.navigateByUrl('login');
  }
}

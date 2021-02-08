import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.redirectToHomePage();
    }
  }

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  error: string;

  ngOnInit(): void {}

  login(): void {
    this.error = null;
    this.loading = true;
    this._auth
      .getToken(this.loginForm.value)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        () => this.redirectToHomePage(),
        error => (this.error = error)
      );
  }

  redirectToHomePage() {
    this._router.navigateByUrl('');
  }
}

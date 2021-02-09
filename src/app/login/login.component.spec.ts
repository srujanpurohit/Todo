import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: false,
            getToken: ({ username, password }) => of(true)
          }
        }
      ],
      imports: [RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property loading and value as false', () => {
    expect(component.loading).toBeFalse();
  });

  // it('should have path as /login', () => {
  //   const router = TestBed.inject(Router);
  //   expect(router.url).toBe('/login');
  //   console.log(router.url);
  // });

  describe('Login form', () => {
    let form;
    beforeEach(() => {
      form = component.loginForm;
      form.reset();
    });

    it('should create', () => {
      expect(form).toBeTruthy();
    });

    it('should be invalid by default', () => {
      expect(form.invalid).toBeTrue();
    });

    it('should be valid if username and password field has values', () => {
      form.patchValue({ username: 'asdasd', password: 'asdsad' });
      expect(form.valid).toBeTrue();
    });

    describe('Login Button', () => {
      let btn;
      beforeEach(() => {
        btn = de.nativeElement.querySelector('#loginBtn');
      });

      it('should have login Button', () => {
        expect(btn).toBeTruthy();
      });

      it('should have text as Login', () => {
        expect(btn.innerHTML).toContain('Login');
      });

      it('save button should be disabled by default', () => {
        expect(btn.hasAttribute('disabled')).toBeTrue();
      });
    });

    describe('Username', () => {
      let usernameControl;
      beforeEach(() => {
        usernameControl = form.get('username');
      });
      it('should have username field', () => {
        expect(usernameControl).toBeTruthy();
      });

      it('should be invalid by default', () => {
        expect(usernameControl.invalid).toBeTrue();
      });

      it('should be blank string by default', () => {
        expect(usernameControl.value).toBeNull();
      });

      it('should be valid on any value', () => {
        usernameControl.patchValue('abc');
        expect(usernameControl.valid).toBeTrue();
        usernameControl.reset();
      });
    });

    describe('Password', () => {
      let passwordControl;
      beforeEach(() => {
        passwordControl = form.get('password');
      });
      it('should have password field', () => {
        expect(passwordControl).toBeTruthy();
      });

      it('should be invalid by default', () => {
        expect(passwordControl.invalid).toBeTrue();
      });

      it('should be blank string by default', () => {
        expect(passwordControl.value).toBeNull();
      });

      it('should be valid on any value', () => {
        passwordControl.patchValue('askjd aksd12');
        expect(passwordControl.valid).toBeTrue();
        passwordControl.reset();
      });
    });
  });

  describe('Login Method', () => {
    it('should have login method', () => {
      expect(component.login).toBeTruthy();
    });

    it('should redirect to home page if credentials are correct', fakeAsync(() => {
      const router = TestBed.inject(Router);

      component.loginForm.patchValue({ username: '123', password: '123' });
      component.login();
      tick();
      expect(router.url).toBe('/');
    }));

    it('should reset the error message', () => {
      component.error = 'Error';
      component.login();
      expect(component.error).toBeNull();
    });

    it('should set loading variable to false', fakeAsync(() => {
      component.login();
      tick(500);
      expect(component.loading).toBeFalse();
    }));

    // it('should reset the error message', () => {
    //   expect(component.loading).toBeNull()
    // })
  });

  describe('redirectToHomePage()', () => {
    it('should have redirectToHomePage method', () => {
      expect(component.redirectToHomePage).toBeTruthy();
    });

    it('should redirect To Home Page', fakeAsync(() => {
      component.redirectToHomePage();
      tick();
      const router = TestBed.inject(Router);
      expect(router.url).toBe('/');
    }));
  });
});

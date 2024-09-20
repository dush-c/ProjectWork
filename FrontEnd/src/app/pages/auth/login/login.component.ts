import { Component } from '@angular/core';
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm;
  loginError = '';

  private destroyed$ = new Subject<void>();

  constructor(
    protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', { validators: Validators.required }],
      password: ['', { validators: Validators.required }],
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.loginError = '';
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authSrv
        .login(username!, password!)
        .pipe(
          catchError((err) => {
            console.log(err);
            this.loginError = err.error.message;
            return throwError(() => err);
          })
        )
        .subscribe((user) => {
          this.router.navigate(['/dashboard']);
        });
    }
  }
}

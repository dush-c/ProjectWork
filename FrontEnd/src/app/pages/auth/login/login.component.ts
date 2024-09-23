import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm;
  loginError = '';
  timeoutMessage = '';

  private destroyed$ = new Subject<void>();
  private timeout: any;

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
        this.timeoutMessage = '';
        this.resetTimeout();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    clearTimeout(this.timeout);
  }

  resetTimeout(): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.loginForm.reset();
      this.timeoutMessage = 'Timeout';
    }, 30000);
  }

  login() {
    clearTimeout(this.timeout);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authSrv.login(username!, password!).pipe(
        catchError((err) => {
          console.log(err);
          this.loginError = 'Credenziali errate o non valide';
          return throwError(() => err);
        })
      ).subscribe({
        next: (user) => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
        }
      });
    }
  }
}

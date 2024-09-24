import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;

  registrationForm = this.fb.group({
    firstName: ['', { validators: Validators.required }],
    lastName: ['', { validators: Validators.required }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(8), this.passwordValidator] }],
    confirmPassword: ['', { validators: Validators.required }],
    profilePicture: ['']
  })

  registrationError = ''

  private destroyed$ = new Subject<void>()

  constructor(
    protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.registrationError = ''
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  register() {
    if (this.registrationForm.valid) {
      const {firstName, lastName, email, password, profilePicture} = this.registrationForm.value;
      this.authSrv
          .register(firstName!, lastName!, email!, password!, profilePicture!)
          .pipe(
              catchError((err) => {
                this.registrationError = 'Errore durante la registrazione.';
                return throwError(() => err);
              })
          )
          .subscribe({
            next: () => {
              this.router.navigate(['/check-email']);
            }
          });
    } else {
      const emailControl = this.registrationForm.get('email');
      const passwordControl = this.registrationForm.get('password');

      if (emailControl?.invalid) {
        this.registrationError = 'La email deve essere valida.';
      } else if (passwordControl?.invalid) {
        this.registrationError = 'La password deve contenere almeno 8 caratteri e almeno un carattere speciale';
      } else {
        this.registrationError = 'Compila tutti i campi richiesti correttamente';
      }
    }
  }

  private passwordValidator(control: AbstractControl) {
    const password = control.value;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password && specialCharacterRegex.test(password) ? null : { special: true };
  }

}

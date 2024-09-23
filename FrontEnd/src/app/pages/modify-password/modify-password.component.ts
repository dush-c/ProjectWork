import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.scss'
})
export class ModifyPasswordComponent {
  hide = true;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',  { validators: [Validators.required, Validators.minLength(8), this.passwordValidator] }],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;

      // Qui inserisci la logica per verificare la vecchia password
      // e aggiornare la password sul server.
      console.log('Password cambiata con successo:', { oldPassword, newPassword });
    }
  }

  private passwordValidator(control: AbstractControl) {
    const password = control.value;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password && specialCharacterRegex.test(password) ? null : { special: true };
  }
}

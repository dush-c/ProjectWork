import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountEntity} from "../../interfaces/bank-account.entity";
import {BankAccountService} from "../../services/bank-account.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.scss'
})
export class ModifyPasswordComponent {
  hide = true
  passwordForm: FormGroup;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), this.specialCharacterValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  specialCharacterValidator(control: AbstractControl) {
    const regex = /(?=.*[!@#$%^&*])/;
    return regex.test(control.value) ? null : { special: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      this.authService.updatePassword(newPassword, confirmPassword).subscribe(
        response => {
          this.registrationSuccess = "Password aggiornata con successo";
          this.registrationError = null;
        },
        error => {
          this.registrationError = "La password non può essere uguale a quella attuale";
        }
      );
    }
  }

}

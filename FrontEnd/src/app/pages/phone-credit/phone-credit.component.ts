import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-phone-credit',
  templateUrl: './phone-credit.component.html',
  styleUrl: './phone-credit.component.scss'
})
export class PhoneCreditComponent {
  rechargeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rechargeForm = this.fb.group({
      phoneNumber: ['+39', [Validators.required, Validators.pattern(/^\+39[0-9]{10}$/)]],
      operator: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  submitRecharge() {
    if (this.rechargeForm.valid) {
      const rechargeDetails = this.rechargeForm.value;
      console.log('Ricarica Inviata:', rechargeDetails);
      // Aggiungi la logica per inviare i dati al server
    }
  }
}

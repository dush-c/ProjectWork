import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.scss'
})
export class BankTransferComponent {
  transferForm: FormGroup;
  balance: number = 100;

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      iban: ['', [Validators.required, Validators.pattern(/^IT[0-9]{2}[A-Z]{1}[0-9A-Z]{27}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  async submitTransfer() {
    if (this.transferForm.valid) {
      const transferDetails = this.transferForm.value;

      //const ibanExists = await this.transferService.checkIban(transferDetails.iban);
      // if (!ibanExists) {
      //   console.error('IBAN non trovato');
      //   return;
      // }

      if (transferDetails.amount > this.balance) {
        console.error('Saldo insufficiente');
        return;
      }

      // Logica per eseguire il bonifico
      console.log('Bonifico inviato:', transferDetails);
      // Aggiungi la logica per inviare i dati al server
    }
  }
}

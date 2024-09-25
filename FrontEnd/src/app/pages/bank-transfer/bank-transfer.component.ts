import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountService} from "../../services/bank-account.service";
import {AuthService} from "../../services/auth.service";
import {CategoryTransaction} from "../../interfaces/category-transaction.entity";
import {BankTransferService} from "../../services/bank-transfer.service";
import {Transaction} from "../../interfaces/transaction.entity";

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.scss'
})
export class BankTransferComponent implements OnInit{
  transferForm: FormGroup;
  saldo: number = 0;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;

  constructor(private fb: FormBuilder, private transferService: BankTransferService) {
    this.transferForm = this.fb.group({
      iban: ['', [Validators.required, Validators.pattern(/^IT[0-9]{2}[A-Z]{1}[0-9A-Z]{22}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      causale: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.transferService.getBalance().subscribe({
      next: (response) => {
        console.log('Risposta dalla API:', response);
        this.saldo = response.saldo;
        console.log(this.saldo);
      },
      error: (err) => {
        console.error('Errore nel recuperare il saldo:', err);
        this.registrationError = 'Impossibile recuperare il saldo';
      }
    });
  }

  submitTransfer() {
    if (this.transferForm.valid) {
      const transferDetails = this.transferForm.value;

      if (transferDetails.amount > this.saldo) {
        this.registrationError = 'Saldo insufficiente';
        this.registrationSuccess = null;
        console.error('Saldo insufficiente');
        return;
      }

      this.transferService.eseguiBonifico(transferDetails.iban, transferDetails.amount, transferDetails.causale)
        .subscribe({
          next: (response) => {
            this.registrationSuccess = 'Bonifico eseguito con successo!';
            this.registrationError = null;
            this.saldo -= transferDetails.amount;
          },
          error: (error) => {
            this.registrationError = error.error.message;
            this.registrationSuccess = null;
            console.error("Errore durante l'esecuzione del bonifico:", error);
          }
        });
    }
  }
}

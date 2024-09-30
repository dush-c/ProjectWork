import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankTransferService } from '../../services/bank-transfer.service';
import { Transaction } from '../../interfaces/transaction.entity';
import {basename} from "@angular/compiler-cli";

@Component({
  selector: 'app-phone-credit',
  templateUrl: './phone-credit.component.html',
  styleUrl: './phone-credit.component.scss',
})
export class PhoneCreditComponent implements OnInit {
  rechargeForm: FormGroup;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;
  lastBalance!: number;

  constructor(
    private fb: FormBuilder,
    private transferService: BankTransferService
  ) {
    this.rechargeForm = this.fb.group({
      numero: [
        '+39',
        [Validators.required, Validators.pattern(/^\+39[0-9]{10}$/)],
      ],
      operatore: ['', Validators.required],
      taglio: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getLastBalance();
  }

  getLastBalance() {
    this.transferService.getLatestBalance().subscribe({
      next: (balance) => {
        this.lastBalance = balance;
        console.log('lastBalance', this.lastBalance);
      },
      error: (error) => {
        console.error('Errore nel recupero numero:', error);
      },
    });
  }

  submitRecharge() {
    if (this.rechargeForm.valid) {
      const rechargeDetails = this.rechargeForm.value;
      const rechargeAmount = parseFloat(rechargeDetails.taglio);

      if (this.lastBalance > rechargeAmount) {
        this.transferService.eseguiRicarica(rechargeDetails).subscribe({
          next: (response) => {
            this.registrationSuccess = 'Ricarica eseguita con successo!';
            this.registrationError = null;
            this.lastBalance -= rechargeAmount;
            this.rechargeForm.reset();
          },
          error: (error) => {
            this.registrationError =
              "Errore durante l'esecuzione della ricarica";
            this.registrationSuccess = null;
            console.error("Errore durante l'esecuzione della ricarica:", error);
          },
        });
      } else {
        this.registrationError = 'Saldo insufficiente per eseguire la ricarica';
        this.registrationSuccess = null;
      }
    }
  }
}

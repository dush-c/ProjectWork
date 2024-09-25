import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankTransferService } from '../../services/bank-transfer.service';
import { Transaction } from '../../interfaces/transaction.entity';

@Component({
  selector: 'app-phone-credit',
  templateUrl: './phone-credit.component.html',
  styleUrl: './phone-credit.component.scss',
})
export class PhoneCreditComponent implements OnInit {
  rechargeForm: FormGroup;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;
  Balance: number = 0;

  constructor(
    private fb: FormBuilder,
    private transferService: BankTransferService
  ) {
    this.rechargeForm = this.fb.group({
      phoneNumber: [
        '+39',
        [Validators.required, Validators.pattern(/^\+39[0-9]{10}$/)],
      ],
      operator: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.transferService.getBalance().subscribe({
      next: (response: { balance: number }) => {
        this.Balance = response.balance;
      },
      error: (err) => {
        console.error('Errore nel recuperare il saldo:', err);
        this.registrationError = 'Impossibile recuperare il saldo';
      }
    });
  }

  submitRecharge() {
    if (this.rechargeForm.valid) {
      const rechargeDetails = this.rechargeForm.value;
      const rechargeAmount = parseFloat(rechargeDetails.amount);

      if (this.Balance >= rechargeAmount) {
        this.transferService.eseguiRicarica(rechargeDetails).subscribe({
          next: (response) => {
            this.registrationSuccess = 'Ricarica eseguita con successo!';
            this.registrationError = null;
            this.Balance -= rechargeAmount;
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

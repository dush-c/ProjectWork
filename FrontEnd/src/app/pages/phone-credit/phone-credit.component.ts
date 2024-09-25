import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankTransferService} from "../../services/bank-transfer.service";

@Component({
  selector: 'app-phone-credit',
  templateUrl: './phone-credit.component.html',
  styleUrl: './phone-credit.component.scss'
})
export class PhoneCreditComponent {
  rechargeForm: FormGroup;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;
  Balance: number = 0;

  constructor(private fb: FormBuilder, private transferService: BankTransferService) {
    this.rechargeForm = this.fb.group({
      phoneNumber: ['+39', [Validators.required, Validators.pattern(/^\+39[0-9]{10}$/)]],
      operator: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  // ngOnInit() {
  //   // Recupera le transazioni dell'utente al caricamento del componente
  //   this.userService.getUserTransactions().subscribe({
  //     next: (transactions: Transaction[]) => {
  //       if (transactions.length > 0) {
  //         // Prendi il saldo dell'ultima transazione
  //         this.userBalance = transactions[0].balance;
  //       } else {
  //         this.registrationError = 'Nessuna transazione trovata.';
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Errore nel recuperare le transazioni:', err);
  //       this.registrationError = 'Impossibile recuperare il saldo.';
  //     }
  //   });
  // }
  //
  // submitRecharge() {
  //   if (this.rechargeForm.valid) {
  //     const rechargeDetails = this.rechargeForm.value;
  //     const rechargeAmount = parseFloat(rechargeDetails.amount);
  //
  //     // Controlla se il saldo è sufficiente
  //     if (this.userBalance >= rechargeAmount) {
  //       // Esegui la ricarica se il saldo è sufficiente
  //       this.transferService.eseguiRicarica(rechargeDetails)
  //         .subscribe({
  //           next: (response) => {
  //             this.registrationSuccess = 'Ricarica eseguita con successo!';
  //             this.registrationError = null;
  //             // Aggiorna il saldo dopo la ricarica
  //             this.userBalance -= rechargeAmount;
  //           },
  //           error: (error) => {
  //             this.registrationError = "Errore durante l'esecuzione della ricarica";
  //             this.registrationSuccess = null;
  //             console.error("Errore durante l'esecuzione della ricarica:", error);
  //           }
  //         });
  //     } else {
  //       // Mostra un errore se il saldo è insufficiente
  //       this.registrationError = 'Saldo insufficiente per eseguire la ricarica.';
  //       this.registrationSuccess = null;
  //     }
  //   }
  // }
}

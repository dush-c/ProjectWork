import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../../services/bank-account.service'; 
import { Transaction } from '../../interfaces/transaction.entity';
import { ActivatedRoute } from '@angular/router'; // Per ottenere l'ID del movimento dalla rotta

@Component({
  selector: 'app-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss']
})
export class TransferDetailsComponent implements OnInit {
  transferForm: FormGroup;
  errorMessage: string | undefined;
  transaction: Transaction | null = null;

  // Variabile per movimentoId
  movimentoId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private bankAccountService: BankAccountService,
    private route: ActivatedRoute // Per leggere i parametri dalla URL
  ) {
    // Inizializza il form con i campi di Transaction
    this.transferForm = this.formBuilder.group({
      transactionID: ['', Validators.required], 
      bankAccountID: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      balance: ['', Validators.required],
      categoryTransactionID: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Ottieni il movimentoId dalla rotta
    this.movimentoId = this.route.snapshot.paramMap.get('id') || '';
    this.getTransactionData(); // Chiama direttamente il metodo per ottenere i dati della transazione
  }

  getTransactionData() {
    this.bankAccountService.getMovimentiById(this.movimentoId).subscribe(
      (data: Transaction | string | null) => {
        if (typeof data === 'string') {
          this.errorMessage = data; // In caso di errore da parte del backend
          console.error('Errore:', data);
        } else if (data) {
          // Popola il form con i dati della transazione
          this.transferForm.patchValue({
            transactionID: data.transactionID,
            bankAccountID: data.bankAccountID,
            date: data.date ? this.formatDateToInput(new Date(data.date)) : '',
            amount: data.amount,
            balance: data.balance,
            categoryTransactionID: data.categoryTransactionID,
            description: data.description,
          });
          this.transferForm.disable(); // Rendi il form non modificabile
        }
      },
      (error: any) => {
        this.errorMessage = `Errore nel recupero dei dati della transazione: ${error}`;
        console.error('Error fetching transaction data:', error);
      }
    );
  }

  formatDateToInput(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  submitTransfer() {
    console.log('Form is read-only. No submission.');
  }
}

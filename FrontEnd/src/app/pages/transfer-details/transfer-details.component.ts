  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../../services/bank-account.service';
import { Transaction } from '../../interfaces/transaction.entity';
import { ActivatedRoute } from '@angular/router'; // Per ottenere l'ID del movimento dalla rotta
import { BankTransferService } from '../../services/bank-transfer.service';

@Component({
  selector: 'app-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss']
})
export class TransferDetailsComponent implements OnInit {
  transferForm: FormGroup;
  errorMessage: string | undefined;
  transaction: Transaction | null = null;
  movimentoId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private bankAccountService: BankAccountService,
    private route: ActivatedRoute, // Per leggere i parametri dalla URL
    private BankTransferService: BankTransferService,

  ) {
    // Inizializza il form con i campi di Transaction
    this.transferForm = this.formBuilder.group({
      _id: ['', Validators.required],
      contoCorrenteId: ['', Validators.required],
      data: ['', Validators.required],
      importo: ['', Validators.required],
      saldo: ['', Validators.required],
      categoriaMovimentoID: ['', Validators.required],
      descrizioneEstesa: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the movimentoId from the route
    this.movimentoId = this.route.snapshot.paramMap.get('id') || ''; // Ensure it's a string
    this.getTransactionData(this.movimentoId); // Call to get the transaction data
  }

  getTransactionData(id: string) {
    this.BankTransferService.getTransaction(this.movimentoId).subscribe(
      (data: Transaction | string | null) => {
        if (typeof data === 'string') {
          this.errorMessage = data; // In caso di errore dal backend
          console.error('Errore:', data);
        } else if (data) {
          // Popola il form con i dati della transazione
          this.transferForm.patchValue({
            _id: data._id,
            contoCorrenteId: data.contoCorrenteId,
            data: data.data ? this.formatDateToInput(new Date(data.data)) : '',
            importo: data.importo,
            saldo: data.saldo,
            categoriaMovimentoID: data.categoriaMovimentoID.NomeCategoria, // Mostra il nome della categoria
            descrizioneEstesa: data.descrizioneEstesa,
          });
          console.log(data);
        }
      },
      (error: any) => {
        this.errorMessage = `Errore nel recupero dei dati della transazione: ${error}`;
        console.error('Errore nel recupero dei dati della transazione:', error);
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

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountService} from "../../services/bank-account.service";
import {AuthService} from "../../services/auth.service";
import {CategoryTransaction} from "../../interfaces/category-transaction.entity";
import {BankTransferService} from "../../services/bank-transfer.service";

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.scss'
})
export class BankTransferComponent implements OnInit{
  transferForm: FormGroup;
  balance: number = 100;
  categories: CategoryTransaction[] = [];

  constructor(private fb: FormBuilder, private transferService: BankTransferService, private authService: AuthService) {
    this.transferForm = this.fb.group({
      iban: ['', [Validators.required, Validators.pattern(/^IT[0-9]{2}[A-Z]{1}[0-9A-Z]{27}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      causale: ['', [Validators.required]],
      categoria: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.transferService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Errore nel recupero delle categorie:', error);
      }
    });
  }

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

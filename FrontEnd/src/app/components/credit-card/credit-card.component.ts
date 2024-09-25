import {Component, OnDestroy, OnInit} from '@angular/core';
import {BankAccountService} from "../../services/bank-account.service";
import {BankAccountEntity} from "../../interfaces/bank-account.entity";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss'
})
export class CreditCardComponent implements OnInit {
  nomeTitolare: string = '';
  cognomeTitolare: string = '';

  constructor(private bankAccountService: BankAccountService) {}

  ngOnInit(): void {
    this.bankAccountService.getBankAccountInfo().subscribe({
      next: (account: BankAccountEntity) => {
        this.nomeTitolare = account.nomeTitolare;
        this.cognomeTitolare = account.cognomeTitolare
      },
      error: (err) => {
        console.error('Errore nel recupero delle informazioni del conto bancario', err);
      }
    });
  }
}

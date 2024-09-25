import {Component, OnInit} from '@angular/core';
import {BankAccountService} from "../../services/bank-account.service";
import {BankAccountEntity} from "../../interfaces/bank-account.entity";

@Component({
  selector: 'app-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrl: './welcome-bar.component.scss'
})
export class WelcomeBarComponent implements OnInit{
  nomeTitolare: string = '';

  constructor(private bankAccountService: BankAccountService) {}

  ngOnInit(): void {
    this.bankAccountService.getBankAccountInfo().subscribe({
      next: (account: BankAccountEntity) => {
        this.nomeTitolare = account.nomeTitolare;
      },
      error: (err) => {
        console.error('Errore nel recupero delle informazioni del conto bancario', err);
      }
    });
  }
}

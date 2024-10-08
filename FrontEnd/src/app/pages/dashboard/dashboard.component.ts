import {Component, OnInit} from '@angular/core';
import { BankTransferService } from '../../services/bank-transfer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  lastBalance!: number;

  constructor(private bankTransSrv: BankTransferService) {}

  ngOnInit() {
    this.getLastBalance();
  }

  getLastBalance() {
    this.bankTransSrv.getLatestBalance().subscribe({
      next: (balance) => {
        this.lastBalance = balance;
        console.log('lastBalance', this.lastBalance);
      },
      error: (error) => {
        console.error('Errore nel recupero numero:', error);
      },
    });
  }
}

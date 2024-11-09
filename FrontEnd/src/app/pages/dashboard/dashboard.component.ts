import { Component, OnInit } from '@angular/core';
import { BankTransferService } from '../../services/bank-transfer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  lastBalance!: number;
  isLoading = false;

  constructor(private bankTransSrv: BankTransferService) {}

  ngOnInit() {
    this.getLastBalance();
  }

  getLastBalance() {
    this.isLoading = true;
    this.bankTransSrv.getLatestBalance().subscribe({
      next: (balance) => {
        this.lastBalance = balance;
        console.log('lastBalance', this.lastBalance);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Errore nel recupero numero:', error);
      },
    });
  }
}

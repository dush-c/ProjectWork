import { Component, Input, OnInit } from '@angular/core';
import { BankTransferService } from '../../services/bank-transfer.service';
import { Transaction } from '../../interfaces/transaction.entity';
import { map } from 'rxjs';
import { CategoryTransaction } from '../../interfaces/category-transaction.entity';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'], // Corretto da "styleUrl" a "styleUrls"
})
export class StatsCardComponent implements OnInit {
  @Input() balance!: Number; // Riceviamo il saldo da DashboardComponent

  transNum!: number;
  totalSpent!: number;
  filteredTransactions!: Transaction[];

  isBlurred: boolean = false;

  constructor(private bankTransSrv: BankTransferService) {}

  ngOnInit(): void {
    this.getTransactionsNumber();
    this.getMonthlySpending();
  }

  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }

  getTransactionsNumber(): void {
    this.bankTransSrv.getTransactions().subscribe({
      next: (transactions) => {
        this.transNum = transactions.length;
      },
      error: (error) => {
        console.error('Ci sono problemi nel recupero dei dati', error);
      },
    });
  }

  getMonthlySpending(): void {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ); // Primo giorno del mese
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ); // Ultimo giorno del mese

    this.bankTransSrv.getCategories().subscribe({
      next: (categories: CategoryTransaction[]) => {
        // Filtra le categorie, escludendo 'Bonifico Entrata' e 'Apertura conto'
        const excludedCategories: String[] = [
          'Bonifico Entrata',
          'Apertura conto',
        ];
        const transactionTypes = categories
          .filter((cat) => !excludedCategories.includes(cat.NomeCategoria))
          .map((cat) => cat.NomeCategoria);

        console.log('Transaction Types to Include:', transactionTypes);

        this.bankTransSrv
          .getTransactions()
          .pipe(
            map((transactions: Transaction[]) => {
              // Filtra le transazioni per data e tipo di categoria
              this.filteredTransactions = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.data);
                return (
                  transactionTypes.includes(
                    transaction.categoriaMovimentoID.NomeCategoria
                  ) &&
                  transactionDate >= startOfMonth &&
                  transactionDate <= endOfMonth
                );
              });

              console.log('Filtered Transactions:', this.filteredTransactions);

              // Somma le spese (importi negativi)
              this.totalSpent = this.filteredTransactions.reduce(
                (total, transaction) => {
                  return total + Math.abs(transaction.importo); // Sommiamo il valore assoluto delle spese
                },
                0
              );
              console.log('Total Monthly Spending:', this.totalSpent);
            })
          )
          .subscribe();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BankTransferService } from '../../services/bank-transfer.service';
import { Transaction } from '../../interfaces/transaction.entity';
import { map, Observable } from 'rxjs';
import { CategoryTransaction } from '../../interfaces/category-transaction.entity';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent implements OnInit {
  @Input() balance!: Number; // Riceviamo il saldo da DashboardComponent

  transNum!: number;
  totalSpent!: number;

  constructor(private bankTransSrv: BankTransferService) {}
  ngOnInit(): void {
    this.getTransactionsNumber();
    this.getMonthlySpending().subscribe({
      next: (totalSpent) => {
        this.totalSpent = totalSpent;
      },
    });
  }
  isBlurred: boolean = false;

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

  getMonthlySpending(): Observable<number> {
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

    const transactionTypes: String[] = [];
    // Tipi di transazioni da considerare per il calcolo
    this.bankTransSrv.getCategories().pipe(
      map((categories: CategoryTransaction[]) => {
        categories.forEach((cat) => {
          transactionTypes.push(cat.NomeCategoria);
        });
      })
    );

    return this.bankTransSrv.getTransactions().pipe(
      map((transactions: Transaction[]) => {
        // Filtra le transazioni per tipo e data
        const filteredTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.data);
          return (
            transactionTypes.includes(
              transaction.categoriaMovimentoID.NomeCategoria.toLowerCase()
            ) &&
            transactionDate >= startOfMonth &&
            transactionDate <= endOfMonth
          );
        });

        // Somma l'importo delle transazioni filtrate (solo quelle con importi negativi, perché rappresentano spese)
        const totalSpent = filteredTransactions.reduce((total, transaction) => {
          if (transaction.importo < 0) {
            // Consideriamo solo le spese (importi negativi)
            return total + Math.abs(transaction.importo); // Sommiamo il valore assoluto delle spese
          }
          return total;
        }, 0);

        return totalSpent; // Restituisce la somma totale delle spese
      })
    );
  }
}

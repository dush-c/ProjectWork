import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthService } from '../../services/auth.service';
import { BankTransferService } from '../../services/bank-transfer.service';
import { CategoryTransaction } from '../../interfaces/category-transaction.entity';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.entity';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
})
export class TransactionsTableComponent implements OnInit {
  categories: CategoryTransaction[] = [];
  transactions: Transaction[] = [];
  EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  @Input()
  currentBalance!: number;

  @Output() balanceChange = new EventEmitter<number>(); // Emittiamo il saldo

  constructor(
    private authSrv: AuthService,
    private transferService: BankTransferService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories() {
    this.transferService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Errore nel recupero delle categorie:', error);
      },
    });
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.updateBalance(this.transactions);
        this.balanceChange.emit(this.currentBalance); // Emettiamo il saldo al genitore
      },
      error: (error) => {
        console.error('Errore nel recupero delle transazioni', error);
      },
    });
  }

  updateBalance(transactions: Transaction[]) {
    //All'inizio il saldo coincide con l'apertura del conto
    let currentBalance = transactions[0].balance;

    return transactions.map((movement) => {
      // Creiamo la transazione e assegniamo il saldo corrente prima di aggiornare il saldo
      const transaction: Transaction = {
        transactionID: movement.transactionID,
        date: movement.date,
        amount: movement.amount,
        balance: currentBalance, // Il saldo corrente prima di aggiornare
        categoryTransaction: {
          NomeCategoria: movement.categoryTransaction.NomeCategoria,
          Tipologia: movement.categoryTransaction.Tipologia, // Da personalizzare in base alla categoria
        },
        description: movement.description,
      };

      // Aggiorniamo il saldo sottraendo l'importo del movimento
      currentBalance -= movement.amount;
      this.currentBalance = currentBalance;
      return transaction;
    });
  }

  exportExcel(): void {
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    const workbook: XLSX.WorkBook = {
      Sheets: { Dati: worksheet },
      SheetNames: ['Dati'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], { type: this.EXCEL_TYPE });
    saveAs(data, 'tabella_movimenti.xlsx');
  }
}

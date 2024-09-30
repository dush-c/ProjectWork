import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthService } from '../../services/auth.service';
import { BankTransferService } from '../../services/bank-transfer.service';
import { CategoryTransaction } from '../../interfaces/category-transaction.entity';
import { Transaction } from '../../interfaces/transaction.entity';
import { Router } from '@angular/router';

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

  currentBalance!: number;
  totalTransactions: number = 0;
  filteredTransactions: Transaction[] = [];
  selectedNumberOfTransactions: number = 0;
  selectedCategory: string = '';

  constructor(
    private authSrv: AuthService,
    private bankTransSrv: BankTransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories() {
    this.bankTransSrv.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Errore nel recupero delle categorie:', error);
      },
    });
  }

  loadTransactions() {
    this.bankTransSrv.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.filteredTransactions = transactions;
        console.log(this.transactions)

      },
      error: (error) => {
        console.error('Errore nel recupero delle transazioni', error);
      },
    });
  }

  filterTransactions(): void {
    let result = this.transactions;

    if (this.selectedCategory) {
      result = result.filter(transaction => transaction.categoriaMovimentoID.NomeCategoria === this.selectedCategory);
    }

    if (this.selectedNumberOfTransactions > 0) {
      result = result.slice(0, this.selectedNumberOfTransactions);
    }

    this.filteredTransactions = result;
  }

  onNumberOfTransactionsChange(event: any): void {
    this.selectedNumberOfTransactions = +event.target.value;
    this.filterTransactions();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterTransactions();
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

  viewDetails(id: string) {
    console.log('Transaction ID:', id); // Debugging
    this.router.navigate([`/bank-transfer/${id}`]);
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthService } from '../../services/auth.service';
import { BankTransferService } from '../../services/bank-transfer.service';
import { CategoryTransaction } from '../../interfaces/category-transaction.entity';
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

  currentBalance!: number;

  totalTransactions: number = 0; // Numero totale di transazioni
  transactionsPerPage: number = 10; // Numero predefinito di transazioni per pagina
  currentPage: number = 1; // Pagina corrente
  totalPages: number = 1; // Numero totale di pagine
  pages: number[] = []; // Array di pagine

  filteredTransactions: Transaction[] = [];
  selectedNumberOfTransactions: number = 0;
  selectedCategory: string = '';

  constructor(
    private authSrv: AuthService,
    private bankTransSrv: BankTransferService
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
      },
      error: (error) => {
        console.error('Errore nel recupero delle transazioni', error);
      },
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

  /* Pagination*/

  // Calcola il numero totale di pagine
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(
      this.totalTransactions / this.transactionsPerPage
    );
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Metodo per aggiornare il numero di transazioni per pagina e ricalcolare le pagine
  updateTransactionsPerPage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.transactionsPerPage = parseInt(selectElement.value, 10); // Converte il valore selezionato in numero
    this.calculateTotalPages();
    this.currentPage = 1; // Resetta la pagina corrente alla prima pagina
  }

  // Metodo per passare alla pagina successiva
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Metodo per passare alla pagina precedente
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Metodo per passare alla prima pagina
  firstPage(): void {
    this.currentPage = 1;
  }

  // Metodo per passare all'ultima pagina
  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  // Metodo per selezionare una pagina specifica
  goToPage(page: number): void {
    this.currentPage = page;
  }

  /* Filtri */

  filterTransactions(): void {
    let result = this.transactions;

    // Filtro per categoria
    if (this.selectedCategory) {
      result = result.filter(
        (transaction) =>
          transaction.categoriaMovimentoID.NomeCategoria ===
          this.selectedCategory
      );
    }

    // Limito il numero di transazioni visualizzate
    if (this.selectedNumberOfTransactions > 0) {
      result = result.slice(0, this.selectedNumberOfTransactions);
    }

    this.filteredTransactions = result;
  }

  onNumberOfTransactionsChange(event: any): void {
    this.selectedNumberOfTransactions = +event.target.value; // Converte il valore in numero
    this.filterTransactions();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterTransactions();
  }
}

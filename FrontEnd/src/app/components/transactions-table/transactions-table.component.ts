import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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

  // Variabili di appoggio per il reset del template
  public selectedCategoryView: string = ''; // Variabile di appoggio per la categoria nel template
  public selectedTransactionsView: string = ''; // Variabile di appoggio per il numero di transazioni nel template

  @Input() selectedNumberOfTransactions: number = 0; // Usare come input
  @Input() selectedCategory: string = ''; // Usare come input

  constructor(
    private authSrv: AuthService,
    private bankTransSrv: BankTransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Applica i filtri quando cambiano i valori di categoria o numero di transazioni
    if (
      changes['selectedNumberOfTransactions'] ||
      changes['selectedCategory']
    ) {
      this.filterTransactions();
    }
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
        console.log(this.transactions);
      },
      error: (error) => {
        console.error('Errore nel recupero delle transazioni', error);
      },
    });
  }

  filterTransactions(): void {
    let result = [...this.transactions]; // Crea una copia delle transazioni

    // Filtro per categoria
    if (this.selectedCategory) {
      result = result.filter((transaction) => {
        // Verifica che transaction.categoriaMovimentoID esista e confronta NomeCategoria
        return (
          transaction.categoriaMovimentoID?.NomeCategoria ===
          this.selectedCategory
        );
      });
    }

    // Filtro per numero di transazioni
    if (this.selectedNumberOfTransactions > 0) {
      result = result.slice(0, this.selectedNumberOfTransactions);
    }

    this.filteredTransactions = result;
    console.log('Filtrate:', this.filteredTransactions); // Per debug
  }

  onNumberOfTransactionsChange(event: any): void {
    this.selectedNumberOfTransactions = +event.target.value;
    this.filterTransactions();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterTransactions();
  }

  clearFilters(): void {
    // Resetta i filtri
    this.selectedNumberOfTransactions = 0; // Reset del numero di transazioni
    this.selectedCategory = ''; // Reset della categoria

    // Ripristina tutte le transazioni non filtrate
    this.filteredTransactions = [...this.transactions];

    // Resetta gli input a valori predefiniti
    const numberOfTransactionsSelect = document.querySelector(
      '.select-number'
    ) as HTMLSelectElement;
    const categorySelect = document.querySelector(
      '.select-category'
    ) as HTMLSelectElement;

    if (numberOfTransactionsSelect) {
      numberOfTransactionsSelect.selectedIndex = 0; // Resetta alla prima opzione
    }

    if (categorySelect) {
      categorySelect.selectedIndex = 0; // Resetta alla prima opzione
    }
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

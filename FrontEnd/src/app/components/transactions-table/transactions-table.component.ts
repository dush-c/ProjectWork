import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent {
   EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  exportExcel(): void {
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    const workbook: XLSX.WorkBook = {
      Sheets: {'Dati': worksheet},
      SheetNames: ['Dati']
    };

    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    const data: Blob = new Blob([excelBuffer], {type: this.EXCEL_TYPE});
    saveAs(data, 'tabella_movimenti.xlsx');
  }
}


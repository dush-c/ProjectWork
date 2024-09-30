import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryTransaction } from '../interfaces/category-transaction.entity';
import { APIURL } from '../enviroments/api-url';
import { HttpClient } from '@angular/common/http';
import { Bonifico } from '../interfaces/bonifico.entity';
import { Transaction } from '../interfaces/transaction.entity';

@Injectable({
  providedIn: 'root',
})
export class BankTransferService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${APIURL}/api/movimenti/`);
  }

  getTransaction(id: string): Observable<Transaction> {
  return this.http.get<Transaction>(`${APIURL}/api/movimenti/${id}`);
}

  getLatestBalance(): Observable<number> {
    return this.http.get<Transaction[]>(`${APIURL}/api/movimenti?n=1`).pipe(
      map((movements: Transaction[]) => {
        if (movements && movements.length > 0) {
          return movements[0].saldo; 
        } else {
          throw new Error('Nessun movimento trovato');
        }
      })
    );
  }

  getBalance(): Observable<any> {
    return this.http.get<any>(`${APIURL}/api/movimenti/saldo`);
  }

  getCategories(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(
      `${APIURL}/api/categorieMovimenti`
    );
  }

  getCategory(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(
      `${APIURL}/api/categorieMovimenti/:categoryTransactionID`
    );
  }

  eseguiBonifico(
    ibanDestinatario: string,
    importo: number,
    causale: string
  ): Observable<any> {
    const bonificoData = {
      ibanDestinatario: ibanDestinatario,
      importo: importo,
      causale: causale,
    };
    return this.http.post<any>(`${APIURL}/api/bonifico`, bonificoData);
  }

  eseguiRicarica(rechargeDetails: any): Observable<any> {
    return this.http.post<any>(
      `${APIURL}/api/bonifico/ricarica`,
      rechargeDetails
    );
  }
}

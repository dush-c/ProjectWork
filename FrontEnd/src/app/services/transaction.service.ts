import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.entity';
import { AuthService } from './auth.service';
import { APIURL } from '../enviroments/api-url';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private http: HttpClient, private authSrv: AuthService) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${APIURL}/api/movimenti`);
  }
}

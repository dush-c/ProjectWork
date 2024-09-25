import { Injectable } from '@angular/core';
import { APIURL } from '../enviroments/api-url';
import { Transaction } from '../interfaces/transaction.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransitionService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${APIURL}/api/movimenti`);
  }
}

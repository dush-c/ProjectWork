import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BankAccount} from "../interfaces/bank-account";
import {APIURL} from "../enviroments/api-url";
import {HttpClient} from "@angular/common/http";
import {CategoryTransaction} from "../interfaces/category-transaction.entity";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  getBankAccountInfo(): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${APIURL}/api/bankAccounts/info`);
  }

  getCategories(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(`${APIURL}/api/categories`);
  }
}

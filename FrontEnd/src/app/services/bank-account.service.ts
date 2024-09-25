import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BankAccountEntity} from "../interfaces/bank-account.entity";
import {APIURL} from "../enviroments/api-url";
import {HttpClient} from "@angular/common/http";
import {CategoryTransaction} from "../interfaces/category-transaction.entity";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  getBankAccountInfo(): Observable<BankAccountEntity> {
    return this.http.get<BankAccountEntity>(`${APIURL}/api/bankAccounts/info`);
  }
}

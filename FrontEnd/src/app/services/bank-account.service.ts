import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BankAccount} from "../interfaces/bank-account";
import {APIURL} from "../enviroments/api-url";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private bankAccountService: BankAccountService, private http: HttpClient) { }

  getBankAccountInfo(): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${APIURL}/api/info`);
  }
}

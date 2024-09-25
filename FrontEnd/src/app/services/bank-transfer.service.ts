import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CategoryTransaction} from "../interfaces/category-transaction.entity";
import {APIURL} from "../enviroments/api-url";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BankTransferService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(`${APIURL}/api/categorieMovimenti`);
  }

  getCategory(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(`${APIURL}/api/categorieMovimenti/:categoryTransactionID`);
  }

}

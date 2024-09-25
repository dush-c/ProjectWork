import { BankAccountEntity } from "./bank-account.entity";
import { CategoryTransaction } from './category-transaction.entity';

export interface Transaction {
  transactionID?: string;
  bankAccount?: BankAccountEntity;
  date: string;
  importo: number;
  saldo: number;
  categoryTransaction: CategoryTransaction;
  description?: string;
}


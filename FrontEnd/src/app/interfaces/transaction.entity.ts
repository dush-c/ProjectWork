import { BankAccountEntity } from "./bank-account.entity";
import { CategoryTransaction } from './category-transaction.entity';

export interface Transaction {
  transactionID?: string;
  bankAccount?: BankAccountEntity;
  date: string;
  amount: number;
  balance: number;
  categoryTransaction: CategoryTransaction;
  description?: string;
}


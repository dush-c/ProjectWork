import { BankAccount } from './bank-account';
import { CategoryTransaction } from './category-transaction.entity';

export interface Transaction {
  transactionID: string;
  bankAccount: BankAccount;
  date: string | Date;
  amount: number;
  balance: number;
  categoryTransaction: CategoryTransaction;
  description: string;
}

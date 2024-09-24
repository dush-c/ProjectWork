export interface Transaction {
  transactionID: string;
  bankAccountID: string;
  date: string;
  amount: number;
  balance: number;
  categoryTransactionID: string;
  description: string;
}
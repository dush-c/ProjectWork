export interface Transaction {
  transactionID: number;
  bankAccountID: string;
  date: string;
  amount: number;
  balance: number;
  categoryTransactionID: string;
  description: string;
}

export interface Transaction {
  transactionID: number;
  bankAccountID: number;
  date: string;
  amount: number;
  balance: number;
  categoryTransactionID: number;
  description: string;
}

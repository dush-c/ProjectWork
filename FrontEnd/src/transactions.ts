import { Transaction } from './app/interfaces/transaction.entity';

export const TRANSACTIONS: Transaction[] = [
  {
    transactionID: '1',
    bankAccountID: '123',
    date: '2024-09-18T09:15:00',
    amount: 250.0,
    balance: 1250.5,
    categoryTransactionID: '101',
    description: 'Deposit from employer',
  },
  {
    transactionID: '2',
    bankAccountID: '89',
    date: '2024-09-17T14:30:00',
    amount: -45.99,
    balance: 1004.51,
    categoryTransactionID: '202',
    description: 'Grocery shopping',
  },
  {
    transactionID: '3',
    bankAccountID: '1679',
    date: '2024-09-16T11:00:00',
    amount: -150.0,
    balance: 1050.5,
    categoryTransactionID: '303',
    description: 'Monthly rent',
  },
  {
    transactionID: '4',
    bankAccountID: '23456',
    date: '2024-09-15T17:45:00',
    amount: -25.0,
    balance: 1200.5,
    categoryTransactionID: '404',
    description: 'Restaurant bill',
  },
  {
    transactionID: '5',
    bankAccountID: '2456',
    date: '2024-09-14T08:20:00',
    amount: -10.0,
    balance: 1225.5,
    categoryTransactionID: '505',
    description: 'Morning coffee',
  },
];

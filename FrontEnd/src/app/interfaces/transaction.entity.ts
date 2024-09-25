import { BankAccountEntity } from './bank-account.entity';
import { CategoryTransaction } from './category-transaction.entity';

export interface Transaction {
  transactionID?: string;
  contoCorrenteId: BankAccountEntity;
  data: string;
  importo: number;
  saldo: number;
  categoriaMovimentoID: CategoryTransaction;
  descrizioneEstesa?: string;
}

/*
    contoCorrenteId: string | Types.ObjectId;
    data: Date;
    importo: number;
    saldo: number;
    categoriaMovimentoID: string | Types.ObjectId;
    descrizioneEstesa?: string;
*/

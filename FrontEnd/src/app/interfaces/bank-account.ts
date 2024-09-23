export interface BankAccount{
  id?: string;
  username: string;
  password: string;
  cognomeTitolare: string;
  nomeTitolare: string;
  dataApertura?: Date;
  IBAN: string;
}

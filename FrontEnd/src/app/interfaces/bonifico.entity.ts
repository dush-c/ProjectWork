export interface Bonifico {
  id?: string;
  indirizzoIP: string | undefined;
  successo: boolean;
  messaggio: string;
  dataOra: Date;
}

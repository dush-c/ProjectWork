namespace BankingSystem
{
    public class MovimentoContoCorrente
    {
        // Proprietà
        public int ContoCorrenteID { get; set; }         // ID del conto corrente associato
        public DateTime Data { get; set; }               // Data del movimento
        public decimal Importo { get; set; }             // Importo del movimento
        public decimal Saldo { get; set; }               // Saldo dopo il movimento
        public int CategoriaMovimentoID { get; set; }    // ID della categoria del movimento
        public string DescrizioneEstesa { get; set; }    // Descrizione opzionale del movimento

        // Costruttore
        public MovimentoContoCorrente(int contoCorrenteID, DateTime data, decimal importo, decimal saldo, int categoriaMovimentoID, string descrizioneEstesa = null)
        {
            ContoCorrenteID = contoCorrenteID;
            Data = data;
            Importo = importo;
            Saldo = saldo;
            CategoriaMovimentoID = categoriaMovimentoID;
            DescrizioneEstesa = descrizioneEstesa;
        }

        // Metodo per stampare i dettagli del movimento
        public void StampaDettagli()
        {
            Console.WriteLine($"Conto Corrente ID: {ContoCorrenteID}");
            Console.WriteLine($"Data: {Data.ToShortDateString()}");
            Console.WriteLine($"Importo: {Importo:C}");
            Console.WriteLine($"Saldo: {Saldo:C}");
            Console.WriteLine($"Categoria ID: {CategoriaMovimentoID}");
            if (!string.IsNullOrEmpty(DescrizioneEstesa))
            {
                Console.WriteLine($"Descrizione: {DescrizioneEstesa}");
            }
            Console.WriteLine();
        }

        // Metodo per aggiornare il saldo dopo un movimento
        public void AggiornaSaldo(decimal nuovoImporto)
        {
            Saldo += nuovoImporto;
        }

        // Metodo per formattare l'importo (entrata/uscita)
        public string FormattaImporto()
        {
            return Importo >= 0 ? $"+{Importo:C}" : $"{Importo:C}";
        }
    }
}


namespace BackEnd.Classi
{
    public class ResponseMovimento
    {
        public DateTime Data { get; set; }
        public decimal Importo { get; set; }
        public string NomeCategoria { get; set; }
        public decimal? Saldo { get; set; }
    }
        
}

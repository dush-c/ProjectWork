namespace BackEnd.Classi
{
    public class ResponseRegistrazione
    {
        //valori di default KO e 0
        //si dà per scontato che l'operazione non sia andata a buon fine
        public string? messaggio { get; set; } = "KO";
        public int? contoCorrenteID { get; set; } = 0;

    }
}

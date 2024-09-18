namespace BackEnd.Classi
{
    public class Utente
    {
        //Email, Password, ConfermaPassword, NomeTitolare, CognomeTitolare
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? NomeTitolare { get; set; }
        public string? CognomeTitolare { get; set; }
        public Utente() { }
    }
}

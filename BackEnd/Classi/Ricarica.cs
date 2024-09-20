using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BackEnd.Classi
{
    public class Ricarica
    {
        public int ContoCorrenteID { get; set; }
        public string NumeroTelefono { get; set; }
        public string Operatore { get; set; }
        public decimal ImportoRicarica { get; set; }
        public string IndirizzoIP { get; set; }

        // Costruttore
        public Ricarica(int contoCorrenteID, string numeroTelefono, string operatore, decimal importoRicarica, string indirizzoIP)
        {
            ContoCorrenteID = contoCorrenteID;
            NumeroTelefono = numeroTelefono;
            Operatore = operatore;
            ImportoRicarica = importoRicarica;
            IndirizzoIP = indirizzoIP;
        }
    }

}

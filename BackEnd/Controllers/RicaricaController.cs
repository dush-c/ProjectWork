using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using BackEnd.Classi;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RicaricaController : ControllerBase
    {
        private readonly Database _database;

        public RicaricaController()
        {
            _database = new Database();
        }

        // Verifica che ci sia saldo disponibile
        private (bool, int) VerificaSaldoDisponibile(int contoCorrenteID, decimal importoRicarica)
        {
            try
            {
                _database.sqlConnection.Open();

                // Query per selezionare il Saldo e il MovimentoID più recente
                string query = @"SELECT TOP 1 MovimentoID, Saldo 
                         FROM TMovimentiContoCorrente 
                         WHERE ContoCorrenteID = @ContoCorrenteID 
                         ORDER BY Data DESC";

                _database.sqlCommand = new SqlCommand(query, _database.sqlConnection);
                _database.sqlCommand.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);

                // Esecuzione della query
                using (SqlDataReader reader = _database.sqlCommand.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        int movimentoID = reader.GetInt32(0);  // MovimentoID
                        decimal saldoAttuale = reader.GetDecimal(1);  // Saldo

                        // Restituisci un valore booleano per verificare il saldo e anche il MovimentoID
                        return (saldoAttuale >= importoRicarica, movimentoID);
                    }
                    else
                    {
                        // Nessun movimento trovato, restituisci false e un MovimentoID fittizio (ad esempio 0)
                        return (false, 0);
                    }
                }
            }
            finally
            {
                _database.sqlConnection.Close();
            }
        }


        // Effettua la ricarica
        [HttpPost("effettua-ricarica")]
        public IActionResult EffettuaRicarica(int contoCorrenteID, string numeroTelefono, string operatore, decimal importoRicarica)
        {
            // Ottenere l'indirizzo IP dell'utente automaticamente
            string ipAddress = GetIpAddress(HttpContext);

            var verificaSaldo = VerificaSaldoDisponibile(contoCorrenteID, importoRicarica);

            if (!verificaSaldo.Item1)
            {
                LogOperazioneFallita(contoCorrenteID, ipAddress, "Saldo insufficiente", verificaSaldo.Item2);
                return BadRequest(new { messaggio = "Saldo insufficiente per effettuare la ricarica." });
            }

            try
            {
                _database.sqlConnection.Open();
                SqlTransaction transaction = _database.sqlConnection.BeginTransaction();
                _database.sqlCommand.Transaction = transaction;

                try
                {
                    // 1. Inserisci un movimento nella tabella TMovimentiContoCorrente
                    decimal saldoAttuale = GetSaldoAttuale(contoCorrenteID, transaction);
                    Console.WriteLine(saldoAttuale);
                    decimal nuovoSaldo = saldoAttuale - importoRicarica;
                    Console.WriteLine(nuovoSaldo);

                    string insertMovimentoQuery = @"
                        INSERT INTO TMovimentiContoCorrente (ContoCorrenteID, Data, Importo, Saldo, CategoriaMovimentoID, DescrizioneEstesa)
                        OUTPUT INSERTED.MovimentoID
                        VALUES (@ContoCorrenteID, GETDATE(), @Importo, @NuovoSaldo, @CategoriaMovimentoID, @Descrizione)";

                    _database.sqlCommand = new SqlCommand(insertMovimentoQuery, _database.sqlConnection, transaction);
                    _database.sqlCommand.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);
                    _database.sqlCommand.Parameters.AddWithValue("@Importo", -importoRicarica); // Uscita
                    _database.sqlCommand.Parameters.AddWithValue("@NuovoSaldo", nuovoSaldo);
                    _database.sqlCommand.Parameters.AddWithValue("@CategoriaMovimentoID", 1); // Categoria ricarica
                    _database.sqlCommand.Parameters.AddWithValue("@Descrizione", $"Ricarica {operatore} per {numeroTelefono}");

                    int movimentoID = (int)_database.sqlCommand.ExecuteScalar();

                    // 2. Inserisci il bonifico nella tabella TBonifico
                    string insertBonificoQuery = @"
                        INSERT INTO TBonifico (IndirizzoIP, Data, Stato, MovimentoID)
                        OUTPUT INSERTED.BonificoID
                        VALUES (@IndirizzoIP, GETDATE(), 'Successo', @MovimentoID)";

                    _database.sqlCommand = new SqlCommand(insertBonificoQuery, _database.sqlConnection, transaction);
                    _database.sqlCommand.Parameters.AddWithValue("@IndirizzoIP", ipAddress);
                    _database.sqlCommand.Parameters.AddWithValue("@MovimentoID", movimentoID);

                    int bonificoID = (int)_database.sqlCommand.ExecuteScalar();

                    // 3. Inserisci la ricarica nella tabella TRicarica
                    string insertRicaricaQuery = @"
                        INSERT INTO TRicarica (BonificoID, NumeroTelefono, Operatore)
                        VALUES (@BonificoID, @NumeroTelefono, @Operatore)";

                    _database.sqlCommand = new SqlCommand(insertRicaricaQuery, _database.sqlConnection, transaction);
                    _database.sqlCommand.Parameters.AddWithValue("@BonificoID", bonificoID);
                    _database.sqlCommand.Parameters.AddWithValue("@NumeroTelefono", numeroTelefono);
                    _database.sqlCommand.Parameters.AddWithValue("@Operatore", operatore);
                    _database.sqlCommand.ExecuteNonQuery();

                    // Conferma la transazione
                    transaction.Commit();
                    return Ok(new { messaggio = "Ricarica eseguita con successo!" });
                }
                catch (Exception)
                {
                    // In caso di errore, esegui il rollback
                    transaction.Rollback();
                    return StatusCode(500, new { messaggio = "Errore durante l'esecuzione della ricarica." });
                }
            }
            finally
            {
                _database.sqlConnection.Close();
            }
        }

        // Funzione per recuperare il saldo attuale
        private decimal GetSaldoAttuale(int contoCorrenteID, SqlTransaction transaction)
        {
            string query = "SELECT TOP 1 Saldo FROM TMovimentiContoCorrente WHERE ContoCorrenteID = @ContoCorrenteID ORDER BY Data DESC";
            _database.sqlCommand = new SqlCommand(query, _database.sqlConnection, transaction);
            _database.sqlCommand.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);
            return (decimal)_database.sqlCommand.ExecuteScalar();
        }

        // Log dell'operazione fallita
        private void LogOperazioneFallita(int contoCorrenteID, string ipAddress, string motivo, int movimentoID)
        {
            try
            {
                _database.sqlConnection.Open();
                string logQuery = @"
                    INSERT INTO TBonifico (IndirizzoIP, Data, Stato, MovimentoID)
                    VALUES (@IndirizzoIP, GETDATE(), @Stato, @MovimentoID)";
                _database.sqlCommand = new SqlCommand(logQuery, _database.sqlConnection);
                _database.sqlCommand.Parameters.AddWithValue("@IndirizzoIP", ipAddress);
                _database.sqlCommand.Parameters.AddWithValue("@Stato", $"Fallimento: {motivo}");
                _database.sqlCommand.Parameters.AddWithValue("@MovimentoID", movimentoID);
                _database.sqlCommand.ExecuteNonQuery();
            }
            finally
            {
                _database.sqlConnection.Close();
            }
        }


        // Funzione per ottenere l'indirizzo IP automaticamente
        private string GetIpAddress(HttpContext context)
        {
            string ipAddress = context.Connection.RemoteIpAddress?.ToString();
            return ipAddress ?? "IP non disponibile";
            //string hostName = Dns.GetHostName(); // Get the hostname
            //IPHostEntry hostEntry = Dns.GetHostEntry(hostName); // Get host entry
            //IPAddress[] addresses = hostEntry.AddressList; // Get all IP addresses

            //foreach (IPAddress address in addresses)
            //{
            //    Console.WriteLine(address.ToString());
            //}
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using BackEnd.Classi;
using System.Data.SqlClient;
using BackEnd.Helpers;

namespace BankEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimentiController : ControllerBase
    {
        private readonly Database _db;

        public MovimentiController()
        {
            _db = new Database(); // Inizializziamo la connessione al database
        }

        // GET: api/Movimenti/UltimiMovimenti/5
        [HttpGet("UltimiMovimenti/{contoCorrenteID}/{n}")]
        public ActionResult<IEnumerable<ResponseMovimento>> GetUltimiMovimenti(int contoCorrenteID, int n)
        {
            List<ResponseMovimento> movimenti = new List<ResponseMovimento>();

            try
            {
                _db.sqlConnection.Open();

                string query = @"SELECT TOP (@n) Data, Importo, NomeCategoria, Saldo
                                 FROM TMovimentiContoCorrente M
                                 JOIN TCategorieMovimenti C ON M.CategoriaMovimentoID = C.CategoriaMovimentoID
                                 WHERE ContoCorrenteID = @ContoCorrenteID
                                 ORDER BY Data DESC";

                using (SqlCommand cmd = new SqlCommand(query, _db.sqlConnection))
                {
                    cmd.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);
                    cmd.Parameters.AddWithValue("@n", n);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movimenti.Add(new ResponseMovimento
                            {
                                Data = reader.GetDateTime(0),
                                Importo = reader.GetDecimal(1),
                                NomeCategoria = reader.GetString(2), 
                                Saldo = reader.GetDecimal(3)
                            });
                        }
                    }
                }

                if (movimenti.Count == 0)
                {
                    return NotFound($"Nessun movimento trovato per il conto corrente con ID {contoCorrenteID}.");
                }

                // Chiamiamo l'helper per creare il file Excel
                var fileBytes = ExcelHelper.CreateExcelFile(movimenti);
                var fileName = $"Movimenti_ContoCorrente_{contoCorrenteID}.xlsx";

                return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);


                //return Ok(movimenti);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Errore nel server: {ex.Message}");
            }
            finally
            {
                _db.sqlConnection.Close();
            }
        }

        // GET: api/Movimenti/CategoriaMovimento/5/1
        [HttpGet("CategoriaMovimento/{contoCorrenteID}/{categoriaID}/{n}")]
        public ActionResult<IEnumerable<ResponseMovimento>> GetMovimentiPerCategoria(int contoCorrenteID, int categoriaID, int n)
        {
            List<ResponseMovimento> movimenti = new List<ResponseMovimento>();

            try
            {
                _db.sqlConnection.Open();

                string query = @"SELECT TOP (@n) Data, Importo, NomeCategoria 
                                 FROM TMovimentiContoCorrente M
                                 JOIN TCategorieMovimenti C ON M.CategoriaMovimentoID = C.CategoriaMovimentoID
                                 WHERE ContoCorrenteID = @ContoCorrenteID AND M.CategoriaMovimentoID = @CategoriaID
                                 ORDER BY Data DESC";

                using (SqlCommand cmd = new SqlCommand(query, _db.sqlConnection))
                {
                    cmd.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);
                    cmd.Parameters.AddWithValue("@CategoriaID", categoriaID);
                    cmd.Parameters.AddWithValue("@n", n);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movimenti.Add(new ResponseMovimento
                            {
                                Data = reader.GetDateTime(0),
                                Importo = reader.GetDecimal(1),
                                NomeCategoria = reader.GetString(2)
                            });
                        }
                    }
                }

                if (movimenti.Count == 0)
                {
                    return NotFound($"Nessun movimento trovato per la categoria con ID {categoriaID}.");
                }

                //ToExcel(movimenti);

                return Ok(movimenti);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Errore nel server: {ex.Message}");
            }
            finally
            {
                _db.sqlConnection.Close();
            }
        }

        // GET: api/Movimenti/MovimentiTraDate/5?dataInizio=2024-01-01&dataFine=2024-12-31
        [HttpGet("MovimentiTraDate/{contoCorrenteID}")]
        public ActionResult<IEnumerable<ResponseMovimento>> GetMovimentiTraDate(int contoCorrenteID, DateTime dataInizio, DateTime dataFine, int n)
        {
            List<ResponseMovimento> movimenti = new List<ResponseMovimento>();

            try
            {
                _db.sqlConnection.Open();

                string query = @"SELECT TOP (@n) Data, Importo, NomeCategoria 
                                 FROM TMovimentiContoCorrente M
                                 JOIN TCategorieMovimenti C ON M.CategoriaMovimentoID = C.CategoriaMovimentoID
                                 WHERE ContoCorrenteID = @ContoCorrenteID AND Data BETWEEN @DataInizio AND @DataFine
                                 ORDER BY Data DESC";

                using (SqlCommand cmd = new SqlCommand(query, _db.sqlConnection))
                {
                    cmd.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);
                    cmd.Parameters.AddWithValue("@DataInizio", dataInizio);
                    cmd.Parameters.AddWithValue("@DataFine", dataFine);
                    cmd.Parameters.AddWithValue("@n", n);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movimenti.Add(new ResponseMovimento
                            {
                                Data = reader.GetDateTime(0),
                                Importo = reader.GetDecimal(1),
                                NomeCategoria = reader.GetString(2)
                            });
                        }
                    }
                }

                if (movimenti.Count == 0)
                {
                    return NotFound($"Nessun movimento trovato tra {dataInizio.ToShortDateString()} e {dataFine.ToShortDateString()}.");
                }

                //ToExcel(movimenti);

                return Ok(movimenti);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Errore nel server: {ex.Message}");
            }
            finally
            {
                _db.sqlConnection.Close();
            }
        }
    }
}

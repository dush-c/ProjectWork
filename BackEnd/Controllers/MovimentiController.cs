using Microsoft.AspNetCore.Mvc;
using BackEnd.Classi;
using OfficeOpenXml;
using Microsoft.Data.SqlClient;

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

        // GET: api/Movimenti/5?n=10&format=excel
        [HttpGet("{contoCorrenteID}")]
        public IActionResult GetMovimenti(int contoCorrenteID, [FromQuery] int n, [FromQuery] string format = "json")
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

                // Se il formato è 'excel', restituiamo il file Excel
                if (format.Equals("excel", StringComparison.OrdinalIgnoreCase))
                {
                    string filePath = GenerateExcelFile(movimenti, contoCorrenteID);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                    string fileName = $"Movimenti_ContoCorrente_{contoCorrenteID}.xlsx";

                    return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                }
                else
                {
                    // Altrimenti restituiamo i dati in formato JSON
                    return Ok(movimenti);
                }
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
        public ActionResult<IEnumerable<ResponseMovimento>> GetMovimentiPerCategoria(int contoCorrenteID, int categoriaID, int n, string format = "json")
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

                // Se il formato è 'excel', restituiamo il file Excel
                if (format.Equals("excel", StringComparison.OrdinalIgnoreCase))
                {
                    string filePath = GenerateExcelFile(movimenti, contoCorrenteID);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                    string fileName = $"Movimenti_ContoCorrente_{contoCorrenteID}.xlsx";

                    return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                }
                else
                {
                    // Altrimenti restituiamo i dati in formato JSON
                    return Ok(movimenti);
                }
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
        public ActionResult<IEnumerable<ResponseMovimento>> GetMovimentiTraDate(int contoCorrenteID, DateTime dataInizio, DateTime dataFine, int n, string format = "json")
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

                // Se il formato è 'excel', restituiamo il file Excel
                if (format.Equals("excel", StringComparison.OrdinalIgnoreCase))
                {
                    string filePath = GenerateExcelFile(movimenti, contoCorrenteID);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                    string fileName = $"Movimenti_ContoCorrente_{contoCorrenteID}.xlsx";

                    return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                }
                else
                {
                    // Altrimenti restituiamo i dati in formato JSON
                    return Ok(movimenti);
                }
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
        // Funzione che genera fisicamente il file Excel sul server
        private string GenerateExcelFile(List<ResponseMovimento> movimenti, int contoCorrenteID)
        {
            // Definisci il percorso dove salvare il file Excel sul server
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFiles");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            string filePath = Path.Combine(folderPath, $"Movimenti_ContoCorrente_{contoCorrenteID}.xlsx");
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Movimenti");

                // Intestazioni
                worksheet.Cells[1, 1].Value = "Data";
                worksheet.Cells[1, 2].Value = "Importo";
                worksheet.Cells[1, 3].Value = "NomeCategoria";
                worksheet.Cells[1, 4].Value = "Saldo";

                // Dati
                for (int i = 0; i < movimenti.Count; i++)
                {
                    worksheet.Cells[i + 2, 1].Value = movimenti[i].Data.ToString("yyyy-MM-dd");
                    worksheet.Cells[i + 2, 2].Value = movimenti[i].Importo;
                    worksheet.Cells[i + 2, 3].Value = movimenti[i].NomeCategoria;
                    worksheet.Cells[i + 2, 4].Value = movimenti[i].Saldo;
                }

                // Salva il file Excel fisicamente sul server
                FileInfo file = new FileInfo(filePath);
                package.SaveAs(file);
            }

            return filePath;
        }
    }
}

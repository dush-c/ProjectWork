using OfficeOpenXml;
using BackEnd.Classi;

namespace BackEnd.Helpers
{
    public class ExcelHelper
    {
        public static byte[] CreateExcelFile(List<ResponseMovimento> movimenti)
        {
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

                // Restituiamo il file Excel come array di byte
                return package.GetAsByteArray();
            }
        }
    }
}

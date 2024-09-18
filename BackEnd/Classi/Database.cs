using System.Data.SqlClient;

namespace BackEnd.Classi
{
    public class Database
    {
        public string ConnectionString = "Data Source=NIUKO-ITS23-16\\SQLEXPRESS;Initial Catalog=DBContiCorrenti;Integrated Security=True";
        public SqlConnection? sqlConnection { get; set; }
        public SqlCommand? sqlCommand { get; set; } = null;

        public Database()
        {
            sqlConnection = new SqlConnection(ConnectionString);
        }
    }
}

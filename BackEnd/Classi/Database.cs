using Microsoft.Data.SqlClient;

namespace BackEnd.Classi
{
    public class Database
    {
        public string ConnectionString = "Server=tcp:mioserverits.database.windows.net,1433;Initial Catalog=projectworkfinale;Persist Security Info=False;" +
            "User ID=mioadmin;Password=miapasswordadmin123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public SqlConnection? sqlConnection { get; set; }
        public SqlCommand? sqlCommand { get; set; } = null;

        public Database()
        {
            sqlConnection = new SqlConnection(ConnectionString);
        }
    }
}

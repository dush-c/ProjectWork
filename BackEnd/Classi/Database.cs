using System.Data.SqlClient;

namespace BackEnd.Classi
{
    public class Database
    {
        public string ConnectionString = "Server=tcp:projectworkits.database.windows.net,1433;Initial Catalog=projectwork;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=Active Directory Default;";
public SqlConnection? sqlConnection { get; set; }
public SqlCommand? sqlCommand { get; set; } = null;

public Database()
{
    sqlConnection = new SqlConnection(ConnectionString);
}
    }
}

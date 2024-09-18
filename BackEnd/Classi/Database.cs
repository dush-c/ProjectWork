using Microsoft.Data.SqlClient;

namespace BackEnd.Classi
{
    public class Database
    {/*
      Server=tcp:projectworkits.database.windows.net,1433;Initial Catalog=projectWork;Persist Security Info=False;User
        ID=giovanni.meneghello@itsdigitalacademy.com;Password=c4&4H.pkn#37;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Authentication="Active Directory Password";*/
        public string ConnectionString = "Server=tcp:projectworkits.database.windows.net,1433;Initial Catalog=projectwork;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=Active Directory Default;";
        public SqlConnection? sqlConnection { get; set; }
        public SqlCommand? sqlCommand { get; set; } = null;

        public Database()
        {
            sqlConnection = new SqlConnection(ConnectionString);
        }
    }
}

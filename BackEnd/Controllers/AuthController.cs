using BackEnd.Classi;
using Identity.PasswordHasher;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {


        #region ApiCalls
        [Route("/Registrazione")]
        [HttpPost]
        public ResponseRegistrazione RegistraNuovoUtente(Utente user, string confermaPassword)
        {
            ResponseRegistrazione responseRegistrazione = new ResponseRegistrazione();
            PasswordHasher hasher = new PasswordHasher();
            /*
            1.2. Prevedere un controllo lato client:
            1.2.1. Obbligo di caricamento di tutti i dati
            1.2.2. validità formale della mail
            1.2.3. Password almeno 8 caratteri, una maiuscola e un simbolo 
            1.2.4. Password uguale a conferma password
             */
            //controllo che l'email sia stata scritta correttamente
            if (!IsValidEmail(user.Email!))
            {
                responseRegistrazione.messaggio = $"KO! La mail '{user.Email}' non è corretta";
                responseRegistrazione.contoCorrenteID = 0;
                return responseRegistrazione;
            }
            //controllo che la password sia stata scritta correttamente
            if (!IsValidPassword(user.Password!))
            {
                responseRegistrazione.messaggio = $"KO! La password deve contenere: almeno 8 caratteri, una maiuscola e un simbolo";
                responseRegistrazione.contoCorrenteID = 0;
                return responseRegistrazione;
            }
            if (!user.Password!.Equals(confermaPassword))
            {
                responseRegistrazione.messaggio = $"KO! Le due password non coincidono";
            }

            //se arrivo a questo punto significa che le credenziali sono corrette
            try
            {
                Database db = new Database();
                db.sqlCommand = db.sqlConnection.CreateCommand();
                //devo prima assicurarmi che non sia già presente una mail uguale a quella usata per la registrazione
                db.sqlCommand.Parameters.AddWithValue("@Email", user.Email);
                db.sqlCommand.CommandText = "select * from TContiCorrenti where Email = @Email";
                db.sqlConnection.Open();
                SqlDataReader reader = db.sqlCommand.ExecuteReader();
                if (!reader.Read())
                {
                    //se non sono stati trovati dei record significa che la mail inserita dall'utente è univoca.
                    //quindi posso andare ad inserire un nuovo record

                    //La password deve essere salvata su db in formato criptato
                    string hashedPassword = hasher.HashPassword(user.Password!);
                    //inserisco un nuovo record
                    DateTime DataApertura = DateTime.Now;

                    db.sqlConnection.Close();
                    db.sqlConnection.Open();

                    db.sqlCommand.Parameters.AddWithValue("@Password", hashedPassword);
                    db.sqlCommand.Parameters.AddWithValue("@NomeTitolare", user.NomeTitolare);
                    db.sqlCommand.Parameters.AddWithValue("@CognomeTitolare", user.CognomeTitolare);
                    db.sqlCommand.Parameters.AddWithValue("@DataApertura", DataApertura);
                    db.sqlCommand.CommandText = "insert into TContiCorrenti (Email, Password, CognomeTitolare, NomeTitolare, DataApertura, IBAN)" +
                        "values(@Email, @Password, @CognomeTitolare, @NomeTitolare, @DataApertura, 0)";

                    db.sqlCommand.ExecuteNonQuery();
                    responseRegistrazione.messaggio = "OK, registrazione avvenuta con successo!";

                    //una volta avvenuta una nuova registrazione ritorno l'id del conto appena creato
                    db.sqlCommand.CommandText = "select * from TContiCorrenti where Email = @Email";
                    SqlDataReader returnUser = db.sqlCommand.ExecuteReader();
                    if (!returnUser.Read())
                    {
                        responseRegistrazione.contoCorrenteID = Convert.ToInt32(returnUser["ContoCorrenteID"]);
                    }
                }
                return responseRegistrazione;
            }
            catch (Exception ex)
            {
                responseRegistrazione.messaggio = ex.Message;
                responseRegistrazione.contoCorrenteID = 0;
                return responseRegistrazione;
            }
        }

        [Route("/Login")]
        [HttpPost]
        public string Login(string mail, string password)
        {
            return "OK";
        }
        #endregion


        #region Methods
        //checks if the email is valid
        public static bool IsValidEmail(string email)
        {

            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsValidPassword(string password)
        {
            Regex regex = new Regex(@"^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$");
            Match match = regex.Match(password);
            return match.Success;
        }

        #endregion
    }

}

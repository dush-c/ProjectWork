using BackEnd.Classi;
using Identity.PasswordHasher;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Net.Mail;
using System.Net;
using System.Numerics;
using System.Text;
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

                    string IBAN = GenerateIBAN();
                    db.sqlCommand.Parameters.AddWithValue("@IBAN", IBAN);
                    db.sqlCommand.CommandText = "insert into TContiCorrenti (Email, Password, CognomeTitolare, NomeTitolare, DataApertura, IBAN)" +
                        "values(@Email, @Password, @CognomeTitolare, @NomeTitolare, @DataApertura, @IBAN)";

                    db.sqlCommand.ExecuteNonQuery();
                    responseRegistrazione.messaggio = "OK, registrazione avvenuta con successo!";

                    SendingEmail(user.Email!);

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
        public string Login(string email, string password)
        {
            var hasher = new PasswordHasher<string>();

            try
            {

                Database db = new Database();
                db.sqlCommand = db.sqlConnection.CreateCommand();

                // Prepare the SQL query to retrieve the user based on email only
                db.sqlCommand.Parameters.AddWithValue("@Email", email);
                db.sqlCommand.CommandText = "SELECT * FROM TContiCorrenti WHERE Email = @Email";
                db.sqlConnection.Open();

                SqlDataReader returnUser = db.sqlCommand.ExecuteReader();

                if (!returnUser.HasRows)
                {
                    // If no user is found with this email
                    return "Nessun utente trovato con questa email.";
                }

                // If a user is found, read the hashed password from the database
                returnUser.Read();
                string storedHashedPassword = returnUser["Password"].ToString();

                if (VerifyPassword(storedHashedPassword, password))
                {
                    return returnUser["NomeTitolare"].ToString() + " " + returnUser["CognomeTitolare"].ToString();
                }
                else
                {
                    return "KO";
                }

            }
            catch (Exception ex)
            {
                // Handle exceptions
                return ex.Message;
            }
        }

        [Route("/AggiornaPassword")]
        [HttpPut]
        //metodo che si occupa di aggiornare la password dell'utente attualmente loggato
        public string AggiornaPassword(int contoCorrenteID, string oldPassword, string newPassword)
        {
            PasswordHasher hasher = new PasswordHasher();
            try
            {
                Database db = new Database();
                //vado innanzitutto ad assicurarmi che la vecchia password corrisponda a quella salvata nel database
                db.sqlCommand = db.sqlConnection.CreateCommand();

                db.sqlCommand.Parameters.AddWithValue("@ContoCorrenteID", contoCorrenteID);

                db.sqlCommand.CommandText = "SELECT * FROM TContiCorrenti WHERE ContoCorrenteID = @ContoCorrenteID";

                db.sqlConnection.Open();

                SqlDataReader reader = db.sqlCommand.ExecuteReader();

                if (!reader.HasRows)
                {
                    //se non ci sono righe ci sono degli errori
                    //TODO: handle errors
                    return "KO, errore";
                }
                else
                {
                    //deve esserci solo un record
                    reader.Read();
                    string storedPassword = Convert.ToString(reader["Password"]);
                    //mi devo assicurare che la password dentro il database corrisponda a quella inserita dall'utente
                    if (VerifyPassword(storedPassword, oldPassword))
                    {
                        db.sqlConnection.Close();
                        db.sqlConnection.Open();

                        //se corrispondono -> cripto la nuova password -> modifico il campo
                        string hashedPassword = hasher.HashPassword(newPassword);
                        db.sqlCommand.Parameters.AddWithValue("@Password", hashedPassword);
                        db.sqlCommand.CommandText = "UPDATE TContiCorrenti SET Password = @Password WHERE ContoCorrenteID = @ContoCorrenteID";

                        db.sqlCommand.ExecuteNonQuery();

                        return "password aggiornata con successo";
                    }
                    else
                    {
                        //se non corrispondono segnalo l'errore 
                        return "KO";
                    }
                }

            }
            catch (Exception ex)
            {
                //TODO: gestisci errore
                return ex.Message;
            }
        }


        [Route("/EmailConferma")]
        [HttpPost]
        public string ConfermaEmail(int ContoCorrenteID)
        {
            //questa chiamata deve occuparsi di andare ad inserire un record nella tabella dei movimenti
            try
            {
                Database db = new Database();

                DateTime Data = new DateTime();
                db.sqlCommand = db.sqlConnection.CreateCommand();
                db.sqlCommand.Parameters.AddWithValue("@ContoCorrenteID", ContoCorrenteID);
                db.sqlCommand.Parameters.AddWithValue("@Data", Data);

                //Categoria movimento = 1 significa che si tratta della Creazione del conto
                db.sqlCommand.CommandText = "insert into TMovimentiContoCorrente (ContoCorrenteID, Data, Importo, Saldo, CategoriaMovimentoID, DescrizioneEstesa) " +
                    "values (@ContoCorrenteID, @Data, 0, 0, 1)";
                db.sqlCommand.ExecuteNonQuery();

                return "OK, Registrazione andata a buon fine";
            }
            catch (Exception ex)
            {
                //TODO: gestisci errore
                return ex.Message;
            }
        }
        #endregion

        #region Methods
        //questo metodo deve occuparsi di verificare se le due password corrispondono
        public static bool VerifyPassword(string hashedPassword, string notHashedPassword)
        {
            var hasher = new PasswordHasher<string>();
            try
            {
                // Use PasswordHasher to verify the entered password with the stored hashed password

                var verificationResult = hasher.VerifyHashedPassword(null, hashedPassword, notHashedPassword);

                if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
                {
                    // Password is correct
                    return true;
                }
                else
                {
                    // Password is incorrect
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //sending the Confirmation email
        public static string SendingEmail(string destinationEmail)
        {
            try
            {
                SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                smtpServer.Port = 587;
                smtpServer.Credentials = new NetworkCredential("meneghellogiovanni88@gmail.com", "kprk ntdy fnxc aliv");
                smtpServer.EnableSsl = true;

                MailMessage mail = new MailMessage();

                mail.From = new MailAddress("meneghellogiovanni88@gmail.com");
                mail.To.Add(destinationEmail);

                mail.Subject = "Conferma Email";

                mail.Body = "Link alla pagina Angular per la conferma";

                smtpServer.Send(mail);
                return "OK";
            }
            catch (Exception ex)
            {
                //TODO: gestisci errore
                return ex.Message;
            }
        }

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

        //checks if the password is valid
        public static bool IsValidPassword(string password)
        {
            Regex regex = new Regex(@"^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$");
            Match match = regex.Match(password);
            return match.Success;
        }

        //randomly generates the IBAN after the user is registered
        public static string GenerateIBAN()
        {
            string countryCode = "IT"; // Country code for Italy
            string nationalCheckChar = GenerateRandomLetter(); // 1 letter national check character
            string bankCode = GenerateRandomNumericString(5); // ABI (Bank code: 5 digits)
            string branchCode = GenerateRandomNumericString(5); // CAB (Branch code: 5 digits)
            string accountNumber = GenerateRandomAlphanumericString(12); // BBAN (Account number: 12 alphanumeric characters)

            // Create IBAN without the checksum (placeholders '00' for checksum)
            string ibanWithoutChecksum = countryCode + "00" + nationalCheckChar + bankCode + branchCode + accountNumber;

            // Generate checksum
            string checksum = GenerateIbanChecksum(ibanWithoutChecksum);

            // Final IBAN
            string iban = countryCode + checksum + nationalCheckChar + bankCode + branchCode + accountNumber;

            return iban;
        }
        // Method to generate the checksum
        public static string GenerateIbanChecksum(string ibanWithoutChecksum)
        {
            // Move the country code and checksum ('00') to the end of the string
            string rearrangedIban = ibanWithoutChecksum.Substring(4) + ibanWithoutChecksum.Substring(0, 4);

            // Replace each letter with two digits (A = 10, B = 11, ..., Z = 35)
            StringBuilder numericIban = new StringBuilder();
            foreach (char ch in rearrangedIban)
            {
                if (char.IsLetter(ch))
                {
                    numericIban.Append((ch - 'A' + 10).ToString());
                }
                else
                {
                    numericIban.Append(ch);
                }
            }

            // Convert the string to a BigInteger and compute the checksum mod 97
            BigInteger ibanAsNumber = BigInteger.Parse(numericIban.ToString());
            int checksum = 98 - (int)(ibanAsNumber % 97);

            return checksum.ToString("D2"); // Return as a 2-digit string
        }

        // Method to generate a random numeric string of given length
        public static string GenerateRandomNumericString(int length)
        {
            Random random = new Random();
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                result.Append(random.Next(0, 10)); // Add a random digit
            }
            return result.ToString();
        }

        // Method to generate a random alphanumeric string of given length
        public static string GenerateRandomAlphanumericString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                result.Append(chars[random.Next(chars.Length)]); // Add a random alphanumeric character
            }
            return result.ToString();
        }

        // Method to generate a random letter
        public static string GenerateRandomLetter()
        {
            Random random = new Random();
            char letter = (char)('A' + random.Next(0, 26)); // Generate a random letter (A-Z)
            return letter.ToString();
        }
        #endregion

        #region Debugging
        //[Route("/ProvaInvioEmail")]
        //[HttpPost]
        //public string InvioMail(string a)
        //{
        //    SendingEmail( a);
        //    return "OK";
        //}
        #endregion
    }

}

Project Work Gestione Conti Correnti
Creare una applicazione in grado di gestire dei conti correnti. 
Struttura del database (il tipo di database è a scelta):
TContiCorrenti (decidere i tipi di dati)
    1. ContoCorrenteID		
    2. Email				 
    3. Password			
    4. CognomeTitolare		
    5. NomeTitolare			
    6. DataApertura			
    7. IBAN				
TMovimentiContoCorrente (decidere i tipi di dati)
    1. MovimentoID			
    2. ContoCorrenteID		
    3. Data				
    4. Importo			
    5. Saldo				
    6. CategoriaMovimentoID		
    7. DescrizioneEstesa		

TCategorieMovimenti  (decidere i tipi di dati)
    1. CategoriaMovimentoID		
    2. NomeCategoria			
    3. Tipologia 			 
Caricare delle CategorieMovimenti (Apertura Conto, Bonifico Entrata, Bonifico Uscita, Prelievo contanti, Pagamento Utenze, Ricarica, Versamento Bancomat etc…). Ogni Categoria deve avere la tipologia corretta (“Entrata” o “Uscita”)


L’applicazione è strutturata in 2 parti:
    1. WebApi in grado di gestire tutte le chiamate richieste. La tecnologia/linguaggio della WebApi è a scelta.
    2. Frontend web basato su Angular. Chi vuole può usare un altro framework.
    3. La applicazione deve essere pubblicata online 
Funzionalità/Pagine richieste nella applicazione Web:
    1. Funzionalità di Registrazione
        1.1. L’utente deve compilare Email, Password, ConfermaPassword, NomeTitolare, CognomeTitolare.
        1.2. Prevedere un controllo lato client:
            1.2.1. Obbligo di caricamento di tutti i dati
            1.2.2. validità formale della mail
            1.2.3. Password almeno 8 caratteri, una maiuscola e un simbolo 
            1.2.4. Password uguale a conferma password
        1.3. Lato WebApi: rifare le verifiche lato client e verificare che la email non sia già esistente. Se la mail non esiste: Inserire il record in TContiCorrenti. E’necessario implementare l’invio della mail di conferma registrazione.  Una volta confermata la registrazione inserire in automatico nel relativo conto corrente un movimento di apertura con tutti gli importi a zero (sia importo che saldo)
        1.4. La password deve essere salvata su db in formato criptato
        1.5. L’IBAN verrà caricato a mano successivamente dopo la registrazione dell’utente (anche se nella applicazioni reali viene generato automaticamente)
        1.6. Per poter continuare con il project work caricare manualmente almeno 10 Movimenti per due  conti correnti di test: il primo movimento deve avere come Descrizione Estesa “ Apertura Conto” e poi caricare gli altri movimenti (sia di Entrata che di Uscita). Attenzione che in ogni movimento va caricato il saldo finale (in base al saldo precedente). La descrizione estesa per esempio è “Bonifico disposto a favore di….” Oppure “ Addebito diretto a favore di…” oppure “Bonifico disposto da…”. 
    2. Funzionalità di login
        2.1. Inserimento di Email e Password 
        2.2. Se dopo 30 secondi non si preme il pulsante “login” il form viene resettato e si comunica che si è impiegato troppo tempo a fare login
        2.3. Se il login è valido si viene reinviati ad una home page web ove viene visualizzato: Benvenuto Mario Rossi, il saldo del conto corrente e una tabella con gli ultimi 5 movimenti. 
        2.4. Nella tabella con gli ultimi 5 movimenti deve essere presente un pulsante o link  “Dettagli” che permette di accedere alla pagina web   DettaglioMovimento dove verrà  visualizzato il dettaglio del movimento selezionato (tutti i campi della TMovimentiContoCorrente)
        2.5. Per ogni accesso memorizzare in una Tabella  l’indirizzo IP, data/ora e se l’accesso è valido oppure no.
    3. Funzionalità di RicercaMovimenti1
        3.1. Deve essere possibile visualizzare gli ultimi n movimenti (n deciso dall’utente) e deve visualizzare il saldo finale del conto corrente. I movimenti verranno visualizzati in una tabella in ordine decrescente di Data (Data, Importo, NomeCategoria).  
        3.2. Possibilità di esportazione dei movimenti in formato excel oppure csv (è sufficiente uno dei due)
    4. Funzionalità di RicercaMovimenti2
        4.1. Deve essere possibile visualizzare  gli ultimi n movimenti (n deciso dall’utente)  di una certa CategoriaMovimenti scelta dall’utente. Non visualizza il saldo finale. I movimenti verranno visualizzati in una tabella in ordine decrescente di Data (Data, Importo, NomeCategoria).  
        4.2. Possibilità di esportazione dei movimenti in formato excel oppure csv (è sufficiente uno dei due)
    5. Funzionalità di RicercaMovimenti3: 
        5.1. Deve essere possibile visualizzare  gli ultimi n movimenti (n deciso dall’utente)  fra due date (scelte dall’utente) . Non visualizza il saldo finale.  I movimenti verranno visualizzati in una tabella  in ordine decrescente di Data (Data, Importo, NomeCategoria).  
        5.2. Possibilità di esportazione dei movimenti in formato excel oppure csv (è sufficiente uno dei due)
    6. Ricarica di un cellulare:
        6.1. L’utente deve inserire: numero telefonico, operatore (iliad, tim, vodafone etc..) e del taglio della ricarica tramite (5,10,20,30 euro etc..). La procedura andrà ad inserire un nuovo record in TMovimenti col relativo saldo aggiornato.
        6.2. Va prima verificato che ci sia saldo disponibile
        6.3. Memorizzare in una Tabella  l’indirizzo IP, data/ora e se l’operazione è andata a buone fine o meno.
    7. Bonifico da un conto corrente ad un altro conto corrente della stessa applicazione
        7.1. Procedura per l’inserimento dell’IBAN del destinatario e importo bonifico
        7.2. Va verificato che l’IBAN sia presente in TContiCorrenti
        7.3. Va verificato che ci sia saldo disponibile
        7.4. Memorizzare in una Tabella  l’indirizzo IP, data/ora e se l’operazione è andata a buone fine o meno.
    8. Modifica Password (ovviamente possibile solo se l’utente è loggato). Memorizzare in una Tabella  l’indirizzo IP, data/ora e se l’operazione è andata a buone fine o meno. 
    9. “Profilo” dove vengono visualizzati tutti i dati della  TContiCorrenti (a parte ovviamente la password)
    10. Tutte le varie pagine saranno accessibili tramite un menu (dopo il login) 


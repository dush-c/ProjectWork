
## Registrazione Utente (Punto 1)

* Creare form di registrazione con validazioni lato client:
  * Tutti i campi obbligatori.
Validazione formale dell'email.
  * Password con almeno 8 caratteri, una maiuscola e un simbolo.
  * Verifica che password e conferma password siano uguali.
* Invio dati al backend per la registrazione e gestione delle risposte.

## Login Utente (Punto 2)

* Creare form di login con timeout di 30 secondi.
* Gestire risposta del backend per login riuscito o fallito.
* Reindirizzare alla home page con saldo e movimenti in caso di login corretto.

## Home Page e Visualizzazione Movimenti (Punti 2.3, 2.4, 3, 4, 5)

* Visualizzare il saldo del conto corrente nella home page.
* Tabella per gli ultimi 5 movimenti con pulsante "Dettagli".
* Creare pagine per visualizzare dettagli di un singolo movimento.
* Implementare pagine di ricerca dei movimenti (tutti, per categoria, per date).
* Aggiungere funzionalità di esportazione in Excel o CSV.

## Ricarica Cellulare (Punto 6)

* Creare interfaccia per l’inserimento del numero, operatore e importo ricarica.
* Gestire risposta del backend per verificare saldo e esito dell'operazione.

## Bonifico tra conti correnti (Punto 7)

* Creare form per inserimento IBAN e importo bonifico.
* Gestire risposta del backend (verifica IBAN e saldo) e mostrare conferma.

## Modifica Password (Punto 8)

* Creare form per aggiornamento password.
* Gestire risposta del backend e visualizzare esito dell’operazione.

## Profilo Utente (Punto 9)

* Creare pagina "Profilo" che mostri tutti i dati dell’utente (eccetto la password).

## Menu Navigazione (Punto 10)

* Implementare un menu di navigazione visibile solo dopo il login per accedere alle varie funzionalità dell’applicazione (Profilo, Movimenti, Bonifico, Ricarica, etc.).
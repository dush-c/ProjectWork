# Home Banking Web Application

Questa è un progetto che punta a ricreare il funzionamento di un sistema di Home Banking nella quale l'utente è in grado di gestire il proprio account, vedere una lista delle transazioni e performare semplici operazioni bancarie come bonifici o ricariche.



## Funzionalità

Autenticazione: Login sicuro con criptazione password (usando bcrypt).
Conferma Email: Invio di una email di conferma per un ulteriore livello di sicurezza.
Account Management: Possibilità di vedere e controllare anche molteplici account.
Storico Transazioni: Tracciamento di boifici, depositi, prelievi e altro.



## Tecnologie Usate

Frontend: Angular 17 (No-Standalone).
Backend: NodeJS (sviluppo API).
Database: MongoDB per immagazzinare dati, account e transazioni (si sta valutando il trasferimento a database relazionali quali sqlServer/mySql).
Authentication: Password hasing usando bcrypt.



## Utilizzo
Login/Registrazione: Crea un account o accedi usando le tue credenziali.
Conferma Email: Assicurarsi di confermare la propria email una volta registrato per attivare il proprio account.
Gestisci Account: Visualizza i dettagli dell'account, lo storico delle transazioni e performa operazioni bancarie.
Storico Transazioni: Tieni traccia delle tue spese



## Struttura del progetto
```
FrontEnd
│
└── src
    └── app
        ├── components
        │   ├── login-toggle
        │   ├── navbar
        │   ├── stats-card
        │   ├── transactions-table
        │   └── welcome-bar
        │
        ├── directives        
        ├── environments
        ├── guards
        ├── interfaces
        │
        ├── pages
        │   ├── auth
        │   │   ├── check-email
        │   │   ├── email-confirmed
        │   │   ├── login
        │   │   ├── register
        │   │   └── bank-transfer
        │   │
        │   ├── dashboard
        │   ├── modify-password
        │   ├── options
        │   ├── phone-credit
        │   ├── profile
        │   └── transfer-details
        │
        ├── pipes
        └── services
        └── utils
```


Home Banking Web App
Overview

This is a home banking web application that allows users to manage their accounts, view transaction history, and perform basic banking operations such as transferring funds and checking account balances. The app is designed to be secure, user-friendly, and responsive.
Features

    User Authentication: Secure login system with hashed passwords (using bcrypt).
    Account Management: View and manage multiple accounts.
    Transaction History: Track deposits, withdrawals, and transfers.
    Funds Transfer: Securely transfer money between accounts.
    Responsive Design: Optimized for both desktop and mobile devices.

Technologies Used

    Frontend: Blazor (using .NET 8.0)
    Backend: NodeJS (API development)
    Database: MongoDB for storing user data, accounts, and transactions
    Authentication: Password hashing using bcrypt

Usage

    Login/Register: Create an account or log in using your credentials.
    Manage Accounts: View account details, transaction history, and perform banking operations.
    Transfer Funds: Securely transfer funds between accounts.
    Transaction History: Track all account activities.

Project Structure

bash

/home-banking-app
│
├── backend            # NodeJS backend (API)
│   ├── models         # Database models
│   ├── routes         # API routes for user and banking functions
│   ├── controllers    # Business logic for API routes
│   └── app.js         # Main entry point
│
├── frontend           # Blazor frontend
│   ├── Pages          # Razor pages (UI)
│   ├── Services       # HTTP Services for API communication
│   └── Program.cs     # Entry point for Blazor app
└── README.md

Security Considerations

    Password Encryption: All passwords are securely hashed using bcrypt before being stored in the database.
    Data Validation: Input is validated to prevent common attacks like SQL injection and XSS.
    HTTPS: The app should be run over HTTPS for secure communication.

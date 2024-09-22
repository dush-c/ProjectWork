import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSuffix } from '@angular/material/form-field';
import { EmailConfirmedComponent } from './pages/auth/email-confirmed/email-confirmed.component';
import { OptionsComponent } from './pages/options/options.component';
import { PhoneCreditComponent } from './pages/phone-credit/phone-credit.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BalanceCardComponent,
    TransactionsTableComponent,
    IfAuthenticatedDirective,
    LoginToggleComponent,
    EmailConfirmedComponent,
    OptionsComponent,
    PhoneCreditComponent,
    BankTransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatIconModule,
    MatIconButton,
    MatSuffix,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import { EmailConfirmedComponent } from './pages/auth/email-confirmed/email-confirmed.component';
import { ModifyPasswordComponent } from './pages/modify-password/modify-password.component';
import { PhoneCreditComponent } from './pages/phone-credit/phone-credit.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import { OptionsComponent } from './pages/options/options.component';
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthInterceptor} from "./utils/auth.interceptor";

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
    ModifyPasswordComponent,
    PhoneCreditComponent,
    BankTransferComponent,
    OptionsComponent,
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
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatInput,
    MatLabel,
    MatSlideToggle,
    FormsModule,
    MatSlideToggleModule,
  ],
  providers: [provideAnimationsAsync(), {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}

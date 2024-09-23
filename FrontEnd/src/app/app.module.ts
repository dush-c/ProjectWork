
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
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
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TransactionsTableComponent,
    IfAuthenticatedDirective,
    LoginToggleComponent,
    EmailConfirmedComponent,
    ModifyPasswordComponent,
    PhoneCreditComponent,
    BankTransferComponent,
    OptionsComponent,
    WelcomeBarComponent,
    StatsCardComponent,
    ChartCardComponent,
    CreditCardComponent,
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
    MatLabel,
    NgApexchartsModule
  ],
  providers: [],
  providers: [provideAnimationsAsync(), {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}



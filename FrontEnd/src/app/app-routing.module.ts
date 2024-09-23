import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {authGuard} from "./guards/auth.guard";
import {EmailConfirmedComponent} from "./pages/auth/email-confirmed/email-confirmed.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {OptionsComponent} from "./pages/options/options.component";
import {BankTransferComponent} from "./pages/bank-transfer/bank-transfer.component";
import {PhoneCreditComponent} from "./pages/phone-credit/phone-credit.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'email-confirmed', component: EmailConfirmedComponent},
  { path: 'dashboard', component: DashboardComponent}, //canActivate: [authGuard] },
  { path:"profile", component: ProfileComponent},
  { path:"settings", component: OptionsComponent},
  { path:"bank-transfer", component: BankTransferComponent},
  { path:"phone-credit", component: PhoneCreditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

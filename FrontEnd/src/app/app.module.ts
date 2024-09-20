import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/auth/register/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    IfAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

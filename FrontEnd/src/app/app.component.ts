import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todos';
  currentUser$;

  constructor(protected authSrv: AuthService) {
    this.currentUser$ = this.authSrv.currentUser$;
  }

  logout() {
    this.authSrv.logout();
  }
}

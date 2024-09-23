import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../interfaces/user.entity";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public authSrv: AuthService) {}

  logout() {
    this.authSrv.logout();
  }
}

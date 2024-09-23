import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../interfaces/user.entity";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input()
  user: User | null = null;

  @Output('logout')
  logoutEvent = new EventEmitter<void>();

  logout() {
    this.logoutEvent.emit();
  }
}

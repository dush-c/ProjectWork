import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-login-toggle',
  templateUrl: './login-toggle.component.html',
  styleUrl: './login-toggle.component.scss'
})
export class LoginToggleComponent {
  isLoginMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateMode();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMode();
      }
    });
  }

  private updateMode(): void {
    this.isLoginMode = this.router.url === '/login';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}

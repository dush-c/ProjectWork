import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {
  constructor(private router: Router) {}
  isDarkMode = false;

  toggleTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  navigateToChangePassword() {
    this.router.navigate(['/modify-password']);
  }
}

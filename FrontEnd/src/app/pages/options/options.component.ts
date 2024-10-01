import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent implements OnInit {
  isLightTheme: boolean;

  constructor(private router: Router) {
    // Initialize isLightTheme based on localStorage value
    const savedTheme = localStorage.getItem('theme');
    this.isLightTheme = savedTheme === 'light'; // Default to false (dark) if not set
  }

  ngOnInit(): void {
    this.applyTheme();
  }

  onThemeChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isLightTheme = checkbox.checked;
    this.saveThemeToLocalStorage();
    this.applyTheme();
  }

  saveThemeToLocalStorage(): void {
    const theme = this.isLightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  }

  applyTheme(): void {
    const themeClass = this.isLightTheme ? 'light-theme' : 'dark-theme';
    document.body.classList.toggle('light-theme', this.isLightTheme);
    document.body.classList.toggle('dark-theme', !this.isLightTheme);
  }

  navigateToChangePassword() {
    this.router.navigate(['/modify-password']);
  }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  @Input() balance: number | null = null; // Riceviamo il saldo da DashboardComponent

  isBlurred: boolean = false;

  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }
}

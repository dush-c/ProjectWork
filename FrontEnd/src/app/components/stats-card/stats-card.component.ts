import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  @Input() balance!: Number; // Riceviamo il saldo da DashboardComponent

  isBlurred: boolean = false;

  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }
}

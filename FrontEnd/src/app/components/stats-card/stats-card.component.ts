import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  isBlurred: boolean = false;

  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }
}

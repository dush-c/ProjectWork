import { Component } from '@angular/core';
import { DateRangePicker } from 'flowbite-datepicker';
import type { DatepickerOptions, DatepickerInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
@Component({
  selector: 'app-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrl: './range-datepicker.component.scss',
})
export class RangeDatepickerComponent {
  // set the target element of the input field
  dateRangePickerEl = document.getElementById(
    'date-range-picker'
  ) as HTMLElement;

  instanceOptions: InstanceOptions = {
    id: 'date-range-picker',
    override: true,
  };

  rangeDatepicker = new DateRangePicker(this.dateRangePickerEl, {
    // options
  });
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexDataLabels,
} from 'ng-apexcharts';
import { BankTransferService } from '../../services/bank-transfer.service';
import { map } from 'rxjs';
import { Transaction } from '../../interfaces/transaction.entity';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  stroke: ApexStroke;
  labels: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  grid: ApexGrid;
  states: ApexStates;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
};

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartSpending: Partial<ChartOptions>;
  spendingList!: number[];

  constructor(private bankTransSrv: BankTransferService) {
    // Initialize chart options
    this.chartSpending = {
      chart: {
        height: 'auto',
        width: '160%',
        type: 'area',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2'],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },
      series: [], // Initially empty, will be populated later
      xaxis: {
        categories: [],
      },
    };
  }

  ngOnInit(): void {
    // Fetch the data on initialization
    this.getData();
  }

  getData(): void {
    this.bankTransSrv.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        // Map transaction data to spendingList
        this.spendingList = transactions.map((t) => t.importo);
        const dateList = transactions.map((d) => d.data);
        // Now update the chart series with the fetched data
        this.chartSpending.series = [
          {
            name: 'Transazioni',
            data: this.spendingList,
            color: '#1A56DB',
          },
        ];

        this.chartSpending.xaxis!.categories = dateList;
      },
    });
  }
}

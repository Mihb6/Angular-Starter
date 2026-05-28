import { Component, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-feed-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './feed-chart.component.html',
  styleUrl: './feed-chart.component.scss',
  providers: [provideEchartsCore({ echarts: () => import('echarts') })]
})
export class FeedChartComponent {
  isLoading    = input.required<boolean>();
  hasChartData = input.required<boolean>();
  chartOptions = input.required<EChartsOption | null>();
}
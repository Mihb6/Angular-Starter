import { Component, signal } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { ApiService } from '../../../../common/service/api.service';

export const ROUTE_HELLO = "hello";

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
  providers: [provideEchartsCore({ echarts: () => import('echarts') })]
})
export class HelloComponent {

  feeds: any[] = [];
  filteredFeeds: any[] = [];
  selectedFeed: any = null;
  feedName: string = '';
  description: string = '';
  currentStatus: string = 'Normal';
  latestReceivedValue: string = '';
  latestReceivedTime: string = '';
  latestSetValue: string = '';
  latestSetTime: string = '';
  reference: string = '';
  sourceType: string = '';
  readingType: string = '';
  unit: string = '';
  path: string = '';
  precision: number = 0;
  retention: any = null;
  categorisationEnabled: boolean = false;
  dataType: string = '';
  chartOptions = signal<any>(null);
  hasChartData: boolean = false;
  isLoading: boolean = false;
  activeTab: string = 'feeds';

  constructor(private apiService: ApiService) {

    this.apiService.semanticApi.get("13c357a9-ce4d-4377-abc6-1689709907c1").subscribe((res: any) => {
      this.feeds = res.data.feeds.filter((f: any) =>
        !f.name.toLowerCase().includes('user input')
      );
      this.filteredFeeds = this.feeds;
    });
  }

  selectFeed(feed: any) {
    this.selectedFeed = feed;
    this.feedName = feed.name;
    this.description = feed.description ?? '-';
    this.reference = feed.reference ?? '-';
    this.sourceType = feed.sourceType ?? '-';
    this.precision = feed.precision;
    this.retention = feed.retention;
    this.categorisationEnabled = feed.categorisationEnabled;
    this.readingType = feed.readingTypeName ?? '-';
    this.unit = feed.unitName ?? '-';
    this.path = feed.parentNamePath + '/' + feed.name;
    this.dataType = feed.dataType;
    this.latestReceivedValue = feed.lastReceivedReading?.data ?? '-';
    this.latestReceivedTime = feed.lastReceivedReading
      ? this.formatTime(feed.lastReceivedReading.receivingTime)
      : '-';
    this.latestSetValue = feed.lastSentReading?.data ?? '-';
    this.latestSetTime = feed.lastSentReading
      ? this.formatTime(feed.lastSentReading.receivingTime)
      : '-';

    this.chartOptions.set(null);
    this.hasChartData = false;

    if (feed.dataType === 'NUMERIC') {
      this.isLoading = true;
      this.chartOptions.set(null);
      this.hasChartData = false;
      this.loadChart(feed.name, feed.unitSymbol ?? '');
    }
  }

  loadChart(feedName: string, unitSymbol: string) {
    const now = Date.now();
    const from = now - 48 * 60 * 60 * 1000;

    this.apiService.semanticFeedApi.listReadings(
      "13c357a9-ce4d-4377-abc6-1689709907c1",
      feedName,
      { from: from, to: now }
    ).subscribe((res: any) => {
      this.isLoading = false;
      const readings = res.data;

      if (!readings || readings.length === 0) {
        this.hasChartData = false;
        this.chartOptions.set({});
        return;
      }

      const chartData = readings.map((r: any) => [r.recordingTime, parseFloat(r.data)]);
      const values = readings.map((r: any) => parseFloat(r.data));
      const minValue = values.reduce((a: number, b: number) => Math.min(a, b), Infinity);
      const maxValue = values.reduce((a: number, b: number) => Math.max(a, b), -Infinity);
      const yAxisMin = Math.floor(minValue - (maxValue - minValue) * 0.1);
      const yAxisMax = Math.ceil(maxValue + (maxValue - minValue) * 0.1);

      this.hasChartData = true;
      this.chartOptions.set({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#2a2a2a',
          borderColor: '#444',
          textStyle: { color: '#fff' },
          formatter: (params: any) => {
            let param = params[0];
            const date = new Date(param.value[0]);
            const timeStr = date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
            return `${timeStr}<br/>${param.marker} <b>${param.value[1]} ${unitSymbol}</b>`;
          }
        },
        grid: { left: '10%', right: '8%', top: '10%', bottom: '12%' },
        dataZoom: [{ type: 'inside', xAxisIndex: 0, filterMode: 'filter' }],
        xAxis: {
          type: 'time',
          boundaryGap: ['5%', '5%'],
          min: from,
          max: now,
          axisLabel: {
            color: '#888', fontSize: 11,
            formatter: (value: number) => {
              const date = new Date(value);
              const h = String(date.getHours()).padStart(2, '0');
              const m = String(date.getMinutes()).padStart(2, '0');
              return `${h}:${m}`;
            }
          },
          axisLine: { lineStyle: { color: '#333' } },
          axisTick: { show: false },
          splitLine: { show: true, lineStyle: { color: '#252525' } }
        },
        yAxis: {
          type: 'value',
          name: unitSymbol,
          min: yAxisMin,
          max: yAxisMax,
          nameTextStyle: { color: '#888', fontSize: 12, padding: [0, 0, 10, -30] },
          axisLabel: { color: '#888', fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#252525' } }
        },
        series: [{
          data: chartData,
          type: 'line',
          symbol: readings.length < 100 ? 'circle' : 'none',
          symbolSize: 6,
          smooth: false,
          large: readings.length > 1000,
          sampling: readings.length > 1000 ? 'lttb' : undefined,
          lineStyle: { color: '#e2c630', width: 1.5 },
          itemStyle: { color: '#e2c630' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(226, 198, 48, 0.25)' },
                { offset: 1, color: 'rgba(226, 198, 48, 0.0)' }
              ]
            }
          }
        }]
      });
    });
  }

  filterFeeds(text: string) {
    if (!text) {
      this.filteredFeeds = this.feeds;
      return;
    }
    this.filteredFeeds = this.feeds.filter(f =>
      f.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  }
}
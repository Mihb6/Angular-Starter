import { Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class HelloComponent implements OnInit {

  activeTab: string = 'feeds';

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

  attributes: any[] = [];
  filteredAttributes: any[] = [];
  selectedAttribute: any = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const savedTab = localStorage.getItem('zlatko_activeTab');
    if (savedTab) {
      this.activeTab = savedTab;
    }

    this.apiService.semanticApi.get("13c357a9-ce4d-4377-abc6-1689709907c1").subscribe((res: any) => {
      this.feeds = res.data.feeds.filter((f: any) => !f.name.toLowerCase().includes('user input'));
      this.filteredFeeds = this.feeds;

      const savedFeed = localStorage.getItem('zlatko_selectedFeed');
      if (savedFeed) {
        const foundFeed = this.feeds.find(f => f.name === savedFeed);
        if (foundFeed) {
          this.selectFeed(foundFeed);
          this.cdr.detectChanges(); 
        }
      }
    });

    this.apiService.semanticApi.get("13c357a9-ce4d-4377-abc6-1689709907c1/attributes").subscribe((res: any) => {
      const rawData = res.data ? res.data : res;
      this.attributes = rawData.map((attr: any) => ({
        name: attr.name,
        path: (attr.parentNamePath ? attr.parentNamePath : 'Zlatko Device') + '/' + attr.name,
        aicd: attr.description ? attr.description : '-',
        required: attr.required,
        readOnly: attr.readOnly,
        type: attr.dataType,
        value: attr.value ? attr.value : '-'
      }));
      this.filteredAttributes = this.attributes;

      const savedAttr = localStorage.getItem('zlatko_selectedAttr');
      if (savedAttr) {
        const foundAttr = this.attributes.find(a => a.name === savedAttr);
        if (foundAttr) {
          this.selectAttribute(foundAttr);
          this.cdr.detectChanges(); 
        }
      }
    });
  }

  changeTab(tabName: string) {
    this.activeTab = tabName;
    localStorage.setItem('zlatko_activeTab', tabName);
  }

  selectFeed(feed: any) {
    localStorage.setItem('zlatko_selectedFeed', feed.name);
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
    this.latestReceivedTime = feed.lastReceivedReading ? this.formatTime(feed.lastReceivedReading.receivingTime) : '-';
    this.latestSetValue = feed.lastSentReading?.data ?? '-';
    this.latestSetTime = feed.lastSentReading ? this.formatTime(feed.lastSentReading.receivingTime) : '-';

    this.chartOptions.set(null);
    this.hasChartData = false;

    if (feed.dataType === 'NUMERIC') {
      this.isLoading = true;
      this.loadChart(feed.name, feed.unitSymbol ?? '');
    }
  }

  loadChart(feedName: string, unitSymbol: string) {
    const now = Date.now();
    const from = now - 48 * 60 * 60 * 1000;
    this.apiService.semanticFeedApi.listReadings("13c357a9-ce4d-4377-abc6-1689709907c1", feedName, { from: from, to: now }).subscribe((res: any) => {
      this.isLoading = false;
      const readings = res.data;
      if (!readings || readings.length === 0) {
        this.hasChartData = false;
        this.chartOptions.set({});
        return;
      }
      const chartData = readings.map((r: any) => [r.recordingTime, parseFloat(r.data)]);
      this.hasChartData = true;
      this.chartOptions.set({
        series: [{ data: chartData, type: 'line', lineStyle: { color: '#e2c630' } }]
      });
      this.cdr.detectChanges(); 
    });
  }

  selectAttribute(attr: any) {
    localStorage.setItem('zlatko_selectedAttr', attr.name);
    this.selectedAttribute = attr;
  }

  filterFeeds(text: string) {
    this.filteredFeeds = text ? this.feeds.filter(f => f.name.toLowerCase().includes(text.toLowerCase())) : this.feeds;
  }

  filterAttributes(text: string) {
    this.filteredAttributes = text ? this.attributes.filter(a => a.name.toLowerCase().includes(text.toLowerCase())) : this.attributes;
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} at ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
}
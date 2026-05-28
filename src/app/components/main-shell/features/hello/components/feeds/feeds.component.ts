import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Subject, takeUntil } from 'rxjs';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { Reading, SemanticFeedDetails } from '../../../../../../rest/data/semantic-feed.model';
import { ApiService } from '../../../../../../common/service/api.service';
import { Semantic } from '../../../../../../rest/data/semantic.model';
import { ApiResponse } from '../../../../../../rest/rest.model';

const DEVICE_ID = '13c357a9-ce4d-4377-abc6-1689709907c1';

@Component({
  selector: 'app-feeds',
  standalone: true,
  imports: [FeedListComponent, FeedDetailComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.scss',
})
export class FeedsComponent implements OnInit, OnDestroy {

  feeds        = signal<SemanticFeedDetails[]>([]);
  selectedFeed = signal<SemanticFeedDetails | null>(null);
  chartOptions = signal<EChartsOption | null>(null);
  hasChartData = signal<boolean>(false);
  isLoading    = signal<boolean>(false);

  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['feedName'] && this.feeds().length > 0) {
          const found = this.feeds().find(f => f.name === params['feedName']);
          if (found) this.selectFeedSilent(found);
        }
      });

    this.loadFeeds();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeeds(): void {
    this.apiService.semanticApi
      .get(DEVICE_ID)
      .subscribe((res: ApiResponse<Semantic>) => {
        if (!res.data) return;

        const feeds = res.data.feeds.filter(
          (f: SemanticFeedDetails) => !f.name.toLowerCase().includes('user input')
        );
        this.feeds.set(feeds);

        const urlFeedName = this.route.snapshot.params['feedName'];
        if (urlFeedName) {
          const found = feeds.find(f => f.name === urlFeedName);
          if (found) { this.selectFeedSilent(found); return; }
        }

        const saved = localStorage.getItem('zlatko_selectedFeed');
        if (saved) {
          const found = feeds.find(f => f.name === saved);
          if (found) { this.selectFeedSilent(found); return; }
        }
      });
  }

  selectFeed(feed: SemanticFeedDetails): void {
    this.router.navigate([feed.name], { relativeTo: this.route, replaceUrl: true });
    this.selectFeedSilent(feed);
  }

  private selectFeedSilent(feed: SemanticFeedDetails): void {
    localStorage.setItem('zlatko_selectedFeed', feed.name);
    this.selectedFeed.set(feed);
    this.chartOptions.set(null);
    this.hasChartData.set(false);

    if (feed.dataType === 'NUMERIC') {
      this.isLoading.set(true);
      this.loadChart(feed.name);
    }
  }

  private loadChart(feedName: string): void {
    const now  = Date.now();
    const from = now - 24 * 60 * 60 * 1000;

    this.apiService.semanticFeedApi
      .listReadings(DEVICE_ID, feedName, { from, to: now })
      .subscribe((res: ApiResponse<Reading[]>) => {
        this.isLoading.set(false);

        if (!res.data || res.data.length === 0) {
          this.hasChartData.set(false);
          this.chartOptions.set({});
          return;
        }

        const chartData: [number, number][] = res.data.map(
          (r: Reading) => [r.recordingTime, parseFloat(r.data)]
        );
        this.hasChartData.set(true);
        this.chartOptions.set({
          series: [{ data: chartData, type: 'line', lineStyle: { color: '#e2c630' } }]
        });
      });
  }
}
import { Component, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EChartsOption } from 'echarts';
import { FeedChartComponent } from '../feed-chart/feed-chart.component';
import { InfoCardComponent }  from '../../info-card/info-card.component';
import { SemanticFeedDetails } from '../../../../../../../rest/data/semantic-feed.model';

@Component({
  selector: 'app-feed-detail',
  standalone: true,
  imports: [DatePipe, FeedChartComponent, InfoCardComponent],
  templateUrl: './feed-detail.component.html',
  styleUrl: './feed-detail.component.scss',
})
export class FeedDetailComponent {
  feed         = input.required<SemanticFeedDetails | null>();
  isLoading    = input.required<boolean>();
  hasChartData = input.required<boolean>();
  chartOptions = input.required<EChartsOption | null>();

  feedPath = computed(() => {
    const f = this.feed();
    return f ? `${f.parentNamePath}/${f.name}` : '-';
  });
}
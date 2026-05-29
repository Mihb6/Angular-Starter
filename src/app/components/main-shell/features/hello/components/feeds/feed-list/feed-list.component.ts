import { Component, input, output, signal, computed } from '@angular/core';
import { SemanticFeedDetails } from '../../../../../../../rest/data/semantic-feed.model';

@Component({
  selector: 'app-feed-list',
  standalone: true,
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.scss',
})
export class FeedListComponent {
  feeds        = input.required<SemanticFeedDetails[]>();
  selectedFeed = input<SemanticFeedDetails | null>(null);
  feedSelected = output<SemanticFeedDetails>();
  searchChanged = output<string>();

  searchTerm = signal<string>('');

  filteredFeeds = computed(() => {
    const text = this.searchTerm().toLowerCase().trim();
    return text
      ? this.feeds().filter(f => f.name.toLowerCase().includes(text))
      : this.feeds();
  });

  onSearch(value: string): void {
    this.searchTerm.set(value);
    this.searchChanged.emit(value);
  }
}
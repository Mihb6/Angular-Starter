import { Component, input, output, signal, computed } from '@angular/core';
import { AppAttribute } from '../../../types';

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  templateUrl: './attribute-list.component.html',
  styleUrl: './attribute-list.component.scss',
})
export class AttributeListComponent {
  attributes        = input.required<AppAttribute[]>();
  selectedAttribute = input<AppAttribute | null>(null);
  attributeSelected = output<AppAttribute>();
  searchChanged     = output<string>();

  searchTerm = signal<string>('');

  filteredAttributes = computed(() => {
    const text = this.searchTerm().toLowerCase().trim();
    return text
      ? this.attributes().filter(a => a.name.toLowerCase().includes(text))
      : this.attributes();
  });

  onSearch(value: string): void {
    this.searchTerm.set(value);
    this.searchChanged.emit(value);
  }
}
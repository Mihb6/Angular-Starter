import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  activeTab  = input.required<string>();
  tabChanged = output<string>();
}
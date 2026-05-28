import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

export const ROUTE_HELLO = 'hello';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [RouterOutlet, TabBarComponent],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  changeTab(tab: string): void {
    this.router.navigate([tab], { relativeTo: this.route });
  }

  isTabActive(tab: string): boolean {
    return this.router.url.includes(`/${tab}`);
  }
}
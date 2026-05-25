import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { Router } from "@angular/router";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { Feature, FeatureRegistry, RequiresPermissionDirective, SharedModule, ThemeService } from "@wolkabout/commons";

@Component({
  selector: 'app-main-shell',
  imports: [SharedModule, HeaderComponent, RequiresPermissionDirective],
  templateUrl: './main-shell.component.html',
  styleUrl: './main-shell.component.scss'
})
export class MainShellComponent {

  private readonly LSK_SIDE_NAV_EXPANDED = 'WOLK_SIDE_NAV_EXPANDED';

  features = signal<Feature[]>([]);

  sideNavigationOpened: boolean = false;

  isDarkTheme = toSignal(this.themeService.isDarkTheme$)

  constructor(featureRegistry: FeatureRegistry, private router: Router, private themeService: ThemeService) {
    featureRegistry.features$.pipe(
      takeUntilDestroyed()
    ).subscribe((features) => {
      this.features.set(features);

      const feature = features.find((feature) => window.location.hash.includes(feature.entryRoute));
      if (feature) {
        this.themeService.setThemeColors(feature.primaryColor)
      }
    })

    this.sideNavigationOpened = localStorage.getItem(this.LSK_SIDE_NAV_EXPANDED) === 'true';
  }

  selectFeature(feature: Feature) {
    if (!this.router.url.includes(feature.entryRoute)) {
      this.router.navigate([feature.entryRoute]);
    }
  }

  isFeatureSelected(feature: Feature): boolean {
    return this.router.url.includes(feature.entryRoute)
  }

  onToggleSidenav() {
    this.sideNavigationOpened = !this.sideNavigationOpened;
    localStorage.setItem(this.LSK_SIDE_NAV_EXPANDED, this.sideNavigationOpened.toString());
  }

  getGeneratedColor(hex?: string) {
    if (!hex) {
      return;
    }

    return this.themeService.computeColorFromHex(hex, this.isDarkTheme() ? 80 : 40);
  }
}

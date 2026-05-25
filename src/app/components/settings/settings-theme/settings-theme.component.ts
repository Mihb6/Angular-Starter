import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService, SharedModule} from "@wolkabout/commons";
@Component({
    selector: 'app-settings-theme',
    imports: [SharedModule],
    templateUrl: './settings-theme.component.html',
    styleUrl: './settings-theme.component.scss'
})
export class SettingsThemeComponent {

  theme = new FormControl<'SYSTEM' | 'LIGHT' | 'DARK'>(this.themeService.themeType);

  constructor(private themeService: ThemeService) {
    this.theme.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe((theme) => {
      if (theme) {
        themeService.setThemeType(theme);
      }
    })
  }
}

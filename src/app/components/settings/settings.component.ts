import { Component } from '@angular/core';
import { SettingsNameChangeComponent } from "./settings-name-change/settings-name-change.component";
import { SettingsThemeComponent } from "./settings-theme/settings-theme.component";
import { SettingsPasswordChangeComponent } from "./settings-password-change/settings-password-change.component";
import { SettingsTwoFactorAuthenticationComponent } from "./settings-two-factor-authentication/settings-two-factor-authentication.component";
import { WhiteLabelingService } from "../../common/service/white-labeling.service";
import { QRCodeComponent } from "angularx-qrcode";
import { toSignal } from "@angular/core/rxjs-interop";
import { OverflowClassDirective, ThemeService, SharedModule} from "@wolkabout/commons";
export const ROUTE_SETTINGS = 'settings';

@Component({
  selector: 'app-settings',
  imports: [
    SettingsNameChangeComponent,
    SettingsThemeComponent,
    SettingsPasswordChangeComponent,
    SettingsTwoFactorAuthenticationComponent,
    OverflowClassDirective,
    SharedModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  logo = toSignal(this.whiteLabeling.logo$);

  constructor(private themeService: ThemeService, public whiteLabeling: WhiteLabelingService) {
    this.themeService.setThemeColors(this.themeService.defaultColors.primary)
  }
}

import { Component } from '@angular/core';
import { QRCodeComponent } from "angularx-qrcode";
import { ApiService } from "../../../common/service/api.service";
import { BehaviorSubject, catchError, filter, map, switchMap } from "rxjs";
import { NgOtpInputComponent } from "ng-otp-input";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { TwoFactorAuthenticationConfirmationDialogComponent } from "./two-factor-authentication-confirmation-dialog/two-factor-authentication-confirmation-dialog.component";
import { FormControl, Validators } from "@angular/forms";
import { PlatformInfoService } from "../../../common/service/platform-info.service";
import { NotificationService, SharedModule} from "@wolkabout/commons";
@Component({
  selector: 'app-settings-two-factor-authentication',
  imports: [SharedModule, QRCodeComponent, NgOtpInputComponent],
  templateUrl: './settings-two-factor-authentication.component.html',
  styleUrl: './settings-two-factor-authentication.component.scss'
})
export class SettingsTwoFactorAuthenticationComponent {

  refreshStatus$ = new BehaviorSubject<void>(undefined);
  otpControl = new FormControl('', Validators.required);

  qrCode$ = this.apiService.totpApi.getTotpUrlAuth().pipe(
    takeUntilDestroyed(),
    map((response) => response.data),
    catchError((error) => this.notificationService.showError(error.message))
  )

  twoFactorAuthStatus$ = this.refreshStatus$.pipe(
    switchMap(() => this.apiService.totpApi.checkStatus().pipe(
      map((response) => response.data),
      catchError((error) => this.notificationService.showError(error.message))
    ))
  );

  is2faEnforced = toSignal(this.platformInfo.is2faEnforced());

  constructor(private apiService: ApiService, private notificationService: NotificationService, private dialog: MatDialog, private platformInfo: PlatformInfoService) {
    this.otpControl.valueChanges.pipe(
      takeUntilDestroyed(),
      filter((value) => !!value && value.length === 6)
    ).subscribe((value) => {
      if (value != null) {
        this.apiService.totpApi.set2fa(value).pipe(
          map((response) => response.data),
          catchError((error) => this.notificationService.showError('SETTINGS.TWO_FACTOR_AUTHENTICATION_ERROR_' + error.message, {default: error.message}))
        ).subscribe(() => {
          this.refreshStatus$.next();
          this.otpControl.reset();
        });
      }
    })
  }

  onEnable() {
    this.apiService.totpApi.enable2fa().pipe(
      map((response) => response.data),
      catchError((error) => this.notificationService.showError(error.message))
    ).subscribe(() => this.refreshStatus$.next());
  }

  onDisable() {
    this.dialog.open(TwoFactorAuthenticationConfirmationDialogComponent).afterClosed()
      .subscribe(() => this.refreshStatus$.next())
  }
}

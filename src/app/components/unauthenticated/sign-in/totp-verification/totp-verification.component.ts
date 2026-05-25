import { Component, computed, input, output } from '@angular/core';
import { QRCodeComponent } from "angularx-qrcode";
import { NgOtpInputComponent } from "ng-otp-input";
import { ApiService } from "../../../../common/service/api.service";
import { catchError, filter, map, tap } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationService, SharedModule} from "@wolkabout/commons";

@Component({
  selector: 'app-totp-verification',
  imports: [SharedModule, QRCodeComponent, NgOtpInputComponent],
  templateUrl: './totp-verification.component.html',
  styleUrl: './totp-verification.component.scss'
})
export class TotpVerificationComponent {

  token = input.required<string>();

  qrCode = computed(() => {
    return this.apiService.totpApi.getTotpUrl(this.token()).pipe(
      map((response) => response.data),
      catchError((error) => this.notificationService.showGenericError(error))
    )
  })

  verified = output<void>();

  otpControl = new FormControl('', Validators.required);

  constructor(private apiService: ApiService, private notificationService: NotificationService) {
    this.otpControl.valueChanges.pipe(
      takeUntilDestroyed(),
      filter((value) => !!value && value.length === 6)
    ).subscribe((value) => {
      if (value != null) {
        this.apiService.totpApi.verifySetup(value, this.token()).pipe(
          map(() => true),
          catchError((error) => {
            this.otpControl.reset();
            return this.notificationService.showError('SETTINGS.TWO_FACTOR_AUTHENTICATION_ERROR_' + error.message, {default: error.message});
          })
        ).subscribe((res) => {
          if (res) {
            this.verified.emit();
          }
        });
      }
    })
  }
}

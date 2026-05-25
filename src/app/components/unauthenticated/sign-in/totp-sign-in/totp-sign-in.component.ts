import { SharedModule } from "@wolkabout/commons";
import { Component, output } from '@angular/core';
import { NgOtpInputComponent } from "ng-otp-input";
import { filter } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
@Component({
  selector: 'app-totp-sign-in',
  imports: [SharedModule, NgOtpInputComponent],
  templateUrl: './totp-sign-in.component.html',
  styleUrl: './totp-sign-in.component.scss'
})
export class TotpSignInComponent {

  totp = output<string>();
  otpControl = new FormControl('', Validators.required);

  constructor() {
    this.otpControl.valueChanges.pipe(
        takeUntilDestroyed(),
        filter((value) => !!value && value.length === 6)
    ).subscribe((value) => {
      if (value != null) {
        this.totp.emit(value);
      }
    })
  }
}

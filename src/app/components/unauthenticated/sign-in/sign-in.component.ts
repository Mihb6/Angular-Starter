import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../../common/service/api.service";
import { catchError, map, of } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { SignInResponse } from "../../../rest/authentication/authentication.model";
import { TotpSignInComponent } from "./totp-sign-in/totp-sign-in.component";
import { EmailSignInComponent } from "./email-sign-in/email-sign-in.component";
import { TotpVerificationComponent } from "./totp-verification/totp-verification.component";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { QRCodeComponent } from "angularx-qrcode";
import { AuthenticationService, NotificationService, ThemeService, SharedModule} from "@wolkabout/commons";
import { convertToAuthentication } from "../../../rest/authentication-client.service";
export const ROUTE_SIGN_IN = 'sign-in';

@Component({
  selector: 'app-sign-in',
  imports: [SharedModule, TotpSignInComponent, EmailSignInComponent, TotpVerificationComponent, QRCodeComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  token = signal<string>('');
  stage = signal<'EMAIL' | 'TOTP_VERIFICATION' | 'TOTP_AUTHENTICATION'>('EMAIL');
  requestInProgress = signal<boolean>(false);
  requestError = signal<string>('')
  email = signal<string>('');
  notVerified = signal<boolean>(false);
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$);
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  constructor(private apiService: ApiService, private authService: AuthenticationService, private router: Router, private notificationService: NotificationService, private themeService: ThemeService, private whiteLabelingService: WhiteLabelingService) {
    this.themeService.setThemeColors(this.themeService.defaultColors.primary)
    authService.activeUser$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      this.router.navigate(['../..']);
    })
  }

  submit(credentials: { email: string; password: string }) {
    this.requestError.set('');
    this.requestInProgress.set(true);

    this.apiService.authenticationApi.emailSignIn({username: credentials.email as string, password: credentials.password as string}, window.location.host).pipe(
      map((response) => response.data),
      catchError((error) => {
        if (error.message === 'NOT_VERIFIED') {
          this.notVerified.set(true);
          this.requestError.set('UNAUTHENTICATED.SING_IN_' + error.message);
        } else if (error.message === 'ACCESS_ERROR') {
          this.requestError.set('UNAUTHENTICATED.' + error.message)
        } else {
          this.requestError.set('ERROR.' + error.message);
        }
        this.requestInProgress.set(false);
        return of(null);
      })
    ).subscribe((response: SignInResponse | null) => {
      if (!response) {
        return;
      }

      if (response.user) {
        const authentication = convertToAuthentication(response);
        this.authService.setAuthentication(authentication);
        this.requestInProgress.set(false);
      } else if (response.data) {
        this.token.set(response.data!);
        const authClaim = this.authService.getClaim(response.data, 'auth');
        if (!!authClaim && Array.isArray(authClaim) && authClaim[0] === 'TOTP_VERIFICATION') {
          this.stage.set("TOTP_VERIFICATION");
        } else {
          this.stage.set("TOTP_AUTHENTICATION");
        }
      }
    })
  }

  authenticateWithTotp(totpToken: string) {
    this.apiService.authenticationApi.authentication2fa(totpToken, this.token(), window.location.host).pipe(
      map((response) => response.data),
      catchError((error) => this.notificationService.showError('UNAUTHENTICATED.TWO_FACTOR_AUTHENTICATION_ERROR_' + error.message, {default: error.message}))
    ).subscribe((res) => {
      if (res) {
        const authentication = convertToAuthentication(res);
        this.authService.setAuthentication(authentication);
      }
    });
  }

  onTotpVerified() {
    this.stage.set('TOTP_AUTHENTICATION');
  }

  resendEmail() {
    this.apiService.authenticationApi.resendVerificationEmail(this.email() ?? '', window.location.host).pipe(
      catchError((error) => this.notificationService.showError(error.response))
    ).subscribe(value => {
      if (value) {
        this.notificationService.showSuccess('UNAUTHENTICATED.EMAIL_VERIFICATION_SUCCESS');
      }
    })
  }
}

import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ApiService } from "../../../common/service/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, EMPTY, switchMap } from "rxjs";
import { AccountActivationRequest } from "../../../rest/authentication/authentication.model";
import { ROUTE_SIGN_IN } from "../sign-in/sign-in.component";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { NotificationService, SharedModule} from "@wolkabout/commons";
export const ROUTE_RESET_PASSWORD = 'auth/reset-password'

@Component({
  selector: 'app-reset-password',
  imports: [SharedModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  requestInProgress = signal<boolean>(false);
  hidePassword = signal(true);
  hideAgainPassword = signal(true);
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$);
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  form = new FormGroup({
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    againPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  }, {validators: this.passwordMatchValidator()})

  constructor(private apiService: ApiService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private whiteLabelingService: WhiteLabelingService) {
  }

  submit() {
    this.requestInProgress.set(true);
    this.route.queryParamMap.pipe(
      switchMap((params) => {
        const code = params.get('code');
        if (!code) {
          this.requestInProgress.set(false);
          return EMPTY;
        }

        return this.apiService.authenticationApi.accountActivationWithTwoPasswords(code, this.form.value as AccountActivationRequest).pipe(
          catchError((error) => {
            this.requestInProgress.set(false);
            return this.notificationService.showError(error.message);
          })
        )
      })
    ).subscribe((res) => {
        if (!res) {
          return;
        }

        this.requestInProgress.set(false);
        this.notificationService.showSuccess('UNAUTHENTICATED.RESET_PASSWORD_NOTIFICATION_MESSAGE')
        this.router.navigate([ROUTE_SIGN_IN]);
      }
    )
  }

  clickEventPassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.preventDefault();
  }

  clickEventAgainPassword(event: MouseEvent) {
    this.hideAgainPassword.set(!this.hideAgainPassword());
    event.preventDefault();
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const againPassword = control.get('againPassword')?.value;

      return password !== againPassword ? {passwordMismatch: true} : null;
    };
  }
}

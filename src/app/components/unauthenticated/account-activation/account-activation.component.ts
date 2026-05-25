import { Component, signal } from '@angular/core';
import { ApiService } from "../../../common/service/api.service";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { catchError, filter, map, switchMap } from "rxjs";
import { ActiveInviteRequest } from "../../../rest/authentication/authentication.model";
import { ROUTE_SIGN_IN } from "../sign-in/sign-in.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { NotificationService, SharedModule} from "@wolkabout/commons";
export const ROUTE_ACCOUNT_ACTIVATION = "auth/account-activation"

@Component({
  selector: 'app-account-activation',
  imports: [SharedModule],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent {

  requestInProgress = signal<boolean>(false);
  hidePassword = signal(true);
  hideAgainPassword = signal(true);
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$)
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    againPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    accept16Years: new FormControl<boolean>(false),
    acceptTosPrivacy: new FormControl<boolean>(false)
  }, {validators: this.passwordMatchValidator()})

  constructor(private apiService: ApiService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private translate: TranslateService, private whiteLabelingService: WhiteLabelingService) {
    this.route.queryParams.pipe(
      takeUntilDestroyed(),
      map((data) => data['code']),
      filter((code) => !code),
    ).subscribe(() => this.router.navigate([ROUTE_SIGN_IN]))
  }

  submit() {
    this.requestInProgress.set(true);
    this.route.queryParamMap.pipe(
      map((data) => data.get('code')),
      filter((code) => !!code),
      switchMap((code) => {
        return this.apiService.authenticationApi.accountActivationInvited(code as string, this.form.value as ActiveInviteRequest).pipe(
          map(() => true),
          catchError((error) => {
            this.requestInProgress.set(false);
            return this.notificationService.showError('UNAUTHENTICATED.ERROR_' + error.message, {default: this.translate.instant('UNAUTHENTICATED.ERROR_DEFAULT')})
          })
        )
      })
    ).subscribe((res) => {
        if (res) {
          this.requestInProgress.set(false);
          this.notificationService.showSuccess('UNAUTHENTICATED.ACTIVATE_ACCOUNT_NOTIFICATION_MESSAGE')
          this.router.navigate([ROUTE_SIGN_IN]);
        }
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

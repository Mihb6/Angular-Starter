import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../common/service/api.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { catchError } from "rxjs";
import { SignUpByEmailRequest } from "../../../rest/authentication/authentication.model";
import { ROUTE_SIGN_IN } from "../sign-in/sign-in.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService, SharedModule} from "@wolkabout/commons";
export const ROUTE_REGISTER = 'register';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  requestInProgress = signal<boolean>(false);
  hidePassword = signal(true);
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$)
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    language: new FormControl<string>('en', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    acceptPrivacy: new FormControl<boolean>(false),
    accept16Years: new FormControl<boolean>(false),
    acceptedEula: new FormControl<boolean>(false)
  });

  constructor(private apiService: ApiService, private notificationService: NotificationService, private router: Router, private translate: TranslateService, private whiteLabelingService: WhiteLabelingService, private dialog: MatDialog) {
  }

  submit() {
    this.requestInProgress.set(true);
    this.apiService.authenticationApi.registerUser(this.form.value as SignUpByEmailRequest).pipe(
      catchError((error) => {
        this.requestInProgress.set(false);
        return this.notificationService.showError('UNAUTHENTICATED.ERROR_' + error.message, {default: this.translate.instant('UNAUTHENTICATED.ERROR_DEFAULT')})
      })
    ).subscribe((res) => {
        if (!res) {
          return;
        }

        this.requestInProgress.set(false);
        this.notificationService.showSuccess('UNAUTHENTICATED.ACTIVATE_ACCOUNT_NOTIFICATION_MESSAGE')
        this.router.navigate([ROUTE_SIGN_IN]);
      }
    )
  }

  clickEventPassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.preventDefault();
  }
}

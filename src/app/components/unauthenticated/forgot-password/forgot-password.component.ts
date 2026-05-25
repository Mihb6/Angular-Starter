import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../common/service/api.service";
import { catchError } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { NotificationService, SharedModule} from "@wolkabout/commons";
export const ROUTE_FORGOT_PASSWORD = 'forgot-password';

@Component({
  selector: 'app-forgot-password',
  imports: [SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  requestInProgress = signal<boolean>(false);
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$)
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  })

  constructor(private apiService: ApiService, private notificationService: NotificationService, private whiteLabelingService: WhiteLabelingService) {
  }

  submit() {
    if (!this.form.value.email) {
      return;
    }

    this.requestInProgress.set(true);

    this.apiService.authenticationApi.resetPassword(this.form.value.email).pipe(
      catchError((error) => {
        this.requestInProgress.set(false);
        return this.notificationService.showError('UNAUTHENTICATED.' + error.message)
      })
    ).subscribe((res) => {
      if (!res) {
        return;
      }

      this.notificationService.showSuccess('UNAUTHENTICATED.FORGOT_PASSWORD_NOTIFICATION_MESSAGE', 7000);
      this.requestInProgress.set(false);
    })
  }
}

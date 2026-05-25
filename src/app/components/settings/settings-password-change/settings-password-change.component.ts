import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ApiService } from '../../../common/service/api.service';
import { ChangePasswordRequest } from "../../../rest/settings/profile.model";
import { catchError } from "rxjs";
import { AuthenticationService, NotificationService, SharedModule} from "@wolkabout/commons";
@Component({
    selector: 'app-settings-password-change',
    imports: [SharedModule],
    templateUrl: './settings-password-change.component.html',
    styleUrl: './settings-password-change.component.scss'
})
export class SettingsPasswordChangeComponent {

  form = new FormGroup({
    oldPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8) ,Validators.maxLength(30)]),
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    repeatPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
  }, this.passwordMatchValidator)

  constructor(private apiService: ApiService, private notificationService: NotificationService, private authorizationService: AuthenticationService) {
  }

  confirm() {
    const formValues = this.form.getRawValue();
    const dto: ChangePasswordRequest = {
      username: this.authorizationService.activeUser?.email as string,
      oldPassword: formValues.oldPassword as string,
      newPassword: formValues.newPassword as string
    }

    this.apiService.profileApi.changePassword(dto).pipe(
      catchError((error) => this.notificationService.showError('ERROR.' + error.message, {default: error.message}))
    ).subscribe((response) => {
      if (response) {
        this.notificationService.showSuccess('SETTINGS.PASSWORD_CHANGE_SUCCESS');
        this.form.reset({ oldPassword: '', newPassword: '', repeatPassword: '' });
      }
    })
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const repeatPassword = control.get('repeatPassword');
    return newPassword && repeatPassword && newPassword.value !== repeatPassword.value ? { passwordMismatch: true } : null;
  };
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, take } from "rxjs";
import { ApiService } from "../../../common/service/api.service";
import { UserUpdateDto } from "../../../rest/settings/profile.model";
import { AuthenticationService, NotificationService, SharedModule} from "@wolkabout/commons";
@Component({
    selector: 'app-settings-name-change',
    imports: [SharedModule],
    templateUrl: './settings-name-change.component.html',
    styleUrl: './settings-name-change.component.scss'
})
export class SettingsNameChangeComponent {

  form = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.email])
  })

  constructor(private authenticationService: AuthenticationService, private apiService: ApiService, private notificationService: NotificationService) {
    this.authenticationService.activeUser$.pipe(
      take(1)
    ).subscribe((user) => {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
    })
  }

  confirm() {
    const formValues = this.form.getRawValue();
    this.apiService.profileApi.updateUserName(formValues as UserUpdateDto).pipe(
      catchError((error) => this.notificationService.showGenericError(error))
    ).subscribe((response) => {
      if (response) {
        this.authenticationService.updateUserName(formValues.firstName as string, formValues.lastName as string);
        this.notificationService.showSuccess('SETTINGS.NAME_CHANGE_SUCCESS');
        this.form.reset(formValues);
      }
    })
  }
}

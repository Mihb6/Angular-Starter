import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, map } from "rxjs";
import { ApiService } from "../../../../common/service/api.service";
import { MatDialogRef } from "@angular/material/dialog";
import { NotificationService, SharedModule} from "@wolkabout/commons";
@Component({
  selector: 'app-two-factor-authentication-confirmation-dialog',
  imports: [SharedModule],
  templateUrl: './two-factor-authentication-confirmation-dialog.component.html',
  styleUrl: './two-factor-authentication-confirmation-dialog.component.scss'
})
export class TwoFactorAuthenticationConfirmationDialogComponent {

  form = new FormGroup({
    password: new FormControl<string>('', Validators.required)
  });

  hidePassword = true;

  constructor(private apiService: ApiService, private notificationService: NotificationService, private dialogRef: MatDialogRef<TwoFactorAuthenticationConfirmationDialogComponent>) {
  }

  onSubmit() {
    this.apiService.totpApi.disable2fa(this.form.getRawValue()?.password as string).pipe(
      map((response) => response.data),
      catchError((error) => this.notificationService.showError(error.message))
    ).subscribe((res) => {
      this.dialogRef.close(res);
    })
  }
}

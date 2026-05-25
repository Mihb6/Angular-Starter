import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../common/service/api.service";
import { catchError, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { NotificationService, SharedModule} from "@wolkabout/commons";

@Component({
  selector: 'app-email-sign-in',
  imports: [SharedModule],
  templateUrl: './email-sign-in.component.html',
  styleUrl: './email-sign-in.component.scss'
})
export class EmailSignInComponent {

  requestInProgress = input<boolean>(false);

  email = output<string>();
  submitForm = output<{ email: string; password: string }>();

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  passwordHidden = true;
  selfRegistration = toSignal(
    this.apiService.infoApi.selfRegistration().pipe(
      map(res => res.data),
      catchError(error => this.notificationService.showError(error.message))
    )
  );

  signupEnabled = toSignal(
    this.apiService.infoApi.signupEnabled().pipe(
      map(res => res.data),
      catchError(error => this.notificationService.showError(error.message))
    )
  );

  openIdConnectProviders$ = this.apiService.openIdProviderApi.list().pipe(
    map((response) => response.data ?? [])
  )

  constructor(private apiService: ApiService, private notificationService: NotificationService, private oidcSecurityService: OidcSecurityService) {
  }

  onSubmit() {
    if (this.form.valid) {
      this.email.emit(this.form.value.email as string);
      this.submitForm.emit({
        email: this.form.value.email as string,
        password: this.form.value.password as string,
      });
    }
  }

  loginWithProvider(providerId: string) {
    this.oidcSecurityService.authorize(providerId, { customParams: { prompt: 'login'}});
  }
}

import { SharedModule } from "@wolkabout/commons";
import { Component, signal } from '@angular/core';
import { ApiService } from "../../../common/service/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, filter, map, of, switchMap } from "rxjs";
import { ROUTE_SIGN_IN } from "../sign-in/sign-in.component";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
export const ROUTE_ACCOUNT_VERIFICATION = 'auth/account-verification';

@Component({
  selector: 'app-account-verification',
  imports: [
    SharedModule
  ],
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss'
})
export class AccountVerificationComponent {
  image = signal('');
  title = signal('');
  message = signal('');
  whiteLabeling = toSignal(this.whiteLabelingService.whiteLabeling$);
  logo = toSignal(this.whiteLabelingService.logo$);
  signInImage = toSignal(this.whiteLabelingService.signInImage$)
  copyright = signal<string>('\u00A9 ' + new Date().getFullYear() + ' WolkAbout');

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private whiteLabelingService: WhiteLabelingService) {
    this.route.queryParams.pipe(
      takeUntilDestroyed(),
      map((data) => data['code']),
      filter((code) => !!code),
      switchMap((code) => this.apiService.authenticationApi.emailVerification(code).pipe(
        map(() => true),
        catchError((error) => {
          this.image.set('ico_confused');
          this.title.set('UNAUTHENTICATED.ACCOUNT_VERIFICATION_FAILURE_TITLE');
          this.message.set('UNAUTHENTICATED.ACCOUNT_VERIFICATION_' + error.message);
          return of(null)
        })
      ))
    ).subscribe((success) => {
      if (success) {
        this.image.set('ico_happy');
        this.title.set('UNAUTHENTICATED.ACCOUNT_VERIFICATION_SUCCESS_TITLE');
        this.message.set('UNAUTHENTICATED.ACCOUNT_VERIFICATION_SUCCESS_MESSAGE');
      }
    });

    this.route.queryParams.pipe(
      takeUntilDestroyed(),
      map((data) => data['code']),
      filter((code) => !code),
    ).subscribe(() => this.gotoLogin())
  }

  gotoLogin() {
    this.router.navigate([ROUTE_SIGN_IN]);
  }
}

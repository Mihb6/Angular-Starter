import { CanActivateFn, Router, Routes } from '@angular/router';
import { ROUTE_SIGN_IN, SignInComponent } from "./components/unauthenticated/sign-in/sign-in.component";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { MainShellComponent } from "./components/main-shell/main-shell.component";
import { ROUTE_SETTINGS, SettingsComponent } from "./components/settings/settings.component";
import { ROUTE_HELLO } from "./components/main-shell/features/hello/hello.component";
import { AuthenticationService } from "@wolkabout/commons";
import { ForgotPasswordComponent, ROUTE_FORGOT_PASSWORD } from "./components/unauthenticated/forgot-password/forgot-password.component";
import { ResetPasswordComponent, ROUTE_RESET_PASSWORD } from "./components/unauthenticated/reset-password/reset-password.component";
import { AccountActivationComponent, ROUTE_ACCOUNT_ACTIVATION } from "./components/unauthenticated/account-activation/account-activation.component";
import { RegisterComponent, ROUTE_REGISTER } from "./components/unauthenticated/register/register.component";
import { AccountVerificationComponent, ROUTE_ACCOUNT_VERIFICATION } from "./components/unauthenticated/account-verification/account-verification.component";
import { LicenseComponent, ROUTE_LICENSE } from "./components/unauthenticated/license/license.component";
import { NoPermissionsComponent, ROUTE_NO_PERMISSIONS } from "./common/component/no-permissions/no-permissions.component";
import { ROUTE_SWITCHING_TENANTS, SwitchingTenantsComponent } from "./common/component/switching-tenants/switching-tenants.component";
import { PlatformInfoService } from "./common/service/platform-info.service";

export const unauthenticatedOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthenticationService).isAuthenticated().pipe(
    map((authenticated) => {
      return authenticated ? router.createUrlTree(['']) : true;
    })
  )
};

export const authenticatedOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthenticationService).isAuthenticated().pipe(
    map((authenticated) => {
      return authenticated ? true : router.createUrlTree(['sign-in']);
    })
  )
};

export const licenseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformInfo = inject(PlatformInfoService);
  const auth = inject(AuthenticationService);

  return platformInfo.getPlatformInfo().pipe(
    map((platformInfo) => {
      if (platformInfo?.licence) {
        return true;
      }

      if (auth.isAuthenticated()) {
        auth.logout();
      }

      return router.createUrlTree([ROUTE_LICENSE]);
    })
  );
};

export const routes: Routes = [{
  path: ROUTE_SIGN_IN,
  component: SignInComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_FORGOT_PASSWORD,
  component: ForgotPasswordComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_RESET_PASSWORD,
  component: ResetPasswordComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_ACCOUNT_ACTIVATION,
  component: AccountActivationComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_REGISTER,
  component: RegisterComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_ACCOUNT_VERIFICATION,
  component: AccountVerificationComponent,
  canActivate: [unauthenticatedOnlyGuard, licenseGuard],
}, {
  path: ROUTE_LICENSE,
  component: LicenseComponent,
}, {
  path: '',
  component: MainShellComponent,
  children: [{
    path: ROUTE_HELLO,
    loadChildren: () => import('./components/main-shell/features/hello/hello.routes')
  }, {
    path: ROUTE_SETTINGS,
    component: SettingsComponent,
  }, {
    path: '**',
    redirectTo: ROUTE_HELLO
  }],
  canActivate: [authenticatedOnlyGuard],
}, {
  path: ROUTE_NO_PERMISSIONS,
  component: NoPermissionsComponent
}, {
  path: ROUTE_SETTINGS,
  component: SettingsComponent
}, {
  path: ROUTE_SWITCHING_TENANTS,
  component: SwitchingTenantsComponent
}, {
  path: '**',
  redirectTo: '',
}];

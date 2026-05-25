import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ROUTE_SIGN_IN } from "../../unauthenticated/sign-in/sign-in.component";
import { ROUTE_SETTINGS } from "../../settings/settings.component";
import { WhiteLabelingService } from "../../../common/service/white-labeling.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { combineLatest, filter, take } from "rxjs";
import { ROUTE_SWITCHING_TENANTS } from "../../../common/component/switching-tenants/switching-tenants.component";
import { ROUTE_NO_PERMISSIONS } from "../../../common/component/no-permissions/no-permissions.component";
import { AuthenticationService, Authority, FeatureRegistry, PermissionsService, SharedModule } from "@wolkabout/commons";

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  activeUser$ = this.authenticationService.activeUser$;
  authorities$ = this.authenticationService.authorities$;
  activeAuthority$ = this.authenticationService.activeAuthority$;
  logo = toSignal(this.whiteLabelingService.logo$)

  constructor(private authenticationService: AuthenticationService, private router: Router, private whiteLabelingService: WhiteLabelingService, private permissions: PermissionsService, private featureRegistry: FeatureRegistry) {
  }

  goToSettings() {
    this.router.navigate([ROUTE_SETTINGS])
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate([ROUTE_SIGN_IN])
  }

  selectAuthority(authority: Authority) {
    this.authenticationService.selectAuthority(authority);

    combineLatest([this.authenticationService.activeAuthority$, this.featureRegistry.features$]).pipe(
      filter(([activeAuthority]) => !!activeAuthority),
      take(1)
    ).subscribe(([activeAuthority, features]) => {
      const featuresWithPermissions = features.map((feature) => {
        return {
          ...feature,
          hasPermission: !feature.permission || this.permissions.hasAnyPermissionSync(activeAuthority.permissions, Array.isArray(feature.permission) ? feature.permission : [feature.permission])
        }
      })
      const activeFeature = featuresWithPermissions.find((feature) => this.router.url.includes(feature.entryRoute));
      const firstAvailableFeature = featuresWithPermissions.find((feature) => feature.hasPermission);

      const splitRouterRoute = this.router.url.split('?')[0].split(('/')).filter((part) => !!part);
      const tab = splitRouterRoute[1];

      const route = activeFeature?.hasPermission ?
        tab ? [activeFeature.entryRoute, tab] : [activeFeature.entryRoute] :
        [firstAvailableFeature?.entryRoute ?? ROUTE_NO_PERMISSIONS];

      this.router.navigate([ROUTE_SWITCHING_TENANTS])
        .then(() => {
          this.router.navigate(route);
        })
    })
  }
}

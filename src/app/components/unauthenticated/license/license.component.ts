import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from "../../../common/service/api.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, filter, from, map, of, switchMap, take } from "rxjs";
import { ROUTE_SIGN_IN } from "../sign-in/sign-in.component";
import { PlatformInfoService } from "../../../common/service/platform-info.service";
import { NotificationService, SharedModule} from "@wolkabout/commons";
export const ROUTE_LICENSE = 'license';

@Component({
  selector: 'app-license',
  imports: [
    SharedModule
  ],
  templateUrl: './license.component.html',
  styleUrl: './license.component.scss'
})
export class LicenseComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService, private router: Router, private platformInfo: PlatformInfoService, private notificationService: NotificationService) {
    this.platformInfo.getPlatformInfo().pipe(
      takeUntilDestroyed(),
      filter((platformInfo) => !!platformInfo?.licence)
    ).subscribe(() => this.router.navigate([ROUTE_SIGN_IN]))
  }

  onFilePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const file = input.files[0];

    if (!file) {
      return;
    }

    this.fileUpload.nativeElement.value = '';

    of(file).pipe(
      take(1),
      switchMap((file) => from(file.text())),
      switchMap((licenseString) => this.apiService.licence.setInitial(licenseString).pipe(
        map((res) => res.data),
        catchError((error) => this.notificationService.showError('UNAUTHENTICATED.ERROR_' + error.message))
      ))
    ).subscribe((license) => {
      if (license) {
        this.platformInfo.fetchPlatformInfo();
        this.notificationService.showSuccess('UNAUTHENTICATED.LICENSE_UPLOAD_SUCCESS');
      }
    })
  }
}

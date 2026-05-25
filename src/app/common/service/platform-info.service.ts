import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { BehaviorSubject, catchError, filter, map, of } from "rxjs";
import { PlatformDetails } from "../../rest/settings/info.model";

@Injectable({providedIn: "root"})
export class PlatformInfoService {

  private readonly _platformInfo$ = new BehaviorSubject<PlatformDetails | null | undefined>(undefined);
  private readonly _2faEnforced = new BehaviorSubject<boolean | null | undefined>(undefined);

  constructor(private apiService: ApiService) {
    this.fetchPlatformInfo();
  }

  fetchPlatformInfo() {
    this.apiService.infoApi.getPlatformDetails().pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    ).subscribe((platformInfo) => this._platformInfo$.next(platformInfo))

    this.apiService.infoApi.is2faEnforced().pipe(
      map((res) => res.data),
      catchError((error) => of(null))
    ).subscribe((is2faEnforced) => this._2faEnforced.next(is2faEnforced));
  }

  getPlatformInfo() {
    return this._platformInfo$.pipe(
      filter((platformInfo) => platformInfo !== undefined)
    );
  }

  set2faEnforced(is2faEnforced: boolean) {
    this._2faEnforced.next(is2faEnforced);
  }

  is2faEnforced() {
    return this._2faEnforced.pipe(
      filter((is2faEnforced) => is2faEnforced !== undefined)
    );
  }
}

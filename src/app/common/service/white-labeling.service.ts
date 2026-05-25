import { Inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { WHITE_LABELING_CONFIG_PARAMS, WhiteLabelingConfig, WhiteLabelingConfigParams } from "../model/white-labeling.config";
import { catchError, combineLatestWith, filter, map, of, shareReplay, Subject, switchMap, take } from "rxjs";
import { startWith } from "rxjs/operators";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthenticationService, DEFAULT_LOCALE, DEFAULT_TIME_ZONE, LOCALES, MapsLoaderService, TenantPropertiesService, ThemeService } from "@wolkabout/commons";

@Injectable({providedIn: 'root'})
export class WhiteLabelingService {
  readonly tenantURL: string;
  private refresh$ = new Subject<void>();

  private appIcon: HTMLLinkElement | null = document.querySelector('[rel="icon"]');
  private appTitle: HTMLTitleElement | null = document.querySelector('title');

  readonly whiteLabeling$ = this.refresh$.pipe(
    takeUntilDestroyed(),
    startWith(undefined),
    combineLatestWith(this.auth.unfilteredActiveAuthority$),
    filter(() => !!this.tenantURL),
    switchMap(([, authenticated]) => {
      return (authenticated ? this.apiService.whiteLabelingApi.getWhiteLabeling() : this.apiService.whiteLabelingInfoApi.getWhiteLabeling(this.tenantURL)).pipe(
        map((res) => res.data ? new WhiteLabelingConfig(this.whiteLabelingConfigParams, res.data) : null),
        catchError(() => {
          return of(null)
        })
      )
    }),
    shareReplay(1)
  );

  private logoLight$ = this.refresh$.pipe(
    takeUntilDestroyed(),
    startWith(undefined),
    combineLatestWith(this.auth.unfilteredActiveAuthority$),
    filter(() => !!this.tenantURL),
    switchMap(([, authenticated]) => {
      return (authenticated ? this.apiService.whiteLabelingApi.getLogo() : this.apiService.whiteLabelingInfoApi.getLogo(this.tenantURL)).pipe(
        map((res) => {
          if (res.data) {
            const blob = new Blob([res.data], {type: 'image/svg+xml'});
            return URL.createObjectURL(blob);
          } else {
            return '/assets/images/logo.svg';
          }
        }),
        catchError(() => {
          return of('/assets/images/logo.svg')
        })
      )
    }),
    shareReplay(1)
  );

  private logoDark$ = this.refresh$.pipe(
    takeUntilDestroyed(),
    startWith(undefined),
    combineLatestWith(this.auth.unfilteredActiveAuthority$),
    filter(() => !!this.tenantURL),
    switchMap(([, authenticated]) => {
      return (authenticated ? this.apiService.whiteLabelingApi.getDarkLogo() : this.apiService.whiteLabelingInfoApi.getDarkLogo(this.tenantURL)).pipe(
        map((res) => {
          if (res.data) {
            const blob = new Blob([res.data], {type: 'image/svg+xml'});
            return URL.createObjectURL(blob);
          } else {
            return '/assets/images/logo_dark.svg';
          }
        }),
        catchError(() => {
          return of('/assets/images/logo_dark.svg')
        })
      )
    }),
    shareReplay(1)
  );

  readonly signInImage$ = this.refresh$.pipe(
    takeUntilDestroyed(),
    startWith(undefined),
    combineLatestWith(this.auth.unfilteredActiveAuthority$),
    filter(() => !!this.tenantURL),
    switchMap(([, authenticated]) => {
      return (authenticated ? this.apiService.whiteLabelingApi.getSignInImage() : this.apiService.whiteLabelingInfoApi.getSignInImage(this.tenantURL)).pipe(
        map((res) => {
          if (res.data) {
            const blob = new Blob([res.data]);
            return URL.createObjectURL(blob);
          } else {
            return '';
          }
        }),
        catchError(() => {
          return of('')
        })
      )
    }),
    shareReplay(1)
  );

  readonly logo$ = this.themeService.isDarkTheme$.pipe(
    combineLatestWith(this.logoLight$, this.logoDark$),
    map(([isDark, logo, logoDark]) => !!isDark ? logoDark : logo)
  );

  constructor(private apiService: ApiService, @Inject(WHITE_LABELING_CONFIG_PARAMS) private whiteLabelingConfigParams: WhiteLabelingConfigParams, private auth: AuthenticationService, private themeService: ThemeService, private mapLoader: MapsLoaderService, private tenantService: TenantPropertiesService) {
    const splitUrl = this.whiteLabelingConfigParams.baseUrl.split('//')?.[1];
    this.tenantURL = splitUrl.replace('www.', '');

    this.getFavicon();
    this.setAppTitle();

    this.whiteLabeling$.pipe(
      takeUntilDestroyed(),
    ).subscribe((whiteLabeling) => {
      if (whiteLabeling) {
        this.mapLoader.apiKey$.next(whiteLabeling.googleMapsApiKey);
      }
    })

    this.apiService.myTenantApi.get().pipe(
      map((response) => response.data),
      take(1)
    ).subscribe((tenantDto) => {
      this.tenantService.setTimeZone(tenantDto?.properties.defaultTimeZone ?? DEFAULT_TIME_ZONE)

      const tenantLocale = tenantDto?.properties?.defaultContextLocale?.split("_");
      const locale = !tenantLocale ? DEFAULT_LOCALE : LOCALES.find((locale) => locale.language === tenantLocale[0] && locale.country === tenantLocale[1]) ?? DEFAULT_LOCALE
      this.tenantService.setLocale(locale);
    })
  }

  fetchWhiteLabelingData() {
    this.refresh$.next();
  }

  private getFavicon() {
    this.refresh$.pipe(
      takeUntilDestroyed(),
      startWith(undefined),
      combineLatestWith(this.auth.unfilteredActiveAuthority$),
      filter(() => !!this.tenantURL),
      switchMap(([, authenticated]) => {
        return (authenticated ? this.apiService.whiteLabelingApi.getFavicon() : this.apiService.whiteLabelingInfoApi.getFavicon(this.tenantURL)).pipe(
          map((res) => {
            if (res.data) {
              const blob = new Blob([res.data]);
              return URL.createObjectURL(blob);
            } else {
              return '/assets/images/favicon.ico';
            }
          }),
          catchError(() => {
            return of('/assets/images/favicon.ico')
          })
        )
      }),
      shareReplay(1)
    ).subscribe((favicon) => {
      if (favicon && this.appIcon) {
        this.appIcon.setAttribute('href', favicon as string);
      }
    });
  }

  private setAppTitle() {
    this.whiteLabeling$.pipe(
      takeUntilDestroyed()
    ).subscribe((whiteLabeling) => {
      if (whiteLabeling?.favTitle && this.appTitle) this.appTitle.innerText = whiteLabeling.favTitle;
    })
  }
}

import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { default as packageJson } from "../../package.json";
import { ModuleTranslateLoader } from "@larscom/ngx-translate-module-loader";
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ApiClientService } from "./rest/api-client.service";
import { ApiClient } from "./rest/api-client";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";
import { MAT_CARD_CONFIG } from "@angular/material/card";
import { DecimalPipe } from "@angular/common";
import { authenticationInterceptor } from "./rest/authentication.interceptor";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MissingTranslationHelper } from "./common/util/missing-translation-helper";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { provideEchartsCore } from "ngx-echarts";
import * as echarts from 'echarts';
import { WHITE_LABELING_CONFIG_PARAMS, WhiteLabelingConfigParams } from "./common/model/white-labeling.config";
import { ConfigService } from "./common/service/config.service";
import { ApiService } from "./common/service/api.service";
import { AUTHENTICATION_CLIENT, FeatureRegistry, TenantPropertiesService, ThemeService } from "@wolkabout/commons";
import FEATURE_HELLO from "./components/main-shell/features/hello/hello.feature";
import { environment } from "../bootstrap";
import { AuthenticationClientService } from "./rest/authentication-client.service";
import { HelloIconRegistry } from "./common/service/hello-icon-registry.service";
import { LogLevel, OpenIdConfiguration, provideAuth, StsConfigHttpLoader, StsConfigLoader } from "angular-auth-oidc-client";
import { OpenIdProvider } from "./rest/openid/openid-provider.model";
import { map } from "rxjs";

export function HttpLoaderFactory(http: HttpClient) {
  const translationFiles: string[] = [
    'common',
    'settings',
    'unauthenticated',
    'hello',
  ];

  return new ModuleTranslateLoader(http, {
    modules: translationFiles.map((fileName) => ({
      baseTranslateUrl: './assets/i18n',
      moduleName: fileName.toLocaleLowerCase(),
      namespace: fileName.toLocaleUpperCase(),
      pathTemplate: `{baseTranslateUrl}/{language}/{moduleName}`,
    })),
    version: packageJson.version,
    deepMerge: true,
  });
}

function whiteLabelingConfigFactory(): WhiteLabelingConfigParams {
  const {config} = environment;

  const {
    googleMapsApiKey,
    googleMapId
  } = (config as any)?.whiteLabeling ?? {};

  const baseUrl = config?.rest?.baseUrl ?? window.location.origin;

  return {
    baseUrl,
    googleMapsApiKey,
    googleMapId,
  };
}

export const oidcLoaderFactory = (apiService: ApiService): StsConfigLoader => {
  const config$ = apiService.openIdProviderApi.list().pipe(
    map((response) => response.data ?? []),
    map((providers: OpenIdProvider[]) => {
      return providers.map((provider: OpenIdProvider) => {
        return {
          configId: provider.uuid,
          authority: provider.issuer,
          redirectUrl: window.location.origin,
          clientId: provider.clientId,
          responseType: 'code',
          useRefreshToken: true,
          scope: provider.scope,
          postLogoutRedirectUri: window.location.origin,
          silentRenew: false,
          logLevel: LogLevel.None,
          historyCleanupOff: true,
          triggerAuthorizationResultEvent: true,
        } as OpenIdConfiguration;
      })
    })
  );

  return new StsConfigHttpLoader(config$);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideLuxonDateAdapter(),
    provideEchartsCore({echarts}),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: AUTHENTICATION_CLIENT,
      useClass: AuthenticationClientService
    },
    {
      provide: MissingTranslationHandler,
      useClass: MissingTranslationHelper,
    },
    {
      provide: WHITE_LABELING_CONFIG_PARAMS,
      useFactory: whiteLabelingConfigFactory
    },
    ConfigService,
    {
      provide: ApiClient,
      useClass: ApiClientService,
      deps: [HttpClient, ConfigService],
    },
    ApiService,
    HelloIconRegistry,
    provideAuth({
      loader: {
        provide: StsConfigLoader,
        useFactory: oidcLoaderFactory,
        deps: [ApiService],
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => inject(ConfigService).load();
      },
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        inject(ThemeService);
        inject(TenantPropertiesService);
        inject(HelloIconRegistry);

        const featureRegistry = inject(FeatureRegistry);
        featureRegistry.registerFeature(FEATURE_HELLO);
        featureRegistry.noExternalModules();
      },
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
        appearance: 'outline',
      },
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        showDelay: 700
      },
    },
    {
      provide: MAT_CARD_CONFIG,
      useValue: {
        appearance: 'outlined',
      },
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en',
    },
    DecimalPipe
  ],
};

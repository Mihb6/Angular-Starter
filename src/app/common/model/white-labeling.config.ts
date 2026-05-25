import { InjectionToken } from "@angular/core";
import { WhiteLabeling } from "../../rest/tenant-management/tenant-management.model";


export class WhiteLabelingConfig {
  baseUrl: string;
  mobileAppLinksVisible: boolean;
  connectMobileAppVisible: boolean;
  copyrightVisible: boolean;
  favTitle: string;
  androidAppUrl: string;
  iosAppUrl: string;
  termsOfServiceUrl: string;
  privacyPolicyUrl: string;
  gdprAgeConsentVisible: boolean;
  googleMapsApiKey: string;
  googleMapId: string;
  contextId?: number;

  constructor(whiteLabelingConfig: WhiteLabelingConfigParams, tenantWhiteLabeling: WhiteLabeling) {
    this.baseUrl = whiteLabelingConfig.baseUrl;
    this.mobileAppLinksVisible = tenantWhiteLabeling?.mobileAppLinksVisible;
    this.connectMobileAppVisible = tenantWhiteLabeling?.connectMobileAppVisible;
    this.copyrightVisible = tenantWhiteLabeling?.copyrightVisible;
    this.favTitle = tenantWhiteLabeling?.favTitle ?? '';
    this.androidAppUrl = tenantWhiteLabeling?.androidAppUrl ?? '';
    this.iosAppUrl = tenantWhiteLabeling?.iosAppUrl ?? '';
    this.termsOfServiceUrl = tenantWhiteLabeling?.termsOfServiceUrl ?? '';
    this.privacyPolicyUrl = tenantWhiteLabeling?.privacyPolicyUrl ?? '';
    this.gdprAgeConsentVisible = tenantWhiteLabeling?.gdprAgeConsentVisible;
    this.googleMapsApiKey = whiteLabelingConfig.googleMapsApiKey ?? tenantWhiteLabeling.googleMapsApiKey ?? '';
    this.googleMapId = whiteLabelingConfig.googleMapId ?? tenantWhiteLabeling.googleMapsMapId ?? '';
    this.contextId = tenantWhiteLabeling.contextId;
  }
}

export const WHITE_LABELING_CONFIG_PARAMS = new InjectionToken<WhiteLabelingConfigParams>(
  'WHITE_LABELING_CONFIG_PARAMS'
);

export interface WhiteLabelingConfigParams {
  baseUrl: string;
  googleMapsApiKey?: string;
  googleMapId?: string;
}

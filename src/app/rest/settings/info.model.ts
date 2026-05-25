import { DataType } from "../+common/data-type";

export interface PlatformVersion {
  codeVersion: string;
  displayVersion: string;
  gitRevision: string;
}

export interface ServerDetails {
  organization: string;
  expiration: number;
  version: string;
  minSupportedVersion: string;
  addOns: {
    supportNewsletter?: boolean;
  };
  modules: string[];
  gitHash: string;
  multipleContexts: boolean;
  selfRegistrationAllowed: boolean;
  userManagementEnabled: boolean;
  maxFileSize: string;
  defaultPlatformLocale: string;
  defaultTimeZone: string;
  feedValidity: number;
  maxUsersPerContext: number;
  maxDashboardsPerContext: number;
  maxReportsPerContext: number;
  maxDevicesPerContext: number;
  maxRulesPerContext: number;
  eventTypes: string[];
  originTypes: string[];
  protocols: Protocol[];
  supportEmail: string;
  enforce2FA: boolean;
}

export interface Protocol {
  name: string;
  attributeList: ProtocolAttribute[];
}

export interface ProtocolAttribute {
  name: string;
  type: DataType;
  defaultValue: string | null;
  system: boolean;
  readOnly: boolean;
  required: boolean;
  dependency: {
    parameterName: string;
    havingValue: string;
  } | null;
  maxSize: number | null;
  minSize: number | null;
  regex: string | RegExp | null;
  options: string[];
}

export interface PlatformDetails {
  licence: LicenceDetails
  software: SoftwareDetails
}

export interface LicenceDetails {
  licenceId: string;
  productId: string;
  validFrom: number;
  validTo: number;
  issuingDate: number;
  valid: boolean;
  daysTillExpiration: number;
  expiringSoon: boolean;
  type: string;
  modules: string[];
}

export interface SoftwareDetails {
  name: string;
  version: string;
}

export interface SelfRegistrationDetails {
  selfRegistration: boolean;
  eulaAccepted: boolean;
}

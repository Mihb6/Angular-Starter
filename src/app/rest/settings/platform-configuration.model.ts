export interface PlatformConfigurationDetails {
  selfRegisterEnabled: boolean;
  multiTenancy: boolean;
  limits: LimitDetails;
  feedValidity: number;
  defaultRole: string;
  enforce2FA: boolean;
  defaultPlatformLocale: string;
  defaultTimeZone: string;
}

export interface PlatformConfigurationUpdateDetails {
  selfRegisterEnabled: boolean;
  multiTenancy: boolean;
  limits: LimitDetails;
  feedValidity: number;
  defaultRole: string;
  enforce2FA: boolean;
  password: string;
}

export  interface LimitDetails {
  maxUsersPerTenant: number;
  maxDevicesPerTenant: number;
  maxReportsPerTenant: number;
  maxDashboardsPerTenant: number;
  maxRulesPerTenant: number;
}

export interface LocalizationUpdateDetails {
  defaultPlatformLocale: string;
  defaultTimeZone: string;
}

export interface RegistrationUpdateDetails {
  selfRegistration: boolean;
  password: string;
}

export interface Enforce2FAUpdateDetails {
  enforce2FA: boolean;
  password: string;
}

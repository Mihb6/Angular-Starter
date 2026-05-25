import { GlobalRole } from "../roles/global-role.model";

export interface TenantDto {
  tenant: TenantInfoDto;
  owner: TenantOwnerDto;
  properties: TenantPropertiesDto;
  id: number;
}

export interface TenantInfoDto {
  id: number;
  name: string;
  active: boolean;
  main: boolean;
}

export interface TenantOwnerDto {
  email: string;
  firstName?: string;
  lastName?: string;
  verified: boolean;
  locale: string;
}

export interface TenantPropertiesDto {
  maxUsers: number;
  maxDevices: number;
  maxReports: number;
  maxDashboards: number;
  maxRules: number;
  defaultRole: GlobalRole;
  defaultContextLocale: string;
  defaultTimeZone: string;
  url?: string;
}

export interface LocalizationDto {
  defaultPlatformLocale: string;
  defaultTimeZone: string;
}

export interface TenantUpdateDto {
  name: string;
  properties: TenantPropertiesDto;
  password: string;
}

export interface UpdateTenantPropertiesDto {
  maxUsers: number | null;
  maxDevices: number | null;
  maxReports: number | null;
  maxDashboards: number | null;
  maxRules: number | null;
  defaultRole: GlobalRole;
  defaultContextLocale: string;
  defaultTimeZone: string;
  url?: string;
}

export interface TenantTransferOwnershipDto {
  email: string;
  password: string;
  roleId: number | null;
}

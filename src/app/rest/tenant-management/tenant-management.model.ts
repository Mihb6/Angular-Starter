import { PermissionTree } from "../+common/permissions";
import { PageParameters } from "../rest.model";

export interface TenantManagementUpdateStatusQueryParameters {
  active: boolean;
}

export interface TenantManagementDeleteTenantQueryParameters {
  ids: number;
}

export interface TenantUpdateDto {
  name: string;
  properties: TenantPropertiesDto;
  password: string;
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

export interface GlobalRole {
  id: number;
  guid: string;
  name: string;
  description?: string;
  type: RoleType;
  inUse: boolean;
  permissionTree: PermissionTree;
}

export enum RoleType {
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export interface GlobalPermission {
  id: number;
  module: string;
  feature: string;
  permission: string;
  permissionString: string;
}

export interface TenantTransferOwnershipDto {
  email: string;
  password: string;
  roleId: number | null;
}

export interface TenantManagementUpdateStatusQueryParameters {
  active: boolean;
}

export interface TenantManagementRolesByContextQueryParameters {
  query: string;
}

export interface TenantManagementRolesByContextQueryParameters {
  query: string;
}

export interface TenantManagementRolesByContextFilter extends TenantManagementRolesByContextQueryParameters, PageParameters {
}

export interface WhiteLabeling {
  contextId: number;
  mobileAppLinksVisible: boolean;
  connectMobileAppVisible: boolean;
  copyrightVisible: boolean;
  gdprAgeConsentVisible: boolean;
  favTitle: string | null;
  androidAppUrl: string | null;
  iosAppUrl: string | null;
  termsOfServiceUrl: string | null;
  privacyPolicyUrl: string | null;
  googleMapsApiKey: string | null;
  googleMapsMapId: string | null;
  googleMapsLibraries: string | null;
  assetFolder: string | null;
}

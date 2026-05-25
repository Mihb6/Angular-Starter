import { PermissionTree } from "../+common/permissions";

export interface AssetRoleQueryParameters {
  query: string;
}

export interface AssetRole {
  id: number;
  guid: string;
  name: string;
  description: string;
  roleType: RoleType;
  inUse: boolean;
  permissionTree: PermissionTree;
  permissionList: AssetPermission;
}

export enum RoleType {
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export interface AssetPermission {
  id: number;
  module: string;
  feature: string;
  permission: string;
  permissionString: string;
}

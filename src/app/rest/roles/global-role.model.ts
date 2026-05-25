import { PermissionTree } from "../+common/permissions";

export interface GlobalRoleQueryParameters {
  query: string;
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

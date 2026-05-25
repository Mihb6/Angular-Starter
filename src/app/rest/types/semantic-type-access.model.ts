import { AssetRole } from "../roles/asset-role-model";
import { UserGroup } from "../user-group/user-group.model";
import { EventOrigin } from "../+common/event";

export interface SemanticTypeAccess {
  id: number;
  userGroup: UserGroup;
  semanticType: EventOrigin;
  role: AssetRole;
}

export interface AccessCreationDto {
  userGroupId: string;
  roleId: string;
}

export interface AssetAccessDetails {
  userGroup: UserGroup,
  accesses: number[]
}

export interface AssetPermissionDetails {
  module: string;
  feature: string;
  permission: string;
}

export interface AssetAccessPermissionDetails {
  accessId: number | null;
  assetName: string | null;
  assetId: string | null;
  roleName: string;
  roleId: string;
  permissions: AssetPermissionDetails[];
}

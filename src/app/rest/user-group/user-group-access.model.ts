import { EventOrigin } from "../+common/event";
import { AssetRole, RoleType } from "../roles/asset-role-model";
import { AssetPermissionDetails } from "../data/semantic-access.model";
import { UserGroupType } from "./user-group.model";

export interface UserGroupAccessQueryParameters {
  assetId?: string;
  query?: string;
  roleId?: string;
  userGroupId?: string;
}

export interface ListAccessesQueryParameters {
  assetType: string;
  userGroupGuid: string;
}

export interface ListAccessesForAssetQueryParameters {
  assetType: string;
  assetGuid: string;
}

export interface UserGroupAccess {
  id: number;
  userGroup: UserGroup;
  asset: EventOrigin;
  role: AssetRole;
}

export interface UserGroup {
  guid: string;
  name: string;
  type: UserGroupType;
}

export interface RevokeAccessBulkQueryParameters {
  accessIds: number[];
}

export interface Asset {
  guid: string;
  name: string;
  type: string;
  path: string[];
  guidPath?: string[];
  subTypeName?: string;
  subTypeGuid?: string;
}

export interface AssetAccessRole {
  guid: string;
  name: string;
  roleType: RoleType;
}

export interface AssetAccess {
  asset: Asset;
  assetRole: AssetAccessRole;
  permissions: AssetPermissionDetails[];
}

export interface UserGroupAssetAccess {
  userGroup: UserGroup,
  accesses: AssetAccess[]
}

export interface GrantRevokeAccessQueryParams {
  assetType: string;
  assetGuid: string;
  userGroupGuid: string;
  assetRoleGuid: string;
}

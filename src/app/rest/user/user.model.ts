import { GlobalRole } from "../roles/global-role.model";
import { UserGroup } from "../user-group/user-group.model";

export interface ListUsersQueryParameters {
  active?: boolean;
  groupIds?: string;
  query?: string;
  roleIds?: string;
  verified?: boolean;
}

export interface UserWithRoles {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  verified: boolean;
  active: boolean;
  roles: UserWithRolesRole[];
}

export interface UserWithRolesRole {
  id: number;
  name: string;
  type: RoleType;
}

export interface UserWithRole {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  active: boolean;
  roleName: string;
  roleType: RoleType;
}

export enum RoleType {
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export interface UserBulkDeleteQueryParameters {
  ids: string[];
  newCreatorId: string | null;
}

export interface SignUpByEmailRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  language: string;
  newsletterSubscription: boolean;
  acceptedEula: boolean;
}

export interface AddUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  groups: string[];
  additionalIdentifiers: string[]
}

export interface UserInviteUserBulkQueryParameters {
  language: string;
}

export interface InviteResponseDto {
  email: string;
  result: InviteResponseDtoInviteResult;
  errorDescription: string;
  ok: boolean;
}

export interface InviteCsvResponseDto {
  email: string;
  roleNames: string[];
  role: GlobalRole[];
  groupNames: string[];
  groups: UserGroup[];
  userValid: boolean;
  groupsValid: boolean;
  formatValid: boolean;
  errorDescription: string;
  invalid: boolean;
}

export enum InviteResponseDtoInviteResult {
  IN_USE = 'IN_USE',
  CONFLICT = 'CONFLICT',
  SENT = 'SENT',
  FAIL = 'FAIL'
}

export interface InviteDto {
  email: string;
  roleIds: string[];
  groupIds: string[];
}

export interface UserDisableUsersBulkQueryParameters {
  ids: string[];
}

export interface TransferAssetsQueryParameters {
  ids: string[];
  newCreatorId?: string;
}

export interface RemoveUserFromGroupsQueryParameters {
  groupIds: string[];
}

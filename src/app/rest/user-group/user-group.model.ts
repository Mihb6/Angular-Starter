export interface UserGroupQueryParameters {
  query?: string;
  systemManaged?: boolean;
}

export enum UserGroupType {
  ROLE = 'ROLE',
  CUSTOM = 'CUSTOM',
  PERSONAL = 'PERSONAL',
}

export interface UserGroup {
  id: number;
  name: string;
  guid: string;
  displayName: string;
  description?: string;
  systemManaged: boolean;
  defaultGroupName: string;
  defaultGroupDisplayName: string;
  type: UserGroupType
}

export interface BulkUserGroup {
  groupIds: string[];
  userIds: string[];
}

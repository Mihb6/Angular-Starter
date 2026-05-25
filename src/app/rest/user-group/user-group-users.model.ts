export interface UserGroupUsersUsersQueryParameters {
  active: boolean;
  query: string;
  roleIds: string;
  verified: boolean;
}

export interface Authority {
  id: number;
  user: User;
  context: Context;
  active: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
}

export interface Context {
  id: number;
  name: string;
  active: boolean;
  main: boolean;
}

export interface UserUserGroupsQueryParameters {
  query?: string;
  systemManaged?: boolean;
}

export interface UserGroup {
  id: number;
  name: string;
  guid: string;
  displayName: string;
  description: string;
  systemManaged: boolean;
  defaultGroupName: string;
  defaultGroupDisplayName: string;
}

export interface UserGroupUsersRemoveUsersQueryParameters {
  userIds: string[];
}

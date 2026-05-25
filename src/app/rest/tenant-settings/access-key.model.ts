export interface AccessTokenQueryParameters {
  query: string;
  status: AccessTokenStatus;
  suspended: boolean;
}

export interface AccessToken {
  id: number;
  name: string;
  expirationDate: number;
  suspended: boolean;
  token: string;
  status: AccessTokenStatus;
}

export enum AccessTokenStatus {
  VALID = 'VALID',
  EXPIRED = 'EXPIRED'
}

export interface AccessTokenCreateQueryParameters {
  dataPublish?: boolean;
  permissions?: string;
}

export interface AccessTokenDetails {
  name: string;
  expirationDate: number;
}

export interface AccessTokenBulkQueryParameters {
  ids: number[];
}


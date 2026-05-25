export interface OpenIdProvider {
  uuid: string;
  issuer:string;
  publicKeyApi: string;
  identifierClaim: string | null;
  scope: string;
  clientId: string;
}

export interface OpenIdProviderDetails {
  issuer:string;
  publicKeyApi: string;
  identifierClaim: string | null;
  scope: string;
  clientId: string;
}

export interface OpenIdProvidersBulkDeleteParameters {
  uuids: string[];
}

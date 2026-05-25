import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import {
  AssetAccess,
  GrantRevokeAccessQueryParams,
  ListAccessesForAssetQueryParameters,
  ListAccessesQueryParameters,
  RevokeAccessBulkQueryParameters,
  UserGroupAccess,
  UserGroupAccessQueryParameters,
  UserGroupAssetAccess
} from "./user-group-access.model";

export class UserGroupAccessApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  listSemanticAccesses(params?: UserGroupAccessQueryParameters): Observable<ApiResponse<UserGroupAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroupAccess[]>(`/api/semantics/accesses`, config);
  }

  listTypeAccesses(params?: UserGroupAccessQueryParameters): Observable<ApiResponse<UserGroupAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroupAccess[]>(`/api/semanticTypes/accesses`, config);
  }

  listDeviceGroupAccesses(params?: UserGroupAccessQueryParameters): Observable<ApiResponse<UserGroupAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroupAccess[]>(`/api/deviceGroups/accesses`, config);
  }

  revokeSemanticAccesses(params?: RevokeAccessBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semantics/accesses`, config);
  }

  revokeTypeAccesses(params?: RevokeAccessBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/accesses`, config);
  }

  revokeDeviceGroupAccesses(params?: RevokeAccessBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/deviceGroups/accesses`, config);
  }

  list(params: ListAccessesQueryParameters): Observable<ApiResponse<AssetAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<AssetAccess[]>(`/api/accesses`, config);
  }

  listForAsset(params: ListAccessesForAssetQueryParameters): Observable<ApiResponse<UserGroupAssetAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroupAssetAccess[]>(`/api/accesses`, config);
  }

  grantAccess(params: GrantRevokeAccessQueryParams): Observable<ApiResponse<AssetAccess>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.post<void, AssetAccess>(`/api/accesses`, undefined, config);
  }

  revokeAccess(params: GrantRevokeAccessQueryParams): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/accesses`, config);
  }
}

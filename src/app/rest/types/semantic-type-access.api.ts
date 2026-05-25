import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { UserWithRole } from "../user/user.model";
import { AccessCreationDto, AssetAccessDetails, AssetAccessPermissionDetails, SemanticTypeAccess } from "./semantic-type-access.model";

export class SemanticTypeAccessApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  listGlobalAccesses(guid: string): Observable<ApiResponse<UserWithRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<UserWithRole[]>(`/api/semanticTypes/${guid}/accesses/globals`, config);
  }

  listAssetAccessesForSemanticType(guid: string): Observable<ApiResponse<SemanticTypeAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeAccess[]>(`/api/semanticTypes/${guid}/accesses`, config);
  }

  // TODO: remove when backend allows it
  listAssetAccessesForDeviceType(guid: string): Observable<ApiResponse<SemanticTypeAccess[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeAccess[]>(`/api/deviceTypes/${guid}/accesses`, config);
  }

  grantAccess(guid: string, body: AccessCreationDto): Observable<ApiResponse<AssetAccessDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<AccessCreationDto, AssetAccessDetails>(`/api/semanticTypes/${guid}/accesses`, body, config);
  }

  // TODO: change access ID to a combination of userGroup.guid and role.guid
  revokeAccessToSemanticType(guid: string, accessId: number): Observable<ApiResponse<AssetAccessDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<AssetAccessDetails>(`/api/semanticTypes/${guid}/accesses/${accessId}`, config);
  }

  // TODO Remove this function when backend allows it
  revokeAccessToDeviceType(guid: string, accessId: number): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/deviceTypes/${guid}/accesses/${accessId}`, config);
  }

  listAccesses(typeGuid: string): Observable<ApiResponse<AssetAccessDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.userGroups+json'
      },
      authenticated: true
    };

    return this.apiClient.get<AssetAccessDetails[]>(`/api/semanticTypes/${typeGuid}/accesses`, config);
  }

  listPermissionsForAccesses(typeGuid: string, accessIds: number[]): Observable<ApiResponse<AssetAccessPermissionDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: { accessIds },
      authenticated: true
    };

    return this.apiClient.get<AssetAccessPermissionDetails[]>(`/api/semanticTypes/${typeGuid}/accesses/permissions`, config);
  }

  read(typeGuid: string, accessId: number): Observable<ApiResponse<SemanticTypeAccess>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeAccess>(`/api/semanticTypes/${typeGuid}/accesses/${accessId}`, config);
  }
}

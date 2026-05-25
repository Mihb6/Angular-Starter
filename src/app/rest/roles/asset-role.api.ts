import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { AssetRole, AssetRoleQueryParameters } from "./asset-role-model";
import { PermissionTree } from "../+common/permissions";

export class AssetRoleApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(params?: AssetRoleQueryParameters): Observable<ApiResponse<AssetRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<AssetRole[]>(`/api/assetRoles`, config);
  }

  listPermissions(roleGuid: string): Observable<ApiResponse<PermissionTree>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<PermissionTree>(`/api/assetRoles/${roleGuid}/permissions`, config);
  }

  getRole(roleGuid: string): Observable<ApiResponse<AssetRole>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<AssetRole>(`/api/assetRoles/${roleGuid}`, config);
  }

  createRole(body: AssetRole): Observable<ApiResponse<AssetRole>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<AssetRole, AssetRole>(`/api/assetRoles`, body, config);
  }

  updateRole(roleGuid: string, body: AssetRole): Observable<ApiResponse<AssetRole>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<AssetRole, AssetRole>(`/api/assetRoles/${roleGuid}`, body, config);
  }

  getInitialTree(): Observable<ApiResponse<PermissionTree>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<PermissionTree>(`/api/assetRoles/initialTree`, config);
  }

  deleteRole(roleGuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/assetRoles/${roleGuid}`, config);
  }

  exportToJSON(roleIds: string[]): Observable<ApiResponse<AssetRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        guids: roleIds.join(',')
      },
      authenticated: true
    };

    return this.apiClient.get<AssetRole[]>(`/api/assetRoles/export`, config);
  }

  importFromJson(file: File): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      authenticated: true
    };

    const parts: MultiPart[] = [{name: 'file', content: file}];

    return this.apiClient.postMultipart<MultiPart[], void>(`/api/assetRoles/import`, parts, config);
  }
}

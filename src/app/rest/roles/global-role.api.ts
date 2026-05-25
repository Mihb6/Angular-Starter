import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { GlobalRole, GlobalRoleQueryParameters } from "./global-role.model";
import { PermissionTree } from "../+common/permissions";

export class GlobalRoleApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(params?: GlobalRoleQueryParameters): Observable<ApiResponse<GlobalRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<GlobalRole[]>(`/api/globalRoles`, config);
  }

  listPermissions(roleGuid: string): Observable<ApiResponse<PermissionTree>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<PermissionTree>(`/api/globalRoles/${roleGuid}/permissions`, config);
  }

  update(roleGuid: string, body: GlobalRole): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<GlobalRole, number>(`/api/globalRoles/${roleGuid}`, body, config);
  }

  createRole(body: GlobalRole): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<GlobalRole, number>(`/api/globalRoles`, body, config);
  }

  getRole(roleGuid: string): Observable<ApiResponse<GlobalRole>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<GlobalRole>(`/api/globalRoles/${roleGuid}`, config);
  }

  getInitialTree(): Observable<ApiResponse<PermissionTree>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<PermissionTree>(`/api/globalRoles/initialTree`, config);
  }

  deleteRole(roleGuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/globalRoles/${roleGuid}`, config);
  }

  exportToJSON(roleIds: number[]): Observable<ApiResponse<GlobalRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        ids: roleIds.join(',')
      },
      authenticated: true
    };

    return this.apiClient.get<GlobalRole[]>(`/api/globalRoles/export`, config);
  }

  importFromJson(file: File): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      authenticated: true
    };

    const parts: MultiPart[] = [{name: 'file', content: file}];

    return this.apiClient.postMultipart<MultiPart[], void>(`/api/globalRoles/import`, parts, config);
  }
}

import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { TenantDto } from "../tenant-settings/my-tenant.model";
import {
  GlobalRole,
  TenantManagementDeleteTenantQueryParameters,
  TenantManagementRolesByContextFilter,
  TenantManagementUpdateStatusQueryParameters,
  TenantTransferOwnershipDto,
  TenantUpdateDto,
  WhiteLabeling
} from "./tenant-management.model";

export class TenantManagementApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(): Observable<ApiResponse<TenantDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<TenantDto[]>(`/api/tenants`, config);
  }

  get(tenantId: number): Observable<ApiResponse<TenantDto>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<TenantDto>(`/api/tenants/${tenantId}`, config);
  }

  create(body: TenantDto): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<TenantDto, any>(`/api/tenants`, body, config)
  }

  delete(params: TenantManagementDeleteTenantQueryParameters, password: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.delete+json'
      },
      params,
      authenticated: true
    };

    // post request for delete?
    return this.apiClient.post<any, void>(`/api/tenants`, password, config)
  }

  update(id: number, body: TenantUpdateDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TenantUpdateDto, void>(`/api/tenants/${id}`, body, config);
  }

  changeOwner(id: number, body: TenantTransferOwnershipDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TenantTransferOwnershipDto, void>(`/api/tenants/${id}/owner`, body, config);
  }

  updateStatus(id: number, params: TenantManagementUpdateStatusQueryParameters, body: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.put<string, void>(`/api/tenants/${id}/status`, body, config);
  }

  pageRolesByContext(id: number, params?: TenantManagementRolesByContextFilter): Observable<ApiResponse<GlobalRole[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.page+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<GlobalRole[]>(`/api/tenants/${id}/roles`, config);
  }

  getWhiteLabeling(id: number): Observable<ApiResponse<WhiteLabeling>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<WhiteLabeling>(`/api/tenants/${id}/whiteLabeling`, config);
  }

  updateWhiteLabeling(id: number, body: any, files?: any): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [
      {
        name: 'files',
        content: files ? files : ""
      },
      {
        name: 'update',
        content: JSON.stringify(body)
      },
    ];

    return this.apiClient.postMultipart<MultiPart[], void>(`/api/tenants/${id}/whiteLabeling`, parts, config);
  }

  downloadTenantEmailTemplates(tenantId: number): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/tenants/${tenantId}/mailTemplates`, config);
  }

  uploadTenantEmailTemplates(tenantId: number, content: MultiPart): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(content);

    return this.apiClient.postMultipart(`/api/tenants/${tenantId}/mailTemplates`, parts, config);
  }

  getSignInImage(id: number): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/tenants/${id}/signInImage`, config);
  }

  uploadSignInImage(tenantId: number, content: MultiPart): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(content);

    return this.apiClient.postMultipart(`/api/tenants/${tenantId}/signInImage`, parts, config);
  }

  deleteSignInImage(tenantId: number): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/tenants/${tenantId}/signInImage`, config);
  }

  getLogoImage(id: number): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/tenants/${id}/logo`, config);
  }

  uploadLogoImage(tenantId: number, content: MultiPart): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(content);

    return this.apiClient.postMultipart(`/api/tenants/${tenantId}/logo`, parts, config);
  }

  deleteLogoImage(tenantId: number): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/tenants/${tenantId}/logo`, config);
  }

  getLogoDarkImage(id: number): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/tenants/${id}/logoDark`, config);
  }

  uploadLogoDarkImage(tenantId: number, content: MultiPart): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(content);

    return this.apiClient.postMultipart(`/api/tenants/${tenantId}/logoDark`, parts, config);
  }

  deleteLogoDarkImage(tenantId: number): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/tenants/${tenantId}/logoDark`, config);
  }

  getFaviconImage(id: number): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/tenants/${id}/favicon`, config);
  }

  uploadFaviconImage(tenantId: number, content: MultiPart): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(content);

    return this.apiClient.postMultipart(`/api/tenants/${tenantId}/favicon`, parts, config);
  }

  deleteFaviconImage(tenantId: number): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/tenants/${tenantId}/favicon`, config);
  }
}

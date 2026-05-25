import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { TenantVariable, TenantVariableBulkDeleteQueryParameters, TenantVariableDto } from "./tenant-variable.model";

export class TenantVariableApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(): Observable<ApiResponse<TenantVariable[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<TenantVariable[]>(`/api/tenants/myTenant/variables`, config);
  }

  create(body: TenantVariableDto): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<TenantVariableDto, number>(`/api/tenants/myTenant/variables`, body, config);
  }

  update(id: number, body: TenantVariableDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TenantVariableDto, void>(`/api/tenants/myTenant/variables/${id}`, body, config);
  }

  deleteMany(params: TenantVariableBulkDeleteQueryParameters, body: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.delete+json',
        contentType: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.post<string, void>(`/api/tenants/myTenant/variables`, body, config);
  }
}

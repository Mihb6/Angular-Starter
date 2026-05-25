import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { LocalizationDto, TenantDto, TenantTransferOwnershipDto, TenantUpdateDto, UpdateTenantPropertiesDto } from "./my-tenant.model";

export class MyTenantApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  get(): Observable<ApiResponse<TenantDto>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<TenantDto>(`/api/tenants/myTenant`, config);
  }

  update(body: TenantUpdateDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TenantUpdateDto, void>(`/api/tenants/myTenant`, body, config);
  }

  changeOwner(body: TenantTransferOwnershipDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TenantTransferOwnershipDto, void>(`/api/tenants/myTenant/owner`, body, config);
  }

  updateLocalization(body: LocalizationDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<LocalizationDto, void>(`/api/tenants/myTenant/localization`, body, config);
  }

  updateProperties(body: UpdateTenantPropertiesDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<UpdateTenantPropertiesDto, void>(`/api/tenants/myTenant/properties`, body, config);
  }
}

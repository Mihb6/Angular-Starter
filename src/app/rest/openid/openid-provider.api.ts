import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { OpenIdProvider, OpenIdProviderDetails, OpenIdProvidersBulkDeleteParameters } from "./openid-provider.model";

export class OpenidProviderApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(openIdProviderUuid: string): Observable<ApiResponse<OpenIdProvider>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<OpenIdProvider>(`/api/openIdProviders/${openIdProviderUuid}`, config);
  }

  list(): Observable<ApiResponse<OpenIdProvider[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      }
    };

    return this.apiClient.get<OpenIdProvider[]>(`/api/openIdProviders`, config);
  }

  create(body: OpenIdProviderDetails): Observable<ApiResponse<OpenIdProvider>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<OpenIdProviderDetails, OpenIdProvider>(`/api/openIdProviders`, body, config);
  }

  update(openIdProviderUuid: string, body: OpenIdProviderDetails): Observable<ApiResponse<OpenIdProvider>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<OpenIdProviderDetails, OpenIdProvider>(`/api/openIdProviders/${openIdProviderUuid}`, body, config);
  }

  delete(openIdProviderUuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/openIdProviders/${openIdProviderUuid}`, config);
  }

  bulkDelete(params: OpenIdProvidersBulkDeleteParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/openIdProviders`, config);
  }
}

import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { AccessToken, AccessTokenBulkQueryParameters, AccessTokenCreateQueryParameters, AccessTokenDetails, AccessTokenQueryParameters } from "./access-key.model";

export class AccessKeyApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(accessKeyId: number): Observable<ApiResponse<AccessToken>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<AccessToken>(`/api/accessTokens/${accessKeyId}`, config);
  }

  list(params?: AccessTokenQueryParameters): Observable<ApiResponse<AccessToken[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<AccessToken[]>(`/api/accessTokens`, config);
  }

  create(params: AccessTokenCreateQueryParameters, body: AccessTokenDetails): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.post<AccessTokenDetails, number>(`/api/accessTokens`, body, config);
  }

  updateStatus(params: AccessTokenBulkQueryParameters, body: boolean): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.put<boolean, void>(`/api/accessTokens`, body, config);
  }

  bulkDelete(params?: AccessTokenBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/accessTokens`, config);
  }
}

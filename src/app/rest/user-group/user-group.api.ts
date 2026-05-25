import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { BulkUserGroup, UserGroup, UserGroupQueryParameters } from "./user-group.model";

export class UserGroupApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  get(guid: string): Observable<ApiResponse<UserGroup>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<UserGroup>(`/api/userGroups/${guid}`, config);
  }

  list(params?: UserGroupQueryParameters): Observable<ApiResponse<UserGroup[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroup[]>(`/api/userGroups`, config);
  }

  create(body: UserGroup): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<UserGroup, number>(`/api/userGroups`, body, config);
  }

  update(guid: string, body: UserGroup): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<UserGroup, void>(`/api/userGroups/${guid}`, body, config);
  }

  delete(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/userGroups/${guid}`, config);
  }

  addUsersToGroups(body: BulkUserGroup): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.everything+json'
      },
      authenticated: true
    }

    return this.apiClient.post<BulkUserGroup, void>(`/api/userGroups`, body, config);
  }
}

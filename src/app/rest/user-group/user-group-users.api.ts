import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Authority, UserGroupUsersRemoveUsersQueryParameters, UserGroupUsersUsersQueryParameters, UserUserGroupsQueryParameters } from "./user-group-users.model";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { UserGroup } from "./user-group.model";

export class UserGroupUsersApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  listUsers(userGroupGuid: string, params?: UserGroupUsersUsersQueryParameters): Observable<ApiResponse<Authority[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Authority[]>(`/api/userGroups/${userGroupGuid}/users`, config);
  }

  listUserGroups(userGuid: string, params?: UserUserGroupsQueryParameters): Observable<ApiResponse<UserGroup[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<UserGroup[]>(`/api/users/${userGuid}/userGroups`, config);
  }

  addUser(groupGuid: string, userId: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<string, void>(`/api/userGroups/${groupGuid}/users`, userId, config);
  }

  addUsers(groupGuid: string, body: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.operation+json'
      },
      authenticated: true
    };

    return this.apiClient.post<string[], void>(`/api/userGroups/${groupGuid}/users`, body, config);
  }

  removeUser(groupGuid: string, userId: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/userGroups/${groupGuid}/users/${userId}`, config);
  }

  removeUsers(groupGuid: string, params?: UserGroupUsersRemoveUsersQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.bulk.operation+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/userGroups/${groupGuid}/users`, config);
  }
}

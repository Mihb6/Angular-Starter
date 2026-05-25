import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import {
  AddUserDetails,
  InviteCsvResponseDto,
  InviteDto,
  InviteResponseDto,
  ListUsersQueryParameters,
  RemoveUserFromGroupsQueryParameters,
  TransferAssetsQueryParameters,
  UserBulkDeleteQueryParameters,
  UserDisableUsersBulkQueryParameters,
  UserInviteUserBulkQueryParameters,
  UserWithRoles
} from "./user.model";

export class UserApi extends Api {

  constructor(apiClient: ApiClient) {
    super(apiClient);
  }

  /**
   * Returns a filtered list of users with their global roles. Filtering by several groups will return users that are in any group.
   */
  listUsers(params?: ListUsersQueryParameters): Observable<ApiResponse<UserWithRoles[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: params,
      authenticated: true
    };

    return this.apiClient.get<UserWithRoles[]>(`/api/users`, config);
  }

  addUser(body: AddUserDetails): Observable<ApiResponse<UserWithRoles>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<AddUserDetails, UserWithRoles>(`/api/users`, body, config);
  }

  inviteUserBulk(body: InviteDto[], params?: UserInviteUserBulkQueryParameters): Observable<ApiResponse<InviteResponseDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.operation+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.post<InviteDto[], InviteResponseDto[]>(`/api/users`, body, config);
  }

  inviteUserCsv(file: File): Observable<ApiResponse<InviteCsvResponseDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [{ name: 'file', content: file }];
    return this.apiClient.postMultipart<MultiPart[], InviteCsvResponseDto[]>('/api/users', parts, config);
  }

  csvInviteTemplate(): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getFile('{{host}}/api/users/csvInviteTemplate', config);
  }

  bulkDelete(params: UserBulkDeleteQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/users/removals`, config);
  }

  changeStatusBulk(body: boolean, params?: UserDisableUsersBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.operation+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.put<boolean, void>(`/api/users`, body, config);
  }

  transferAssets(body: string, params: TransferAssetsQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.put<string, void>(`/api/users/assets`, body, config);
  }

  removeUserFromGroups(userEmail: string, params: RemoveUserFromGroupsQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.bulk.operation+json'
      },
      params,
      authenticated: true
    }

    return this.apiClient.delete<void>(`/api/users/${userEmail}/userGroups`, config);
  }
}

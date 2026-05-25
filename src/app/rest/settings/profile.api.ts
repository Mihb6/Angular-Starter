import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { ChangePasswordRequest, UserUpdateDto } from "./profile.model";

export class ProfileApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  updateUserName(body: UserUpdateDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.noemail.v1+json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<UserUpdateDto, void>(`/api/users/me`, body, config);
  }

  changePassword(body: ChangePasswordRequest): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<ChangePasswordRequest, void>(`/api/users/me/passwordChange`, body, config);
  }
}

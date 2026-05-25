import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";

export class UserRoleApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  updateRoles(userGuid: string, roleGuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string[], void>(`/api/users/${userGuid}/role`, roleGuids, config);
  }
}

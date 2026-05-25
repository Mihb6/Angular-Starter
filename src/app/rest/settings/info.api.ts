import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { PlatformDetails, PlatformVersion, SelfRegistrationDetails, ServerDetails } from "./info.model";
import { Observable } from "rxjs";

export class InfoApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getPlatformVersion(): Observable<ApiResponse<PlatformVersion>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      }
    };

    return this.apiClient.get<PlatformVersion>(`/api/infos/version`, config);
  }

  getServerInfo(): Observable<ApiResponse<ServerDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      }
    };

    return this.apiClient.get<ServerDetails>(`/api/infos/server`, config);
  }

  getPlatformDetails(): Observable<ApiResponse<PlatformDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
    };

    return this.apiClient.get<PlatformDetails>(`/api/infos/platform`, config);
  }

  selfRegistration(): Observable<ApiResponse<SelfRegistrationDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
    }

    return this.apiClient.get<SelfRegistrationDetails>(`/api/infos/selfRegistrationEnabled`, config);
  }

  signupEnabled(): Observable<ApiResponse<boolean>> {
    return this.apiClient.get<boolean>(`/api/infos/signupEnabled`);
  }

  is2faEnforced(): Observable<ApiResponse<boolean>> {
    return this.apiClient.get<boolean>(`/api/infos/2faEnforced`);
  }
}

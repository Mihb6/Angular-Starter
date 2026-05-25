import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Enforce2FAUpdateDetails, LocalizationUpdateDetails, PlatformConfigurationDetails, PlatformConfigurationUpdateDetails, RegistrationUpdateDetails } from "./platform-configuration.model";

export class PlatformConfigurationApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getPlatformSettings(): Observable<ApiResponse<PlatformConfigurationDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<PlatformConfigurationDetails>(`/api/platformConfiguration`, config);
  }

  setPlatformSettings(body: PlatformConfigurationUpdateDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<PlatformConfigurationUpdateDetails, void>(`/api/platformConfiguration`, body, config);
  }

  setLocalization(body: LocalizationUpdateDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<LocalizationUpdateDetails, void>(`/api/platformConfiguration/localization`, body, config);
  }

  setSelfRegistration(body: RegistrationUpdateDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<RegistrationUpdateDetails, void>(`/api/platformConfiguration/selfRegistration`, body, config);
  }

  enforce2FA(body: Enforce2FAUpdateDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<Enforce2FAUpdateDetails, void>(`/api/platformConfiguration/enforce2FA`, body, config);
  }

  reloadCustomPermissions(): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<void, void>(`/api/platformConfiguration/customPermissionsSync`, undefined, config);
  }
}

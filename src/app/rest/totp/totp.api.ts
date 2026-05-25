import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { QrCode, TwoFactorAuthStatus } from "./totp.model";

export class TotpApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  verifySetup(qrCode: string, token: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
        otherHeaders: {
          "Authorization": "Bearer " + token
        }
      },
    };

    const body = {
      value: qrCode
    }

    return this.apiClient.put<Object, void>(`/api/totp/setupVerification`, body, config);
  }

  getTotpUrl(token: string): Observable<ApiResponse<QrCode>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
        otherHeaders: {
          "Authorization": "Bearer " + token
        }
      },
    };

    return this.apiClient.get<QrCode>(`/api/totp/url`,config);
  }

  getTotpUrlAuth(): Observable<ApiResponse<QrCode>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<QrCode>(`/api/totp/url`, config);
  }

  enable2fa(): Observable<ApiResponse<string>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<undefined, string>(`/api/totp`, undefined, config);
  }

  checkStatus(): Observable<ApiResponse<TwoFactorAuthStatus>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<TwoFactorAuthStatus>(`/api/totp/status`, config);
  }

  set2fa(qrCode: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    const body = {
      value: qrCode
    }

    return this.apiClient.put<Object, void>(`/api/totp/setupVerification`, body, config);
  }

  disable2fa(password: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<Object, void>(`/api/totp`, { password }, config);
  }
}
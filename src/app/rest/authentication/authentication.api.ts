import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { AccountActivationRequest, ActiveInviteRequest, SignInRequest, SignInResponse, SignUpByEmailRequest } from "./authentication.model";
import { StringDto } from "../+common/common.model";

export class AuthenticationApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Signs in user by email.
   */
  emailSignIn(body: SignInRequest, url?: string): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        url: url
      }
    };

    return this.apiClient.post<SignInRequest, SignInResponse>(`/api/emailSignIn`, body, config);
  }

  /**
   * Signs in an existing user with a valid OIDC token.
   */
  oidcSignIn(body: StringDto, url?: string): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        url: url
      }
    };

    return this.apiClient.post<StringDto, SignInResponse>(`/api/authentication/oidc`, body, config);
  }

  /**
   * Refreshes token allowing user to stay logged in longer.
   */
  refreshToken(body: string): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
      }
    };

    return this.apiClient.put<string, SignInResponse>(`/api/refreshToken`, body, config);
  }

  authentication2fa(totp: string, token: string, url?: string): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
        otherHeaders: {
          "Authorization": "Bearer " + token
        }
      },
      params: {
        url: url
      }
    };

    const body = {
      value: totp
    }

    return this.apiClient.post<Object, SignInResponse>(`/api/totp/authentication`, body, config);
  }

  /**
   * Resets user password.
   */
  resetPassword(email: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
    };

    return this.apiClient.put<string, void>(`/api/passwordReset`, email, config);
  }

  /**
   * Activates account after registration.
   */
  accountActivationWithTwoPasswords(code: string, body: AccountActivationRequest): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        code: code
      }
    };

    return this.apiClient.put<AccountActivationRequest, void>(`/api/accountActivation`, body, config);
  }

  /**
   * Activates account after invitation.
   */
  accountActivationInvited(code: string, body: ActiveInviteRequest): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        code: code
      }
    };

    return this.apiClient.put<ActiveInviteRequest, void>(`/api/invitations`, body, config);
  }

  resendVerificationEmail(body: string, url?: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        url: url
      }
    };

    return this.apiClient.post<string, void>(`/api/verificationMail`, body, config);
  }

  signInAsAdmin(tenantId: number): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<number, SignInResponse>(`/api/adminSession`, tenantId, config);
  }

  registerUser(body: SignUpByEmailRequest): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
    }

    return this.apiClient.post<SignUpByEmailRequest, void>(`/api/emailRegistration`, body, config);
  }

  emailVerification(verificationCode: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'text/plain, application/vnd.user.v1+json',
      },
      params: {
        verificationCode
      }
    };

    return this.apiClient.post<void, void>(`/api/emailVerification`, undefined, config);
  }

  reAuthenticate(oneTimePassword: StringDto): Observable<ApiResponse<SignInResponse>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.post<StringDto, SignInResponse>(`/api/reAuthenticationToken`, oneTimePassword, config);
  }
}
